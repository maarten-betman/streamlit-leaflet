import {
  Streamlit,
  ComponentProps,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { useEffect } from "react"
import L from "leaflet"
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet"
import { EditControl } from "react-leaflet-draw"

import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"

import * as marker_icon_2x from "leaflet/dist/images/marker-icon-2x.png"
import * as marker_icon from "leaflet/dist/images/marker-icon.png"
import * as shadow_icon from "leaflet/dist/images/marker-shadow.png"

export interface PythonArgs {
  map_center: number[]
  map_zoom: number
}

const mapStyle: React.CSSProperties = {
  height: "600px",
}

const StreamlitLeaflet = ({ args }: ComponentProps) => {
  const { map_center, map_zoom }: PythonArgs = args

  const _onCreated = (e: any) => {
    let type = e.layerType
    if (type === "polyline") {
      // Do marker specific actions
      console.log("_onCreated: marker created", e)
    } else {
      console.log("_onCreated: something else created:", type, e)
    }
    // Do whatever else you need to. (save to db; etc)
    Streamlit.setComponentValue(e.layer.editing.latlngs)
    console.log(e.layer.editing.latlngs)
  }

  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: marker_icon_2x,
      iconUrl: marker_icon,
      shadowUrl: shadow_icon,
    })
  })

  useEffect(() => Streamlit.setFrameHeight(600))

  return (
    <MapContainer
      center={[map_center[0], map_center[1]]}
      zoom={map_zoom}
      scrollWheelZoom={true}
      style={mapStyle}
    >
      <FeatureGroup>
        <EditControl
          position="topleft"
          onCreated={_onCreated}
          draw={{
            rectangle: false,
            circle: false,
            polygon: false,
            marker: false,
            circlemarker: false,
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

export default withStreamlitConnection(StreamlitLeaflet)
