import React from 'react';
import ReactDOM from 'react-dom';
import TemperatureChartWidgetComponent from "../../components/TemperatureChartWidgetComponent";

/**
 * Temperature chart widget.
 */
export default class TemperatureChartWidget {
    /**
     * @constructor TemperatureChartWidget
     * @param api SensorlabApi
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Render widget.
     *
     * @member TemperatureChartWidget#render
     * @param container_id string ID of DOM object to render to
     * @param sensor_id string Sensor ID
     */
    render(container_id, sensor_id) {
        ReactDOM.render(<TemperatureChartWidgetComponent api={this.api} sensor_id={sensor_id} />, document.getElementById(container_id));
    }
}