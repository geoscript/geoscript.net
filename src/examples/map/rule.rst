.. _examples.map.rule:

Rule
====
A Rule contains one or more Symbolizers with an optional filter and or scale
dependency.

Options
-------
* **symbolizers**: A List of Symbolizers.
* **filter**: A geoscript.filter.Filter.
* **minScaleDenominator**: The minimum scale denominator.
* **maxScaleDenominator**: The maximum scale denominator.
* **name**: The Rule's name.
* **title**: The Rule's title.

.. cssclass:: show-chooser

.. rubric:: code chooser

Import the packages
-------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.style.*
    ===> [import geoscript.style.*]

    groovy:000> import geoscript.filter.Filter
    ===> [import geoscript.style.*, import geoscript.filter.Filter]

Create a Rule with a single Symbolizer
----------------------------------------

.. cssclass:: code groovy

.. code-block:: groovy


    groovy:000> rule = new Rule(
        symbolizers: [
            new LineSymbolizer(
                strokeColor: "#000000",
                strokeWidth: 3
            )
        ]
    )

Create a Rule with Symbolizers
--------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> rule = new Rule(
        symbolizers: [
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

        ]
    )

Create a Rule with a Filter
-----------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> rule = new Rule(
        symbolizers: [
            new LineSymbolizer(
                strokeColor: "#000000",
                strokeWidth: 3
            )
        ],
        filter: new Filter("type = 'local-road'")
    )

Create a Rule with min and max scale dependencies
---------------------------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> rule = new Rule(
        symbolizers: [
            new LineSymbolizer(
                strokeColor: "#000000",
                strokeWidth: 3
            )
        ],
        minScaleDenominator: 1800000000,
        maxScaleDenominator: 3600000000
    )