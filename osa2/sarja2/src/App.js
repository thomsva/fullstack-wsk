import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' },
        { name: 'Timo Testaaja' }
      ],
      newName: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    console.log('nappia painettu!')
    console.log(event.target)
    const newPerson={
      name: this.state.newName
    }
    const persons=this.state.persons
    console.log(persons.filter(person => person.name === newPerson.name).length)
    if (persons.filter(person => person.name === newPerson.name).length ===0){
      const persons=this.state.persons.concat(newPerson)
      this.setState({
        persons: persons,
        newName: ''
      })
    }else{
      alert('Virhe! Nimi on jo olemassa!')
    }

  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
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
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {this.state.persons.map(person => <li key={person.name}> {person.name} </li>)}
        </ul>
        <div>
          debug: {this.state.newName}
        </div>
      </div>
    )
  }
}

export default App