import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <ul>
          <li>
            <Link to="/">(LOGO KOMMER)</Link>
          </li>
          <li>
            <Link to="/booking">Boka bord</Link>
          </li>
          <li>
            <Link to="/contact">Kontakt oss</Link>
          </li>
      </ul>
    </>
  );
};
