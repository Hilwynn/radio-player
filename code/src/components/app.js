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
    if (this.state.radioStations.length > 0) {
      return (
        <div>
          {this.state.radioStations.map(channel =>
            <Station
              key={channel.id}
              color={channel.color}
              image={channel.image}
              name={channel.name}
              url={channel.liveaudio.url} />)}
        </div>
      )
    } else {
      return <div className="empty-station" />
    }
  }
}

export default App
