Battery Charge Chart Widget
---------------------------

Code:

.. code-block:: javascript

    widgets.battery_charge_chart(dom_id, sensor_id):

First parameter is DOM ID in your html and second is Sensor ID to get data from.

Example:

.. code-block:: html

    <link href="build/css/index.min.css" rel="stylesheet">
    <script src="build/index.min.js"></script>

    <div id="BatteryChargeChartWidget">
    </div>

    <script type="text/javascript">
        var widgets = new SensorlabWidgets.SensorlabWidgets(api);
        widgets.battery_charge_chart('BatteryChargeChartWidget', '5b4359a204b4c425d80c3718'):
    </script>

It will look like this:

.. image:: img/battery_charge_chart.png