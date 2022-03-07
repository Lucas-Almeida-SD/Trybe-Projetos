import dataHeroesII from './dataHeroesII';
import panteraNegra from './images/pantera-negra.jpg';
import capitaoAmerica from './images/capitao-america.jpg';
import thor from './images/thor.jpg';
import hulk from './images/hulk.jpeg';
import nickFury from './images/nick-fury.jpg';
import viuvaNegra from './images/viuva-negra.jpg';
import gaviaArqueiro from './images/gaviao-arqueiro.jpg';
import agenteHill from './images/agente-hill.jpg';
import agenteCoulson from './images/agente-coulson.jpeg';
import tonyStark from './images/tony-stark.jpeg';
import bruceBanner from './images/bruce-banner.jpg';
import loki from './images/loki.jpg';
import caveiraVermelha from './images/caveira-vermelha.jpeg';
import doutorEstranho from './images/doutor-estranho.jpg';
import nebulosa from './images/nebulosa.jpg';
// import feiticeiraEscarlate from './images/feiticeira-escarlate.jpg';

const muitoRaro = 'muito raro';

const dataHeroes = [
  {
    id: 1,
    cardName: 'Pantera Negra',
    cardDescription:
      'T\'Challa, rei de Wakanda. Habilidade em artes marciais.',
    cardAttr1: '75',
    cardAttr2: '60',
    cardAttr3: '60',
    cardImage: panteraNegra,
    cardRare: 'raro',
    cardTrunfo: false,
  },
  {
    id: 2,
    cardName: 'Capitão América',
    cardDescription:
      'Habiidades aprimoradas. Força, agilidade, resistência e reflexos.',
    cardAttr1: '45',
    cardAttr2: '30',
    cardAttr3: '90',
    cardImage: capitaoAmerica,
    cardRare: 'raro',
    cardTrunfo: false,
  },
  {
    id: 3,
    cardName: 'Thor',
    cardDescription:
      'Deus do Trovão. Pode voar e possui  força descomunal.',
    cardAttr1: '90',
    cardAttr2: '75',
    cardAttr3: '45',
    cardImage: thor,
    cardRare: muitoRaro,
    cardTrunfo: false,
  },
  {
    id: 4,
    cardName: 'Hulk',
    cardDescription:
      'Super força, resistência, durabilidade, imunidade, regeneração.',
    cardAttr1: '90',
    cardAttr2: '75',
    cardAttr3: '60',
    cardImage: hulk,
    cardRare: 'raro',
    cardTrunfo: false,
  },
  {
    id: 5,
    cardName: 'Nick Fury',
    cardDescription:
      'Experiente em combate armado e desarmado',
    cardAttr1: '15',
    cardAttr2: '30',
    cardAttr3: '60',
    cardImage: nickFury,
    cardRare: 'normal',
    cardTrunfo: false,
  },
  {
    id: 6,
    cardName: 'Viúva Negra',
    cardDescription:
      'Possui resistência, agilidade, maestria em armas e em combate.',
    cardAttr1: '15',
    cardAttr2: '30',
    cardAttr3: '90',
    cardImage: viuvaNegra,
    cardRare: 'normal',
    cardTrunfo: false,
  },
  {
    id: 7,
    cardName: 'Gavião Arqueiro',
    cardDescription:
      'Capaz de disparar várias flechas em um único alvo com alta precisão.',
    cardAttr1: '15',
    cardAttr2: '15',
    cardAttr3: '90',
    cardImage: gaviaArqueiro,
    cardRare: 'normal',
    cardTrunfo: false,
  },
  {
    id: 8,
    cardName: 'Agente Hill',
    cardDescription:
      'Experiência em espionagem e combate corpo-a-corpo',
    cardAttr1: '15',
    cardAttr2: '15',
    cardAttr3: '60',
    cardImage: agenteHill,
    cardRare: 'normal',
    cardTrunfo: false,
  },
  {
    id: 9,
    cardName: 'Agente Coulson',
    cardDescription:
      'Habilidades de combate corpo a corpo e no uso de armas, estrategista e tático.',
    cardAttr1: '15',
    cardAttr2: '15',
    cardAttr3: '45',
    cardImage: agenteCoulson,
    cardRare: 'normal',
    cardTrunfo: false,
  },
  {
    id: 10,
    cardName: 'Tony Stark',
    cardDescription:
      'Uma das pessoas mais inteligentes da Terra. Prodígio de engenharia mecânica.',
    cardAttr1: '15',
    cardAttr2: '15',
    cardAttr3: '15',
    cardImage: tonyStark,
    cardRare: 'normal',
    cardTrunfo: false,
  },
  {
    id: 11,
    cardName: 'Bruce Banner',
    cardDescription:
      'Super-gênio em física nuclear, capaz de extraordinários feitos intelectuais.',
    cardAttr1: '15',
    cardAttr2: '15',
    cardAttr3: '15',
    cardImage: bruceBanner,
    cardRare: 'normal',
    cardTrunfo: false,
  },
  {
    id: 12,
    cardName: 'Loki',
    cardDescription: 'Super força, super durabilidade, metamorfose e poderes mentais.',
    cardAttr1: '75',
    cardAttr2: '60',
    cardAttr3: '60',
    cardImage: loki,
    cardRare: muitoRaro,
    cardTrunfo: false,
  },
  {
    id: 13,
    cardName: 'Caveira Vermelha',
    cardDescription:
      'Possui força, agilidade, reflexos e resistência apurados',
    cardAttr1: '45',
    cardAttr2: '30',
    cardAttr3: '60',
    cardImage: caveiraVermelha,
    cardRare: 'raro',
    cardTrunfo: false,
  },
  {
    id: 14,
    cardName: 'Doutor Estranho',
    cardDescription:
      'Feitiçaria, telepatia, telecinese, escudos de energia, teleporte.',
    cardAttr1: '15',
    cardAttr2: '60',
    cardAttr3: '90',
    cardImage: doutorEstranho,
    cardRare: 'muito raro',
    cardTrunfo: false,
  },
  {
    id: 15,
    cardName: 'Nebulosa',
    cardDescription: 'Agilidade, regeneração, cargas de eletrochoque concussivas.',
    cardAttr1: '30',
    cardAttr2: '30',
    cardAttr3: '75',
    cardImage: nebulosa,
    cardRare: 'raro',
    cardTrunfo: false,
  },
  ...dataHeroesII,
];

export default dataHeroes;
