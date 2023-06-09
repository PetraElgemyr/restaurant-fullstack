import { Link } from "react-router-dom";

export const CancelConfirmation = () => {
  return (
    <>
      <h4>Du har nu avbokat din bokning!</h4>
      <Link to="/">Till startsidan</Link>
    </>
  );
};
