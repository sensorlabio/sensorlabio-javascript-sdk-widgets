import React, {Component} from "react";
import { Chart } from 'react-google-charts';

export default class BatteryVoltageWidgetComponent extends Component {
    constructor(props) {
        super(props);

        this.api = this.props.api;

        this.state = {
            voltage: 12,
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

    startWidget() {
        this.is_live = true;
        this.updateWidget();
    }

    getMeasurements(measurement) {
        this.setState({'voltage': measurement.value[0]});
    }

    updateWidget() {
        let params = {
            sensor: this.props.sensor_id,
            type: 'BAT',
        }
        this.api.measurements.last(params).then((measurement) => {
            if (!this.is_live) return;
            this.setState({'voltage': measurement.value[0]}, () => {
                this.ws.onMeasurementsType('BAT', this.getMeasurements);
            });
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

    getGaugeData() {
        return [
            ['Label', 'Value'],
            ['Voltage', this.state.voltage],
        ];
    }

    render() {
        return (
            <div>
                <Chart
                    chartType="Gauge"
                    data={this.getGaugeData()}
                    formatters={[{
                        type: 'NumberFormat',
                        column: 1,
                        options: { pattern: '0.0000' }
                    }]}
                    options={{
                        min: 7,
                        max: 17,
                        width: 400, height: 120,
                    }}
                    graph_id={"gauge" + Math.random()}
                    width="130px"
                    height="130px"
                    legend_toggle
                />
            </div>
        );
    }
}