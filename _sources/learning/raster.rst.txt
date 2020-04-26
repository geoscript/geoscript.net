.. _learning.raster:

Rasters
=======

.. cssclass:: show-chooser

.. rubric:: code chooser

A :class:`Raster` is a spatial data set represented by a grid of cells organized in one or more bands.

You can read and write Rasters in different formats including GeoTIFF, WorldImage, and MrSID.

.. cssclass:: code groovy

.. code-block:: groovy
    
    groovy:000> import geoscript.layer.GeoTIFF
    groovy:000> format = new GeoTIFF(new File("raster.tif"))
    groovy:000> raster = format.read()
    groovy:000> raster.proj.id
    ===> EPSG:4326
    groovy:000> raster.bounds
    ===> (-180.0,-90.00000000000001,180.0,90.0,EPSG:4326)

You can get values from the Raster using geographic Points or pixel coordinates.

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.geom.Point
    groovy:000> raster.getValue(new Point(0,0))
    ===> 227.0

    groovy:000> raster.getValue(10,10)
    ===> 184.0

You can easily do all sorts of operatations on Rasters. You can extract a subset of a Raster by cropping either by a geographic bounding box or pixel coordinates.

.. cssclass:: code groovy

.. code-block:: groovy
    
    groovy:000> import geoscript.geom.Bounds
    groovy:000> raster2 = raster.crop(new Bounds(-10,-10,10,10))
    groovy:000> raster2.bounds
    ===> (-10.0,-10.000000000000014,10.0,9.999999999999986,EPSG:4326)

    
    groovy:000> raster3 = raster.crop(0,0,10,10)
    groovy:000> raster3.bounds
    ===> (-180.0,85.6,-175.60000000000002,90.0,EPSG:4326)

You can resample a Raster by changing it's extent or size.

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> raster4 = raster2.resample(bbox: new Bounds(-20,-20,0,0))
    groovy:000> raster4.bounds
    ===> (-20.0,-20.0,0.0,0.0,EPSG:4326)

And you can even simple or complex raster algebra (which uses Jiffle).

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> raster5 = raster4 + 10
    groovy:000> raster4.getValue(10,10)
    ===> 0.0
    groovy:000> raster5.getValue(10,10)
    ===> 10.0

    groovy:000> import geoscript.layer.MapAlgebra
    groovy:000> algebra = new MapAlgebra()
    groovy:000> output = algebra.calculate("dest = src > 200;", [src: raster], size: [600,400])
    groovy:000> output.size
    ===> [600,400]
    groovy:000> output.bounds
    ===> (-180.0,-90.00000000000001,180.0,90.0,EPSG:4326)
    


