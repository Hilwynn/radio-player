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
    const apiUrl = "http://api.sr.se/api/v2/channels?format=json&size=100"
    fetch(apiUrl).then((response) => {
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
    const {
      searchInput,
      filteredRadioStations
    } = this.state

    return (
      <main>
        <input
          type="text"
          name="search"
          value={searchInput}
          onChange={this.getValueInput} />
        {filteredRadioStations.map(channel =>
          <Station
            key={channel.id}
            color={channel.color}
            image={channel.image}
            name={channel.name}
            stations={filteredRadioStations}
            url={channel.liveaudio.url} />)}
      </main>
    )
  }
}

export default App
