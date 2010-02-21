.. _examples.geom.prepare:

Prepared Geometries
===================

.. cssclass:: show-chooser

.. rubric:: code chooser

When performing multiple successive operations on a geometry, it is more
efficient to prepare the geometry first.  Preparing optimizes the geometry for
multiple calls to ``contains``, ``coveredBy``, ``covers``, ``crosses``, 
``disjoint``, ``intersects``, ``overlaps``, ``touches``, and ``within``.


.. cssclass:: code py

.. code-block:: python

    >>> from geoscript import geom
    
    >>> poly1 = geom.fromWKT('POLYGON ((0 0, 5 0, 5 5, 0 5, 0 0))')
    >>> prep = geom.prepare(poly1)
    >>> poly2 = geom.fromWKT('POLYGON ((2 2, 8 2, 8 8, 2 8, 2 2))')
    >>> prep.intersects(poly2)
    True
    >>> prep.contains(poly2)
    False

.. cssclass:: code js

.. code-block:: javascript

    js> var GEOM = require("geoscript/geom");

    js> var poly1 = GEOM.fromWKT("POLYGON ((0 0, 5 0, 5 5, 0 5, 0 0))");
    js> poly1.prepared
    false
    js> poly1.prepare();
    <Polygon [[[0, 0], [5, 0], [5, 5], [0, 5], [0, 0]]]>
    js> var poly2 = GEOM.fromWKT("POLYGON ((2 2, 8 2, 8 8, 2 8, 2 2))");
    js> poly1.intersects(poly2)
    true
    js> poly1.contains(poly2)
    false

.. cssclass:: code scala

.. code-block:: scala

    scala> import org.geoscript.geometry._

    scala> var poly1 = Geometry.fromWKT("POLYGON ((0 0, 5 0, 5 5, 0 5, 0 0))")
    poly1: org.geoscript.geometry.Geometry = POLYGON ((0 0, 5 0, 5 5, 0 5, 0 0))

    scala> poly1.prepared
    res0: Boolean = false

    scala> val prepared = poly1.prepare()
    prepared: org.geoscript.geometry.Geometry = POLYGON ((0 0, 5 0, 5 5, 0 5, 0 0))

    scala> var poly2 = GEOM.fromWKT("POLYGON ((2 2, 8 2, 8 8, 2 8, 2 2))")
    poly2: org.geoscript.geometry.Geometry = POLYGON ((2 2, 8 2, 8 8, 2 8, 2 2))

    scala> prepared.intersects(poly2)
    res1: Boolean = true

    scala> prepared.contains(poly2)
    res2: Boolean = false
