import styles from './PokemonCard.module.css';
import { useState } from 'react';
import { usePokemon } from '../../context/hooks/usePokemon';
import defaultPokemon from '../../assets/img/default_pokemon.svg';

export function PokemonCard({ pokeData }) {
  const { pokemon, setPokemon } = usePokemon();

  const [imageLoaded, setImageLoaded] = useState(false);


  async function handleSelectPokemon() {
    try {
      setPokemon(pokeData);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <li
      style={!imageLoaded ? { display: 'none' } : null}
      className={`${styles.pokemonCard} ${pokemon.id === pokeData.id ? styles.selectedPokemonCard : ''} `}
      onClick={handleSelectPokemon}
    >
      <div className={styles.pokemonWhiteArea}>
        <span className={styles.pokemonId}>{`#${pokeData.id || '999'}`}</span>
        <img
          className={styles.pokemonImg}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png` || defaultPokemon}
          onLoad={() => setImageLoaded(true)}
          alt={`${pokeData.name || 'PokemonName'}`}
        />
      </div>
      <h3 className={styles.pokemonName}>{pokeData.name || 'PokemonName'}</h3>
    </li>
  );
}
