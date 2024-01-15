// import { useEffect, useState } from "react";
// import { PokemonDetailResponse } from "../interfaces/pokemon";
// import { fetchPokemonWithDetails } from "../api/fetchPokemons";

// export const usePokemonList = (initialOffset = 0, pageSize = 10) => {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");
//   const [pokemonData, setPokemonData] = useState<DetailedPokemonResponse[]>([]);
//   const [offset, setOffset] = useState<number>(initialOffset);

//   useEffect(() => {
//     const fetchPokemonData = async () => {
//       setIsLoading(true);
//       try {
//         const data = await fetchPokemonWithDetails(offset, pageSize);
//         setPokemonData((prevData) => [...prevData, ...data]);
//       } catch (error) {
//         setError("An error occurred while fetching data.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchPokemonData();
//   }, [offset, pageSize]);

//   const nextPage = () => {
//     setOffset((prevOffset) => prevOffset + pageSize);
//   };

//   // prevPage isn't working due to infinite scrolling implementation
//   const prevPage = () => {
//     if (offset >= pageSize) {
//       setOffset((prevOffset) => prevOffset - pageSize);
//     }
//   };

//   return { loading: isLoading, error, pokemonData, nextPage, prevPage };
// };
