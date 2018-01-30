import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0,0,0,0,0,0]
    }
  }

  klikVote = () => {
    const votes=this.state.votes
    votes[this.state.selected] += 1
    this.setState({
      votes: votes
    })
  }

  klikNext = () => {
    this.setState({
      selected: Math.floor(Math.random() * 6)
    })
  }

  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <p>
          Votes: {this.state.votes[this.state.selected]}
        </p>
        <p>
          <button onClick={this.klikVote}>vote</button>
          <button onClick={this.klikNext}>next please</button>
        </p>
        <MostVotes votes={this.state.votes} />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const MostVotes = ({votes}) => {
  var max = votes[0];
  var maxIndex = 0;

  for (var i = 1; i < votes.length; i++) {
      if (votes[i] > max) {
          maxIndex = i;
          max = votes[i];
      }
  }

  console.log("votes:" + votes + " maxindex:" + maxIndex )

  if (max >0 ){
  return (
      <div>
        <h1>Anecdote with the most votes</h1>
        <p>{anecdotes[maxIndex]}</p>
        <p>Has {votes[maxIndex]} votes</p>
      </div>
    )
  }
  return (
    <div>No votes given yet</div>
  )

}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)