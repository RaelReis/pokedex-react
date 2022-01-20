import styles from './PokedexMain.module.css';
import { usePokemon } from '../../context/hooks/usePokemon';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { PokemonInfoCard } from '../PokemonInfoCard/PokemonInfoCard';

export function PokedexMain() {
  const { setPokemon, pokemonList, listLoaded } = usePokemon();

  function handleSelectPokemon(pokeData) {
    setPokemon(pokeData);
  }

  return (
    <main className={styles.pokemonInfoContainer}>
      <div style={!listLoaded ? { margin: '0 auto' } : {}}>
        {!listLoaded && <LoadingSpinner />}
        {listLoaded && (
          <ul className={styles.pokemonBox}>
            {pokemonList &&
              pokemonList.results.map((pokemon, index) => <PokemonCard key={index} pokeData={pokemon} onSelectPokemon={handleSelectPokemon} />)}
          </ul>
        )}
      </div>
      <PokemonInfoCard />
    </main>
  );
}
