import React from 'react';
import personService from './services/persons'

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
      .then(persons => {
        this.setState({persons})
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
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
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

  removePerson = (deletedPerson) => {
    return () => {
      console.log('delete-nappia painettu', deletedPerson)
      personService
        .remove(deletedPerson.id)
        .then(response => {
          console.log(response)
          this.setState({
            persons: this.state.persons.filter(person => person.id !== deletedPerson.id)
          })
        })
      personService
        .getAll()
        .then(persons => {
          this.setState({persons})
        })
    }
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
        <table>
          <tbody>
            {this.state.persons.map(person => 
              <tr key={person.name}>
                <td> {person.name}</td>
                <td> {person.number} </td>
                <td><button onClick={this.removePerson(person)}>delete</button></td>
              </tr>
            )}
          </tbody>
        </table>      
      </div>
    )
  }
}

export default App