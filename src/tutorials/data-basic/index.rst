.. _tutorials.data-basic:

Layers and Workspaces
=====================

.. cssclass:: show-chooser

.. rubric:: code chooser

This tutorial introduces the concepts of basic data access and analysis with the layer and workspace modules, performing tasks such as:

* Accessing and analyzing data with layers
* Managing collections of layers with Workspaces
* Serializing/deserializing layer objects to/from various formats
* Reprojecting layers
* Translating layers between data formats

Prerequisites
-------------

It is recommended that the :ref:`tutorials.geom-basic` and :ref:`tutorials.proj-basic` tutorials be completed before proceeding.

This tutorial makes use of the following datasets. 

  `denver_shapefiles.zip <http://data.opengeo.org/geoscript/denver_shapefiles.zip>`_

    Shapefiles from the Denver, Colarado area. Made available courtesy of the `City of Denver <http://www.denvergov.org/GIS>`_.

  `colorado_shapefiles.zip <http://data.opengeo.org/geoscript/colorado_shapefiles.zip>`_

    Open Street Map based Shapefiles from Colorado state. Made available courtesy of `Cloudmade <http://downloads.cloudmade.com/>`_. 

Download the archives and unpack them into your working directory.

Layer Objects
-------------

The *Layer* class is the primary API for data access. It provides methods that allow for querying
and reading data, in addition to methods that allow for modification of the underlying data. 

.. cssclass:: code py

.. code-block:: python

    >>> from geoscript.geom import *
    >>> from geoscript.layer import *

    >>> l = Layer("foo")
    >>> l.add([Point(0,0)])
    >>> l.add([Point(1,1)])
    >>> l.add([Point(2,2)])
    >>> l.add([Point(3,3)])
    >>> l.add([Point(4,4)])
  
    >>> l.count()
    5
   
    >>> l.bounds()
    (0.0, 0.0, 4.0, 4.0, EPSG:4326)

.. cssclass:: code js

.. code-block:: javascript

    js> var Point = require("geoscript/geom").Point;
    js> var Layer = require("geoscript/layer").Layer;

    js> var layer = Layer("points");
    js> layer.add({geom: Point([0, 0])});
    js> layer.add({geom: Point([1, 1])});
    js> layer.add({geom: Point([2, 2])});
    js> layer.add({geom: Point([3, 3])});
    js> layer.add({geom: Point([4, 4])});

    js> layer.count
    5

    js> layer.bounds
    <Bounds [0, 0, 4, 4]>

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.geom.* 
    groovy:000> import geoscript.layer.*

    groovy:000> l = new Layer("pts")
    groovy:000> l.add([new Point(0,0)])
    groovy:000> l.add([new Point(1,1)])
    groovy:000> l.add([new Point(2,2)])
    groovy:000> l.add([new Point(3,3)])
    groovy:000> l.add([new Point(4,4)])

    groovy:000> l.count                
    ===> 5

    groovy:000> l.bounds
    ===> (0.0,0.0,4.0,4.0)

The contents of a layer are *Feature* objects. A feature is a set of attributes and an associated geometry. Through a layer object one can get at the underlying features.

.. cssclass:: code py

.. code-block:: python

   >>> for f in l.features():
   >>> ... print f
   foo.fid-7f2cfebd_132545fee40_-7fff {geom: POINT (0 0)}
   foo.fid-7f2cfebd_132545fee40_-7ffd {geom: POINT (1 1)}
   foo.fid-7f2cfebd_132545fee40_-7ffb {geom: POINT (2 2)}
   foo.fid-7f2cfebd_132545fee40_-7ff9 {geom: POINT (3 3)}
   foo.fid-7f2cfebd_132545fee40_-7ff7 {geom: POINT (4 4)}

.. cssclass:: code js

