import React from "react";
import {
	FaTruck,
	FaMoneyBill,
	FaUndo,
	FaUndoAlt,
	FaWhatsapp,
} from "react-icons/fa";

const Hero = () => {
	return (
		<div className="relative bg-gray-900 overflow-hidden h-screen max-h-[74vh] mb-20">
			{/* Background image */}
			<img
				className="absolute inset-0 h-full w-full object-cover"
				// src="https://source.unsplash.com/random/1920x1080/?electronics"
				src="/images/hero.jpg"
				alt="hero electronic background"
			/>
			{/* Overlay */}
			<div className="absolute inset-0 bg-gray-900 opacity-75 p-2 md:-p-4"></div>
			{/* Content */}
			<div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
				<h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight mb-4">
					Welcome to our Nova Store
				</h1>
				<p className="text-lg text-white mb-8">
					Shop with confidence - Enjoy these amazing features
				</p>
				{/* Feature cards */}
				<div className="flex flex-wrap justify-center gap-2 md:gap-6 p-4">
					{/* Feature 1: Free Delivery */}
					<div className="hero-feature-box ">
						<div className="text-white flex items-center">
							<FaTruck className="hero-icon" />
							<p className="text-lg font-semibold">Free Delivery</p>
						</div>
					</div>
					{/* Feature 2: Cash on Delivery */}
					<div className="hero-feature-box ">
						<div className="text-white flex items-center">
							<FaMoneyBill className="hero-icon" />
							<p className="text-lg font-semibold">Cash on Delivery</p>
						</div>
					</div>
					{/* Feature 3: 6 Days Return */}
					<div className="hero-feature-box ">
						<div className="text-white flex items-center">
							<FaUndo className="hero-icon" />
							<p className="text-lg font-semibold">6 Days Return</p>
						</div>
					</div>
					{/* Feature 4: Refundable */}
					<div className="hero-feature-box ">
						<div className="text-white flex items-center">
							<FaUndoAlt className="hero-icon" />
							<p className="text-lg font-semibold">Refundable</p>
						</div>
					</div>
					{/* Feature 5: WhatsApp Support */}
					<div className="hero-feature-box ">
						<div className="text-white flex items-center">
							<FaWhatsapp className="hero-icon" />
							<p className="text-lg font-semibold">WhatsApp Support</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
