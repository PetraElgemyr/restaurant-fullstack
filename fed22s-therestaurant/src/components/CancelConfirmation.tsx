import { Link } from "react-router-dom";
import { Button } from "./styled/Buttons";

export const CancelConfirmation = () => {
  return (
    <>
      <h4>Du har nu avbokat din bokning!</h4>
      <Link to="/">
        <Button>Till startsidan</Button>
      </Link>
    </>
  );
};
