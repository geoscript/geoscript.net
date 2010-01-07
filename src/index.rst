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


Currently you can choose between GeoScript implementations in `JavaScript <js>`_
and `Python <py>`_.

Find out more :ref:`about <about>` the GeoScript project and how to :ref:`get
involved <get_involved>`.

.. toctree::
   :hidden: 

   about
   get_involved
