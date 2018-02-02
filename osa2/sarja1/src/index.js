import React from 'react'
import ReactDOM from 'react-dom'

const Osa = (props) => <span>{props.osa} {props.tehtavia}</span>
const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>
const Sisalto = (props) => {
    //const [osa1, osa2, osa3] = props.kurssi.osat
    console.log(props)
    console.log(props.kurssi.osat)

    return (
        <div>
          {props.kurssi.osat.map(osa => <li key={osa.nimi}><Osa osa={osa.nimi} tehtavia={osa.tehtavia} /></li>)}
        </div>
      )

}
const Yhteensa = (props) => {
  return (
    <div>Tehtäviä yhteensä:
        {props.kurssi.osat.reduce(function(sum, osa){
            return sum+osa.tehtavia
        },0)}

    </div>
  )
}

const Kurssi = ({kurssi}) =>{
    return(
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto kurssi={kurssi} />
            <Yhteensa kurssi={kurssi} />
        </div>
    )
    
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }
  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)