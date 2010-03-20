.. _examples.proj.create:

Creating Projections
====================

.. cssclass:: show-chooser

.. rubric:: code chooser

From an EPSG Code
-----------------

.. cssclass:: code py

.. code-block:: python

   >>> from geoscript.proj import Projection 

   >>> prj = Projection('epsg:26912')
   >>> prj
   PROJCS["NAD83 / UTM zone 12N", 
     GEOGCS["NAD83", 
       DATUM["North American Datum 1983", 
         SPHEROID["GRS 1980", 6378137.0, 298.257222101, AUTHORITY["EPSG","7019"]], 
         TOWGS84[1.0, 1.0, -1.0, 0.0, 0.0, 0.0, 0.0], 
         AUTHORITY["EPSG","6269"]], 
       PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], 
       UNIT["degree", 0.017453292519943295], 
       AXIS["Geodetic longitude", EAST], 
       AXIS["Geodetic latitude", NORTH], 
       AUTHORITY["EPSG","4269"]], 
     PROJECTION["Transverse Mercator", AUTHORITY["EPSG","9807"]], 
     PARAMETER["central_meridian", -111.0], 
     PARAMETER["latitude_of_origin", 0.0], 
     PARAMETER["scale_factor", 0.9996], 
     PARAMETER["false_easting", 500000.0], 
     PARAMETER["false_northing", 0.0], 
     UNIT["m", 1.0], 
     AXIS["Easting", EAST], 
     AXIS["Northing", NORTH], 
     AUTHORITY["EPSG","26912"]]

.. cssclass:: code js

.. code-block:: javascript

    js> var PROJ = require("geoscript/proj");

    js> var projection = new PROJ.Projection("epsg:26912");
    js> projection
    <Projection EPSG:26912>

.. cssclass:: code scala

.. code-block:: scala

    scala> import org.geoscript.projection.Projection
    scala> val proj = Projection("epsg:26912")
    proj: org.geoscript.projection.Projection = EPSG:26912

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.proj.Projection
    ===> [import geoscript.proj.Projection]

    groovy:000> proj = new Projection("epsg:26912")
    ===> EPSG:26912


From Well Known Text
--------------------
  
.. cssclass:: code py

.. code-block:: python

   >>> from geoscript.proj import Projection 

   >>> wkt = 'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]]'
   >>> prj = Projection(wkt)
   >>> prj
   GEOGCS["GCS_WGS_1984", 
     DATUM["D_WGS_1984", 
       SPHEROID["WGS_1984", 6378137.0, 298.257223563]], 
     PRIMEM["Greenwich", 0.0], 
     UNIT["degree", 0.017453292519943295], 
     AXIS["Longitude", EAST], 
     AXIS["Latitude", NORTH]]

.. cssclass:: code js

.. code-block:: javascript

    js> var PROJ = require("geoscript/proj");

    js> var wkt = 'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]]'; 
    js> var projection = new PROJ.Projection(wkt);
    js> projection
    <Projection EPSG:4326>

.. cssclass:: code scala

.. code-block:: scala

    scala> import org.geoscript.projection.Projection
    scala> val wkt = """GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]]""" 
    wkt: java.lang.String = GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]]
    scala> val proj = Projection(wkt)
    proj: org.geoscript.projection.Projection = GCS_WGS_1984

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.proj.Projection
    ===> [import geoscript.proj.Projection]

    groovy:000> wkt = """GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]]"""
    ===> GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]]

    groovy:000> proj = new Projection(wkt)
    ===> EPSG:4326
