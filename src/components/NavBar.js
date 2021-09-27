import React, { useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';


import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
}
  from "reactstrap";


const NavBar = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);

  let navUserItem = null;
  if (authState == AuthState.SignedIn && user) {
    navUserItem = <NavItem className="align-right">
      <AmplifySignOut />
    </NavItem>;
  }

  return (
    <div className="nav-container">
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand className="logo" />
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/logbook"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  My Log Book
                </NavLink>
              </NavItem>
              {navUserItem}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
