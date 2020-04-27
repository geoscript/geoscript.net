.. _learning.layer:

Layers and Workspaces
=====================

.. cssclass:: show-chooser

.. rubric:: code chooser

A :class:`Layer` represents a particular set of spatial data. It contains
methods that provide information about a data set such as the count of entries
and the spatial bounds of the data.

.. cssclass:: code py

.. code-block:: python

    >>> from geoscript.layer import Shapefile
    >>> shp = Shapefile('states.shp')
    
    >>> shp.count()
    49
    >>> shp.bounds()
    (-124.731422, 24.955967, -66.969849, 49.371735, EPSG:4326)

.. cssclass:: refs py

.. note::

    In the above code sample the :class:`layer.Shapefile` class is a layer
    subclass specific to the `Shapefile <https://en.wikipedia.org/wiki/Shapefile>`_
    format.

.. cssclass:: code js

.. code-block:: javascript

    >> var Directory = require("geoscript/workspace").Directory;
    >> var shp = new Directory("data/shp").get("states");
    >> shp
    <Layer name: states, count: 49>
    >> shp.count
    49
    >> shp.bounds
    <Bounds [-124.73142200000001, 24.955967, -66.969849, 49.371735] EPSG...>

.. cssclass:: code scala

.. code-block:: scala

    scala> import org.geoscript.layer._                                       
    scala> val shp = Shapefile("states.shp")
    shp: org.geoscript.layer.Layer = <Layer name: states, count: 49>

    scala> shp.count
    res0: Int = 49

    scala> shp.bounds
    res1: (Double, Double, Double, Double, String) = (-124.73142200000001,24.955967,-66.969849,49.371735,EPSG:4326)

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> import geoscript.layer.Shapefile
    ===> [import geoscript.layer.Shapefile]

    groovy:000> shp = new Shapefile('data/shp/states.shp')
    ===> geoscript.layer.Shapefile@4597871d

    groovy:000> shp.count()
    ===> 49

    groovy:000> shp.bounds()
    ===> (-124.73142200000001,24.955967,-66.969849,49.371735,EPSG:4326)

Each entry in a Layer is known as a *feature* and represented by the
:class:`Feature` class (in the :mod:`feature` module). A feature is a set of
attributes and an associated geometry. You can iterate through all features
on a layer to access feature information.

.. cssclass:: code py

.. code-block:: python

    >>> for f in shp.features():
    >>>    print f 
    states.1 {the_geom: MULTIPOLYGON (((-88.071564 37.51099000000001, ... ,-88.071564 37.51099000000001))), STATE_NAME: Illinois, STATE_FIPS: 17, SUB_REGION: E N Cen, STATE_ABBR: IL, LAND_KM: 143986.61, WATER_KM: 1993.335, PERSONS: 11430602.0, FAMILIES: 2924880.0, HOUSHOLD: 4202240.0, MALE: 5552233.0, FEMALE: 5878369.0, WORKERS: 4199206.0, DRVALONE: 3741715.0, CARPOOL: 652603.0, PUBTRANS: 538071.0, EMPLOYED: 5417967.0, UNEMPLOY: 385040.0, SERVICE: 1360159.0, MANUAL: 828906.0, P_MALE: 0.486, P_FEMALE: 0.514, SAMP_POP: 1747776.0}
    ...

.. cssclass:: code js

.. code-block:: javascript

    >> shp.features.forEach(function(feature) {
      >     print(feature);
      > });
    <Feature the_geom: <MultiPolygon>, STATE_NAME: "Illinois", STATE_FIPS...>
    <Feature the_geom: <MultiPolygon>, STATE_NAME: "District of Columbia"...>
    <Feature the_geom: <MultiPolygon>, STATE_NAME: "Delaware", STATE_FIPS...>
    ...

.. cssclass:: code scala

