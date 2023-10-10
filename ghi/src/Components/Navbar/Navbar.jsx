import { NavLink } from "react-router-dom";
import { Tabs, TabList, Tab, TabIndicator, Avatar, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import "./Navbar.css";

function Nav() {
  return (
    <header>
      <nav className="navbar">
        <NavLink to="/" className="navbar-brand">
          <img src="Flickpix Logo.png" alt="Flickpix Logo" width="70" height="50" />
        </NavLink>
        <div className="tab">
          <Tabs position="relative" variant="unstyled">
            <TabList>
              <Tab className="tab-item">TV Shows</Tab>
              <Tab className="tab-item">Movies</Tab>
              <Tab className="tab-item">Watch Later</Tab>
              <Tab className="tab-item">Seen It</Tab>
            </TabList>
            <TabIndicator mt="-1px" height="2px" bg="blue.500" borderRadius="2px" />
          </Tabs>
        </div>
        <div className="search">
          <input type="search" className="search-box" placeholder="Search..." />
          <span className="search-button">
            <span className="search-icon"></span>
          </span>
        </div>
        <Menu>
          <MenuButton className="avatar-center" as={Avatar} name="Andrew" src="/link.png" cursor="pointer"></MenuButton>
          <MenuList>
            <MenuItem className="menu-item-black-text">Settings</MenuItem>
            <MenuItem className="menu-item-black-text">Log Out</MenuItem>
          </MenuList>
        </Menu>
      </nav>
    </header>
  );
}

export default Nav;
