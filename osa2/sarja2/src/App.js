import React from 'react';
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div>
      <b>{message}</b>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Testi', number: '123' }
      ],
      newName: '',
      newNumber: '',
      filter: '',
      message: ''
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
      this.setState({
        message: "Lisätty uusi henkilö!"
      })
      setTimeout(() =>{
        this.setState({message:null})
      },5000)

    }else{
      const id = persons.filter(person => person.name === newPerson.name)[0].id

      if (window.confirm("Löytyy jo " + newPerson.name + ".  Päivitetäänkö numero?")) { 

        personService
          .update(id, newPerson)
          .then(updPerson => {
            this.setState({
              persons: this.state.persons.filter(person => person.id !== id).concat(updPerson)
            })
          })
          this.setState({
            message: "Muutettu henkilön tietoja!"
          })
          setTimeout(() =>{
            this.setState({message:null})
          },5000)
          
      }
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
      if (window.confirm("Haluatko varmasti poistaa: " + deletedPerson.name +"?")) { 
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
          this.setState({
            message: "Poistettu henkilö!"
          })
          setTimeout(() =>{
            this.setState({message:null})
          },5000)
      }
    }
  }



  render() {
    return (
      <div>
        <Notification message={this.state.message}/>
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