.. _examples.geom.relate:

Geometry Relationships
======================

.. cssclass:: show-chooser

.. rubric:: code chooser

Intersection
------------

.. cssclass:: code py

.. code-block:: python

    >>> from geoscript import geom
    
    >>> poly1 = geom.fromWKT('POLYGON ((0 0, 8 0, 8 8, 0 8, 0 0))')
    >>> poly2 = geom.fromWKT('POLYGON ((5 5, 13 5, 13 13, 5 13, 5 5))')
    >>> poly1.intersection(poly2)
    POLYGON ((5 8, 8 8, 8 5, 5 5, 5 8))
       
.. cssclass:: code js

.. code-block:: javascript

    js> var GEOM = require("geoscript/geom");

    js> var poly1 = GEOM.fromWKT("POLYGON ((0 0, 8 0, 8 8, 0 8, 0 0))");
    js> var poly2 = GEOM.fromWKT("POLYGON ((5 5, 13 5, 13 13, 5 13, 5 5))");
    js> poly1.intersection(poly2)
    <Polygon [[[5, 8], [8, 8], [8, 5], [5, 5], [5, 8]]]>

.. cssclass:: code scala

.. code-block:: scala

    scala> import org.geoscript.geometry.Geometry
    scala> val poly1 = Geometry.fromWKT("POLYGON ((0 0, 8 0, 8 8, 0 8, 0 0))")
    poly1: org.geoscript.geometry.Geometry = POLYGON ((0 0, 8 0, 8 8, 0 8, 0 0))

    scala> val poly2 = Geometry.fromWKT("POLYGON ((5 5, 13 5, 13 13, 5 13, 5 5))")
    poly2: org.geoscript.geometry.Geometry = POLYGON ((5 5, 13 5, 13 13, 5 13, 5 5))

    scala> poly1 intersection poly2
    res0: org.geoscript.geometry.Geometry = POLYGON ((5 8, 8 8, 8 5, 5 5, 5 8))

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.geom.*
    ===> [import geoscript.geom.*]

    groovy:000> poly1 = Geometry.fromWKT("POLYGON ((0 0, 8 0, 8 8, 0 8, 0 0))")
    ===> POLYGON ((0 0, 8 0, 8 8, 0 8, 0 0))

    groovy:000> poly2 = Geometry.fromWKT("POLYGON ((5 5, 13 5, 13 13, 5 13, 5 5))")
    ===> POLYGON ((5 5, 13 5, 13 13, 5 13, 5 5))

    groovy:000> poly1.intersection(poly2)
    ===> POLYGON ((5 8, 8 8, 8 5, 5 5, 5 8))

Union
-----

.. cssclass:: code py

.. code-block:: python

    >>> from geoscript import geom
    
    >>> poly1 = geom.fromWKT('POLYGON ((0 0, 8 0, 8 8, 0 8, 0 0))')
    >>> poly2 = geom.fromWKT('POLYGON ((5 5, 13 5, 13 13, 5 13, 5 5))')
    >>> poly1.union(poly2)
    POLYGON ((8 5, 8 0, 0 0, 0 8, 5 8, 5 13, 13 13, 13 5, 8 5))
       
.. cssclass:: code js

.. code-block:: javascript

    js> var GEOM = require("geoscript/geom");

    js> var poly1 = GEOM.fromWKT("POLYGON ((0 0, 8 0, 8 8, 0 8, 0 0))");
    js> var poly2 = GEOM.fromWKT("POLYGON ((5 5, 13 5, 13 13, 5 13, 5 5))");
    js> poly1.union(poly2)
    <Polygon [[[8, 5], [8, 0], [0, 0], [0, 8], [5, 8], [5, 13], [13, 13],...>

.. cssclass:: code scala

.. code-block:: scala

    scala> import org.geoscript.geometry.Geometry
    scala> val poly1 = Geometry.fromWKT("POLYGON ((0 0, 8 0, 8 8, 0 8, 0 0))")
    poly1: org.geoscript.geometry.Geometry = POLYGON ((0 0, 8 0, 8 8, 0 8, 0 0))

    scala> val poly2 = Geometry.fromWKT("POLYGON ((5 5, 13 5, 13 13, 5 13, 5 5))")
    poly2: org.geoscript.geometry.Geometry = POLYGON ((5 5, 13 5, 13 13, 5 13, 5 5))

    scala> poly1 union poly2                                                      
    res0: org.geoscript.geometry.Geometry = POLYGON ((8 5, 8 0, 0 0, 0 8, 5 8, 5 13, 13 13, 13 5, 8 5))

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.geom.*
    ===> [import geoscript.geom.*]

    groovy:000> poly1 = Geometry.fromWKT("POLYGON ((0 0, 8 0, 8 8, 0 8, 0 0))")
    ===> POLYGON ((0 0, 8 0, 8 8, 0 8, 0 0))

    groovy:000> poly2 = Geometry.fromWKT("POLYGON ((5 5, 13 5, 13 13, 5 13, 5 5))")
    ===> POLYGON ((5 5, 13 5, 13 13, 5 13, 5 5))

    groovy:000> poly1.union(poly2)
    ===> POLYGON ((8 5, 8 0, 0 0, 0 8, 5 8, 5 13, 13 13, 13 5, 8 5))