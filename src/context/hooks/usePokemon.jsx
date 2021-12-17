import { useContext } from 'react';
import { PokemonContext } from '../PokemonContext';

export function usePokemon() {
  return useContext(PokemonContext);
}
