import { Link } from 'react-router-dom';

function SaiyajinCard({nome, caminhoImagem, estagio, evoluirSaiyajin, id}) {
    return (
         <div className='CardSaiyajin'>
            <div className="image-box">
                <Link to={`/Rafael-react/${id}`}>
  <img src={caminhoImagem} width={200} height={240} alt={nome} title={nome}/>
</Link>
            </div>
            <h2>{nome}</h2>
            <p>Estágio: {estagio}</p>
            <button onClick={()=> evoluirSaiyajin(nome)}>Evoluir</button>
         </div>
    )
}
export default SaiyajinCard;