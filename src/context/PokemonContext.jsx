import axios from 'axios';
import { createContext, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

export const PokemonContext = createContext();

export default function PokemonProvider({ children }) {
  const [pokemon, setPokemon] = useState(null);
  const [offSet, setOffSet] = useState(385);

  useEffect(() => {
    (async function () {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon/385/');
      setPokemon(response.data);
    })();
  }, []);

  return <PokemonContext.Provider value={{ pokemon, setPokemon, offSet, setOffSet }}>{children}</PokemonContext.Provider>;
}
