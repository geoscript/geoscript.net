.. _examples.map.point:

PointSymbolizer
===============
A PointSymbolizer is used to style Layers with Point or MultiPoint Geometry.

Options
-------
* **shape**: The well known shape name (circle, square, triangle, star, cross, x, arrow)
* **size**: The symbol size (5,6,12)
* **rotation**: The rotation (45, 90)
* **strokeColor**: The stroke color ("white", "255,255,255", "#ffffff")
* **strokeWidth**: The stroke width (1, 0.25, 4.1)
* **strokeOpacity**: The stroke opacity (0=transparent to 1=opaque)
* **fillColor**: The fill color ("white", "255,255,255", "#ffffff")
* **fillOpacity**: The fill opacity (0=transparent to 1=opaque)
* **graphic**: The graphic image (images/icon.png)

Import the package
------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.style.PointSymbolizer
    ===> [import geoscript.style.PointSymbolizer]

Create a PointSymbolizer with a simple fill
-------------------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> sym = new PointSymbolizer(
            shape: "circle",
            fillColor: "#FF0000",
            size: 6,
            strokeOpacity: 0
        )

Create a PointSymbolizer with a simple fill and stroke
------------------------------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> sym = new PointSymbolizer(
            shape: "circle",
            fillColor: "#FF0000",
            size: 6,
            strokeColor: "#000000",
            strokeWidth: 2
        )

Create a PointSymbolizer with a rotated square
----------------------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> sym = new PointSymbolizer(
            shape: "square",
            fillColor: "#009900",
            size: 12,
            rotation: 45,
            strokeOpacity: 0
        )

Create a PointSymbolizer with a transparent triangle
----------------------------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> sym = new PointSymbolizer(
            shape: "triangle",
            fillColor: "#009900",
            fillOpacity: 0.2,
            size: 12,
            strokeColor: "#000000",
            strokeWidth: 2
        )

Create a PointSymbolizer with an external graphic
-------------------------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> sym = new PointSymbolizer(graphic: 'smileyface.png')