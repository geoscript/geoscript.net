.. _examples.geom.wkt:

Well Known Text
===============

  .. cssclass:: show-chooser

  .. rubric:: code chooser

Reading from WKT
----------------

.. cssclass:: code py

.. code-block:: python

   >>> from geoscript import geom 

   >>> point = geom.fromWKT('POINT(6 10)')
   >>> line = geom.fromWKT('LINESTRING(3 4,10 50,20 25)')
   >>> poly = geom.fromWKT('POLYGON((1 1,5 1,5 5,1 5,1 1),(2 2, 3 2, 3 3, 2 3,2 2))')
   >>> mpoint = geom.fromWKT('MULTIPOINT(3.5 5.6, 4.8 10.5)')
   >>> mline = geom.fromWKT('MULTILINESTRING((3 4,10 50,20 25),(-5 -8,-10 -8,-15 -4))')
   >>> mpoly = geom.fromWKT('MULTIPOLYGON(((1 1,5 1,5 5,1 5,1 1),(2 2, 3 2, 3 3, 2 3,2 2)),((3 3,6 2,6 4,3 3)))')
   >>> collection = geom.fromWKT('GEOMETRYCOLLECTION(POINT(4 6),LINESTRING(4 6,7 10))')

.. cssclass:: code js

.. code-block:: javascript

    js> var GEOM = require("geoscript/geom");

    js> var point = GEOM.fromWKT("POINT(6 10)");
    js> var line = GEOM.fromWKT("LINESTRING(3 4,10 50,20 25)");
    js> var poly = GEOM.fromWKT("POLYGON((1 1,5 1,5 5,1 5,1 1),(2 2, 3 2, 3 3, 2 3,2 2))");
    js> var points = GEOM.fromWKT("MULTIPOINT(3.5 5.6, 4.8 10.5)");
    js> var lines = GEOM.fromWKT("MULTILINESTRING((3 4,10 50,20 25),(-5 -8,-10 -8,-15 -4))");
    js> var polys = GEOM.fromWKT("MULTIPOLYGON(((1 1,5 1,5 5,1 5,1 1),(2 2, 3 2, 3 3, 2 3,2 2)),((3 3,6 2,6 4,3 3)))");
    js> var collection = GEOM.fromWKT("GEOMETRYCOLLECTION(POINT(4 6),LINESTRING(4 6,7 10))");


.. cssclass:: code scala

.. code-block:: scala

    import org.geoscript.geometry._
    val point = Geometry.fromWKT("POINT(6 10)").asInstanceOf[Point]
    val line = Geometry.fromWKT("LINESTRING(3 4,10 50,20 25)").asInstanceOf[LineString]
    val poly = Geometry.fromWKT("POLYGON((1 1,5 1,5 5,1 5,1 1),(2 2, 3 2, 3 3, 2 3,2 2))").asInstanceOf[Polygon]
    val points = Geometry.fromWKT("MULTIPOINT(3.5 5.6, 4.8 10.5)").asInstanceOf[MultiPoint]
    val lines = Geometry.fromWKT("MULTILINESTRING((3 4,10 50,20 25),(-5 -8,-10 -8,-15 -4))").asInstanceOf[MultiLineString]
    val polys = Geometry.fromWKT("MULTIPOLYGON(((1 1,5 1,5 5,1 5,1 1),(2 2, 3 2, 3 3, 2 3,2 2)),((3 3,6 2,6 4,3 3)))").asInstanceOf[MultiPolygon]
    val collection = Geometry.fromWKT("GEOMETRYCOLLECTION(POINT(4 6),LINESTRING(4 6,7 10))").asInstanceOf[GeometryCollection]

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.geom.Geometry
    ===> [import geoscript.geom.Geometry]

    groovy:000> point = Geometry.fromWKT('POINT(6 10)')
    ===> POINT(6 10)

    groovy:000> line = Geometry.fromWKT('LINESTRING(3 4,10 50,20 25)')
    ===> LINESTRING(3 4,10 50,20 25)

    groovy:000> poly = Geometry.fromWKT('POLYGON((1 1,5 1,5 5,1 5,1 1),(2 2, 3 2, 3 3, 2 3,2 2))')
    ===> POLYGON((1 1,5 1,5 5,1 5,1 1),(2 2, 3 2, 3 3, 2 3,2 2))

    groovy:000> points = Geometry.fromWKT('MULTIPOINT(3.5 5.6, 4.8 10.5)')
    ===> MULTIPOINT(3.5 5.6, 4.8 10.5)

    groovy:000> lines = Geometry.fromWKT('MULTILINESTRING((3 4,10 50,20 25),(-5 -8,-10 -8,-15 -4))')
    ===> MULTILINESTRING((3 4,10 50,20 25),(-5 -8,-10 -8,-15 -4))

    groovy:000> polys = Geometry.fromWKT('MULTIPOLYGON(((1 1,5 1,5 5,1 5,1 1),(2 2, 3 2, 3 3, 2 3,2 2)),((3 3,6 2,6 4,3 3)))')
    ===> MULTIPOLYGON(((1 1,5 1,5 5,1 5,1 1),(2 2, 3 2, 3 3, 2 3,2 2)),((3 3,6 2,6 4,3 3)))

    groovy:000> collection = Geometry.fromWKT('GEOMETRYCOLLECTION(POINT(4 6),LINESTRING(4 6,7 10))')
    ===> GEOMETRYCOLLECTION(POINT(4 6),LINESTRING(4 6,7 10))

Writing to WKT 
--------------
  
.. cssclass:: code py

.. code-block:: python

   >>> from geoscript import geom 

   >>> point = geom.Point(6, 10)
   >>> wkt = str(point)
   >>> wkt
   POINT (6 10)

   >>> line = geom.LineString( (3, 4), (10, 50), (20, 25) )
   >>> line
   LINESTRING (3 4, 10 50, 20 25)

.. cssclass:: code js

.. code-block:: javascript

    js> var GEOM = require("geoscript/geom");

    js> var point = new GEOM.Point([6, 10]);
    js> point.wkt
    POINT (6 10)

    js> var line = new GEOM.LineString([[3, 4], [10, 15], [20, 25]]);
    js> line.wkt
    LINESTRING (3 4, 10 15, 20 25)

.. cssclass:: code scala

.. code-block:: scala

    scala> import org.geoscript.geometry._
    scala> val point = Point(6, 10)
    point: org.geoscript.geometry.Point = POINT (6 10)

    scala> point.wkt
    res0: String = POINT (6 10)

    scala> val line = LineString([[3, 4], [10, 15], [20, 25]]);
    line: org.geoscript.geometry.LineString= LINESTRING (3 4, 10 15, 20 25)

    scala> line.wkt
    res1: String = LINESTRING (3 4, 10 15, 20 25)

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.geom.Geometry
    ===> [import geoscript.geom.Geometry]

    groovy:000> point = new Point(6, 10)
    ===> POINT (6 10)

    groovy:000> point.wkt
    ===> POINT (6 10)

    groovy:000> line = new LineString([3,4],[10,15],[20,25])
    ===> LINESTRING (3 4, 10 15, 20 25)

    groovy:000> line.wkt
    ===> LINESTRING (3 4, 10 15, 20 25)
