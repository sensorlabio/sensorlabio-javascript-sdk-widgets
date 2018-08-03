import React from 'react';
import ReactDOM from 'react-dom';
import BatteryChargeWidgetComponent from '../../components/BatteryChargeWidgetComponent';

/**
 * Battery charge widget
 */
export default class BatteryChargeWidget {
    /**
     * @constructor BatteryChargeWidget
     * @param api SensorlabApi
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Render widget.
     *
     * @member BatteryChargeWidget#render
     * @param container_id string ID of DOM object to render to
     * @param sensor_id string Sensor ID
     */
    render(container_id, sensor_id) {
        ReactDOM.render(<BatteryChargeWidgetComponent api={this.api} sensor_id={sensor_id} />, document.getElementById(container_id));
    }
}