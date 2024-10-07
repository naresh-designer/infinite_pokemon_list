import PokemonCard from "./PokemonCard"


const PokemonConainer = ({pokemon}) => {
  return (
    <main>
        <div className="grid grid_three" >
        {
            pokemon.map((curElm) => {
                return(
                    <PokemonCard key={curElm.id} curElm={curElm} />
                )
            })
        }
        </div>
        
    </main>
  )
}

export default PokemonConainer