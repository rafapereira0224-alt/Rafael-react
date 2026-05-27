import './SaiyajinButton.css'

function SaiyajinButton({titulo='Botão Padrão', cor='white', corDaLetra='black'}){
    return (
        <button
        className="SaiyajinButton" 
        style={{backgroundColor: cor, color: corDaLetra}}>
         {titulo}
        </button>
    )
}

export default SaiyajinButton