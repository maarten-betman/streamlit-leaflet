import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, {ReactNode, useEffect } from "react"
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"

import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"


const mapStyle: React.CSSProperties = {
    height: '600px'
}


class StreamlitLeaflet extends StreamlitComponentBase {

    _onCreated = (e: any) => {
    let type = e.layerType;
    if (type === 'polyline') {
      // Do marker specific actions
      console.log('_onCreated: marker created', e);
    } else {
      console.log('_onCreated: something else created:', type, e);
    }
    // Do whatever else you need to. (save to db; etc)
        Streamlit.setComponentValue(e.layer.editing.latlngs)
        Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)

        Streamlit.setComponentReady()
        Streamlit.setFrameHeight(600)

        console.log(e.layer.editing.latlngs)

  };

    public render = (): ReactNode => {

        const L = require("leaflet");
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });

        const mapCenter = this.props.args["map_center"]
        const mapZoom = this.props.args["map_zoom"]

        return (
            <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                scrollWheelZoom={true}
                style={mapStyle}
            >
                  <FeatureGroup>
                    <EditControl
                      position='topleft'
                      onCreated={this._onCreated}
                      draw={{
                          rectangle: false,
                          circle: false,
                          polygon: false,
                          marker: false,
                          circlemarker: false
                      }}
                    />
                  </FeatureGroup>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
    )
  }
}

function onRender(event: Event): void {
    Streamlit.setFrameHeight(600)
}

export default withStreamlitConnection(StreamlitLeaflet);
