import React, {Component} from "react";
import {Line} from 'rc-progress';
import 'rc-progress/dist/rc-progress.css';

export default class BatteryChargeWidgetComponent extends Component {
    constructor(props) {
        super(props);

        this.api = this.props.api;

        this.state = {
            charge: 100,
        };

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

    getChargeColor() {
        if (this.state.charge <= 15) {
            return '#dc3545';
        }
        if (this.state.charge <= 30) {
            return '#ffc107';
        }
        return '#28a745';
    }

    startWidget() {
        this.is_live = true;
        this.updateWidget();
    }

    getMeasurements(measurements) {
        let measurement = measurements[0];
        this.setState({'charge': measurement.value[0]});
    }

    updateWidget() {
        let params = {
            sensor: this.props.sensor_id,
            type: 'CHRG',
        }
        this.api.measurements.last(params).then((measurement) => {
            if (!this.is_live) return;
            this.setState({'charge': measurement.value}, () => {
                this.ws.joinSensor(this.props.sensor_id, 'CHRG');
                this.ws.onMeasurements(this.props.sensor_id, 'CHRG', this.getMeasurements);
            });
        });
    }

    stopWidget() {
        this.is_live = false;
    }

    render() {
        return (
            <div style={{width: '300px'}}>
                <div className="text-center">{this.state.charge}%</div>
                <Line percent={Math.round(this.state.charge)} strokeWidth="4" strokeColor={this.getChargeColor()} />
            </div>

        );
    }
}