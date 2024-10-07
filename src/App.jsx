import { useEffect, useState } from "react"
import PokemonConainer from "./PokemonConainer"


const App = () => {

  const [pokemon, setPokemon] = useState([])
  const [search, setSearch] = useState('')
  const [offset,setOffset] = useState(0)

  

  useEffect(() => {
    const poekomonData = async() =>{
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=6`)
      const data = await res.json()
  
      const pokemonResultData = data.results.map(async(pokemonUrl) => {
        const res = await fetch(pokemonUrl.url)
        const data = await res.json()
        return data
      })
  
      const showResult = await Promise.all(pokemonResultData)
  
      setPokemon((prev) => [...prev, ...showResult]);
    }
    poekomonData()
  },[offset] )

  // Search Pokemon
  const searchData = pokemon.filter((curPokemonData) => {
    return(
      curPokemonData.name.toLowerCase().includes(search.toLowerCase())
    )
  } )


//  Infinite Scroll

const handleInfiniteScroll = async() => {
  try {
    if(window.innerHeight + document.documentElement.scrollTop + 6 >= document.documentElement.scrollHeight ){
      setOffset((prev) => prev + 6 )
    }
  } catch (error) {
    console.log(error);
    
  }
}

useEffect(() => {
  window.addEventListener('scroll', handleInfiniteScroll)
  return () => window.removeEventListener('scroll', handleInfiniteScroll)
},[offset] )

  return (
    <div className="wrapper">
      <h1>Pokemon List</h1>
      <div className="searchSection">
        <input type="text" placeholder="Search Pokemon" required value={search} onChange={(e) => setSearch(e.target.value) } />
      </div>
      <PokemonConainer pokemon={searchData} />
    </div>
  )
}

export default App