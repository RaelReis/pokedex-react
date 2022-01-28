import axios from 'axios';
import styles from './SearchArea.module.css';
import { useState } from 'react';
import { usePokemon } from '../../context/hooks/usePokemon';

import pokedexLogo from '../../assets/img/pokedex_logo.svg';

export function SearchArea() {
  const [search, setSearch] = useState('');
  const [searchError, setSearchError] = useState(false);
  const { setPokemon, setPokedexOffSet, pokedexOffSet } = usePokemon();

  async function searchPokemon() {
    setSearchError(false);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase().trim()}/`);
      setPokemon(response.data);
      handleOffSet(response.data.id - 1);
    } catch (e) {
      console.log('error', e);
      setSearchError(true);
    }
  }

  async function handleOffSet(id) {
    for (let pokeOffSet = 0; pokeOffSet < 898; pokeOffSet += 15) {
      if (id >= pokeOffSet && id <= pokeOffSet + 15) {
        if (pokeOffSet + 15 === id) {
          setPokedexOffSet(pokeOffSet + 15);
        } else {
          setPokedexOffSet(pokeOffSet);
        }
        break;
      }
    }
  }

  function handleRandomButton() {
    const randomPokedexIdGenerator = (Pokedexlimit = 898) => {
      const screeShownPoke = 16;
      const generated = Math.floor(Math.random() * Pokedexlimit - screeShownPoke);
      return generated >= 0 && generated !== pokedexOffSet && generated <= Pokedexlimit - screeShownPoke ? generated : randomPokedexIdGenerator();
    };
    const randomId = randomPokedexIdGenerator();
    handleOffSet(randomId);
    handleRandomPokemon(randomId);
  }

  async function handleRandomPokemon(randomNumber) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNumber}/`);
      setPokemon(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    searchPokemon(search);
  }

  return (
    <header className={styles.searchAreaContainer}>
      <div className={styles.logoBox}>
        <img src={pokedexLogo} alt="Pokedex Logo" />
        <h1>PokeDex</h1>
      </div>
      <form className={styles.inputBox} onSubmit={handleSubmit}>
        {/* <button onClick={handleRandomButton} style={{ position: 'absolute', left: '-200px' }} type="button">
          teste
        </button> */}
        <input
          className={styles.input}
          style={searchError ? { borderColor: 'rgba(255, 0, 0, 0.5)', boxShadow: '0px 0px 10px rgba(255, 0, 0, 0.5)' } : {}}
          value={search}
          type="text"
          placeholder="Search a Pokemon"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={styles.searchButton} type="submit" />
      </form>
    </header>
  );
}
