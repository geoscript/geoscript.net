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

     TODO

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

     TODO

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

     TODO

