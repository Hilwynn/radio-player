import React from "react"
import "./style.css"

class Station extends React.Component {
  render() {
    const {
      color,
      image,
      name,
      url
    } = this.props
    const channelColor = {
      backgroundColor: {
        backgroundColor: `#${color}`
      }
    }

    return (
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
    )
  }
}

export default Station
