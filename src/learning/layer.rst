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
    subclass specific to the `Shapefile <http://en.wikipedia.org/wiki/Shapefile>`_
    format.

.. cssclass:: code js

.. code-block:: javascript

    js> var LAYER = require("geoscript/layer");
    js> var shp = new LAYER.Layer({workspace: "data/shp", name: "states"});
    js> shp
    <Layer name: states, count: 49>
    js> shp.count
    49
    js> // TODO layer.bounds


Each entry in a Layer is known as a *feature* and represented by the
:class:`feature.Feature` class. A feature is a set of attributes and an
associated geometry. The :meth:`Layer.features` method provides an iterator over
the features of a layer.

.. cssclass:: code py

.. code-block:: python

    >>> for f in shp.features():
    >>>    print f 
    states.1 {the_geom: MULTIPOLYGON (((-88.071564 37.51099000000001, ... ,-88.071564 37.51099000000001))), STATE_NAME: Illinois, STATE_FIPS: 17, SUB_REGION: E N Cen, STATE_ABBR: IL, LAND_KM: 143986.61, WATER_KM: 1993.335, PERSONS: 11430602.0, FAMILIES: 2924880.0, HOUSHOLD: 4202240.0, MALE: 5552233.0, FEMALE: 5878369.0, WORKERS: 4199206.0, DRVALONE: 3741715.0, CARPOOL: 652603.0, PUBTRANS: 538071.0, EMPLOYED: 5417967.0, UNEMPLOY: 385040.0, SERVICE: 1360159.0, MANUAL: 828906.0, P_MALE: 0.486, P_FEMALE: 0.514, SAMP_POP: 1747776.0}
    ...

.. cssclass:: code js

.. code-block:: javascript

    js> shp.features.forEach(function(feature) {
      >     print(feature);
      > });
    <Feature the_geom: <MultiPolygon>, STATE_NAME: "Illinois", STATE_FIPS...>
    <Feature the_geom: <MultiPolygon>, STATE_NAME: "District of Columbia"...>
    <Feature the_geom: <MultiPolygon>, STATE_NAME: "Delaware", STATE_FIPS...>
    ...


The :attr:`Layer.schema` property of a
layer is a reference to the :class:`featire.Schema` of the features of the
layer. The schema describes the structure of the features in the layer.

.. cssclass:: code py

.. code-block:: python

    >>> shp.schema
    states [the_geom: MultiPolygon, STATE_NAME: str, STATE_FIPS: str, SUB_REGION: str, STATE_ABBR: str, LAND_KM: float, WATER_KM: float, PERSONS: float, FAMILIES: float, HOUSHOLD: float, MALE: float, FEMALE: float, WORKERS: float, DRVALONE: float, CARPOOL: float, PUBTRANS: float, EMPLOYED: float, UNEMPLOY: float, SERVICE: float, MANUAL: float, P_MALE: float, P_FEMALE: float, SAMP_POP: float]

.. cssclass:: code js

.. code-block:: javascript

    js> shp.schema
    <Schema name: "states", fields: [{"name": "the_geom", "type": "Multi...>

A schema is comprised of fields that describe each attribute of a feature. A
field describes the name and the type of a feature attribute. The
:attr:`Schema.fields` property provides a list of all the fields in a schema,
and the :meth:`feature.Schema.get()` method retrieves a field by name.

.. cssclass:: code py

.. code-block:: python

    >>> f = shp.schema.get('STATE_NAME')
    >>> f.name
    'STATE_NAME'
    >>> f.typ
    <type 'str'>

.. cssclass:: code js

.. code-block:: javascript

    js> var field = shp.schema.get("STATE_NAME");
    js> field.name
    STATE_NAME
    js> field.type
    String


Every layer object is part of a :class:`workspace.Workspace`. A workspace is a
source of layers. You can retrieve a list of layer names for a workspace as
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

    js> var dir = shp.workspace;     
    js> dir
    <Directory ["states"]>
    js> dir.names
    states


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

    js> var cities = new LAYER.Layer({
      >     name: "cities",
      >     fields: [{
      >         name: "name", type: "String"
      >     }, {
      >         name: "geom", type: "Point"
      >     }]
      > });
    js> dir.add(cities);
    js> var GEOM = require("geoscript/geom");
    js> cities.add({name: "San Francisco", geom: new GEOM.Point([-122.42, 37.78])});
    js> cities.add({name: "New York", geom: new GEOM.Point([-73.58, 40.47])});
    js> cities.count
    2
