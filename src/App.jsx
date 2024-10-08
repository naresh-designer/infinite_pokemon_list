import { useEffect, useState } from "react"
import PokemonConainer from "./PokemonConainer"
import Loading from "./Loading"


const App = () => {

  const [pokemon, setPokemon] = useState([])
  const [search, setSearch] = useState('')
  const [offset,setOffset] = useState(0)
  const [loading,setLoading] = useState(true)

  

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
  
      setLoading(false)
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

  const innerHeight = window.innerHeight
  const scrollTop = window.scrollY
  const scrollHeight = document.documentElement.offsetHeight

  

  try {
    if(innerHeight + scrollTop >= scrollHeight ){
      setOffset((prev) => prev + 6 )
      setLoading(true)
    }
  } catch (error) {
    console.log(error);
    
  }
}

useEffect(() => {
  window.addEventListener('scroll', handleInfiniteScroll)
  return () => window.removeEventListener('scroll', handleInfiniteScroll)
},[] )

  return (
    <main>
      <div className="header">
      <h1>Pokemon List</h1>
      <div className="searchSection">
        <input type="text" placeholder="Search Pokemon" required value={search} onChange={(e) => setSearch(e.target.value) } />
      </div>
      </div>

      <div className="wrapper">
      
      
        <div className="pokemonList">
          <PokemonConainer pokemon={searchData} />
          {
        loading && <Loading/>
      }
        </div>
      </div>
    </main>
  )
}

export default App