import React from 'react';
import ReactDOM from 'react-dom';
import MapWidgetComponent from '../../components/MapWidgetComponent';

/**
 * Map widget.
 */
export default class MapWidget {
    /**
     * @constructor MapWidget
     * @param api SensorlabApi
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Render widget.
     *
     * @member MapWidget#render
     * @param container_id string ID of DOM object to render to
     * @param sensor_id string Sensor ID
     */
    render(container_id, sensor_id) {
        ReactDOM.render(<MapWidgetComponent api={this.api} sensor_id={sensor_id} />, document.getElementById(container_id));
    }
}