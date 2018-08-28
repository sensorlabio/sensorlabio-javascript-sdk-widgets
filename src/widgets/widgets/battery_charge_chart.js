import React from 'react';
import ReactDOM from 'react-dom';
import BatteryChargeChartWidgetComponent from '../../components/BatteryChargeChartWidgetComponent';

/**
 * Battery Charge Chart Widget
 */
export default class BatteryChargeChartWidget {
    /**
     * @constructor BatteryChargeChartWidget
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
     * @member BatteryChargeChartWidget#render
     * @param container_id string ID of DOM object to render to
     * @param sensor_id string Sensor ID
     */
    render(container_id, sensor_id) {
        ReactDOM.render(<BatteryChargeChartWidgetComponent api={this.api} ws={this.ws} sensor_id={sensor_id} />, document.getElementById(container_id));
    }
}