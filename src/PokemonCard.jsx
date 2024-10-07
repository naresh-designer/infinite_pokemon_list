
const PokemonCard = ({curElm}) => {

  return (
    <main>
        <div className="card">
            <figure>
                <img src={curElm.sprites.other.home.front_default} alt={curElm.name} />
            </figure>
            <h2>{curElm.name}</h2>
        </div>
    </main>
  )
}

export default PokemonCard