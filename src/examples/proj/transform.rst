.. _examples.proj.transform:

Transformations
===============

  .. cssclass:: show-chooser

  .. rubric:: code chooser

Transforming Points
-------------------

.. cssclass:: code py

.. code-block:: python

    >>> from geoscript.proj import Projection 

    >>> prj = Projection('epsg:4326')
    >>> prj.transform((-111, 45.7), 'epsg:26912')
    (499999.42501775385 5060716.092032814)

    >>> points = [(-110, 24.5), (-75, 42.4), (-99.2, 33.4)]
    >>> for p in points:
    ...   prj.transform(p, 'epsg:26912')
    ...
    (601317.0399797171, 2709952.3677921756)
    (3468687.3452766626, 5369899.957372455)
    (1600364.2286890591, 3758545.3568449053)

.. cssclass:: code js

.. code-block:: javascript

    js> var PROJ = require("geoscript/proj");
    js> var GEOM = require("geoscript/geom");

    js> var p1 = new GEOM.Point([-111, 45.7]);
    js> p1.projection = new PROJ.Projection("epsg:4326");
    js> var p2 = p1.transform("epsg:26912");
    js> p2
    <Point [499999.42501775385, 5060716.092032814]>

.. cssclass:: code scala

.. code-block:: scala

    scala> import org.geoscript.projection._
    scala> import org.geoscript.geometry._

    scala> val p1 = Point(-111, 45.7) in Projection("epsg:4326")
    p1: org.geoscript.geometry.Point = POINT (-111 45.7)

    scala> val p2 = p1 in Projection("epsg:26912")
    p2: org.geoscript.geometry.Point = POINT (-412539.9935856778 -7830632.25817681)

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.proj.Projection
    ===> [import geoscript.proj.Projection]

    groovy:000> import geoscript.geom.Point
    ===> [import geoscript.proj.Projection, import geoscript.geom.Point]

    groovy:000> p1 = new Point(-111, 45.7)
    ===> POINT (-111 45.7)

    groovy:000> p2 = Projection.transform(p1, 'epsg:4326', 'epsg:26912')
    ===> POINT (-412539.9935856778 -7830632.25817681)

Transforming Geometries
-----------------------
  
.. cssclass:: code py

.. code-block:: python

    >>> from geoscript import geom
    >>> from geoscript.proj import Projection 

    >>> prj = Projection('epsg:4326')
    >>> pt = geom.Point(-111, 45.5) 
    >>> line = geom.LineString((-110.1, 57.6), (-111.5, 50), (-109, 43))
    >>> poly = geom.Polygon([(-108.3, 53.1), (-112.7, 47.1), (-109, 43.7), (-108.3, 53.1)])

    >>> prj.transform(pt, 'epsg:26912')
    POINT (499999.42501775257 5038496.288583793)

    >>> prj.transform(line, 'epsg:26912')
    LINESTRING (553788.6739161084 6384534.487570734, 464165.9748020574 5538750.135212521, 663018.4534677222 4762755.4960556375)

    >>> prj.transform(poly, 'epsg:26912')
    POLYGON ((680759.8175153742 5886801.367604256, 370998.67923649476 5217678.697813773, 661154.8855028747 4840496.861362906, 680759.8175153742 5886801.367604256))

.. cssclass:: code js

.. code-block:: javascript

    js> var GEOM = require("geoscript/geom");

    js> var line = new GEOM.LineString([[-110.1, 57.6], [-111.5, 50], [-109, 43]]);
    js> line.projection = "EPSG:4326";
    js> line.transform("epsg:26912") 
    <LineString [[553788.6739161084, 6384534.487570734], [464165.9748020574,...>
    
    js> var poly = new GEOM.Polygon([[[-108.3, 53.1], [-112.7, 47.1], [-109, 43.7], [-108.3, 53.1]]]);
    js> poly.transform("epsg:26912");
    <Polygon [[[680759.8175153742, 5886801.367604256], [370998.6792364947...>.. cssclass:: code js

.. cssclass:: code scala

.. code-block:: scala

    scala> import org.geoscript.geometry._ 
    scala> import org.geoscript.projection._ 
    scala> import org.geoscript.GeoScript._

    scala> val line = LineString((-110.1, 57.6), (-111.5, 50), (-109, 43)) in Projection("epsg:4326")
    line: org.geoscript.geometry.LineString = LINESTRING (-110.1 57.6, -111.5 50, -109 43)

    scala> val line2 = line in Projection("epsg:26912")
    line2: org.geoscript.geometry.LineString = LINESTRING (553788.6739161084 6384534.487570734, 464165.9748020574 5538750.135212521, 663018.4534677222 4762755.4960556375)

    scala> val poly = Polygon(LineString((-108.3, 53.1), (-112.7, 47.1), (-109, 43.7), (-108.3, 53.1)), Nil) in Projection("epsg:4326")
    poly: org.geoscript.geometry.Polygon = POLYGON ((-108.3 53.1, -112.7 47.1, -109 43.7, -108.3 53.1))

    scala> val poly2 = poly in Projection("epsg:26912")
    poly2: org.geoscript.geometry.Polygon = POLYGON ((680759.8175153742 5886801.367604256, 370998.67923649476 5217678.697813773, 661154.8855028747 4840496.861362906, 680759.8175153742 5886801.367604256))

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.geom.*
    ===> [import geoscript.geom.*]

    groovy:000> import geoscript.proj.Projection
    ===> [import geoscript.geom.*, import geoscript.proj.Projection]

    groovy:000> prj = new Projection('epsg:4326')
    ===> EPSG:4326

    groovy:000> pt = new Point(-111, 45.7)
    ===> POINT (-111 45.7)

    groovy:000> line = new LineString([-110.1,57.6], [-111.5,50], [-109,43])
    ===> LINESTRING (-110.1 57.6, -111.5 50, -109 43)

    groovy:000> poly = new Polygon([-108.3,53.1],[-112.7,47.1],[-109,43.7],[-108.3,53.1])
    ===> POLYGON ((-108.3 53.1, -112.7 47.1, -109 43.7, -108.3 53.1))

    groovy:000> prj.transform(pt, 'epsg:26912')
    ===> POINT (-412539.9935856778 -7830632.25817681)

    groovy:000> prj.transform(line, 'epsg:26912')
    ===> LINESTRING (64971.64258713304 -7795528.649301183, -266610.029102562 -7718263.928822785, -418931.9422064803 -8078714.807026271)

    groovy:000> prj.transform(poly, 'epsg:26912')
    ===> POLYGON ((-51461.2296841651 -8028678.665519956, -426754.7978043163 -7630837.138739225, -395538.4437005599 -8068093.241481589, -51461.2296841651 -8028678.665519956))

