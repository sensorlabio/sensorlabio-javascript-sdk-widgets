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
        this.ws.onMeasurementsType('TMP', this.getMeasurements);
        this.updateWidget();
    }

    getMeasurements(measurement) {
        this.setState({'temperature': measurement.value[0]});
    }

    updateWidget() {
        let params = {
            sensor: this.props.sensor_id,
            type: 'TMP',
        }
        if (this.props.is_public) {
            this.promise = this.api.public.last(this.props.public_api_key, params).then((measurement) => {
                if (!this.is_live) return;
                this.setState({'temperature': measurement.value});
                /*
                this.timer = setTimeout(() => {
                    this.updateWidget();
                }, 1000);
                */
            });
        } else {
            this.promise = this.api.measurements.last(params).then((measurement) => {
                if (!this.is_live) return;
                this.setState({'temperature': measurement.value});
                /*
                this.timer = setTimeout(() => {
                    this.updateWidget();
                }, 1000);
                */
            });
        }
    }

    stopWidget() {
        this.is_live = false;
        /*
        if (this.timer) {
            clearTimeout(this.timer);
        }
        */
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