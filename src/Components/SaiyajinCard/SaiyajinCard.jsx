function SaiyajinCard({nome, caminhoImagem, estagio, evoluirSaiyajin}){
    return (
         <div className='CardSaiyajin'>
            <div className="image-box">
                <img src={caminhoImagem} width={200} height={240} alt={nome} title={nome}/>
            </div>
            <h2>{nome}</h2>
            <p>Estágio: {estagio}</p>
            <button onClick={()=> evoluirSaiyajin(nome)}>Evoluir</button>
         </div>
    )
}
export default SaiyajinCard