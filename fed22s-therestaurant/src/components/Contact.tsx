import {
  ContactContainer,
  ContactInfoContainer,
} from "./styled/ContactContainer";
import { Container, ImageContainer } from "./styled/Containers";

import { H2 } from "./styled/Headings";

export const Contact = () => {
  return (
    <ContactContainer>
      <ImageContainer>
        <img />
      </ImageContainer>
      <ContactInfoContainer>
        <Container>
          <H2>Kontakta oss</H2>
          <span>Telefonnummer: 0123456789</span>
          <span>Email: restaurang.bakgarden@gmail.com</span>
        </Container>
        <Container>
          <H2>Här finns vi</H2>
          <span>Storgatan 22, 852 30 Sundsvall</span>
        </Container>
      </ContactInfoContainer>
    </ContactContainer>
  );
};
