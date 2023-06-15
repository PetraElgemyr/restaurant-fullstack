import { useState } from "react";
import { BackButton} from "./styled/Buttons";
import { GdprInfoWrapper} from "./styled/Wrappers";
import {
  ContactContainer,
} from "./styled/ContactContainer";
import { ImageContainer } from "./styled/Containers";
import { Span } from "./styled/Span";


interface IGdprInfoProps {
  goToForm: () => void;
}

export const GdprInfo = ({ goToForm }: IGdprInfoProps) => {
  const [html, setHtml] = useState<JSX.Element>(
    <ContactContainer>
      <ImageContainer img={"src/assets/wineglas.jpg"}>
        <img />
      </ImageContainer>
      <GdprInfoWrapper>
        <BackButton onClick={() => goToForm()}>Tillbaka</BackButton>
        <h3>Behandling av personuppgifter</h3>
        <Span>
          För att kunna boka bord hos oss behöver vi spara givna
          personuppgifter. Enligt GDPR får organisationer endast lagra
          information om individen har gett sitt samtycke. Då personinformation
          är nödvändig för att veta vem som skall ha en bokning så sparas
          förnamn, efternamn, mejladressen och telefonnummer när man gör en
          bokning. Personuppgifterna kommer kvarstå i 3 månader efter att
          bokningen ägt rum. Detta med syfte för att kunna hantera eventuella
          förändringar, avbokningar och klagomål. Godkännandet måste ges en gång
          per bokning. Vid eventuella frågor, kontakta oss via mejl eller per
          telefon.
        </Span>
      </GdprInfoWrapper>
    </ContactContainer>
  );

  return <>{html}</>;
};
