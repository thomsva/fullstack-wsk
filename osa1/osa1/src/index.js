import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
      total: 0,
    }
  }

  klikButton = (name, value) => {
    if (name==='hyva') {
      return () => {
        this.setState({
          hyva: value,
          total: this.state.total + 1,
        })
      }
    }
    if (name==='neutraali') {
      return () => {
        this.setState({
          neutraali: value,
          total: this.state.total + 1,
        })
      }
    }
    if (name==='huono') {
      return () => {
        this.setState({
          huono: value,
          total: this.state.total + 1,
        })
      }
    }
  }


  render() {
    return (
      <div>
        <div>
          <h1>anna palautetta</h1>
          <Button text="hyvä" klik={this.klikButton('hyva',this.state.hyva+1)} />
          <Button text="neutraali" klik={this.klikButton('neutraali',this.state.neutraali+1)} />
          <Button text="huono" klik={this.klikButton('huono',this.state.huono+1)} />
          <Statistics stats={this.state} />
        </div>

      </div>
    )
  }
}


const Button = ({text, klik}) => <button onClick={klik}>{text}</button>

const Statistic = ({ name, value}) => <tr><td>{name}</td><td>{value}</td></tr>

const Statistics = ({stats}) => {
  if (stats.hyva === 0 && stats.huono === 0 && stats.neutraali === 0) {
    return (
      <div>
       <p>Ei vielä annettuja palautteita!</p>
      </div>
    )
  }
  return (
    <div>
      <h1>tilastot</h1>
      <table>
        <tbody>
          <Statistic name="hyvä" value={stats.hyva} />
          <Statistic name="neutraali" value={stats.neutraali} />
          <Statistic name="huono" value={stats.huono} />
          <Statistic name="keskiarvo" value={(stats.hyva-stats.huono)/stats.total} />
          <Statistic name="positiivisia" value={100*stats.hyva/stats.total +' %'} /> 
        </tbody>
      </table>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)