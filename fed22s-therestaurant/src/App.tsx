import { useEffect, useReducer, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { Loader } from "./components/Loader";
import { AnimatePresence } from "framer-motion";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    },2500)
  }, []);

  if (loading) {
    return (
      <>
        <Loader/>
      </>
    )
  } else {
    return (
      <>
        <RouterProvider router={router}></RouterProvider>
      </>
    );
  }
}

export default App;
