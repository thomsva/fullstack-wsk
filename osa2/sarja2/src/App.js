import React from 'react';
import axios from 'axios'
import personService from './services/persons'

const NumberTableRow = ({person}) => (
  <tr><td> {person.name}</td><td> {person.number} </td></tr>
)

const NumberTable = ({persons}) => (
  <table>
    <tbody>
      {persons.map(person => <NumberTableRow key={person.name} person={person} />)}
    </tbody>
  </table>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Testi', number: '123' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    const newPerson={
      name: this.state.newName,
      number: this.state.newNumber
    }
    const persons=this.state.persons
    
    if (persons.filter(person => person.name === newPerson.name).length ===0){
      personService.create(newPerson)
        .then(response => {
          console.log(response)
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newNumber: ''
          })
        })
    }else{
      alert('Virhe! Nimi on jo olemassa!')
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    const filter =event.target.value
    this.setState({ filter: filter })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange} />
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
    
        <h2>Kaikki Numerot</h2>
        <div>
          rajaa tuloksia: <input value={this.state.filter} onChange={this.handleFilterChange} />
        </div>
        <NumberTable persons={this.state.persons.filter(person => person.name.includes(this.state.filter))} />       
      </div>
    )
  }
}

export default App