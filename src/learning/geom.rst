.. _learning.geom:

Geometries
==========

.. cssclass:: show-chooser

.. rubric:: code chooser

The :mod:`geom` module provides classes for representing two dimensional spatial
objects, or geometries. Geometry objects are created by specifying sets of
coordinates.

.. cssclass:: code py

.. code-block:: python

    >>> from geoscrpt import geom 
    
    >>> point = geom.Point(10, 10)
    >>> point
    POINT (10 10)
    
    >>> line = geom.LineString([10, 10], [20, 20], [30, 40])
    >>> line
    LINESTRING (10 10, 20 20, 30 40)


.. cssclass:: code js

.. code-block:: javascript

    >> var GEOM = require("geoscript/geom");

    >> var point = new GEOM.Point([10, 10]);
    >> point
    <Point [10, 10]>

    >> var line = new GEOM.LineString([[10, 10], [20, 20], [30, 40]]);
    >> line
    <LineString [[10, 10], [20, 20], [30, 40]]>


.. cssclass:: code scala

.. code-block:: scala

    scala> import org.geoscript.geometry._
    import org.geoscript.geometry._

    scala> val point = Point(10, 10)
    point: org.geoscript.geometry.Point = POINT (10 10)

    scala> val line = LineString((10, 10), (20, 20), (30, 40))
    line: org.geoscript.geometry.LineString = LINESTRING (10 10, 20 20, 30 40)

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.geom.*
    ===> [import geoscript.geom.*]

    groovy:000> p = new Point(10,10)
    ===> POINT (10 10)

    groovy:000> line = new LineString([10,10],[20,20],[30,40])
    ===> LINESTRING (10 10, 20 20, 30 40)
  
Geometries can also be created from `well known text
<http://en.wikipedia.org/wiki/Well-known_text>`_ representation.

.. cssclass:: code py

.. code-block:: python

    >>> from geoscript import geom
    
    >>> poly = geom.fromWKT('POLYGON ((10 10, 10 20, 20 20, 20 15, 10 10))')
    >>> poly
    POLYGON ((10 10, 10 20, 20 20, 20 15, 10 10))

.. cssclass:: code js

.. code-block:: javascript

    >> var GEOM = require("geoscript/geom");

    >> var poly = GEOM.fromWKT("POLYGON ((10 10, 10 20, 20 20, 20 15, 10 10))");
    >> poly
    <Polygon [[[10, 10], [10, 20], [20, 20], [20, 15], [10, 10]]]>

.. cssclass:: code scala

.. code-block:: scala

    scala> import org.geoscript.geometry._
    import org.geoscript.geometry._

    scala> val poly = Geometry.fromWKT("POLYGON ((10 10, 10 20, 20 20, 20 15, 10 10))")
    poly: org.geoscript.geometry.Geometry = POLYGON ((10 10, 10 20, 20 20, 20 15, 10 10))

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.geom.*
    ===> [import geoscript.geom.*]

    groovy:000> poly = Geometry.fromWKT("POLYGON ((10 10, 10 20, 20 20, 20 15, 10 10))")
    ===> POLYGON ((10 10, 10 20, 20 20, 20 15, 10 10))

Geometry objects provide properties for statistics such as area and length.

.. cssclass:: code py

.. code-block:: python

    >>> from geoscript import geom
    
    >>> poly = geom.fromWKT('POLYGON ((10 10, 10 20, 20 20, 20 15, 10 10))')
    >>> poly.area
    75.0 
    >>> poly.length
    36.180339887498945

.. cssclass:: code js

.. code-block:: javascript

    >> var GEOM = require("geoscript/geom");

    >> var poly = GEOM.fromWKT("POLYGON ((10 10, 10 20, 20 20, 20 15, 10 10))");
    >> poly.area
    75
    >> poly.length
    36.180339887498945

.. cssclass:: code scala

