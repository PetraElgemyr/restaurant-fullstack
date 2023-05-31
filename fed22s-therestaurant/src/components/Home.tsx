import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <h2>Välkommen till Bakgården!</h2>
      <p>
        Vi är en mysig liten restaurang som serverar högkvalitativa rätter på
        närodlade ekologiska varor.
      </p>
      <Link to="/booking">
        <button>Boka bord</button>
      </Link>
      <Link to="/contact">Kontakta oss</Link>
    </>
  );
};
