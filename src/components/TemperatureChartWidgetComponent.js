import React, {Component} from "react";
import {GradientDefs, HorizontalGridLines, VerticalBarSeries, VerticalGridLines, XAxis, XYPlot, YAxis, Crosshair} from 'react-vis';
import "react-vis/dist/style.css";

export default class TemperatureChartWidgetComponent extends Component {
    constructor(props) {
        super(props);

        this.api = this.props.api;

        this.state = {
            crosshairValues: [{x: 0, y: 0}],
            temperatureHintValue: null,
            temperature_data: [],
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
            let temperature_data = prevState.temperature_data.slice();
            let new_temperature_data = this.prepareData(measurements);
            temperature_data = new_temperature_data.concat(temperature_data);
            if (temperature_data.length > this.max_objects) {
                temperature_data.splice(this.max_objects - temperature_data.length, this.max_objects);
            }
            return {'temperature_data': temperature_data};
        });
    }

    updateWidget() {
        let params = {
            sensor: this.props.sensor_id,
            type: 'TMP',
        }
        if (this.props.is_public) {
            this.api.public.list(this.props.public_api_key, params).then((measurements_response) => {
                if (!this.is_live) return;
                this.setState({'temperature_data': this.prepareData(measurements_response.measurements)}, () => {
                    //this.ws.onMeasurements('TMP', this.getMeasurements);
                })
            });
        } else {
            this.api.measurements.list(params).then((measurements_response) => {
                if (!this.is_live) return;
                this.setState({'temperature_data': this.prepareData(measurements_response.measurements)}, () => {
                    this.ws.joinSensor(this.props.sensor_id, 'TMP');
                    this.ws.onMeasurements(this.props.sensor_id, 'TMP', this.getMeasurements);
                });
            });
        }
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
        return {title: 'Time', value: _value};
    }

    _getCrosshairItems(d) {
        return [{title: 'Temperature', value: d[0].y + '°C'}]
    }

    _onMouseLeave() {
        this.setState({crosshairValues: []});
    }

    _getXRange() {
        if (!this.state.temperature_data.length) {
            return [];
        }
        let _last_measurement = this.state.temperature_data[0];
        let _x_range_max = _last_measurement.x;
        let _x_range_min = _x_range_max - 50 * 1000;
        return [_x_range_min, _x_range_max];
    }

    render() {
        return (
            <XYPlot
                width={600}
                height={300}
                yDomain={[-200, 200]}
                yBaseValue={0}
                xType="time"
                xDomain={this._getXRange()}
                onMouseLeave={this._onMouseLeave}
            >
                <GradientDefs>
                    <linearGradient
                        id="TemperatureChartGradient"
                        gradientUnits="userSpaceOnUse"
                        x1="0" y1="0" x2="0" y2="200">
                        <stop offset="0%" stopColor="#f44336" />
                        <stop offset="50%" stopColor="#8BC34A" />
                        <stop offset="100%" stopColor="#2196F3" />
                    </linearGradient>
                </GradientDefs>

                <VerticalGridLines />
                <HorizontalGridLines />
                <VerticalBarSeries
                    data={this.state.temperature_data}
                    color={'url(#TemperatureChartGradient)'}
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