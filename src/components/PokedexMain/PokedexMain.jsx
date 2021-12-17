import axios from 'axios';
import { useEffect, useState } from 'react';
import { usePokemon } from '../../context/hooks/usePokemon';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { PokemonInfoCard } from '../PokemonInfoCard/PokemonInfoCard';
import styles from './PokedexMain.module.css';

export function PokedexMain() {
  const [pokemonListOffSet, setPokemonListOffSet] = useState(384);
  const [pokemonList, setPokemonList] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setPokemon } = usePokemon();

  useEffect(() => {
    (async function () {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=15&offset=${pokemonListOffSet}`);
      setPokemonList(response.data);
      setLoading(false);
    })();
  }, [pokemonListOffSet]);

  function handleSelectPokemon(pokeData) {
    setPokemon(pokeData);
  }

  function handleRandomButton() {
    const randomPokedexIdGenerator = (Pokedexlimit = 898) => {
      const generated = Math.floor(Math.random() * Pokedexlimit - 16);
      return generated >= 0 && generated !== pokemonListOffSet ? generated : randomPokedexIdGenerator();
    };
    setPokemonListOffSet(randomPokedexIdGenerator());
  }

  return (
    <div className={styles.pokemonInfoContainer}>
      <div className={styles.pokemonContainer} style={loading ? { margin: '0 auto' } : {}}>
        <button onClick={handleRandomButton}>teste</button>
        {loading && <LoadingSpinner />}
        {!loading && (
          <div className={styles.pokemonBox}>
            {pokemonList &&
              pokemonList.results.map((pokemon, index) => <PokemonCard key={index} pokeData={pokemon} onSelectPokemon={handleSelectPokemon} />)}
          </div>
        )}
      </div>
      <PokemonInfoCard />
    </div>
  );
}
