import React, {Component} from "react";
import {Crosshair, HorizontalGridLines, LineSeries, VerticalGridLines, XAxis, XYPlot, YAxis} from 'react-vis';
import "react-vis/dist/style.css";

export default class BatteryVoltageChartWidgetComponent extends Component {
    constructor(props) {
        super(props);

        this.api = this.props.api;

        this.state = {
            crosshairValues: [{x: 0, y: 0}],
            voltage_data: [],
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

    getMeasurements(measurement) {
        this.setState((prevState) => {
            let voltage_data = prevState.voltage_data.slice();
            let new_voltage_data = this.prepareData([measurement]);
            voltage_data = new_voltage_data.concat(voltage_data);
            if (voltage_data.length > this.max_objects) {
                voltage_data.splice(this.max_objects - voltage_data.length, this.max_objects);
            }
            return {'voltage_data': voltage_data};
        });
    }

    updateWidget() {
        let params = {
            sensor: this.props.sensor_id,
            type: 'BAT',
        }
        this.api.measurements.list(params).then((measurements_response) => {
            if (!this.is_live) return;
            this.setState({'voltage_data': this.prepareData(measurements_response.measurements)}, () => {
                this.ws.onMeasurementsType('BAT', this.getMeasurements);
            })
            /*
            this.timer = setTimeout(() => {
                this.updateWidget()
            }, 1000);
            */
        });
    }

    stopWidget() {
        this.is_live = false;
        /*
        if (this.timer) {
            clearTimeout(this.timer);
        }
        */
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
        return [{title: 'Charge', value: d[0].y + 'V'}]
    }

    _onMouseLeave() {
        this.setState({crosshairValues: []});
    }

    _getXRange() {
        if (!this.state.voltage_data.length) {
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
                yDomain={[8, 17]}
                yBaseValue={8}
                xType="time"
                xDomain={this._getXRange()}
                onMouseLeave={this._onMouseLeave}
            >

                <VerticalGridLines />
                <HorizontalGridLines />
                <LineSeries
                    data={this.state.voltage_data}
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