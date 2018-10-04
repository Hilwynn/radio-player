import React from "react"
import TransitionGroup from "react-transition-group/TransitionGroup"
import Transition from "react-transition-group/Transition"
import Station from "./Station"
import StationSkeleton from "./StationSkeleton"

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
      <TransitionGroup>
        {!this.state.radioStations.length > 0 ? (
          <Transition key="loading" timeout={250}>
            {state => <StationSkeleton data-state={state} />}
          </Transition>
        ) : (
          <Transition key="data" timeout={250}>
            {state => (
              <div>
                {this.state.radioStations.map(channel =>
                  <Station
                    key={channel.id}
                    color={channel.color}
                    image={channel.image}
                    name={channel.name}
                    url={channel.liveaudio.url} />)}
              </div>
            )}
          </Transition>
        )}
      </TransitionGroup>
    )
  }
}

export default App
