import React from 'react';
import ReactDOM from 'react-dom';
import ThermometerWidgetComponent from '../../components/ThermometerWidgetComponent';

/**
 * Thermometer widget.
 */
export default class ThermometerWidget {
    /**
     * @constructor ThermometerWidget
     * @param api SensorlabApi
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Render widget.
     *
     * @member ThermometerWidget#render
     * @param container_id string ID of DOM object to render to
     * @param sensor_id string Sensor ID
     */
    render(container_id, sensor_id) {
        ReactDOM.render(<ThermometerWidgetComponent api={this.api} sensor_id={sensor_id} />, document.getElementById(container_id));
    }
}