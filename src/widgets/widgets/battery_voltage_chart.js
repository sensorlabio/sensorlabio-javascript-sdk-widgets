import React from 'react';
import ReactDOM from 'react-dom';
import BatteryVoltageChartWidgetComponent from '../../components/BatteryVoltageChartWidgetComponent';

/**
 * Battery Voltage Chart Widget
 */
export default class BatteryVoltageChartWidget {
    /**
     * @constructor BatteryVoltageChartWidget
     * @param api SensorlabApi
     * @param ws SensorlabWebsocket
     */
    constructor(api, ws) {
        this.api = api;
        this.ws = ws;
    }

    /**
     * Render widget.
     *
     * @member BatteryVoltageChartWidget#render
     * @param container_id string ID of DOM object to render to
     * @param sensor_id string Sensor ID
     */
    render(container_id, sensor_id) {
        ReactDOM.render(<BatteryVoltageChartWidgetComponent api={this.api} ws={this.ws} sensor_id={sensor_id} />, document.getElementById(container_id));
    }
}