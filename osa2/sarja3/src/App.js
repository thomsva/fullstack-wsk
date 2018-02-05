import React from 'react';
import countriesService from './services/countries'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }


  componentWillMount() {
    countriesService
      .getAll()
      .then(countries => {
        this.setState({countries})
      })
  }

  handleFilterChange = (event) => {
    const filter =event.target.value
    this.setState({ filter: filter })
  }


  render() {
    return (
      <div>
    
        <h2>Countries</h2>
        <div>
          rajaa tuloksia: <input value={this.state.filter} onChange={this.handleFilterChange} />
        </div>
        <table>
          <tbody>
            {this.state.countries.filter(country => country.name.includes(this.state.filter)).map(country => 
              <tr key={country.name}>
                <td> {country.name}</td>
              </tr>
            )}
          </tbody>
        </table>      
      </div>

    )
  }
}

export default App