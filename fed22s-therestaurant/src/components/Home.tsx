import { Link } from "react-router-dom";
import { Button } from "./styled/Buttons";
import { Container, ImageContainer } from "./styled/Containers";
import { HomeContainer, HomeInfoContainer } from "./styled/HomeContainer";
import { H2 } from "./styled/Headings";
import { Logo } from "./styled/Nav";
import { Span } from "./styled/Span";

export const Home = () => (
  <HomeContainer>
      <HomeInfoContainer>
        <H2>Välkommen till Bakgården!</H2>
        <Span>
          Vi är en mysig liten restaurang som serverar högkvalitativa rätter på
          närodlade ekologiska varor.
        </Span>
        <Link to="/booking">
          <Button>Boka bord</Button>
        </Link>
      </HomeInfoContainer>
    </HomeContainer>

);
