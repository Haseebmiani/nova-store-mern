import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please tell us your name."],
		},
		email: {
			type: String,
			required: [true, "Please provide your email address."],
			unique: true,
			lowercase: true,
			validate: [validator.isEmail, "Please provide a valid email address."],
		},
		role: {
			type: String,
			enum: ["admin", "user"],
			default: "user",
		},
		password: {
			type: String,
			required: [true, "Please provide a password."],
			minlength: 6,
			select: false,
		},
		passwordChangedAt: Date,
		passwordResetToken: String,
		passwordResetExpires: Date,
		active: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changeTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);

		return JWTTimestamp < changeTimestamp;
	}
	// NO password changed
	return false;
};

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");

	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

userSchema.pre("save", async function (next) {
	// Only work when the password is not modified
	if (!this.isModified("password")) return next();

	// Hash the password using cost of 12
	this.password = await bcrypt.hash(this.password, 12);

	next();
});

userSchema.pre("save", function (next) {
	if (!this.isModified("password") || this.isNew) return next();

	// 1 sec minus: beaucese the unexcepted bug during issued jwt token
	// the token created after the password changed
	this.passwordChangedAt = Date.now() - 1000;

	next();
});

const User = mongoose.model("User", userSchema);

export default User;