.. code-block:: javascript

    js> layer.features.forEach(function(feature) {
      >     print(feature);                       
      > })
    <Feature geom: <Point>>
    <Feature geom: <Point>>
    <Feature geom: <Point>>
    <Feature geom: <Point>>
    <Feature geom: <Point>>

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> l.features.each{f -> println f}
    features.fid-3a165b59_1356e0aabcd_-8000 geom: POINT (0 0)
    features.fid-3a165b59_1356e0aabcd_-7fff geom: POINT (1 1)
    features.fid-3a165b59_1356e0aabcd_-7ffe geom: POINT (2 2)
    features.fid-3a165b59_1356e0aabcd_-7ffd geom: POINT (3 3)
    features.fid-3a165b59_1356e0aabcd_-7ffc geom: POINT (4 4)

Filters can be used to constrain the result set of a feature query. A 
filter is specified as `Contextual Query Language <http://docs.geotools.org/latest/userguide/library/cql/index.html>`_ (CQL), a concise format for specifying predicates when working with geospatial data. 

.. cssclass:: code py

.. code-block:: python

   >>> for f in l.features('INTERSECTS(geom, POLYGON ((1.5 1.5, 1.5 3.5, 3.5 3.5, 3.5 1.5, 1.5 1.5))'):
   foo.fid-7f2cfebd_132545fee40_-7ffb {geom: POINT (2 2)}
   foo.fid-7f2cfebd_132545fee40_-7ff9 {geom: POINT (3 3)}

.. cssclass:: code js

.. code-block:: javascript

    js> layer.query("INTERSECTS(geom, POLYGON ((1.5 1.5, 1.5 3.5, 3.5 3.5, 3.5 1.5, 1.5 1.5)))").forEach(function(feature) {
      >     print(feature.geometry);                                                                                        
      > })                                                                                                                  
    <Point [2, 2]>
    <Point [3, 3]>

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> l.getFeatures("INTERSECTS(geom, POLYGON ((1.5 1.5, 1.5 3.5, 3.5 3.5, 3.5 1.5, 1.5 1.5)))").each{f -> println f}
    features.fid-3a165b59_1356e0aabcd_-7ffe geom: POINT (2 2)
    features.fid-3a165b59_1356e0aabcd_-7ffd geom: POINT (3 3)
    
.. cssclass:: refs py

.. seealso::

   `layer API reference <../../py/api/layer/index.html>`__

.. cssclass:: refs js

.. seealso::

   `layer API reference <../../js/api/layer.html>`__

.. cssclass:: refs groovy

.. seealso::

   `layer API reference <../../groovy/api/geoscript/layer/Layer.html>`__

Workspace Objects
-----------------

A *Workspace* is a container for a collection of layers that allows one to look up layers by name, and create new layers. 

.. cssclass:: code py

.. code-block:: python

    >>> from geoscript.workspace import Workspace
    >>> from geoscript.layer import Layer
    >>> from geoscript.geom import *

    >>> ws = Workspace()

    # create new layers
    >>> ws.create('roads', [('geom', LineString), ('name', str)])
    >>> ws.create('cities', [('geom', Point), ('name', str), ('pop', float)])
    
    # add an existing layer
    >>> l = Layer(schema=Schema('states', [('geom', MultiPolygon), ('name', str)]))
    >>> ws.add(l)

    # list all layers
    >>> ws.layers()                                                          
    ['cities', 'roads', 'states']
    
    # get a layer
    >>> l = ws['roads']
    >>> l.schema
    roads [geom: LineString, name: str]


.. cssclass:: code js

.. code-block:: javascript

    js> var Memory = require("geoscript/workspace").Memory;
    js> var Layer = require("geoscript/layer").Layer;

    js> var ws = Memory();

    js> var roads = Layer({
      >     name: "roads",
      >     fields: [
      >         {name: "geom", type: "LineString"},
      >         {name: "name", type: "String"}
      >     ]
      > });
    js> ws.add(roads);
    <Layer name: roads, count: 0>

    js> var cities = Layer({
      >     name: "cities",
      >     fields: [
      >         {name: "geom", type: "Point"},
      >         {name: "name", type: "String"},
      >         {name: "pop", type: "Float"} 
      >     ]
      > });
    js> ws.add(cities) 
    <Layer name: cities, count: 0>

    js> var states = Layer({
      >     name: "states",
      >     fields: [
      >         {name: "geom", type: "MultiPolygon"},
      >         {name: "name", type: "String"}
      >     ]
      > });
    js> ws.add(states)
    <Layer name: states, count: 0>

    js> ws
    <Memory ["cities", "states", "roads"]>


