Introducing GeoScript
=====================

GeoScript provides geospatial data access, manipulation, and rendering ability
to dynamic scripting languages.

.. cssclass:: tab-js ui-tabs-hide

.. code-block:: javascript

    js> var geom = require("geoscript/geom");
    js> var p = new geom.Point([-111.0, 45.7]);
    js> p
    <Point [-111, 45.7]>
    js> var proj = require("geoscript/proj");
    js> var p2 = proj.transform(p, "epsg:4326", "epsg:26912");
    js> p2
    <Point [499999.42501775385, 5060716.092032814]>
    js> var poly = p2.buffer(100);
    js> poly.area
    31214.45152247697

.. cssclass:: tab-py ui-tabs-hide

.. code-block:: python

    >>> from geoscript import geom
    >>> p = geom.Point(-111.0, 45.7)
    >>> p
    POINT(-111 45.7)
    >>> from geoscript import proj
    >>> p2 = proj.transform(p, 'epsg:4326', 'epsg:26912')
    >>> p2
    POINT (499999.42501775385 5060716.092032814)
    >>> poly = p2.buffer(100)
    >>> poly.getArea()
    31214.45152247697

.. cssclass:: tab-scala ui-tabs-hide

.. code-block:: scala

   scala> import org.geoscript.geometry._
   scala> import org.geoscript.projection._
   scala> val p = Point(-110, 45.7) in Projection("EPSG:4326")
   p: org.geoscript.geometry.Point = POINT (-110 45.7)
   
   scala> val p2 = p in Projection("EPSG:26912")               
   p2: org.geoscript.geometry.Point = POINT (-370416.94184711506 -7935053.5498699695)
   
   scala> p2.buffer(100).area
   res0: Double = 31214.451522477902

.. cssclass:: tab-groovy ui-tabs-hide

.. code-block:: groovy

    groovy:000> import geoscript.geom.*
    groovy:000> import geoscript.proj.Projection
    groovy:000> p = new Point(-110, 45.7)
    ===> POINT (-110 45.7)
    groovy:000> p2 = Projection.transform(p, 'epsg:4326', 'epsg:26912')
    ===> POINT (-370416.94184711506 -7935053.5498699695)
    groovy:000> poly = p2.buffer(100)
    groovy:000> poly.area
    ===> 31214.451522477902

Currently you can choose between GeoScript implementations in `JavaScript <js>`_, `Python <py>`_, `Scala <scala>`_, and `Groovy <groovy>`_.

Find out more :ref:`about <about>` the GeoScript project and how to :ref:`get
involved <get_involved>`.  See the :ref:`learning center <learning>` for an
overview of the library.


.. toctree::
   :hidden: 

   about
   learning/index
   examples/index
   get_involved
