import React from 'react';
import LocationView from "react-native-location-view";
import {View} from "react-native";

//Essa parte faz com que possa selecionar a localidade de origem sem precisar digitar o endereço (ainda precisa ser iplementada no MAPA !!!)
export default class SelectLocationScreen extends React.Component {
  state = {

  };

  render() {
    return(
      <View style={{flex: 1}}>
        <LocationView
          apiKey={"AIzaSyAuwtvnd16nm4IoHjL9310TJ1I4mnR4gnM"}
          initialLocation={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
        />
      </View>
    );
  }
}