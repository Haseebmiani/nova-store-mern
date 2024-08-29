import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const SidebarItem = (props) => {
	const { link, icon: Icon, name } = props;
	return (
		<NavLink to={link} className="nav-link" activeclassname="active">
			<ListItem>
				<ListItemPrefix>
					<Icon className="h-5 w-5" />
				</ListItemPrefix>
				{name}
			</ListItem>
		</NavLink>
	);
};

SidebarItem.propTypes = {
	link: PropTypes.string.isRequired,
	icon: PropTypes.elementType.isRequired,
	name: PropTypes.string.isRequired,
};

export default SidebarItem;
