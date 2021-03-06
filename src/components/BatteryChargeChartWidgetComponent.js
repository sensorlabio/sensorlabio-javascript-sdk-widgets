import React, {Component} from "react";
import {Crosshair, HorizontalGridLines, LineSeries, VerticalGridLines, XAxis, XYPlot, YAxis} from 'react-vis';
import "react-vis/dist/style.css";

export default class BatteryChargeChartWidgetComponent extends Component {
    constructor(props) {
        super(props);

        this.api = this.props.api;

        this.state = {
            crosshairValues: [{x: 0, y: 0}],
            charge_data: [],
        }

        this.ws = this.props.ws;
        //this.timer = null;
        this.is_live = false;
        this.max_objects = 50;

        this._onMouseLeave = this._onMouseLeave.bind(this);
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
        this.setState((prevState) => {
            let charge_data = prevState.charge_data.slice();
            let new_charge_data = this.prepareData(measurements);
            charge_data = new_charge_data.concat(charge_data);
            if (charge_data.length > this.max_objects) {
                charge_data.splice(this.max_objects - charge_data.length, this.max_objects);
            }
            return {'charge_data': charge_data};
        });
    }

    updateWidget() {
        let params = {
            sensor: this.props.sensor_id,
            type: 'CHRG',
        }
        this.api.measurements.list(params).then((measurements_response) => {
            if (!this.is_live) return;
            this.setState({'charge_data': this.prepareData(measurements_response.measurements)}, () => {
                this.ws.joinSensor(this.props.sensor_id, 'CHRG');
                this.ws.onMeasurements(this.props.sensor_id, 'CHRG', this.getMeasurements);
            });
        });
    }

    stopWidget() {
        this.is_live = false;
    }

    prepareData(measurements) {
        let data = [];
        measurements.forEach((measurement, i) => {
            data.push({x: measurement.timestamp, y: measurement.value[0]});
        });
        return data;
    }

    _onNearestX(v) {
        this.setState({crosshairValues: [v]});
    }

    _getCrosshairTitle(d) {
        let _value = new Date(d[0].x).getHours() + ':' + new Date(d[0].x).getMinutes() + ':' + new Date(d[0].x).getSeconds();
        return {title: 'Time', value: _value}
    }

    _getCrosshairItems(d) {
        return [{title: 'Charge', value: d[0].y + '%'}]
    }

    _onMouseLeave() {
        this.setState({crosshairValues: []});
    }

    _getXRange() {
        if (!this.state.charge_data.length) {
            return [];
        }
        let _last_measurement = this.state.charge_data[0];
        let _x_range_max = _last_measurement.x;
        let _x_range_min = _x_range_max - 50 * 1000;
        return [_x_range_min, _x_range_max];
    }

    render() {
        return (
            <XYPlot
                width={600}
                height={300}
                yDomain={[0, 100]}
                yBaseValue={0}
                xType="time"
                xDomain={this._getXRange()}
                onMouseLeave={this._onMouseLeave}
            >

                <VerticalGridLines />
                <HorizontalGridLines />
                <LineSeries
                    data={this.state.charge_data}
                    onNearestX ={(value) => this._onNearestX(value) }
                />
                <XAxis />
                <YAxis />
                <Crosshair values={this.state.crosshairValues}
                           titleFormat={(d) => this._getCrosshairTitle(d)}
                           itemsFormat={(d) => this._getCrosshairItems(d)}
                />
            </XYPlot>

        )
    }
}