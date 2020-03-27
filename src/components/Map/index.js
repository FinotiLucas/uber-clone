import React, { Component, Fragment } from 'react';
import MapView,  { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { View } from 'react-native';

import Search from "../Search";
import Directions from '../Directions';

import { getPixelSize } from "../../utils";

import markerImage from '../../assets/marker3.png';

import { LocationBox, LocationText, LocationTimeBox, LocationTimeText, LocationTimeTextSmall} from './styles';

Geocoder.init("AIzaSyAuwtvnd16nm4IoHjL9310TJ1I4mnR4gnM");


export default class Map extends Component {
  
  //Criando Estados
  state = {
    region: null,
    destination: null,
    duration: null,
    location: null,
  }; // Estado Vazio
  
  async componentDidMount (){
    navigator.geolocation.getCurrentPosition(
      async ( { coords: { latitude, longitude } } ) => {
        const response = await Geocoder.from({latitude, longitude});
        const address = response.results[0].formatted_address;
        const location = address.substring(0, address.indexOf(','));

        this.setState ({
          location,
          region: {
            latitude, 
            longitude, 
            latitudeDelta: 0.0143, 
            longitudeDelta: 0.0134
          }  
        }); 
    }, // Função de Sucesso quanto a receber as coordenadas do gps

      () => {}, //Erro
      {
        timeout: 2000, // Tempo que o app vai procurar a localização via GPS
        enableHighAccuracy: true, // Usando High Acuracy GPS ;)
        maximumAge: 1000 //Intervalo
      }
    );
  }

  
  // Função para pegar as coordenadas e o nome do lugar da localização escolhida
  handleLocationSelected = (data, { geometry }) => {
    const {location: { lat: latitude, lng: longitude } } = geometry;
    
    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text,
      },
    })
  }
  

  render() {

    const { region, destination, duration, location } = this.state;

    return  ( 
      <View style={{flex: 1}}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style = {{ flex: 1 }} // Para ficar em tela cheia o tepo inteiro
          region = {region}
          showsUserLocation
          loadingEnabled
          ref = {el => (this.mapView = el)}
        > 
          {destination && (
            <Fragment>
              <Directions
                origin = {region}
                destination = {destination}
                onReady={result => { // Função que da um zom nas rotas escolhidas
                  
                  this.setState({ duration: Math.floor(result.duration)});

                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                    right: getPixelSize(50),
                    left: getPixelSize(50),
                    top: getPixelSize(50),
                    bottom: getPixelSize(350)
                    }
                  });
                }}
              />
              
              <Marker //
              
              coordinate = {destination}
              anchor = {{x: 0, y: 0}}
              image ={markerImage}
              
              >
              <LocationBox>

              <LocationTimeBox>
                <LocationTimeText>{duration}</LocationTimeText>
                  <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                
              </LocationTimeBox>

              <LocationText>{destination.title}</LocationText>
              </LocationBox>

              </Marker>

              
              <Marker 

              coordinate = {region}
              anchor = {{x: 0, y: 0}}
             
              >
                <LocationBox>
                  <LocationText>{location}</LocationText>
                </LocationBox>

              </Marker>  
            
            </Fragment>
          )}
                   
        </MapView>
  
        <Search onLocationSelected = { this.handleLocationSelected } />
      </ View>
    );   
  }
}

