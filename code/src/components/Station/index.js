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
      backgroundColor: {
        backgroundColor: `#${color}`
      }
    }

    return (
      <div>
        {availableStations > 0 ? (
          <div className="station-container" style={channelColor.backgroundColor}>
            <div className="station-image">
              <img src={image} alt={name} />
            </div>
            <div className="station-body">
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
