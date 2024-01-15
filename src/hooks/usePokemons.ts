// import { useEffect, useState } from "react";
// import { fetchPokemons } from "../api/fetchPokemons";
// import { Pokemon } from "../interfaces/pokemon";

// export const usePokemonData = (initialOffset = 0, pageSize = 10) => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string>("");
//   const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
//   const [offset, setOffset] = useState(initialOffset);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);

//       try {
//         // Fetch Pokémon data using your API function
//         // const data = await fetchPokemons(undefined, offset, pageSize);
//         const data = await fetchPokemons(undefined, offset, pageSize);
//         // Add the id by parsing the url
//         data.forEach((pokemon) => {
//           const urlParts = pokemon.url.split("/");
//           pokemon.id = parseInt(urlParts[urlParts.length - 2]);
//           // pokemon;
//         });
//         const updatedPokemonList = data.map((pokemon, index) => ({
//           ...pokemon,
//           key: `${pokemon.name}-${index}`,
//         }));
//         // setPokemonData([...pokemonData, ...data]);
//         setPokemonData(updatedPokemonList);
//       } catch (error) {
//         setError("An error occurred while fetching data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [offset, pageSize]);

//   const nextPage = () => {
//     setOffset((prevOffset) => prevOffset + pageSize);
//   };

//   const prevPage = () => {
//     if (offset >= pageSize) {
//       setOffset((prevOffset) => prevOffset - pageSize);
//     }
//   };

//   return { loading, error, pokemonData, nextPage, prevPage };
// };
