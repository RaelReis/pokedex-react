import { Footer } from './components/Footer/Footer';
import { PokedexMain } from './components/PokedexMain/PokedexMain';
import { SearchArea } from './components/SearchArea/SearchArea';
import { usePokemon } from './context/hooks/usePokemon';
import './global.css';

function App() {
  const { pokemon } = usePokemon();

  return (
    <div className="App">
      {pokemon && (
        <>
          <SearchArea />
          <PokedexMain />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
