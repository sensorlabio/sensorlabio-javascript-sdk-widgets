Getting Started
===============

This is documentation on Javascript SDK Widgets for http://sensorlab.io/

You can use these widgets as default ones along with Javascript SDK in your Javascript project.

Installation
------------

Install with npm::

   $ npm i --save https://github.com/sensorlabio/sensorlabio-javascript-sdk
   $ npm i --save https://github.com/sensorlabio/sensorlabio-javascript-sdk-widgets

React example
-------------

Initialize inside your js code

.. code-block:: javascript

   import {SensorlabApi} from "sensorlabio-javascript-sdk";
   import {SensorlabWidgets} from "sensorlabio-javascript-sdk-widgets";
   let api = new SensorlabApi();
   let widgets = new SensorlabWidgets(api);

Use with browsers
-----------------

Download latest master release:

    `<https://github.com/sensorlabio/sensorlabio-javascript-sdk-widgets/archive/master.zip>`_

Unzip:

    - `builds/index.min.js`
    - `builds/css/index.min.css`

Use them inside your html code:

.. code-block:: html

    <link href="build/css/index.min.css" rel="stylesheet">
    <script src="build/index.min.js"></script>

And inside your JS code:

.. code-block:: html

    <script type="text/javascript">
        var sdk = SensorlabSDK;
        var api = new sdk.SensorlabApi();
        var widgets = new SensorlabWidgets.SensorlabWidgets(api);
    </script>