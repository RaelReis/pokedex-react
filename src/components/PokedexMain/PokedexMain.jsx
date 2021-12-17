import { usePokemon } from '../../context/hooks/usePokemon';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { PokemonInfoCard } from '../PokemonInfoCard/PokemonInfoCard';
import styles from './PokedexMain.module.css';

export function PokedexMain() {
  const { setPokemon, pokemonList, listLoaded } = usePokemon();

  function handleSelectPokemon(pokeData) {
    setPokemon(pokeData);
  }

  return (
    <div className={styles.pokemonInfoContainer}>
      <div className={styles.pokemonContainer} style={!listLoaded ? { margin: '0 auto' } : {}}>
        {!listLoaded && <LoadingSpinner />}
        {listLoaded && (
          <ul className={styles.pokemonBox}>
            {pokemonList &&
              pokemonList.results.map((pokemon, index) => <PokemonCard key={index} pokeData={pokemon} onSelectPokemon={handleSelectPokemon} />)}
          </ul>
        )}
      </div>
      <PokemonInfoCard />
    </div>
  );
}
