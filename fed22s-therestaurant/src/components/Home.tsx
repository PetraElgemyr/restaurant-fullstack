import { Link } from "react-router-dom";
import { Button } from "./styled/Buttons";

export const Home = () => {
  return (
    <>
      <h2>Välkommen till Bakgården!</h2>
      <p>
        Vi är en mysig liten restaurang som serverar högkvalitativa rätter på
        närodlade ekologiska varor.
      </p>
      <Link to="/booking">
        <Button>Boka bord</Button>
      </Link>
      <Link to="/contact">Kontakta oss</Link>
    </>
  );
};
