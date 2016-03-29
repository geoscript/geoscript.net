.. cssclass:: tagline

    GeoScript adds spatial capabilities to dynamic scripting languages 

GeoScript implementations are available in `JavaScript <js>`_, `Python <py>`_, `Scala <scala>`_, `Groovy <groovy>`_, and `Ruby <ruby>`_.

.. cssclass:: tab-js ui-tabs-hide

.. code-block:: javascript

    >> var geom = require("geoscript/geom");
    >> var p = new geom.Point([-111.0, 45.7]);
    >> p
    <Point [-111, 45.7]>
    >> var proj = require("geoscript/proj");
    >> var p2 = proj.transform(p, "epsg:4326", "epsg:26912");
    >> p2
    <Point [500000, 5060716.31816507]>
    >> var poly = p2.buffer(100);
    >> poly.area
    31214.451522458345


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
    groovy:000> p = new Point(-111, 45.7)
    ===> POINT (-111 45.7)
    groovy:000> p2 = Projection.transform(p, 'epsg:4326', 'epsg:26912')
    ===> POINT (499999.42501775385, 5060716.092032814)
    groovy:000> poly = p2.buffer(100)
    groovy:000> poly.area
    ===> 31214.451522477902

.. cssclass:: tab-ruby ui-tabs-hide

.. code-block:: ruby

    irb(main):001:0> require 'geoscript'
    => true
    irb(main):002:0> include GeoScript::Geom
    => Object
    irb(main):003:0> p = Point.create -111.0, 45.7
    => #<GeoScript::Geom::Point:0x76c5495 @bounds=#<GeoScript::Geom::Bounds:0x7317851>>
    irb(main):004:0> p.to_wkt
    => "POINT (-111.0 45.7)"
    irb(main):005:0> p2 = GeoScript::Projection.reproject p, 'epsg:4326', 'epsg:26912'
    => #<Java::ComVividsolutionsJtsGeom::Point:0x5ad7eb94>
    irb(main):006:0> p2.x
    => 500000.0
    irb(main):007:0> p2.y
    => 5060716.313515949
    irb(main):008:0> poly = p2.buffer 100
    => #<Java::ComVividsolutionsJtsGeom::Polygon:0xb034979>
    irb(main):009:0> poly.get_area
    => 31214.451522458345

Find out more :ref:`about <about>` the GeoScript project and how to :ref:`get involved <get_involved>`.  See the :ref:`learning center <learning>` for an
overview of the library.

GeoScript is open source and licenced under the `MIT License <http://en.wikipedia.org/wiki/MIT_License>`_.  


.. toctree::
   :hidden: 

   about
   learning/index
   examples/index
   tutorials/index
   get_involved
