import React from "react"
import Station from "./Station"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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

  render() {
    return (
      <div>
        {this.state.radioStations.map(channel =>
          <Station
            key={channel.id}
            color={channel.color}
            image={channel.image}
            name={channel.name}
            stations={this.state.radioStations}
            url={channel.liveaudio.url} />)}
      </div>
    )
  }
}

export default App
