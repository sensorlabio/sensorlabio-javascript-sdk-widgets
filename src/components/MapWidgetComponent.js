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

        this.timer = null;
        this.is_live = false;
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

    updateWidget() {
        let params = {
            sensor_id: this.props.sensor_id,
            type: 'LOC',
        }
        this.api.measurements.last(params).then((measurement) => {
            if (!this.is_live) return;
            this.setState((prevState) => {
                let _new_location_history = prevState.location_history.slice();
                _new_location_history.push({lat: measurement.value[0], lng: measurement.value[1]});
                if (_new_location_history.length > 20) {
                    _new_location_history.shift();
                }
                let newState = {location: measurement.value, location_history: _new_location_history};
                return newState;
            });
            this.timer = setTimeout(() => {
                this.updateWidget()
            }, 1000);
        });
    }

    stopWidget() {
        this.is_live = false;
        if (this.timer) {
            clearTimeout(this.timer);
        }
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