import './Pokemon.css'
function Pokemon({name,image}){
    return(
        <div className='pokemon'>
        <div className='pokemon-name'>{name}</div>
        <dir><img src={image} className='pokemon-img'/></dir>
        </div>
    )
}
export default Pokemon;