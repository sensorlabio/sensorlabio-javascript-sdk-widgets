import React, {Component} from 'react';
import Thermometer from 'react-thermometer-component';

import "react-thermometer-component/build/css/index.css";

export default class ThermometerWidgetComponent extends Component {
    constructor(props) {
        super(props);

        this.api = this.props.api;

        this.state = {
            temperature: 0,
        }

        this.ws = this.props.ws;
        //this.timer = null;
        this.is_live = false;

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

    getMeasurements(measurements) {
        this.setState({'temperature': measurements[0].value[0]});
    }

    updateWidget() {
        let params = {
            sensor: this.props.sensor_id,
            type: 'TMP',
        }
        if (this.props.is_public) {
            this.promise = this.api.public.last(this.props.public_api_key, params).then((measurement) => {
                if (!this.is_live) return;
                this.setState({'temperature': measurement.value}, () => {
                    this.ws.onMeasurementsType('TMP', this.getMeasurements);
                });
            });
        } else {
            this.promise = this.api.measurements.last(params).then((measurement) => {
                if (!this.is_live) return;
                this.setState({'temperature': measurement.value}, () => {
                    this.ws.joinSensor(this.props.sensor_id, 'TMP');
                    this.ws.onMeasurements(this.getMeasurements, 'TMP');
                });
            });
        }
    }

    stopWidget() {
        this.is_live = false;
    }

    render() {
        return (
            <Thermometer
                theme="light"
                value={this.state.temperature}
                max="200"
                min="-200"
                steps="8"
                format="°C"
                size="large"
                height="300"
            />
        )
    }
}