.. _examples.map.text:

TextSymbolizer
==============
A TextSymbolizer is used to style labels.

Options
-------
* **label**: The name of the Field used as the label (NAME, STATE_NAME)
* **color**: The color ("white", "255,255,255", "#ffffff")
* **fontFamily**: The font family (Arial)
* **fontSize**: The font size (12)
* **fontStyle**: The font style (normal, italic, oblique)
* **fontWeight**: The font weight (normal, bold)
* **haloColor**: The halo color ("white", "255,255,255", "#ffffff")
* **haloRadius**: The halo radius (1,3,4)
* **anchorPointX**: The anchor point x
* **anchorPointY**: The anchor point y
* **displacementX**: The displacement x
* **displacementY**: The displacement y
* **rotation**: The rotation
* **followLine**: Whether to follow the line or not (true, false)
* **perpendicularOffset**: The perpendicular offset distance (5,10)
* **autoWrap**:  Whether to auto wrap long text or not (true, false)
* **maxDisplacement**: The maximum displacement
* **maxAngleDelta**: The maximum angle delta
* **repeat**: How often to repeat the label

.. cssclass:: show-chooser

.. rubric:: code chooser

Import the package
------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.style.TextSymbolizer
    ===> [import geoscript.style.TextSymbolizer]

Create a simple TextSymbolizer
------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> sym = new TextSymbolizer(
            label: "name",
            color: "#000000"
        )

Create a styled TextSymbolizer
------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> sym = new TextSymbolizer(
            label: "name",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: "bold",
            anchorPointX: 0.5,
            anchorPointY: 0.5,
            displacementX: 0,
            displacementY: 10
        )

Create a TextSymbolizer with style and rotation
-----------------------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> sym = new TextSymbolizer(
            label: "name",
            color: "#990099",
            fontFamily: "Arial",
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: "bold",
            anchorPointX: 0.5,
            anchorPointY: 0,
            displacementX: 0,
            displacementY: 25,
            rotation: -45
        )

Create a TextSymbolizer that follows a line
-------------------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> sym = new TextSymbolizer(
            label: "name",
            color: "#000000",
            followLine: true
        )

Create a TextSymbolizer that follows line with options
------------------------------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> sym = new TextSymbolizer(
            label: "name",
            color: "#000000",
            followLine: true,
            maxAngleDelta: 90,
            maxDisplacement: 400,
            repeat: 150
        )

Create a TextSymbolizer with a halo
-----------------------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> sym = new TextSymbolizer(
            label: "name",
            haloColor: "#FFFFFF",
            haloRadius: 3
        )