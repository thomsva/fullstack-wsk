import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '123456'},
        { name: 'Timo Testaaja', number: '987654'}
      ],
      newName: '',
      newNumber: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    console.log('nappia painettu!')
    console.log(event.target)
    const newPerson={
      name: this.state.newName,
      number: this.state.newNumber
    }
    const persons=this.state.persons
    
    if (persons.filter(person => person.name === newPerson.name).length ===0){
      const persons=this.state.persons.concat(newPerson)
      this.setState({
        persons: persons,
        newName: '',
        newNumber: ''
      })
    }else{
      alert('Virhe! Nimi on jo olemassa!')
    }

  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
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
        <h2>Numerot</h2>
        <table>
        
          {this.state.persons.map(person => <tr key={person.name}><td> {person.name}</td><td> {person.number} </td></tr>)}
        </table>
        <div>
          debug: {this.state.newName}
        </div>
      </div>
    )
  }
}

export default App