.. code-block:: scala

    scala> for (feature <- shp.features) { println(f) }
    <Feature EMPLOYED: 5417967.0, ... the_geom: <MultiPolygon>, PUBTRANS: ... >
    <Feature EMPLOYED: 303994.0,  ... the_geom: <MultiPolygon>, PUBTRANS: ... >
    <Feature EMPLOYED: 335147.0,  ... the_geom: <MultiPolygon>, PUBTRANS: ... >

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> shp.features.each{f -> println(f)}
    states.1 the_geom: MULTIPOLYGON (((-88.071564 37.51099000000001, ...
    states.2 the_geom: MULTIPOLYGON (((-77.008232 38.966556999999995, ...

A layer schema is a set of field descriptions that describe the structure of
the data in the layer's features.

.. cssclass:: code py

.. code-block:: python

    >>> shp.schema
    states [the_geom: MultiPolygon, STATE_NAME: str, STATE_FIPS: str, SUB_REGION: str, STATE_ABBR: str, LAND_KM: float, WATER_KM: float, PERSONS: float, FAMILIES: float, HOUSHOLD: float, MALE: float, FEMALE: float, WORKERS: float, DRVALONE: float, CARPOOL: float, PUBTRANS: float, EMPLOYED: float, UNEMPLOY: float, SERVICE: float, MANUAL: float, P_MALE: float, P_FEMALE: float, SAMP_POP: float]

.. cssclass:: code js

.. code-block:: javascript

    >> shp.schema
    <Schema name: "states", fields: [{"name": "the_geom", "type": "Multi...>

.. cssclass:: code scala

.. code-block:: scala

    scala> shp.schema                                                         
    res0: org.geoscript.layer.Schema = <Schema name: states, fields: [the_geom: MultiPolygon, STATE_NAME: String, STATE_FIPS: String, SUB_REGION: String, STATE_ABBR: String, LAND_KM: Double, WATER_KM: Double, PERSONS: Double, FAMILIES: Double, HOUSHOLD: Double, MALE: Double, FEMALE: Double, WORKERS: Double, DRVALONE: Double, CARPOOL: Double, PUBTRANS: Double, EMPLOYED: Double, UNEMPLOY: D...

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> shp.schema
    ===> states the_geom: MultiPolygon(EPSG:4326), STATE_NAME: String, STATE_FIPS: String, SUB_REGION: String, STATE_ABBR: String, LAND_KM: java.lang.Double, WATER_KM: java.lang.Double, PERSONS: java.lang.Double, FAMILIES: java.lang.Double, HOUSHOLD: java.lang.Double, MALE: java.lang.Double, FEMALE: java.lang.Double, WORKERS: java.lang.Double, DRVALONE: java.lang.Double, CARPOOL: java.lang.Double, PUBTRANS: java.lang.Double, EMPLOYED: java.lang.Double, UNEMPLOY: java.lang.Double, SERVICE: java.lang.Double, MANUAL: java.lang.Double, P_MALE: java.lang.Double, P_FEMALE: java.lang.Double, SAMP_POP: java.lang.Double

A schema is comprised of fields that describe each attribute of a feature. A
field describes the name and the type of a feature attribute. A list of field 
names can be accessed for a schema, and individual field descriptors can be 
accessed given a field name.

.. cssclass:: code py

.. code-block:: python

    >>> f = shp.schema.get('STATE_NAME')
    >>> f.name
    'STATE_NAME'
    >>> f.typ
    <type 'str'>

.. cssclass:: code js

.. code-block:: javascript

    >> shp.schema.fieldNames
    the_geom,STATE_NAME,STATE_FIPS,SUB_REGION,STATE_ABBR,LAND_KM,WATER_KM,PERSONS,FAMILIES,HOUSHOLD,MALE,FEMALE,WORKERS,DRVALONE,CARPOOL,PUBTRANS,EMPLOYED,UNEMPLOY,SERVICE,MANUAL,P_MALE,P_FEMALE,SAMP_POP

    >> var field = shp.schema.get("STATE_NAME");
    >> field.name
    STATE_NAME
    >> field.type
    String

.. cssclass:: code scala

.. code-block:: scala

    scala> shp.schema.fieldNames
    res1: Seq[String] = ArrayBufferRO(the_geom, STATE_NAME, STATE_FIPS, SUB_REGION, STATE_ABBR, LAND_KM, WATER_KM, PERSONS, FAMILIES, HOUSHOLD, MALE, FEMALE, WORKERS, DRVALONE, CARPOOL, PUBTRANS, EMPLOYED, UNEMPLOY, SERVICE, MANUAL, P_MALE, P_FEMALE, SAMP_POP)

    scala> shp.schema.get("STATE_NAME")
    res2: org.geoscript.layer.Field = STATE_NAME: String

    scala> res2.name
    res3: String = STATE_NAME

    scala> res2.binding
    res4: java.lang.Class[_] = class java.lang.String

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> f = shp.schema.field('STATE_NAME')
    ===> STATE_NAME: String

    groovy:000> f.name
    ===> STATE_NAME

    groovy:000> f.typ
    ===> String

Every layer object is part of a :class:`Workspace`. A workspace is a
collection of layers. You can retrieve a list of layer names for a workspace as
follows:

.. cssclass:: code py

.. code-block:: python

    >>> ws = shp.workspace
    >>> ws
    Directory[/Users/bob]
    >>> ws.layers()
    ['counties', 'states']

.. cssclass:: refs py

.. note:: 

    The :class:`layer.shapefile.Shapefile` layer is implicitly part of a
    :class:`workspace.Directory` workspace. The layers of a directory workspace
    correspond to the spatial files in the directory.

.. cssclass:: code js

.. code-block:: javascript

    >> var dir = shp.workspace;     
    >> dir
    <Directory ["states"]>
    >> dir.names
    states

.. cssclass:: code scala

.. code-block:: scala

    scala> val dir = shp.workspace
    dir: org.geoscript.workspace.Workspace = <Directory: [file:/data/]>

    scala> dir.names
    res1: Seq[String] = Array(states)

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> dir = shp.workspace
    ===> Directory[/Users/jericks/Downloads/data/shp/]

    groovy:000> dir.layers
    ===> [states]

Create a new layer and add it to an existing workspace as follows:

.. cssclass:: code py

.. code-block:: python

    >>> from geoscript import geom
    >>> l = ws.create('cities', [('geom', geom.Point), ('name', str)])
    >>> ws.layers()
    ['cities', 'counties', 'states']
    >>> l.count()
    0
    >>> l.add([geom.Point(37.78, -122.42), 'San Francisco'])
    >>> l.add([geom.Point(40.47, -73.58), 'New York'])
    >>> l.count()
    2

.. cssclass:: code js

.. code-block:: javascript

    >> var Layer = require("geoscript/layer").Layer;
    >> var cities = new Layer({
      >     name: "cities",
      >     fields: [{
      >         name: "name", type: "String"
      >     }, {
      >         name: "geom", type: "Point"
      >     }]
      > });
    >> dir.add(cities);
    >> var GEOM = require("geoscript/geom");
    >> cities.add({name: "San Francisco", geom: new GEOM.Point([-122.42, 37.78])});
    >> cities.add({name: "New York", geom: new GEOM.Point([-73.58, 40.47])});
    >> cities.count
    2

.. cssclass:: refs js

.. seealso::

    See the `JavaScript API <../js/api/index.html>`__ for more information:
    
    * the `feature <../js/api/feature.html>`__ module
    * the `layer <../js/api/layer.html>`__ module
    * the `workspace <../js/api/workspace.html>`__ module

.. cssclass:: code scala 

.. code-block:: scala

    scala> import org.geoscript.geometry._
    scala> import org.geoscript.projection._
    scala> import org.geoscript.workspace._
    scala> import org.geoscript.layer._
    scala> val ws = Directory("/data/")
    ws: org.geoscript.workspace.Workspace = <Directory [file:/data]>

    scala> val layer = ws.create("cities", Field("the_geom", classOf[Point]), Field("name", classOf[String]))
    layer: org.geoscript.layer.Layer = <Layer name: cities, count: 0>

    scala> ws.names
    res0: Seq[String] = Array(cities, states)

    scala> layer.count
    res1: Int = 0

    scala> layer += Feature("the_geom" -> Point(37.78, -122.42), "name -> "San Francisco")

    scala> layer += Feature("the_geom" -> Point(40.47, -73.58), "name" -> "New York")

    scala> layer.count
    res2: Int = 2

.. cssclass:: code groovy

.. code-block:: groovy

    groovy:000> l = dir.create('cities',[['geom','Point'],['name','str']])
    Mar 10, 2010 8:01:45 PM org.geotools.data.shapefile.ShapefileDataStore createSchema

    WARNING: PRJ file not generated for null CoordinateReferenceSystem
    ===> geoscript.layer.Layer@11da5362

    groovy:000> dir.layers
    ===> [states, cities]

    groovy:000> l.count()
    ===> 0

    groovy:000> import geoscript.geom.Point
    ===> [import geoscript.layer.Shapefile, import geoscript.geom.Point]

    groovy:000> l.add([new Point(37.78, -122.42),'San Francisco'])
    ===> null

    groovy:000> l.add([new Point(40.47, -73.58),'New York'])
    ===> null

    groovy:000> l.count()
    ===> 2