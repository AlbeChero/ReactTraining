import React from 'react'
import './App.css';

function Riga(props) {
  var element = props.prodotto.disponibile ? 
      <div className="nome">
        {props.prodotto.nome}
      </div> :
      <div className="nomeNonDisponibile">
        {props.prodotto.nome}
      </div>;
      
  return (
    <div>
      {element}
      <div className="prezzo">
        {props.prodotto.prezzo}
      </div>
    </div>
  );
}

function Categoria(props) {
  return(
    <div className="categoria">{props.categoria}</div>
  );
}
class Main extends React.Component {
  constructor(props) {
    super(props);

  }  
  render() {
    const prod = this.props.prodotti;
    var prod2 = [];
    prod2.length = prod.length;
    prod2.fill(false);
    var aux = [];
    var par = this.props.ricerca;

    if(par !== '') { //qui entra solo se sto cercando una parola
      var prod3 = [];
      for(var i=0; i < prod.length; i++) {
        if(prod[i].nome.includes(par)){
          prod3.push(prod[i]);
        }
      }
      prod2.length = prod3.length;
      stampa(prod3);
    } else if(this.props.soloDisponibili){ //qui entra solo se la chackBox 'solo disponibili' è attiva
      var prod3 = [];
      for(var i=0; i < prod.length; i++) {
        if(prod[i].disponibile) {
          prod3.push(prod[i]);
        }
      }
      prod2.length = prod3.length;
      stampa(prod3);
    } else { //qui entra solo se non c'è alcun tipo di filtro, quindi stampo tutti i prodotti
      stampa(prod);
    }

    function stampa(arr){
      for(var i=0; i < arr.length; i++) {
        if(prod2[i] === false) {
          aux.push(<Categoria categoria = {arr[i].categoria} key={arr[i].categoria}/>)
          aux.push(<Riga prodotto={arr[i]} key={arr[i].nome}/>)
          prod2[i] = true;
          var y = i + 1;
          while(y < arr.length) {
            if(arr[i].categoria === arr[y].categoria && prod2[y] === false) {
              aux.push(<Riga prodotto={arr[y]} key={arr[y].nome}/>)
              prod2[y] = true;
            }
            y++;
          }
        } 
      }
    } 

    return (
      <div className="containerMain">
          <div className="nomeTitolo">Nome</div>
          <div className="prezzoTitolo">Prezzo</div>
          {aux}
      </div>
    );
  }
}

class BarraRicerca extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeRicercaValue = this.onChangeRicercaValue.bind(this);
    this.onChangeCheckValue = this.onChangeCheckValue.bind(this);
  }

  onChangeRicercaValue(event) {
    this.props.onChangeRicerca(event.target.value);
  }

  onChangeCheckValue(event) {
    this.props.onChangeDisponibili(event.target.checked);
  }
  
  render() {
    return(
      <form className="filtri">
        <div className="barraRicerca">
          <input type="text" value={this.props.ricerca} onChange={this.onChangeRicercaValue} />
        </div>
        <div className="check">
          <input type="checkbox" checked={this.props.soloDisponibili} onChange={this.onChangeCheckValue} />
          Mostra solo disponibili
        </div>
      </form>
    );
  }
}

class TabellaProdottiRicercabile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {ricerca: '', soloDisponibili: false};
    this.onChangeRicerca = this.onChangeRicerca.bind(this);
    this.onChangeDisponibili = this.onChangeDisponibili.bind(this);
  }

  onChangeRicerca(parola) {
    this.setState({ricerca: parola, soloDisponibili: false})
  }

  onChangeDisponibili(val) {
    this.setState({ricerca: '', soloDisponibili: val})
  }

  render() {
    const prod = this.props.prodotti;
    return (
      <div className="container">
        <BarraRicerca ricerca={this.state.ricerca} 
                      soloDisponibili={this.state.soloDisponibili} 
                      onChangeRicerca={this.onChangeRicerca}
                      onChangeDisponibili={this.onChangeDisponibili}
                      />
        <Main prodotti={prod} 
              ricerca={this.state.ricerca} 
              soloDisponibili={this.state.soloDisponibili}/>
      </div>
    );
  }
}

function App(props) {
  return <TabellaProdottiRicercabile prodotti={PRODOTTI}/>
}

const PRODOTTI = [
  {
    categoria: 'Tessile',
    prezzo: '$49.99',
    disponibile: false,
    nome: 'Ferri da cucito',
  },
  {
    categoria: 'Attrezzatura Sportiva',
    prezzo: '$49.99',
    disponibile: true,
    nome: 'Palla da calcio',
  },
  {
    categoria: 'Elettronica',
    prezzo: '$399.99',
    disponibile: false,
    nome: 'iPhone 5',
  },
  {
    categoria: 'Attrezzatura Sportiva',
    prezzo: '$9.99',
    disponibile: true,
    nome: 'Palla da tennis',
  },
  {
    categoria: 'Attrezzatura Sportiva',
    prezzo: '$29.99',
    disponibile: false,
    nome: 'Palla da canestro',
  },
  {
    categoria: 'Elettronica',
    prezzo: '$99.99',
    disponibile: true,
    nome: 'iPod Touch',
  },
  {
    categoria: 'Elettronica',
    prezzo: '$199.99',
    disponibile: true,
    nome: 'Nexus 7',
  },
  {
    categoria: 'Tessile',
    prezzo: '$19.99',
    disponibile: true,
    nome: 'Gomitolo di lana',
  },
];

export default App;
