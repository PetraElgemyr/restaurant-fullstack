import { Link } from "react-router-dom";
import { DropDownMenu, HamMenu, HamStick, Logo, Menu, Nav } from "./styled/Nav";
import { useState } from "react";
import { Button } from "./styled/Buttons";

export const Navbar = () => {
  const [toggled, setToggled] = useState(false);
  return (
    <Nav>
    <Logo>
      <Link to="/">Bakgården</Link>
    </Logo>  
    <Menu onClick={() => {setToggled(!toggled)}}>
      <HamMenu>
        <HamStick toggled={+toggled}/>
      </HamMenu>
    </Menu>
    <DropDownMenu toggled={+toggled}>
      <ul>
        <li>
          <Link to="/" onClick={() => {setToggled(!toggled)}}>Startsidan</Link>
        </li>
        <li>
          <Link to="/booking" onClick={() => {setToggled(!toggled)}} >Boka bord</Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => {setToggled(!toggled)}}>Kontakt oss</Link>
        </li>
      </ul>
    </DropDownMenu>
    </Nav>
  );
};
