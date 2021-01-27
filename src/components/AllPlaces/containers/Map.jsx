import React, {Component} from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';




export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { address: '' ,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},

            mapCenter : {
                lat:	40.650002,
                lng: 	-73.949997
            }
        };
      }
    
    
    handleChange = address => {
        this.setState({ address });
      };
     
      handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
              console.log('Success', latLng)
              this.setState({ address })
              this.setState({mapCenter: latLng})})
          .catch(error => console.error('Error', error));
      };
      
    
    render() {
        
      return (
          <div id = "google-map">
          <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <div id = "map">
        <Map google={this.props.google}
            initialCenter ={{
                lat : this.state.mapCenter.lat,
                lng: this.state.mapCenter.lng
            }}
            center = {{
                lat : this.state.mapCenter.lat,
                lng: this.state.mapCenter.lng
            }}
        >
          <Marker
              position = {{
                lat : this.state.mapCenter.lat,
                lng: this.state.mapCenter.lng
              }}
          />
        </Map>
        </div>
        </div>
      )
    }
  }

  export default GoogleApiWrapper({
    apiKey: ('AIzaSyANh8chPbOFMS_0ecTl-VENfAvgD5N2sJM')
  })(MapContainer)