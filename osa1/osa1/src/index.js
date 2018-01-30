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
      average: 0,
      positive: 0
    }
  }

  klikHyva = () => {
    this.setState({
      hyva: this.state.hyva + 1,
      total: this.state.total +1,
      positive: (this.state.hyva+1)/(this.state.total+1),
      average: (this.state.huono*-1 + this.state.hyva+1)/(this.state.total+1)
    })
  }

  klikNeutraali = () => {
    this.setState({
      neutraali: this.state.neutraali + 1,
      total: this.state.total +1,
      positive: (this.state.hyva)/(this.state.total+1),
      average: (this.state.huono*-1 + this.state.hyva)/(this.state.total+1)
    })
  }

  klikHuono = () => {
    this.setState({
      huono: this.state.huono + 1,
      total: this.state.total +1,
      positive: (this.state.hyva)/(this.state.total+1),
      average: ((this.state.huono+1)*-1 + this.state.hyva)/(this.state.total+1)
    })
  }

  render() {
    return (
      <div>
        <div>
          <h1>anna palautetta</h1>
          <Button text="hyvä" klik={this.klikHyva} />
          <Button text="neutraali" klik={this.klikNeutraali} />
          <Button text="huono" klik={this.klikHuono} />
          <Statistics stats={this.state} />
        </div>

      </div>
    )
  }
}

const Button = ({text, klik}) => <button onClick={klik}>{text}</button>

const Statistic = ({ name, value}) => <div>{name}: {value}</div>

const Statistics = ({stats}) => {
  return (
    <div>
      <h1>tilastot</h1>
      <Statistic name="hyvä" value={stats.hyva} />
      <Statistic name="neutraali" value={stats.neutraali} />
      <Statistic name="huono" value={stats.huono} />
      <Statistic name="keskiarvo" value={stats.average} />
      <Statistic name="positiivisia" value={100*stats.positive+' %'} /> 
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)