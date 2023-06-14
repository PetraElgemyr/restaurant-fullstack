import {
  ContactContainer,
  ContactInfoContainer,
} from "./styled/ContactContainer";
import { Container, ImageContainer } from "./styled/Containers";

import { H2 } from "./styled/Headings";
import { Span } from "./styled/Span";

export const Contact = () => {
  return (
    <ContactContainer>
      <ImageContainer img={"src/assets/plate-figgs.jpg"}>
        <img />
      </ImageContainer>
      <ContactInfoContainer>
        <Container>
          <H2>Kontakta oss</H2>
          <Span>Telefonnummer: 0123456789</Span>
          <Span>Email: restaurang.bakgarden@gmail.com</Span>
        </Container>
        <Container>
          <H2>Här finns vi</H2>
          <Span>Storgatan 22, 852 30 Sundsvall</Span>
        </Container>
      </ContactInfoContainer>
    </ContactContainer>
  );
};
