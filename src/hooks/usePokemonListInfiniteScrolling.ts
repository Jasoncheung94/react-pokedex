// import { memo, useEffect, useRef, useState } from "react";
// import { DetailedPokemon } from "../interfaces/pokemon";
// import { fetchPokemonWithDetails } from "../api/fetchPokemons";
// import { getGenerationById } from "../utils/generations";
// // Info: Pokemon list infinite scrolling hook

// const usePokemonListInfiniteScrolling = (
//   pageSize: number = 10,
//   selectedGeneration?: number
// ) => {
//   console.log("Fetch data?");
//   const [pokemonData, setPokemonData] = useState<DetailedPokemon[]>([]);
//   const [loading, setIsLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(1);
//   const [prevPage, setPrevPage] = useState(0);
//   const [error, setError] = useState("");
//   const effectRan = useRef(false); // to prevent running twice in strict mode.

//   const fetchMorePokemon = async () => {
//     setIsLoading(true);
//     if (selectedGeneration) {
//       console.log("selectedGenerationx", selectedGeneration);
//     }

//     try {
//       if (page === prevPage) {
//         return;
//       }
//       let offset = (page - 1) * pageSize;
//       if (selectedGeneration) {
//         offset = getGenerationById(selectedGeneration)?.offset || offset;
//       }
//       console.log("Fetching new pokemon:", offset, pageSize);
//       const newPokemonList = await fetchPokemonWithDetails(offset, pageSize);
//       setPokemonData((prevList) => [...prevList, ...newPokemonList]);
//       setPage((prevPage) => prevPage + 1);
//       setHasMore(newPokemonList.length > 0);
//       setPrevPage(page);
//     } catch (error) {
//       console.error("Error fetching more Pokemon:", error);
//       setError("An error occurred while fetching data.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log("useEffect");
//     if (!effectRan.current) {
//       console.log("useEffect2");
//       fetchMorePokemon();
//     }
//     return () => {
//       effectRan.current = true;
//     };
//   }, []);

//   // uncomment this for infinite scrolling
//   // useEffect(() => {
//   //   const handleScroll = () => {
//   //     console.log(
//   //       "scrolling",
//   //       window.innerHeight + document.documentElement.scrollTop,
//   //       document.documentElement.offsetHeight
//   //     );
//   //     if (
//   //       window.innerHeight + document.documentElement.scrollTop >=
//   //       document.documentElement.offsetHeight
//   //     ) {
//   //       if (!loading && hasMore) {
//   //         fetchMorePokemon();
//   //       }
//   //     }
//   //   };

//   //   window.addEventListener("scroll", handleScroll);
//   //   return () => {
//   //     window.removeEventListener("scroll", handleScroll);
//   //   };
//   // }, [loading, hasMore]);

//   return { pokemonData, loading, error };
// };

// export default usePokemonListInfiniteScrolling;
