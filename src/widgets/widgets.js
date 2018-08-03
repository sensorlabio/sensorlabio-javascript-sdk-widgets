import ThermometerWidget from './widgets/thermometer';
import TemperatureChartWidget from "./widgets/temperature_chart";
import BatteryChargeWidget from "./widgets/battery_charge";
import BatteryChargeChartWidget from "./widgets/battery_charge_chart";
import BatteryVoltageWidget from "./widgets/battery_voltage";
import BatteryVoltageChartWidget from "./widgets/battery_voltage_chart";
import MapWidget from './widgets/map';

/**
 * @classdesc SDK Widgets.
 */
export default class Widgets {
    /**
     * @constructor Widgets
     *
     * @param api SensorlabApi
     */
    constructor(api) {
        /**
         * API.
         *
         * @member Widgets#api
         * @type {SensorlabAPI}
         */
        this.api = api;

        /**
         * Thermometer widget.
         *
         * @member Widgets#thermometer
         * @type {ThermometerWidget}
         */
        this.thermometer = new ThermometerWidget(this.api);

        /**
         * Temperature chart widget.
         *
         * @member Widgets#temperature_chart
         * @type {TemperatureChartWidget}
         */
        this.temperature_chart = new TemperatureChartWidget(this.api);

        /**
         * Battery charge widget.
         *
         * @member Widgets#battery_charge
         * @type {BatteryChargeWidget}
         */
        this.battery_charge = new BatteryChargeWidget(this.api);

        /**
         * Battery charge chart widget.
         *
         * @member Widgets#battery_charge_chart
         * @type {BatteryChargeChartWidget}
         */
        this.battery_charge_chart = new BatteryChargeChartWidget(this.api);

        /**
         * Battery voltage widget.
         *
         * @member Widgets#battery_voltage
         * @type {BatteryVoltageWidget}
         */
        this.battery_voltage = new BatteryVoltageWidget(this.api);

        /**
         * Battery voltagew chart widget.
         *
         * @member Widgets#battery_voltage_chart
         * @type {BatteryVoltageChartWidget}
         */
        this.battery_voltage_chart = new BatteryVoltageChartWidget(this.api);

        /**
         * Map widgets.
         *
         * @member Widgets#map
         * @type {MapWidget}
         */
        this.map = new MapWidget(this.api);
    }
}