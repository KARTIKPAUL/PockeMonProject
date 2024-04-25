import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import './Pockedex.css';
function Pockedex(){
    return(
        <div className="pockedex-wrapper">
        <h1>Pockedex</h1>
        <Search />
        <PokemonList />
        </div>
    )
}

export default Pockedex;