.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.workspace.Memory
    groovy:000> import geoscript.feature.Schema   
    groovy:000> import geoscript.layer.Layer                                        

    groovy:000> ws = new Memory()

    groovy:000> ws.create("roads", [["geom","LineString"],["name","string"]])
    groovy:000> ws.create("cities", [["geom","Point"],["name","string"],["pop","float"]])

    groovy:000> l = new Layer("states", new Schema("states", [["geom","MultiPolygon"],["name","string"]]))
    groovy:000> ws.add(l)

    groovy:000> ws.layers
    ===> [cities, states, roads]

    groovy:000> l = ws["roads"]
    groovy:000> l.schema
    ===> roads geom: LineString, name: String

.. cssclass:: refs py

.. seealso::

   `layer API reference <../../py/api/workspace/index.html>`__

.. cssclass:: refs js

.. seealso::

   `layer API reference <../../js/api/workspace.html>`__

.. cssclass:: refs groovy

.. seealso::

    `layer API reference <../../groovy/api/geoscript/workspace/Workspace.html>`__

Exploring and Analyzing Data
----------------------------

Now that the layer and workspace concepts are familiar it is time to start working with the data downloaded for this tutorial. First create a workspace for the Denver shapefiles.

.. cssclass:: code py

.. code-block:: python

    >>> from geoscript.workspace import Directory

    >>> denver_shps = Directory('denver_shapefiles');
    >>> denver_shps.layers()
    ['census_boundaries', 'neighborhoods', 'city_boundary', 'election_precincts']

.. cssclass:: code js

