import React, {Component} from "react";
import { withGoogleMap, GoogleMap, Marker, InfoWindow, Polyline } from "react-google-maps"

const GoogleMapExample = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={15}
        center={props.center}
    >
        <Marker position={props.center}>
            <InfoWindow>
                <span>Lat: {props.center.lat}, Lng: {props.center.lng}</span>
            </InfoWindow>
        </Marker>
        <Polyline
            path={props.location_history}
            options={{
                strokeColor: '#ff2343',
                strokeOpacity: '1.0',
                strokeWeight: 2,
            }}
        />

    </GoogleMap>
));

export default class MapWidgetComponent extends Component {
    constructor(props) {
        super(props);

        this.api = this.props.api;

        this.state = {
            location: [0, 0],
            location_history: [],
            is_live: false,
        };

        this.ws = this.props.ws;
        //this.timer = null;
        this.is_live = false;
        this.max_objects = 20;
        this.getMeasurements = this.getMeasurements.bind(this);
    }

    componentWillMount() {
        this.startWidget();
    }

    componentWillUnmount() {
        this.stopWidget();
    }

    startWidget() {
        this.is_live = true;
        this.updateWidget();
    }

    getMeasurements(measurement) {
        this.setState((prevState) => {
            let _new_location_history = prevState.location_history.slice();
            _new_location_history.push({lat: measurement.value[0], lng: measurement.value[1]});
            if (_new_location_history.length > this.max_objects) {
                _new_location_history.shift();
            }
            let newState = {location: measurement.value, location_history: _new_location_history};
            return newState;
        });
    }

    updateWidget() {
        let params = {
            sensor: this.props.sensor_id,
            type: 'LOC',
        };
        this.api.measurements.last(params).then((measurement) => {
            this.getMeasurements(measurement);
            this.ws.setSensor(this.props.sensor_id, 'LOC');
            this.ws.onMeasurements(this.getMeasurements);
        });
    }

    stopWidget() {
        this.is_live = false;
    }

    getCenter() {
        return {
            lat: this.state.location[0],
            lng: this.state.location[1],
        }
    }

    render() {
        return (
            <div>
                <GoogleMapExample
                    center={this.getCenter()}
                    location_history={this.state.location_history}
                    containerElement={ <div style={{ width: '800px', height: '600px' }} /> }
                    mapElement={ <div style={{ height: '100%' }} /> }
                />
            </div>
        );
    }
}