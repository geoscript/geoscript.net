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
   >>> prj.transform((-111 45.7), 'epsg:26912')
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
