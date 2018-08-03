Map Widget
----------

.. note:: This widget uses Google Maps API. You must include this API in your html page.

Code:

.. code-block:: javascript

    widgets.map(dom_id, sensor_id):

First parameter is DOM ID in your html and second is Sensor ID to get data from.

Example:

.. code-block:: html

    <script src="https://maps.googleapis.com/maps/api/js?key=%YOUR_API_KEY%"></script>
    <link href="build/css/index.min.css" rel="stylesheet">
    <script src="build/index.min.js"></script>

    <div id="MapWidget">
    </div>

    <script type="text/javascript">
        var widgets = new SensorlabWidgets.SensorlabWidgets(api);
        widgets.map('MapWidget', '5b4359a204b4c425d80c3718'):
    </script>

It will look like this:

.. image:: img/map.png