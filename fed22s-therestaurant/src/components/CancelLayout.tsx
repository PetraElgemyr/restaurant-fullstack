import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const CancelLayout = () => {
  return (
    <>
      <h3>Avbokningssida</h3>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};
