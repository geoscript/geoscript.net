.. _tutorials.style-basic:

Styling and Rendering
=====================

.. cssclass:: show-chooser

.. rubric:: code chooser

This tutorial introduces the modules used for styling and rendering, covering the following topics:

* Basic styling with symbolizers
* Labelling
* Thematic styling
* Scale dependent rendering

Prerequisites
-------------

The :ref:`tutorials.data-basic` tutorial must be completed before proceeding as the data set up 
there will be used as the base of this tutorial.

Download `smiley.png <http://data.opengeo.org/geoscript/smiley.png>`_ and save it in the working directory.

Symbolizers
-----------

A *Symbolizer* object describes a component of a style. Types of symbolizers include fill, stroke, shape, labels, etc... 

A style is built by composing different symbolizers together. 

.. cssclass:: code py

.. code-block:: python

   >>> from geoscript.style import *
   >>> from geoscript.render import *
   >>> from geoscript.geom import *
   >>> from geoscript.feature import *

   >>> style = Stroke('black', width=2) + Fill('#ff0000', opacity=0.75)
   >>> draw(Point(0,0).buffer(1), style)   

   >>> mpoint = readWKT('MULTIPOINT ((10 40), (40 30), (20 20), (30 10))')
   >>> draw(mpoint, Shape('red', type='triangle', size=20))

   >>> draw()
   >>> feature = Feature({'geom':Point(0,0), 'name': 'Happy'})
   >>> draw(feature, Icon('smiley.png') + Label('name', '20pt').point(anchor=(-0.25,0.5)))

.. cssclass:: code js

.. code-block:: javascript

    js> var {Stroke, Fill, Shape, Icon} = require("geoscript/style");

    js> var style = Stroke({brush: "black", width: 2}).and(Fill({brush: "#ff0000", opacity: 0.75}))
    js> style
    <Style parts: <Stroke width: 2, opacity: 1, brush: <Color value: '#...>

    js> var shape = Shape({name: "triangle", size: 20})
    js> shape
    <Shape name: 'triangle', size: 20>

    js> var icon = Icon("smiley.png");

.. image:: sym1.png

.. image:: sym2.png

.. image:: sym3.png

.. cssclass:: refs py

.. seealso::

   `style API reference <../py/api/style/index.html>`__
   `render API reference <../py/api/render/index.html>`__

.. cssclass:: refs js

.. seealso::

   `style API reference <../js/api/style.html>`__

Thematic Styling
----------------

Often styling rules are created based on values for attributes in a dataset. Using the highway 
layer as an example determine the space of values for the "TYPE" attribute.

.. cssclass:: code py

.. code-block:: python

   >>> from geoscript.workspace import PostGIS
   >>> db = PostGIS('denver')
   
   >>> hwy = db['highway']
   >>> hwy.schema
   highway [the_geom: MultiLineString, TYPE: str, NAME: str, ONEWAY: str, LANES: long]

   >>> set([f['TYPE'] for f in hwy.features()])
   set([u'road', u'bridleway', u'service', u'trunk', u'primary_link', u'unclassified', u'motorway', u'path', u'tertiary_link', u'secondary', u'steps', u'secondary_link', u'trunk_link', u'pedestrian', u'footway', u'residential', u'primary', u'tertiary', u'motorway_link', u'track', u'crossing', u'cycleway'])

.. cssclass:: code js

.. code-block:: javascript

    js> var PostGIS = require("geoscript/workspace").PostGIS

    js> var db = PostGIS("denver")
    js> db
    <PostGIS ["census_boundaries", "city_boundary", "election_precincts",...>
    
    js> var hwy = db.get("highway")
    js> hwy.schema.fields
    <Field name: "the_geom", type: MultiLineString>,<Field name: "TYPE", type: String>,<Field name: "NAME", type: String>,<Field name: "ONEWAY", type: String>,<Field name: "LANES", type: Long>
    
Create styling rules to style "primary" and "secondary" highways.

.. cssclass:: code py

.. code-block:: python

   >>> style = (Stroke(width=5) + Label('NAME').linear()).where("TYPE = 'primary' OR TYPE = 'secondary'")
   >>> draw(hwy, style, format='mapwindow')

.. cssclass:: code js

.. code-block:: javascript

    js> var viewer = require("geoscript/viewer");
    js> var {Stroke, Label} = require("geoscript/style");

    js> hwy.style = Stroke({width: 5}).and(Label("NAME")).where("TYPE = 'primary' OR TYPE = 'secondary'")
    <Style parts: <Stroke width: 5, opacity: 1, brush: <Color value: '#...>

    js> viewer.draw(hwy)


In the above the *where* method is used to provide a filter/predicate that constrains what the 
rule should apply too. 

.. image:: theme1.jpg

The result is not very visually appealing. Create a more visually appealing style.

.. cssclass:: code py

.. code-block:: python

   >>> label = Label('NAME', font='bold Arial 12pt').linear(group=True, follow=True, offset=10)
   >>> style = (Stroke('gray', width=5) + label).where("TYPE = 'primary' OR TYPE = 'secondary'")

   >>> style += Stroke('gray', width=3).where("TYPE = 'primary' OR TYPE = 'secondary'").zindex(1)
   >>> draw(hwy, style, format='mapwindow')

.. cssclass:: code js

.. code-block:: javascript

    js> hwy.style = Stroke({brush: "gray", width: 5}).and(Label({fontFamily: "Arial", fontSize: 12, fontWeight: "bold"})).where("TYPE = 'primary' OR TYPE = 'secondary'")
    <Style parts: <Stroke width: 5, opacity: 1, brush: <Color value: '#...>
    js> viewer.draw(hwy)

Above a second stroke was added in order to render a second (slightly) thinner line on top of the existing line. The second stroke is given a *z-index* of 1 to force it to be drawn
on top of the first stroke, creating a "line-casing" affect.

Now add another rule that encompasses the rest of the roads.

.. cssclass:: code py

.. code-block:: python

   >>> style += Stroke('gray', width=1)
   >>> draw(hwy, style, format='mapwindow')


.. cssclass:: refs py

.. image:: theme2.jpg

.. seealso::

   `style API reference <../py/api/style/index.html>`__
   `render API reference <../py/api/render/index.html>`__

.. cssclass:: refs js

.. seealso::

   `style API reference <../js/api/style.html>`__

Scale Dependant Rendering
-------------------------

The style created in the previous section is two crowded and clearly lacks some scale rules to 
constrain the data drawn at various map scales. 

Modify the styles so that non primary roads show up at scales smaller than 1:100K. At scales smaller than 1:25K add labels to the non primary/secondary roads.

.. cssclass:: code py

.. code-block:: python

   >>> label = Label('NAME', font='bold Arial 12pt').linear(group=True, follow=True, offset=10)
   >>> style = (Stroke('gray', width=5) + label).where("TYPE = 'primary' OR TYPE = 'secondary'")
   >>> style += Stroke('white', width=3).where("TYPE = 'primary' OR TYPE = 'secondary'").zindex(1)

   # add non primary/secondary roads at scale < 1:100K
   >>> style += Stroke('gray', width=1).range(max=100000)

   # add label at scale < 1:25K
   >>> style += Label('NAME', font='bold Arial 12pt').linear(group=True, follow=True, offset=10).range(max=25000)
  
   >>> draw(hwy, style, format='mapwindow')


.. cssclass:: code py
  
The *range* function is used to apply scale constraints to a symbolizer. Values are specified as 
scale denominators.

.. image:: scale.jpg


