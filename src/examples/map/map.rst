.. _examples.map.map:

Map
===
A Map can draw one or more Layers to an image using Styles.

.. cssclass:: show-chooser

.. rubric:: code chooser

Options
-------
* **width**: The width of the rendered image (400).
* **height**: The height of the rendered image (400).
* **imageType**: The image type ("png", "jpeg", "gif")
* **backgroundColor**: The background color (null for transparent, "white", "255,255,255", "#ffffff")
* **fixAspectRatio**: Whether to fix the aspect ratio or not (true, false)
* **proj**: The geoscript.proj.Projection ("EPSG:4326", new Projection("4326"))
* **bounds**: The geographic extent (new geoscript.geom.Bounds(-126, 45.315, -116, 50.356))

Save Map to an image
--------------------

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.map.Map
    ===> [import geoscript.map.Map]

    groovy:000> import geoscript.geom.Bounds
    ===> [import geoscript.map.Map, import geoscript.geom.Bounds]

    groovy:000> map = new Map(
        width:400,
        height:400,
        imageType:"png",
        backgroundColor:"white",
        fixAspectRatio:true,
        proj: "EPSG:4326",
        bounds: new Bounds(-126, 45.315, -116, 50.356)
    )
    ===> geoscript.map.Map@2025b64d

    groovy:000> import geoscript.layer.Shapefile
    ===> [import geoscript.map.Map, import geoscript.geom.Bounds, import geoscript.proj.Projection, import geoscript.layer.Shapefile]

    groovy:000> shp = new Shapefile("states.shp")
    ===> geoscript.layer.Shapefile@2f78743b

    groovy:000> map.addLayer(shp)
    ===> null

    groovy:000> map.render("washington.png")
    ===> null