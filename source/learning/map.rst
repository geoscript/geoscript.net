.. _learning.map:

Map and Styles
==============

.. cssclass:: show-chooser

.. rubric:: code chooser

A :class:`Map` can draw one or more :class:`Layers` using :class:`Styles`.

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.render.Map
    ===> [import geoscript.render.Map]

    groovy:000> map = new Map(width:400, height:400) 
    ===> geoscript.map.Map@f58046e

    groovy:000> import geoscript.layer.Shapefile
    ===> [import geoscript.render.Map, import geoscript.layer.Shapefile]

    groovy:000> shp = new Shapefile("states.shp")
    ===> geoscript.layer.Shapefile@a5c18ff

    groovy:000> map.bounds = shp.bounds
    ===> (-124.73142200000001,24.955967,-66.969849,49.371735,EPSG:4326)

    groovy:000> map.addLayer(shp)
    ===> null

    groovy:000> map.render("states1.png")
    ===> null

.. cssclass:: code js

.. code-block:: javascript

    js> var Map = require("geoscript/map").Map;
    js> var Layer = require("geoscript/layer").Layer;
    js> var map = new Map();
    js> var layer = new Layer({
      >     name: "states",
      >     workspace: "data"
      > });
    js> map.add(layer);

    js> map.render("states1.png");


.. image:: states1.png

Layers have a default Style but we can customize that Style Symbolizers like Stroke and Fill.

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.style.*
    ===> [import geoscript.map.Map, import geoscript.layer.Shapefile, import geoscript.style.*]

    groovy:000> shp.style = new Fill("#999999") + new Stroke("#666666", 0.1)    
    ===> Composite (Fill(color = #999999, opacity = 1.0), Stroke(color = #666666, width = 0.1))

    groovy:000> map.render("states2.png")
    ===> null


.. cssclass:: code js

.. code-block:: javascript

    js> var {Stroke, Fill} = require("geoscript/style")

    js> layer.style = Stroke({width: 0.1, brush: "#666666"}).and(Fill("#999999"))
    <Style parts: <Stroke width: 0.1, opacity: 1, brush: <Color value: ...>

    js> map.render("states2.png")
    
.. image:: states2.png
