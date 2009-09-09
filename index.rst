Introducing GeoScript
=====================

GeoScript provides geospatial data access, manipulation, and rendering ability to dynamic scripting languages.

.. code-block:: javascript

    js> var geom = require('geoscript/geom');
    js> var p = new geom.Point([-111.0, 45.7]);
    js> p
    POINT (-111 45.7)
    js> var proj = require('geoscript/proj');
    js> var p2 = proj.transform(p, 'epsg:4326', 'epsg:26912');
    js> p2
    POINT (499999.42501775385 5060716.092032814)
    js> var poly = p2.buffer(100);
    js> poly.getArea()
    31214.45152247697


Wait, is that JavaScript?
-------------------------

Yes, you can choose from an implementation of GeoScript in :doc:`JavaScript <js/index>` or
`Python <http://github.com/jdeolive/geoscript-py/tree/master>`_.


.. toctree::
    :hidden:
    :glob:

    js/*
