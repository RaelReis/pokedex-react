import axios from 'axios';
import { createContext, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

export const PokemonContext = createContext();

export default function PokemonProvider({ children }) {
  const [pokemon, setPokemon] = useState(null);
  const [pokedexOffSet, setPokedexOffSet] = useState(384);
  const [pokemonList, setPokemonList] = useState(null);
  const [listLoaded, setListLoaded] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        // Search on cookies or local storage
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/385/');
        setPokemon(response.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      setListLoaded(false);
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=15&offset=${pokedexOffSet}`);
        setPokemonList(response.data);
        setListLoaded(true);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [pokedexOffSet]);

  return (
    <PokemonContext.Provider value={{ pokemon, setPokemon, pokedexOffSet, setPokedexOffSet, pokemonList, listLoaded }}>
      {children}
    </PokemonContext.Provider>
  );
}
