import { useEffect, useReducer } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";

function App() {
  useEffect(() => {}, []);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
