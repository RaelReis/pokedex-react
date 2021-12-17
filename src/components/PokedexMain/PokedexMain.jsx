import { usePokemon } from '../../context/hooks/usePokemon';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { PokemonInfoCard } from '../PokemonInfoCard/PokemonInfoCard';
import styles from './PokedexMain.module.css';

export function PokedexMain() {
  const { setPokemon, pokedexOffSet, setPokedexOffSet, pokemonList, listLoaded } = usePokemon();

  function handleSelectPokemon(pokeData) {
    setPokemon(pokeData);
  }

  function handleRandomButton() {
    const randomPokedexIdGenerator = (Pokedexlimit = 898) => {
      const generated = Math.floor(Math.random() * Pokedexlimit - 16);
      return generated >= 0 && generated !== pokedexOffSet ? generated : randomPokedexIdGenerator();
    };
    setPokedexOffSet(randomPokedexIdGenerator());
  }

  return (
    <div className={styles.pokemonInfoContainer}>
      <div className={styles.pokemonContainer} style={!listLoaded ? { margin: '0 auto' } : {}}>
        <button
          style={
            listLoaded
              ? {
                  position: 'absolute',
                }
              : {
                  display: 'none',
                }
          }
          onClick={handleRandomButton}
        >
          teste
        </button>
        {!listLoaded && <LoadingSpinner />}
        {listLoaded && (
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