.. code-block:: scala

    scala> import org.geoscript.geometry._
    import org.geoscript.geometry._

    scala> val poly = Geometry.fromWKT("POLYGON ((10 10, 10 20, 20 20, 20 15, 10 10))")
    poly: org.geoscript.geometry.Geometry = POLYGON ((10 10, 10 20, 20 20, 20 15, 10 10))

    scala> poly.area
    res0: Double = 75

    scala> poly.length
    res0: Double = 36.180339887498945

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.geom.*
    ===> [import geoscript.geom.*]

    groovy:000> poly = Geometry.fromWKT("POLYGON ((10 10, 10 20, 20 20, 20 15, 10 10))")
    ===> POLYGON ((10 10, 10 20, 20 20, 20 15, 10 10))

    groovy:000> poly.area
    ===> 75.0

    groovy:000> poly.length
    ===> 36.180339887498945


There are also methods for calculating properties which are themselves
geometries such as buffer and centroid.

.. cssclass:: code py

.. code-block:: python

    >>> from geoscript import geom
    
    >>> line = geom.LineString([10, 10], [20, 20], [30, 40])
    >>> poly = line.buffer(10)
    >>> poly.area
    1041.9912814842407
    
    >>> line.centroid
    POINT (21.12574113277207 24.188611699158105)


.. cssclass:: code js

.. code-block:: javascript

    >> var GEOM = require("geoscript/geom");

    >> var line = new GEOM.LineString([[10, 10], [20, 20], [30, 40]]);
    >> var poly = line.buffer(10);
    >> poly.area
    1041.9912814842407
    
    >> line.centroid
    <Point [21.12574113277207, 24.188611699158105]>


.. cssclass:: code scala

