import React from "react";
import MapViewDirections from "react-native-maps-directions";

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey="AIzaSyAuwtvnd16nm4IoHjL9310TJ1I4mnR4gnM"
    strokeWidth={5}
    strokeColor="hotpink"
  />
);

export default Directions;