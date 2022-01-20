import axios from 'axios';
import styles from './PokemonCard.module.css';
import { useState } from 'react';
import { usePokemon } from '../../context/hooks/usePokemon';
import defaultPokemon from '../../assets/img/default_pokemon.svg';

export function PokemonCard({ pokeData }) {
  const { pokemon, setPokemon } = usePokemon();
  const [imageLoaded, setImageLoaded] = useState(false);

  const pokeId = pokeData.url.slice(34, -1);

  async function handleSelectPokemon() {
    try {
      const response = await axios.get(pokeData.url);
      setPokemon(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <li
      style={!imageLoaded ? { display: 'none' } : null}
      className={`${styles.pokemonCard} ${pokemon.id === +pokeId ? styles.selectedPokemonCard : ''} `}
      onClick={handleSelectPokemon}
    >
      <div className={styles.pokemonWhiteArea}>
        <span className={styles.pokemonId}>{`#${pokeId}`}</span>
        <img
          className={styles.pokemonImg}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png` || defaultPokemon}
          onLoad={() => setImageLoaded(true)}
          alt={`${pokeData.name}`}
        />
      </div>
      <h3 className={styles.pokemonName}>{pokeData.name}</h3>
    </li>
  );
}
