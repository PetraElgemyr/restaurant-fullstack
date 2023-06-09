import { useParams } from "react-router-dom";

export const CancelBooking = () => {
  const { id } = useParams();

  return (
    <>
      <h4>Avbokning för bokning {id}</h4>
      <p>Är du säker på att du vill avboka din bokning?</p>
      <button type="button">Avboka</button>
    </>
  );
};

/*

  const params = useParams(); // { id: 123 }
  const { superHeroes } = useLoaderData() as Loader;

  const current = superHeroes.find((superhero) => superhero.id === params.id);
*/