.. code-block:: scala

    scala> import org.geoscript.GeoScript._
    import org.geoscript.GeoScript._

    scala> import org.geoscript.geometry._
    import org.geoscript.geometry._

    scala> val line = LineString((10, 10), (20, 20), (30, 40))
    line: org.geoscript.geometry.LineString = LINESTRING (10 10, 20 20, 30 40)

    scala> val poly = line.buffer(10)
    poly: org.geoscript.geometry.Geometry = POLYGON ((11.781455848733053 25.923591472464004, 21.05572809000084 44.47213595499958, 22.100060210309515 46.13114600374718, 23.447982586398712 47.55453954995706, 25.04769531727891 48.68761637789669, 26.837722339831622 49.48683298050514, 28.74927391943886 49.921475911950004, 30.708890200906794 49.97484208812642, 32.64126422950409 49.6448806768120...

    scala> poly.area
    res0: Double = 1041.9912814842407

    scala> line.centroid
    res1: org.geoscript.geometry.Point = POINT (21.12574113277207 24.188611699158105)

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.geom.*
    ===> [import geoscript.geom.*]

    groovy:000> line = new LineString([10,10],[20,20],[30,40])
    ===> LINESTRING (10 10, 20 20, 30 40)

    groovy:000> poly = line.buffer(10)
    ===> POLYGON ((11.781455848733053 25.923591472464004, 21.05572809000084 44.47213595499958, 22.100060210309515 46.13114600374718, 23.447982586398712 47.55453954995706, 25.04769531727891 48.68761637789669, 26.837722339831622 49.48683298050514, 28.74927391943886 49.921475911950004, 30.708890200906794 49.97484208812642, 32.64126422950409 49.644880676812036, 34.47213595499958 48.94427190999916, 36.131146003747176 47.89993978969049, 37.55453954995706 46.55201741360129, 38.68761637789669 44.95230468272109, 39.48683298050514 43.16227766016838, 39.921475911950004 41.25072608056114, 39.97484208812642 39.2911097990932, 39.644880676812036 37.35873577049591, 38.94427190999916 35.52786404500042, 28.94427190999916 15.52786404500042, 28.112421851755606 14.15289715336235, 27.071067811865476 12.928932188134524, 17.071067811865476 2.9289321881345254, 15.555702330196024 1.6853038769745474, 13.826834323650898 0.7612046748871322, 11.950903220161283 0.1921471959676957, 10 0, 8.049096779838719 0.1921471959676957, 6.173165676349103 0.7612046748871322, 4.44429766980398 1.6853038769745474, 2.9289321881345254 2.9289321881345245, 1.6853038769745474 4.444297669803978, 0.7612046748871322 6.173165676349101, 0.1921471959676957 8.049096779838713, 0 9.999999999999998, 0.1921471959676957 11.950903220161283, 0.761204674887134 13.8268343236509, 1.685303876974551 15.555702330196027, 2.9289321881345254 17.071067811865476, 11.781455848733053 25.923591472464004))

    groovy:000> poly.area
    ===> 1041.9912814842407

    groovy:000> line.centroid
    ===> POINT (21.12574113277207 24.188611699158105)

The :class:`Geometry` class also contains operations and predicates for
determining spatial relationships such as intersection and containment.

.. cssclass:: code py

.. code-block:: python

    >>> from geoscript import geom
    
    >>> poly = geom.Polygon([[10, 10], [10, 20], [20, 20], [20, 15], [10, 10]])
    >>> line = geom.LineString([10, 10], [20, 20], [30, 40])
    >>> poly.intersects(line)
    True
    >>> poly.intersection(line)
    LINESTRING (10 10, 20 20) 

.. cssclass:: code js

.. code-block:: javascript

    >> var GEOM = require("geoscript/geom");

    >> var line = new GEOM.LineString([[10, 10], [20, 20], [30, 40]]);
    >> var poly = new GEOM.Polygon([[[10, 10], [10, 20], [20, 20], [20, 15], [10, 10]]]);
    >> poly.intersects(line)
    true
    >> poly.intersection(line)
    <LineString [[10, 10], [20, 20]]>

.. cssclass:: code scala

.. code-block:: scala

    scala> import org.geoscript.geometry._
    import org.geoscript.geometry._

    scala> val line = LineString((10, 10), (20, 20), (30, 40))
    line: org.geoscript.geometry.LineString = LINESTRING (10 10, 20 20, 30 40)

    scala> val poly = Polygon(LineString((10, 10), (10, 20), (20, 20), (20, 15), (10, 10)), Nil)
    poly: org.geoscript.geometry.Polygon = POLYGON ((10 10, 10 20, 20 20, 20 15, 10 10))
    
    scala> poly.intersects(line)
    res0: Boolean = true

    scala> poly.intersection(line)
    res1: org.geoscript.geometry.Geometry = LINESTRING (10 10, 20 20)

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.geom.*
    ===> [import geoscript.geom.*]

    groovy:000> line = new LineString([10,10], [20,20], [30,40])
    ===> LINESTRING (10 10, 20 20, 30 40)

    groovy:000> poly = new Polygon([10,10],[10,20],[20,20],[20,15],[10,10])
    ===> POLYGON ((10 10, 10 20, 20 20, 20 15, 10 10))

    groovy:000> poly.intersects(line)
    ===> true

    groovy:000> poly.intersection(line)
    ===> LINESTRING (10 10, 20 20)

.. cssclass:: refs py

.. seealso::

    The geoscript geometry module is based on the `JTS
    <http://tsusiatsoftware.net/jts/main.html>`_ library. Classes in the
    :mod:`geom` module are extensions of their counterparts from JTS which
    means any JTS geometry methods can be called on a geoscript geometry instance.
    See the JTS `javadocs
    <http://tsusiatsoftware.net/jts/javadoc/com/vividsolutions/jts/geom/Geometry.html>`_
    for more information.

.. cssclass:: refs js

.. seealso::

    For full details on the available geometry types and their properties and
    methods, see the `JavaScript API reference <../js/api/geom.html>`__ for the 
    :mod:`geom` module.
