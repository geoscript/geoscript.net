.. _examples.map.polygon:

PolygonSymbolizer
=================
A PolygonSymbolizer is used to style Layers with Polygon or MultiPolygon Geometry.

Options
-------
* **strokeColor**: The stroke color ("white", "255,255,255", "#ffffff")
* **strokeWidth**: The stroke width (1, 0.25, 4.1)
* **strokeOpacity**: The stroke opacity (0=transparent to 1=opaque)
* **strokeLineCap**: The stroke line cap (round, butt, square)
* **strokeLineJoin**: The stroke line join (mitre, round, bevel)
* **strokeDashOffset**: The stroke dash offset
* **fillColor**: The fill color ("white", "255,255,255", "#ffffff")
* **fillOpacity**: The fill opacity (0=transparent to 1=opaque)
* **graphic**: The fill graphic (images/colorblocks.png)
* **markName**: The fill mark well known name (shape://vertline, shape://horline, shape://slash, shape://backslash, shape://plus, shape://times)
* **markStrokeColor**: The fill mark color ("white", "255,255,255", "#ffffff")
* **markStrokeWidth**: The fill mark stroke width (1, 0.55, 3)

.. cssclass:: show-chooser

.. rubric:: code chooser

Import the package
------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.style.PolygonSymbolizer
    ===> [import geoscript.style.PolygonSymbolizer]

Create a PolygonSymbolizer with a simple fill
---------------------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> sym = new PolygonSymbolizer(
        fillColor: "#000080",
        strokeOpacity: 0
    )

Create a PolygonSymbolizer with simple fill and stroke
------------------------------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> sym = new PolygonSymbolizer(
        fillColor: "#000080",
        strokeColor: "#FFFFFF",
        strokeWidth: 2
    )

Create a PolygonSymbolizer with transparent fill
------------------------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> sym = new PolygonSymbolizer(
        fillColor: "#000080",
        fillOpacity: 0.5,
        strokeColor: "#FFFFFF",
        strokeWidth: 2
    )

Create a PolygonSymbolizer with graphic fill
--------------------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> sym = new PolygonSymbolizer(
        graphic: "colorblocks.png",
        strokeOpacity: 0
    )

Create a PolygonSymbolizer with hatching fill
---------------------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> sym = new PolygonSymbolizer(
        markName: "shape://times",
        markStrokeColor: "#990099",
        markStrokeWidth: 1,
        strokeOpacity: 0
    )