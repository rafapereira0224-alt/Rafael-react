import vegitoPImagem from "../assets/vegitoP.gif";
import vegitoImagem from "../assets/vegito.gif";
import gohanPImagem from "../assets/gohanP.gif";
import gohanImagem from "../assets/gohan.gif";
import freezaPImagem from "../assets/freezaP.gif";
import freezaImagem from "../assets/freeza.gif";
import gokuPImagem from "../assets/gokuP.gif";
import gokuImagem from "../assets/goku.gif";
import vegetaPImagem from "../assets/vegetaP.gif";
import vegetaImagem from "../assets/vegeta.gif";
import gogetaPImagem from "../assets/gogetaP.gif";
import gogetaImagem from "../assets/gogeta.gif";
import vegitoBg from "../assets/vegitoBg.jpg";
import gohanBg from "../assets/gohanBg.jpg";
import freezaBg from "../assets/freezaBg.jpg";
import gokuBg from "../assets/gokuBg.jpg";
import vegetaBg from "../assets/vegetaBg.jpg";
import gogetaBg from "../assets/gogetaBg.jpg";


const saiyajins = [
    {
      id: 1,
      nome: "Vegito", 
      estagio: 1, 
      tipo: 'sayajin', 
      caminhoImagem: vegitoPImagem, 
      proximaImagem: vegitoImagem,
      imagemFundo: vegitoBg,
        },


    { 
        id: 2,
        nome: "Gohan",
        estagio: 1,
        tipo: 'sayajin',
        caminhoImagem: gohanPImagem,
        proximaImagem: gohanImagem,
        imagemFundo: gohanBg,
            },


    { 
        id: 3,
        nome: "Freeza",
        estagio: 1,
        tipo: 'vilao',
        caminhoImagem: freezaPImagem,
        proximaImagem: freezaImagem,
        imagemFundo: freezaBg,
            },


    { 
        id: 4,
        nome: "Goku",
        estagio: 1,
        tipo: 'sayajin',
        caminhoImagem: gokuPImagem,
        proximaImagem: gokuImagem,
        imagemFundo: gokuBg
            },


    { 
        id: 5,
        nome: "Vegeta",
        estagio: 1,
        tipo: 'sayajin',
        caminhoImagem: vegetaPImagem,
        proximaImagem: vegetaImagem,
        imagemFundo: vegetaBg
            },

            
    { 
        id: 6,
        nome: "Gogeta",
        estagio: 1,
        tipo: 'sayajin',
        caminhoImagem: gogetaPImagem,
        proximaImagem: gogetaImagem,
        imagemFundo: gogetaBg
            },
];

export default saiyajins;