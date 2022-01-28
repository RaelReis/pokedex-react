import axios from 'axios';
import { createContext, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

export const PokemonContext = createContext();

export default function PokemonProvider({ children }) {
  const [pokemon, setPokemon] = useState(null);
  const [pokedexOffSet, setPokedexOffSet] = useState(384);
  const [pokemonList, setPokemonList] = useState([]);
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
    setListLoaded(false);
    setPokemonList([]);

    if (pokedexOffSet >= 898) {
      setPokedexOffSet(883);
    }

    if (pokedexOffSet < 0) {
      setPokedexOffSet(1);
    }

    (async function () {
      try {
        for (let pokeId = pokedexOffSet + 1; pokeId <= pokedexOffSet + 15; pokeId++) {
          const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
          setPokemonList((prevState) => [...prevState, data]);
        }

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
