.. _learning.geom:

Geometries
==========

.. cssclass:: show-chooser

.. rubric:: code chooser

The :mod:`geom` module provides classes for representing two
dimensional spatial objects, or geometries. Geometry objects are created by
specifying sets of coordinates.

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

    js> var GEOM = require("geoscript/geom");

    js> var point = new GEOM.Point([10, 10]);
    js> point
    <Point [10, 10]>

    js> var line = new GEOM.LineString([[10, 10], [20, 20], [30, 40]]);
    js> line
    <LineString [[10, 10], [20, 20], [30, 40]]>

  
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

    js> var GEOM = require("geoscript/geom");

    js> var poly = GEOM.fromWKT("POLYGON ((10 10, 10 20, 20 20, 20 15, 10 10))");
    js> poly
    <Polygon [[[10, 10], [10, 20], [20, 20], [20, 15], [10, 10]]]>


Geometry objects provide a number of methods for calculating properties of a
geometry. For example methods for obtaining area and length.

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

    js> var GEOM = require("geoscript/geom");

    js> var poly = GEOM.fromWKT("POLYGON ((10 10, 10 20, 20 20, 20 15, 10 10))");
    js> poly.area
    75
    js> poly.length
    36.180339887498945


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

    js> var GEOM = require("geoscript/geom");

    js> var line = new GEOM.LineString([[10, 10], [20, 20], [30, 40]]);
    js> var poly = line.buffer(10);
    js> poly.area
    1041.9912814842407
    js> // TODO: add geometry.centroid


The Geometry class also contains operations and predicates for determining
spatial relationships such as intersection and containment.

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

    js> var GEOM = require("geoscript/geom");

    js> var line = new GEOM.LineString([[10, 10], [20, 20], [30, 40]]);
    js> var poly = new GEOM.Polygon([[[10, 10], [10, 20], [20, 20], [20, 15], [10, 10]]]);
    js> poly.intersects(line)
    true
    js> poly.intersection(line)
    <LineString [[10, 10], [20, 20]]>


The geoscript geometry module is based on the `JTS
<http://tsusiatsoftware.net/jts/main.html>`_ library. Classes in the
:mod:`geom` module are extensions of their counterparts from JTS which
means any JTS geometry methods can be called on a geoscript geometry instance.
See the JTS `javadocs
<http://tsusiatsoftware.net/jts/javadoc/com/vividsolutions/jts/geom/Geometry.html>`_
for more information.
