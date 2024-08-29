import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { Tooltip } from "@material-tailwind/react";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledBadge = styled(Badge)(() => ({
	"& .MuiBadge-badge": {
		right: 10,
		top: -3,
		padding: "0 4px",
		border: "none",
		fontSize: "14px",
	},
}));

export default function CartIcon() {
	const { cartItems } = useSelector((state) => state.cart);

	return (
		<Tooltip
			content="Cart"
			animate={{
				mount: { scale: 1, y: 0 },
				unmount: { scale: 0, y: 25 },
			}}
			className="bg-gray-300 text-black"
		>
			<Link to="/cart">
				<IconButton aria-label="cart">
					<StyledBadge
						badgeContent={cartItems.reduce((a, c) => a + c.qty, 0)}
						color="error"
					>
						<ShoppingCartIcon className="text-blue-500" fontSize="large" />
					</StyledBadge>
				</IconButton>
			</Link>
		</Tooltip>
	);
}
