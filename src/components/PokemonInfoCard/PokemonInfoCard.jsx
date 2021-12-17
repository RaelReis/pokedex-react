import styles from './PokemonInfoCard.module.css';
import defaultPokemon from '../../assets/img/default_pokemon.svg';

import leftArrow from '../../assets/img/left-arrow.svg';
import rightArrow from '../../assets/img/right-arrow.svg';
import axios from 'axios';

import { typesColor, typesRgbaColor } from '../../assets/style/colorpalette';
import { usePokemon } from '../../context/hooks/usePokemon';

export function PokemonInfoCard() {
  const { pokemon, setPokemon, pokedexOffSet, setPokedexOffSet } = usePokemon();

  async function loadPreviousPokemon() {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id - 1}/`);
      setPokemon(response.data);
      if (pokedexOffSet >= pokemon.id - 1) {
        setPokedexOffSet(pokemon.id - 16);
      }
    } catch (e) {
      console.log('Error on previous pokemon request', e);
    }
  }

  async function loadNextPokemon() {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id + 1}/`);
      setPokemon(response.data);
      if (pokedexOffSet + 15 <= pokemon.id) {
        setPokedexOffSet(pokemon.id);
      }
    } catch (e) {
      console.log('Error on next pokemon request', e);
    }
  }
  return (
    <div
      className={styles.pokemonInfoCard}
      style={{
        boxShadow: `0 0 15px ${typesRgbaColor[pokemon?.types[0].type.name]}`,
        borderColor: `${typesColor[pokemon?.types[0].type.name]}`,
      }}
    >
      <button className={styles.previousPokemonButton} onClick={loadPreviousPokemon}>
        <img src={leftArrow} alt="Previouse pokemon" />
      </button>
      <button className={styles.nextPokemonButton} onClick={loadNextPokemon}>
        <img src={rightArrow} alt="Next pokemon" />
      </button>
      <img className={styles.pokemonImage} src={pokemon.sprites.other['official-artwork'].front_default || defaultPokemon} alt="Pokemon" />
      <span className={styles.pokemonId}>{`#${pokemon?.id || '999'}`}</span>
      <h2 className={styles.pokemonName}>{pokemon?.name || 'Pokemon Name'}</h2>
      <ul className={styles.pokemonTypesBox}>
        {pokemon?.types.map((type, index) => (
          <li key={index} className={styles.pokemonType} style={{ backgroundColor: typesColor[type.type.name] }}>
            {type.type.name}
          </li>
        ))}
      </ul>
      <h3>Pokedex entry</h3>
      {/* <p>{actualPokemon.}</p> */}
    </div>
  );
}
