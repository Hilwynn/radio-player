import React from "react"
import Station from "./Station"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredRadioStations: [],
      searchInput: "",
      radioStations: []
    }
  }

  componentDidMount() {
    fetch("http://api.sr.se/api/v2/channels?format=json&size=100").then((response) => {
      return response.json()
    }).then((json) => {
      this.setState({
        radioStations: json.channels
      })
    })
  }

  getValueInput = (e) => {
    const inputValue = e.target.value.toLowerCase()
    this.setState({ searchInput: inputValue })
    this.filterStations(inputValue)
  }

  filterStations = (inputValue) => {
    const { radioStations } = this.state
    if (inputValue === "") {
      this.setState({
        filteredRadioStations: []
      })
    } else {
      this.setState({
        filteredRadioStations: radioStations.filter(station =>
          station.name.toLowerCase().includes(inputValue))
      })
    }
  }

  render() {
    return (
      <main>
          <input
            type="text"
            name="search"
            value={this.state.searchInput}
            onChange={this.getValueInput} />
        {this.state.filteredRadioStations.map(channel =>
          <Station
            key={channel.id}
            color={channel.color}
            image={channel.image}
            name={channel.name}
            stations={this.state.filteredRadioStations}
            url={channel.liveaudio.url} />)}
      </main>
    )
  }
}

export default App
