import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface IGdprInfoProps {
  goToForm: () => void;
}

export const GdprInfo = ({ goToForm }: IGdprInfoProps) => {
  const [html, setHtml] = useState<JSX.Element>(
    <div>
      <button onClick={() => goToForm()}>Tillbaka</button>
      <p>Behandling av personuppgifter</p>
      <span>
        För att kunna boka bord hos oss behöver vi spara givna personuppgifter.
        Enligt GDPR får organisationer endast lagra information om individen har
        gett sitt samtycke. Då personinformation är nödvändig för att veta vem
        som skall ha en bokning så sparas förnamn, efternamn, mejladressen och
        telefonnummer när man gör en bokning. Personuppgifterna kommer kvarstå i
        3 månader efter att bokningen ägt rum. Detta med syfte för att kunna
        hantera eventuella förändringar, avbokningar och klagomål. Godkännandet
        måste ges en gång per bokning. Vid eventuella frågor, kontakta oss via
        mejl eller per telefon.
      </span>
    </div>
  );

  return <>{html}</>;
};
