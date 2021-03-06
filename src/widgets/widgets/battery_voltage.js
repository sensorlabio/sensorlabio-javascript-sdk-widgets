import React from 'react';
import ReactDOM from 'react-dom';
import BatteryVoltageWidgetComponent from '../../components/BatteryVoltageWidgetComponent';

/**
 * Battery Voltage Widget
 */
export default class BatteryVoltageWidget {
    /**
     * @constructor BatteryVoltageWidget
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
     * @member BatteryVoltageWidget#render
     * @param container_id string ID of DOM object to render to
     * @param sensor_id string Sensor ID
     */
    render(container_id, sensor_id) {
        ReactDOM.render(<BatteryVoltageWidgetComponent api={this.api} ws={this.ws} sensor_id={sensor_id} />, document.getElementById(container_id));
    }
}