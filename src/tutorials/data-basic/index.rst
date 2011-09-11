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

  `colorado_shapefiles.zip <http://data.opengeo.org/geoscript/colarado_shapefiles.zip>`_

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

Filters can be used to constrain the result set of a feature query. A 
filter is specified as `Contextual Query Language <http://docs.geotools.org/latest/userguide/library/cql/index.html>`_ (CQL), a concise format for specifying predicates when working with geospatial data. 

.. cssclass:: code py

.. code-block:: python

   >>> for f in l.features('INTERSECTS(geom, POLYGON ((1.5 1.5, 1.5 3.5, 3.5 3.5, 3.5 1.5, 1.5 1.5))'):
   foo.fid-7f2cfebd_132545fee40_-7ffb {geom: POINT (2 2)}
   foo.fid-7f2cfebd_132545fee40_-7ff9 {geom: POINT (3 3)}

.. cssclass:: code js

.. code-block:: javascript

.. code-block:: javascript

.. cssclass:: refs py

.. seealso::

   `layer API reference <../py/api/layer/index.html>`__

.. cssclass:: refs js

.. seealso::

   `proj API reference <../js/api/layer.html>`__


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

.. cssclass:: refs py

.. seealso::

   `layer API reference <../py/api/workspace/index.html>`__

.. cssclass:: refs js

.. seealso::

   `proj API reference <../js/api/workspace.html>`__

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

.. cssclass:: refs py

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
    ...   print
    
.. cssclass:: code js

.. code-block:: javascript

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

.. cssclass:: refs py

.. seealso::

   `postgis API reference <../py/api/workspace/postgis.html>`__

   `h2 API reference <../py/api/workspace/h2.html>`__

.. cssclass:: refs js

.. seealso::

   `postgis API reference <../js/api/workspace/postgis.html>`__

   `h2 API reference <../js/api/workspace/h2.html>`__

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

Analyzing the highway layer illustrates two things:

* The OSM data is in a geographic (lat/lon) projection, whereas our existing data is in a NAD stateplane projection. 
* The OSM data contains the entire state, whereas our existing data extends to the extent of Denver county.

To address these issues the OSM data will first reproject into the stateplane projection, and then clip the result. Since these types of operations are more efficient when done in a database 
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

  


