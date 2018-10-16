import React from "react"
import Station from "./Station"
import "../index.css"

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
    const apiUrl = "https://api.sr.se/api/v2/channels?format=json&size=100"
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
      <main className="wrapper">
        <header className="header">
          <h1>Radiohubben</h1>
          <img src={`${process.env.PUBLIC_URL}/code/public/sverigesradio.png`} alt="Sveriges Radios logotyp" />
          <input
            name="search"
            onChange={this.getValueInput}
            placeholder="Sök kanal..."
            value={searchInput}
            type="text" />
        </header>
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
