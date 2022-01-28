import styles from './PokedexMain.module.css';
import { usePokemon } from '../../context/hooks/usePokemon';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { PokemonInfoCard } from '../PokemonInfoCard/PokemonInfoCard';

export function PokedexMain() {
  const { pokemonList, listLoaded } = usePokemon();

  return (
    <main className={styles.pokemonInfoContainer}>
      <div className={!listLoaded ? styles.isLoading : styles.pokedexContainer}>
        {!listLoaded && <LoadingSpinner />}
        {listLoaded && (
          <ul className={styles.pokemonBox}>{pokemonList && pokemonList.map((data, index) => <PokemonCard key={index} pokeData={data} />)}</ul>
        )}
      </div>
      <PokemonInfoCard />
    </main>
  );
}
