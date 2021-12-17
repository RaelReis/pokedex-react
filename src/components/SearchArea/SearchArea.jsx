import styles from './SearchArea.module.css';
import pokedexLogo from '../../assets/img/pokedex_logo.svg';
import { useState } from 'react';
import axios from 'axios';
import { usePokemon } from '../../context/hooks/usePokemon';

export function SearchArea() {
  const [search, setSearch] = useState('');
  const [searchError, setSearchError] = useState(false);
  const { setPokemon } = usePokemon();

  async function searchPokemon() {
    setSearchError(false);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase().trim()}/`);
      setPokemon(response.data);
    } catch (e) {
      console.log('error', e);
      setSearchError(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    searchPokemon(search);
  }

  return (
    <div className={styles.searchAreaContainer}>
      <div className={styles.logoBox}>
        <img src={pokedexLogo} alt="Pokedex Logo" />
        <h1>PokeDex</h1>
        {console.log('remontado ?')}
      </div>
      <form className={styles.inputBox} onSubmit={handleSubmit}>
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
    </div>
  );
}
