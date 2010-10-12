.. _examples.map.line:

LineSymbolizer
==============
A LineSymbolizer is used to style Layers with LineString or MultiLineString Geometry.

Options
-------
* **strokeColor**: The stroke color ("white", "255,255,255", "#ffffff")
* **strokeWidth**: The stroke width (1, 0.25, 4.1)
* **strokeOpacity**: The stroke opacity (0=transparent to 1=opaque)
* **strokeLineCap**: The stroke line cap (round, butt, square)
* **strokeLineJoin**: The stroke line join (mitre, round, bevel)
* **strokeDashOffset**: The stroke dash offset
* **strokeDashArray**: The stroke dash array ("5 2", "5 3 2")
* **graphicStrokeMarkName**: The graphic stroke mark well known name (shape://vertline, shape://slash, shape://backslash, shape://times)
* **graphicStrokeMarkStrokeColor**: The graphic stroke mark stroke color ("white", "255,255,255", "#ffffff")
* **graphicStrokeMarkFillColor**: The graphic stroke mark fill color ("white", "255,255,255", "#ffffff")
* **graphicStrokeMarkStrokeWidth**: The graphic stroke mark stroke width (1, 0.55, 3)
* **graphicStrokeMarkSize**: The graphic stroke mark size (1, 0.55, 3)

.. cssclass:: show-chooser

.. rubric:: code chooser



Create a LineSymbolizer with a simple stroke
---------------------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.style.LineSymbolizer
    ===> [import geoscript.style.LineSymbolizer]

    groovy:000> sym = new LineSymbolizer(
            strokeColor: "#000000",
            strokeWidth: 3,
            strokeOpacity: 0.5
        )

.. cssclass:: code js

.. code-block:: javascript

    >> var LineSymbolizer = require("geoscript/style").LineSymbolizer;

    >> var sym = new LineSymbolizer({
    ..     strokeColor: "#000000",
    ..     strokeWidth: 3,
    ..     strokeOpacity: 0.5
    .. });


Create a LineSymbolizer with a dashed line
------------------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> sym = new LineSymbolizer(
            strokeColor: "#0000FF",
            strokeWidth: 3,
            strokeDashArray: "5 2"
        )

.. cssclass:: code js

.. code-block:: javascript

    >> var sym = new LineSymbolizer({
    ..     strokeColor: "#0000FF",
    ..     strokeWidth: 3,
    ..     strokeDashArray: "5 2"
    .. });


Create a LineSymbolizer with a graphic stroked line
---------------------------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> sym = new LineSymbolizer(
            graphicStrokeMarkName: "shape://vertline",
            graphicStrokeMarkStrokeColor: "#333333",
            graphicStrokeMarkStrokeWidth: 1,
            graphicStrokeMarkSize: 12
        )

