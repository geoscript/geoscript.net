.. _tutorials.proj-basic:

Projection Basics
=================

.. cssclass:: show-chooser

.. rubric:: code chooser

This tutorial introduces the basic classes, methods, and functions of the 
proj module. It focuses mainly on basic topics such as:

* Projection construction and representation
* Coordinate reference system transformations

EPSG
----

The `European Petroleum Survey Group <http://www.epsg.org/>`_ is the body that maintains the
`EPSG Geodetic Parameter Dataset <http://www.epsg.org/CurrentDB.html>`_, better known as the
"EPSG database". This dataset is the primary source of supported coordinate reference systems
in GeoTools, and by extension GeoScript.

Projection Objects
------------------

The *Projection* class is the primary class of the *proj* module. Projection objects can be
constructed in one of two ways. The first is by specifying an EPSG code reference. The second is
by specifying the Well Known Text (WKT) of the coordinate reference system directly.

.. cssclass:: code py

.. code-block:: python

    >>> from geoscript.proj import Projection

    >>> Projection('EPSG:4326')
    GEOGCS["WGS 84", 
      DATUM["World Geodetic System 1984", 
        SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], 
        AUTHORITY["EPSG","6326"]], 
      PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], 
      UNIT["degree", 0.017453292519943295], 
      AXIS["Geodetic latitude", NORTH], 
      AXIS["Geodetic longitude", EAST], 
      AUTHORITY["EPSG","4326"]]
    
    >>> Projection('GEOGCS["GCS_WGS_1984",DATUM["WGS_1984",SPHEROID["WGS_1984",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]]')
    GEOGCS["GCS_WGS_1984", 
      DATUM["WGS_1984", 
        SPHEROID["WGS_1984", 6378137.0, 298.257223563]], 
      PRIMEM["Greenwich", 0.0], 
      UNIT["degree", 0.017453292519943295], 
      AXIS["Longitude", EAST], 
      AXIS["Latitude", NORTH]]


.. cssclass:: code js

.. code-block:: javascript

    js> var proj = require("geoscript/proj")

    js> var wgs84 = proj.Projection("epsg:4326")
    js> wgs84
    <Projection EPSG:4326>

    js> wgs84.wkt
    GEOGCS["WGS 84", 
      DATUM["World Geodetic System 1984", 
        SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], 
        AUTHORITY["EPSG","6326"]], 
      PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], 
      UNIT["degree", 0.017453292519943295], 
      AXIS["Geodetic longitude", EAST], 
      AXIS["Geodetic latitude", NORTH], 
      AUTHORITY["EPSG","4326"]]

      js> var p = proj.Projection('GEOGCS["GCS_WGS_1984",DATUM["WGS_1984",SPHEROID["WGS_1984",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]]')
      js> p
      <Projection EPSG:4326>

.. cssclass:: refs py

.. seealso::

   `proj API reference <../../py/api/proj.html>`__

.. cssclass:: refs js

.. seealso::

   `proj API reference <../../js/api/proj.html>`__


Determining EPSG Codes
----------------------

Often a spatial reference system  is encountered that does not have an EPSG code associated
with it. This can happen for a few different reasons.

* The coordinate reference system does not exist in the EPSG database
* The WKT representation is not complete enough to map to an EPSG entry

.. cssclass:: code py

.. code-block:: python

    >>> from geoscript.proj import Projection

    >>> wkt = 'PROJCS["NAD_1983_HARN_StatePlane_Colorado_Central_FIPS_0502_Feet", GEOGCS["GCS_North_American_1983_HARN", DATUM["Unknown", SPHEROID["GRS_1980", 6378137.0, 298.257222101]], PRIMEM["Greenwich", 0.0], UNIT["degree", 0.017453292519943295], AXIS["Longitude", EAST], AXIS["Latitude", NORTH]], PROJECTION["Lambert_Conformal_Conic_2SP"], PARAMETER["central_meridian", -105.5], PARAMETER["latitude_of_origin", 37.833333333333336], PARAMETER["standard_parallel_1", 39.75], PARAMETER["false_easting", 3000000.000316083], PARAMETER["false_northing", 999999.999996], PARAMETER["scale_factor", 1.0], PARAMETER["standard_parallel_2", 38.45], UNIT["foot_survey_us", 0.3048006096012192], AXIS["X", EAST], AXIS["Y", NORTH]]'
    >>> p = Projection(wkt)
    >>> p.id
    None

.. cssclass:: code js

.. code-block:: javascript

    js> var proj = require("geoscript/proj")

    js> var wkt = 'PROJCS["NAD_1983_HARN_StatePlane_Colorado_Central_FIPS_0502_Feet", GEOGCS["GCS_North_American_1983_HARN", DATUM["Unknown", SPHEROID["GRS_1980", 6378137.0, 298.257222101]], PRIMEM["Greenwich", 0.0], UNIT["degree", 0.017453292519943295], AXIS["Longitude", EAST], AXIS["Latitude", NORTH]], PROJECTION["Lambert_Conformal_Conic_2SP"], PARAMETER["central_meridian", -105.5], PARAMETER["latitude_of_origin", 37.833333333333336], PARAMETER["standard_parallel_1", 39.75], PARAMETER["false_easting", 3000000.000316083], PARAMETER["false_northing", 999999.999996], PARAMETER["scale_factor", 1.0], PARAMETER["standard_parallel_2", 38.45], UNIT["foot_survey_us", 0.3048006096012192], AXIS["X", EAST], AXIS["Y", NORTH]]'
    js> var p = proj.Projection(wkt)

    js> p
    <Projection>

    js> p.id === undefined
    true


In this case some useful online resources are:

  http://spatialreference.org/

    Catalogue of many spatial reference systems.

  http://prj2epsg.org

    Service for mapping projection Well Known Text to the EPSG database.
  
