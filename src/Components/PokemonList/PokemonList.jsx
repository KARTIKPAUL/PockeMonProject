import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){
    
    const[pokemonList,setPokemonList] = useState([]);
    const[isLoading,setIsLoading] = useState(true);
    const [POKEDEX_URL,setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const[nextUrl,setNextUrl] = useState('');
    const[prevUrl,setPrevUrl] = useState('')
    async function downloadPokemon(){
        setIsLoading(true);
        const responce = await axios.get(POKEDEX_URL);
        const pokemonResults = responce.data.results;

        setNextUrl(responce.data.next);
        setPrevUrl(responce.data.previous);

        const pokemonResultPromise= pokemonResults.map((pokemon) =>
            axios.get(pokemon.url)
        );
        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData);
        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name , image: ( pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny, types:pokemon.types
            }
        });
        console.log(res);
        setPokemonList(res);
        setIsLoading(false)
    }
    useEffect(() =>{
       downloadPokemon(); 
    },[POKEDEX_URL])

   
    return(
        <div className="pokemon-list-wrapper">
        <p>Pokemon List</p>
        
        <div className="pokemon-wrapper">
        {(isLoading) ? "Loading...." : 
        pokemonList.map((p) => 
        <Pokemon name={p.name} image={p.image} key={p.id}/>
        )
        }
        </div>
        <div className="controls">
            <button disabled={prevUrl == null} onClick={() => setPokedexUrl(prevUrl)}>Prev</button>
            <button disable={nextUrl==  null} onClick={() => setPokedexUrl(nextUrl)}>Next</button>
        </div>
        </div>
    )
}

export default PokemonList;