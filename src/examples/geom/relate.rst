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

       TODO

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

       TODO
       
Prepared Geometries
-------------------

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

       TODO