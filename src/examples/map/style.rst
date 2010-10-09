.. _examples.map.style:

Style
=====
A Style can contain one or more Rules.

.. cssclass:: show-chooser

.. rubric:: code chooser

Import the package
------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.style.*
    ===> [import geoscript.style.*]

Create a Style from a SLD File
------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> style = new Style("states.sld")

Create a Style from Symbolizer
------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> style = new Style(new PolygonSymbolizer(fillColor: "#FF0000", strokeOpacity: 0))

Create a Style from Symbolizers
-------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> style = new Style([
            new PointSymbolizer(
                shape: "circle",
                fillColor: "#FF0000",
                size: 6,
                strokeOpacity: 0
            ),
            new TextSymbolizer(
                label: "name",
                color: "#000000"
            )
        ])

Create a Style from a Rule
--------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> style = new Style(new Rule(
            symbolizers: [
                new PointSymbolizer(
                    shape: "circle",
                    size: 8,
                    fillColor: "#0033CC",
                    strokeOpacity: 0
                )
            ],
            filter: new Filter("pop < 5000")
        ))

Create a Style from Rules
-------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> style = new Style([
            new Rule(
                symbolizers: [
                    new PointSymbolizer(
                        shape: "circle",
                        fillColor: "#FF0000",
                        size: 6,
                        strokeOpacity: 0
                    )
                ]
            ),
            new Rule(
                symbolizers: [
                    new TextSymbolizer(
                        label: "name",
                        color: "#000000"
                    )
                ]
            )
        ])

Create a Style with z-indicices (double line roads)
---------------------------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> style = new Style([
            new LineSymbolizer(
                strokeColor: "#333333",
                strokeWidth: 5,
                strokeLineCap: "round",
                zIndex: 0
            ),
            new LineSymbolizer(
                strokeColor: "#6699FF",
                strokeWidth: 3,
                strokeLineCap: "round",
                zIndex: 1
            )
        ])
