import React from "react"
import "./style.css"

class Station extends React.Component {
  render() {
    const {
      color,
      image,
      name,
      stations,
      url
    } = this.props
    const availableStations = stations.length
    const channelColor = {
      backgroundColor: `#${color}`
    }

    return (
      <div className="station-wrapper">
        {availableStations > 0 ? (
          <div className="station-container" style={channelColor}>
            <div className="station-image">
              <img src={image} alt={name} />
            </div>
            <div className="station-body">
              <div className="station-name">
                <h2>{name}</h2>
              </div>
              <div>
                <audio controls>
                  <source src={url} type="audio/mpeg" />
                  Your browser does not support the audio tag.
                </audio>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-station" />
        )}
      </div>
    )
  }
}

export default Station
