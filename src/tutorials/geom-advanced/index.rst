.. _tutorials.geom-advanced-py:

Geometry Advanced
=================

The tutorial introduces some more advanced concepts of the geometry module such as:

* Simplification
* Affine transformation
* Voronoi diagrams and Delaunay triangulation

Prerequisites
-------------

It is recommended that the ref:`tutorials.geom-basic` tutorial be completed before proceeding.

Simplification
--------------

The *simplify* function is used to reduce the number of coordinates composing a geometry, using
the `Douglas-Peucker <http://en.wikipedia.org/wiki/Ramer–Douglas–Peucker_algorithm>`_ algorithm.

.. code-block:: python

    >>> from geoscript.geom import *
    >>> from geoscript.render import plot

    >>> poly = Point(0,0).buffer(1);
    >>> plot(poly);

    >>> plot(simplify(poly, 0.05));
    >>> plot(simplify(poly, 0.1));
    
.. image:: simplify1.png

.. image:: simplify2.png

.. image:: simplify3.png

.. seealso::

   `simplify API reference <../py/api/geom/index.html#geoscript.geom.geom.simplify>`__

Transformations
---------------

The *transform* function is used to apply an affine (linear) transformation to a geometry object.
Transformation properties include displacement, scaling, shearing, and rotation. 

.. code-block:: python

    >>> import math
    >>> from geoscript.geom import *
    >>> from geoscript.render import plot

    # displacement
    >>> poly = Point(0,0).buffer(1);
    >>> plot([poly, transform(poly, dx=0.75)])

    # scale + shear
    >>> poly = Polygon([(0,0),(1,0),(1,1),(0,1),(0,0)])
    >>> plot([poly, transform(sx=2, sy=2, shx=1)])

    # rotation
    >>> poly = Polygon([(-5,-2),(5,-2),(5,2),(-5,2), (-5,-2)])
    >>> poly = poly.union(transform(poly, r=math.degrees(90)))
    >>> plot([poly, transform(poly, r=math.degrees(45))])

.. image:: transform1.png

.. image:: transform2.png

.. image:: transform3.png

.. seealso::

   `transform API reference <../py/api/geom/index.html#geoscript.geom.geom.transform>`__

Delaunay Triangulation and Voronoi Diagrams
-------------------------------------------

For a set of input points (sites) in a given space, a 
`Voronoi diagram <http://en.wikipedia.org/wiki/Voronoi_diagram>`_ computes a tessellation (set of
polygons) of that space such that for each point p, the containing polygon consists of all points
closer to p than any other point.

In order to compute a Voronoi diagram, a 
`Delaunay triangulation <http://en.wikipedia.org/wiki/Delaunay_triangulation>`_ is first computed
on the input points. 

.. code-block:: python

    >>> from geoscript.geom import *
    >>> from geoscript.render import plot

    >>> poly = Polygon([(35,10), (10,20), (15,40), (45,45), (35,10)], [(20,30), (35,35), (30,20), (20,30)])
    >>> dt = delaunay(poly)
    >>> plot([poly, dt[0]])

    >>> vd = voronoi(poly)
    >>> plot([poly, vd])


.. image:: voronoi1.png

.. image:: voronoi2.png

.. seealso::

   `delaunay API reference <../py/api/geom/index.html#geoscript.geom.geom.delaunay>`__

   `voronoi API reference <../py/api/geom/index.html#geoscript.geom.geom.voronoi>`__
