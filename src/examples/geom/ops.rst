.. _examples.geom.ops:

Geometry Operations
===================

.. cssclass:: show-chooser

.. rubric:: code chooser

Buffering
---------

.. cssclass:: code py

.. code-block:: python
   
    >>> from geoscript import geom

    >>> point = geom.Point(0, 0)
    >>> poly = point.buffer(10)
    >>> poly
    POLYGON ((10 0, 9.807852804032304 ... 1.9509032201612437, 10 0))

.. cssclass:: code js

.. code-block:: javascript

    >> var GEOM = require("geoscript/geom");

    >> var point = new GEOM.Point([0, 0]);
    >> var poly = point.buffer(10);
    >> poly
    <Polygon [[[10, 0], [9.807852804032304, -1.9509032201612824], [9.2387...>

.. cssclass:: code scala

.. code-block:: scala

    scala> import org.geoscript.geometry._
    scala> val p = Point(0, 0)
    p: org.geoscript.geometry.Point = POINT (0 0)

    scala> val poly = p.buffer(10)
    poly: org.geoscript.geometry.Geometry = POLYGON ((10 0, 9.807852804032304 -1.9509032201612824, 9.238795325112868 -3.826834323650898, 8.314696123025453 -5.555702330196022, 7.0710678118654755 -7.071067811865475, 5.555702330196023 -8.314696123025453, 3.8268343236508984 -9.238795325112868, 1.9509032201612833 -9.807852804032304, 0.0000000000000006 -10, -1.950903220161282 -9.807852804032304...

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.geom.*
    ===> [import geoscript.geom.*]

    groovy:000> p = new Point(0,0)
    ===> POINT (0 0)

    groovy:000> poly = p.buffer(10)
    ===> POLYGON ((10 0, 9.807852804032304 -1.9509032201612824, 9.238795325112868 -3.826834323650898, 8.314696123025453 -5.555702330196022, 7.0710678118654755 -7.071067811865475, 5.555702330196023 -8.314696123025453, 3.8268343236508984 -9.238795325112868, 1.9509032201612833 -9.807852804032304, 0.0000000000000006 -10, -1.950903220161282 -9.807852804032304, -3.826834323650897 -9.238795325112868, -5.55570233019602 -8.314696123025453, -7.071067811865475 -7.0710678118654755, -8.314696123025453 -5.555702330196022, -9.238795325112868 -3.8268343236508944, -9.807852804032306 -1.9509032201612773, -10 0.0000000000000077, -9.807852804032303 1.9509032201612921, -9.238795325112862 3.826834323650909, -8.314696123025445 5.555702330196034, -7.071067811865463 7.071067811865487, -5.555702330196008 8.314696123025463, -3.826834323650879 9.238795325112875, -1.9509032201612606 9.807852804032308, 0.0000000000000248 10, 1.950903220161309 9.807852804032299, 3.8268343236509246 9.238795325112857, 5.555702330196048 8.314696123025435, 7.071067811865499 7.0710678118654515, 8.314696123025472 5.555702330195993, 9.238795325112882 3.826834323650863, 9.807852804032311 1.9509032201612437, 10 0))

Centroid
--------

.. cssclass:: code py

.. code-block:: python
   
    >>> from geoscript import geom

    >>> poly = geom.fromWKT('POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))')
    >>> poly.centroid
    POINT (5 5)

.. cssclass:: code js

.. code-block:: javascript

    >> var GEOM = require("geoscript/geom");

    >> var poly = GEOM.fromWKT("POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))");
    >> poly.centroid
    <Point [5, 5]>

.. cssclass:: code scala

.. code-block:: scala

    scala> import org.geoscript.geometry._
    scala> val poly = Geometry.fromWKT("POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))") 
    poly: org.geoscript.geometry.Geometry = POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))

    scala> poly.centroid
    res0: org.geoscript.geometry.Point = POINT (5 5)

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.geom.*
    ===> [import geoscript.geom.*]

    groovy:000> poly = Geometry.fromWKT("POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))")
    ===> POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))

    groovy:000> poly.centroid
    ===> POINT (5 5)

Visualizing
-----------
  
.. cssclass:: code py

.. code-block:: python
   
    >>> from geoscript import geom
    >>> from geoscript import viewer

    >>> poly = geom.fromWKT('POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))')
    >>> viewer.draw(poly)

    >>> line = geom.LineString((2, 2), (8, 8))
    >>> viewer.draw(line)

    >>> viewer.draw([poly, line, geom.Point(5, 5).buffer(1)])

.. cssclass:: code js

.. code-block:: javascript

    >> var GEOM = require("geoscript/geom");
    >> var VIEWER = require("geoscript/viewer");

    >> var poly = GEOM.fromWKT("POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))");
    >> VIEWER.draw(poly)

    >> var line = new GEOM.LineString([[2, 2], [8, 9]]);
    >> VIEWER.draw(line)    

    >> VIEWER.draw([poly, line, new GEOM.Point([5, 5]).buffer(1)])

.. cssclass:: code scala

.. code-block:: scala

    scala> import org.geoscript.geometry._
    scala> import org.geoscript.viewer._  
    scala> import org.geoscript.GeoScript._
    scala> val poly = Geometry.fromWKT("POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))")         
    poly: org.geoscript.geometry.Geometry = POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))

    scala> Viewer.draw(poly)                                                              

    scala> val line = LineString((2, 2), (8, 8))         
    line: org.geoscript.geometry.LineString = LINESTRING (2 2, 8 8)

    scala> Viewer.draw(line)                             

    scala> Viewer.draw(List(poly, line, Point(5, 5).buffer(1)))         

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.geom.*
    ===> [import geoscript.geom.*]

    groovy:000> import geoscript.viewer.Viewer
    ===> [import geoscript.geom.*, import geoscript.viewer.Viewer]

    groovy:000> v = new Viewer()
    ===> geoscript.viewer.Viewer@77f6d2e3

    groovy:000> poly = Geometry.fromWKT("POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))")
    ===> POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))

    groovy:000> v.draw(poly)
    ===> null

    groovy:000> line = new LineString([2,2],[8,8])
    ===> LINESTRING (2 2, 8 8)

    groovy:000> v.draw(line)
    ===> null

    groovy:000> v.draw([poly, line, new Point(5,5).buffer(1)])
    ===> null