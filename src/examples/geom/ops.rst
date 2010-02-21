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

    js> var GEOM = require("geoscript/geom");

    js> var point = new GEOM.Point([0, 0]);
    js> var poly = point.buffer(10);
    js> poly
    <Polygon [[[10, 0], [9.807852804032304, -1.9509032201612824], [9.2387...>

.. cssclass:: code scala

.. code-block:: scala

    scala> import org.geoscript.geometry._
    scala> val p = Point(0, 0)
    p: org.geoscript.geometry.Point = POINT (0 0)

    scala> val poly = p.buffer(10)
    poly: org.geoscript.geometry.Geometry = POLYGON ((10 0, 9.807852804032304 -1.9509032201612824, 9.238795325112868 -3.826834323650898, 8.314696123025453 -5.555702330196022, 7.0710678118654755 -7.071067811865475, 5.555702330196023 -8.314696123025453, 3.8268343236508984 -9.238795325112868, 1.9509032201612833 -9.807852804032304, 0.0000000000000006 -10, -1.950903220161282 -9.807852804032304...


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

    js> var GEOM = require("geoscript/geom");

    js> var poly = GEOM.fromWKT("POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))");
    js> poly.centroid
    <Point [5, 5]>

.. cssclass:: code scala

.. code-block:: scala

    scala> import org.geoscript.geometry._
    scala> val poly = Geometry.fromWKT("POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))") 
    poly: org.geoscript.geometry.Geometry = POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))

    scala> poly.centroid
    res0: org.geoscript.geometry.Point = POINT (5 5)

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

    js> var GEOM = require("geoscript/geom");
    js> var VIEWER = require("geoscript/viewer");

    js> var poly = GEOM.fromWKT("POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))");
    js> VIEWER.draw(poly)

    js> var line = new GEOM.LineString([[2, 2], [8, 9]]);
    js> VIEWER.draw(line)    

    js> VIEWER.draw([poly, line, new GEOM.Point([5, 5]).buffer(1)])

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
