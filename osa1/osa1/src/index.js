import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
      <h1>{props.kurssi}</h1>
  )
}

const Sisalto = (props) => {
  return (
      <div>
        <p>
          <Osa osanimi={props.osat[0].nimi} />
          <Yhteensa tehtavia={props.osat[0].tehtavia}  />
        </p>
        <p>
          <Osa osanimi={props.osat[1].nimi} />
          <Yhteensa tehtavia={props.osat[1].tehtavia}  />
        </p>
        <p>
          <Osa osanimi={props.osat[2].nimi} />
          <Yhteensa tehtavia={props.osat[2].tehtavia}  />
        </p>
      </div>
  )
}

const Yhteensa = (props) => {
  return (
      <span>{props.tehtavia}</span>
  )
}

const Osa = (props) => {
  return (
      <span>{props.osanimi} {props.tehtavia}</span>
  )
}

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osat = [
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

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <div>
        <Sisalto osat={osat} />
        
      </div>
    </div>
  )

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)