.. code-block:: javascript

    js> var Directory = require("geoscript/workspace").Directory;
    js> var dir = Directory("denver_shapefiles");

    js> dir
    <Directory ["census_boundaries", "neighborhoods", "city_boundary", "ele...>

    js> dir.names
    census_boundaries,neighborhoods,city_boundary,election_precincts

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.workspace.Directory

    groovy:000> denver_shps = new Directory("denver_shapefiles")
    groovy:000> denver_shps.layers
    ===> [census_boundaries, neighborhoods, city_boundary, election_precincts]
    
.. note::

    In the above code sample the :class:`workspace.Directory` class is a specific type of 
    workspace used to manage a directory of shapefiles. 

Iterate through the layers of the workspace to gather some information.

.. cssclass:: code py

.. code-block:: python

    >>> for layer in denver_shps.values():
    ...   print 'Layer: %s' % layer.name
    ...   print 'Schema: %s' % layer.schema
    ...   print 'Projection: %s' % layer.proj
    ...   print 'Spatial extent: %s' % layer.bounds()
    ...   print 'Feature count: %d' % layer.count()
    Layer: census_boundaries
    Schema: census_boundaries [the_geom: MultiPolygon, ..., SHAPE_LEN: float]
    Projection: EPSG:2877
    Spatial extent: (3109862.14515, 1648944.33542, 3252651.33924, 1758893.81935, EPSG:2877)
    Feature count: 485
    ...
    
.. cssclass:: code js

.. code-block:: javascript

    js> dir.names.forEach(function(name) {  
      >     var layer = dir.get(name);      
      >     print(layer);                      
      > })
    <Layer name: census_boundaries, count: 485>
    <Layer name: neighborhoods, count: 78>
    <Layer name: city_boundary, count: 12>
    <Layer name: election_precincts, count: 429>

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> denver_shps.layers.each{name ->
        layer = denver_shps.get(name)
        println "Layer: ${layer.name}"
        println "Schema: ${layer.schema}"
        println "Projection: ${layer.proj}"
        println "Spatial extent: ${layer.bounds}"
        println "Feature count: ${layer.count}"
    }
    ===> Layer: census_boundaries
    ===> Schema: census_boundaries the_geom: MultiPolygon ... SHAPE_LEN: Double
    ===> Projection: PROJCS["NAD_1983_HARN_StatePlane_Colorado_Central_FIPS_0502_Feet", ... ]
    ===> Spatial extent: (3109862.1451475574,1648944.3354152828,3252651.3392448365,1758893.819345483,null)
    ===> Feature count: 485
    ... 

.. cssclass:: refs py

.. note::

    A workspace is essentially a dictionary in which keys are strings and values are layer objects so we can iterate over a workspace as we would a dictionary.

Visualize the *city_boundary* layer.

.. cssclass:: code py

.. code-block:: python

   >>> from geoscript.render import draw
   >>> draw(denver_shps['city_boundary'], format='mapwindow')

.. cssclass:: code js

.. code-block:: javascript

    js> var viewer = require("geoscript/viewer");
    js> var city = dir.get("city_boundary");
    js> viewer.draw(city);

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import static geoscript.render.Draw.draw
    groovy:000> draw(denver_shps['city_boundary'])

Format Translation
------------------

While shapefiles are the most commonly used format for geospatial vector data they are often not
ideal for a variety of reasons. A common task to perform is to import a collection of shapefiles
into a spatial database such as PostGIS.

Translate all the denver shapefiles into PostGIS by creating a new PostGIS workspace and adding all layers to it. If a PostGIS database is not available use H2, a popular embedded
Java database.

.. cssclass:: code py

.. code-block:: python

    >>> from geoscript.workspace import PostGIS, H2

    >>> db = PostGIS('denver')
    >>> #db = H2('denver')

    >>> for layer in denver_shps.values():
    ...   db.add(layer)

    >>> db.layers()
    ['census_boundaries', 'neighborhoods', 'city_boundary', 'election_precincts']


.. cssclass:: code js

.. code-block:: javascript

    js> var PostGIS = require("geoscript/workspace").PostGIS;
    js> var db = PostGIS("denver");
    js> dir.names.forEach(function(name) {
      >     db.add(dir.get(name));
      > });

    js> db
    <PostGIS ["census_boundaries", "city_boundary", "election_precincts",...>

    js> db.names
    census_boundaries,city_boundary,election_precincts,neighborhoods

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.workspace.*

    groovy:000> db = new PostGIS("denver")

    groovy:000> denver_shps.layers.each{n ->
    groovy:000>     db.add(denver_shps[n])
    groovy:000> }

    groovy:000> db.layers
    ===> ["census_boundaries", "city_boundary", "election_precincts", "neighborhoods"]

.. cssclass:: refs py

.. seealso::

   `postgis API reference <../../py/api/workspace/postgis.html>`__

   `h2 API reference <../../py/api/workspace/h2.html>`__

.. cssclass:: refs js

.. seealso::

   `postgis API reference <../../js/api/workspace/postgis.html>`__

   `h2 API reference <../../js/api/workspace/h2.html>`__

.. cssclass:: refs groovy

.. seealso::

   `postgis API reference <../../groovy/api/geoscript/workspace/PostGIS.html>`__

   `h2 API reference <../../groovy/api/geoscript/workspace/H2.html>`__

Data Transformation
-------------------

With a newly creates spatial database to hold all of our layers, we would like to import some additional layers from the OSM data downloaded previously.

Create a new workspace for the Colorado shapefiles and analyze the data.

.. cssclass:: code py

.. code-block:: python

    >>> co_shps = Directory('colorado_shapfiles')
    >>> co_shps.layers()
    ['colorado_water', 'colorado_highway', 'colorado_poi', 'colorado_natural']

    >>> hwy = co_shps['colorado_highway']
    >>> hwy.proj
    EPSG:4326

    >>> hwy.bounds()
    >>> (-109.160738, 36.892247, -101.94248, 41.105506, EPSG:4326)
    
.. cssclass:: code js

.. code-block:: javascript

    js> var dir = Directory("colorado_shapefiles");
    js> dir
    <Directory ["colorado_water", "colorado_highway", "colorado_poi", "colo...>

    js> var hwy = dir.get("colorado_highway");
    js> hwy.projection
    <Projection EPSG:4326>

    js> hwy.bounds
    <Bounds [-109.160738, 36.892251, -101.942736, 41.1053726] EPSG:4326>

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.workspace.*

    groovy:000> groovy:000> co_shps = new Directory("colorado_shapefiles")
    groovy:000> co_shps.layers
    ===> ["colorado_water", "colorado_highway", "colorado_poi", "colorado_natural"]

    groovy:000> hwy = co_shps["colorado_highway"]
    groovy:000> hwy.proj
    ===> EPSG:4326

    groovy:000> hwy.bounds
    ===> (-109.160738,36.892251,-101.942736,41.1053726,EPSG:4326)

Analyzing the highway layer illustrates two things:

* The OSM data is in a geographic (lat/lon) projection, whereas our existing data is in a NAD State Plane projection. 
* The OSM data contains the entire state, whereas our existing data extends to the extent of Denver county.

To address these issues the OSM data will first reproject into the State Plane projection, and then clip the result. Since these types of operations are more efficient when done in a database 
the data will be first be added to PostGIS as in the last section. 

.. cssclass:: code py

.. code-block:: python

   >>> from geoscript.geom import simplify
  
   >>> # get the boundary used for clipping
   >>> bndry = reduce(lambda x,y: x.union(y), [f.geom for f in db['city_boundary'].features()])

   >>> # simplify it to speed up computation
   >>> bndry = simplify(bndry, 100);

   >>> for l in co_shps.values():
   ...   # load into db
   ...   l = db.add(l)
   ...
   ...   # reproject + rename (strip off "colorado_" prefix)
   ...   l = l.reproject('epsg:2877', name=l.name[9:], chunk=10000)
   ...
   ...   # clip
   ...   l.delete('NOT INTERSECT(the_geom, %s)' % bndry)
   
.. cssclass:: code js

.. code-block:: javascript

    js> var city = db.get("city_boundary");

    js> // union all city boundary parts
    js> var boundary;
    js> city.features.forEach(function(feature) {
      >     var geometry = feature.geometry;
      >     boundary = boundary ? boundary.union(geometry) : geometry;
      > });
    js> boundary
    <Polygon [[[3181740.363649994, 1665985.0072000027], [3181811.09655000...>

    js> // simplify to speed things up later
    js> boundary = boundary.simplify(100); 
    <Polygon [[[3181740.363649994, 1665985.0072000027], [3183390.72814999...>

    js> // transform the boundary to EPSG:4326
    js> boundary.projection = "epsg:2877";
    js> boundary = boundary.transform("epsg:4326");
    <Polygon [[[-104.85448745942264, 39.660159265877176], [-104.854236940...>

    js> // create a cql string for filtering features while adding
    js> var wkt = require("geoscript/geom/io/wkt");
    js> var cql = "INTERSECTS(the_geom, " + wkt.write(boundary) + ")";    

    js> // rename and reproject all layers while adding to the db
    js> dir.names.forEach(function(name) {                           
      >     var layer = dir.get(name);                               
      >     db.add(layer, {                                         
      >         name: name.substr(9),                                
      >         filter: cql,                                         
      >         projection: "epsg:2877"                              
      >     })                                                       
      > });
    
.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000>  import geoscript.workspace.*
    groovy:000>  import geoscript.proj.Projection

    groovy:000> bndry = null
    groovy:000> db['city_boundary'].features.each{f ->
    groovy:000>     if (bndry == null) {
    groovy:000>         bndry = f.geom
    groovy:000>     } else {
    groovy:000>         bndry = bndry.union(f.geom)
    groovy:000>     }
    groovy:000> }
    groovy:000> bndry = bndry.simplify(100)

    groovy:000> co_shps.layers.each{nm ->
    groovy:000>     // Load into database
    groovy:000>     l = db.add(co_shps[nm])
    groovy:000>     // reproject + rename
    groovy:000>     l.reproject(new Projection("EPSG:2877"), l.name.substring(9), 10000)
    groovy:000>     // clip
    groovy:000>     l.delete("NOT INTERSECTS(the_geom, ${bndry.wkt})")
    groovy:000> }


