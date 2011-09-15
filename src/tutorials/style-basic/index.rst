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
* ...

Prerequisites
-------------

The :ref:`tutorials.data-basic` tutorial must be completed before proceeding as the data set up 
there will be used as the base of this tutorial.

Download ...

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

.. image:: sym1.png

.. image:: sym2.png

.. image:: sym3.png

.. cssclass:: code js

.. code-block:: javascript

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
   highway [the_geom: MultiLineString, TYPE: str, NAME: str, ONEWAY: str, LANES: long]

   >>> hwy = db['highway']
   >>> hwy.schema

   >>> set([f['TYPE'] for f in hwy.features()])
   set([u'road', u'bridleway', u'service', u'trunk', u'primary_link', u'unclassified', u'motorway', u'path', u'tertiary_link', u'secondary', u'steps', u'secondary_link', u'trunk_link', u'pedestrian', u'footway', u'residential', u'primary', u'tertiary', u'motorway_link', u'track', u'crossing', u'cycleway'])

.. cssclass:: code js

.. code-block:: javascript

Create styling rules to style "primary" and "secondary" highways.

.. cssclass:: code py

.. code-block:: python

   >>> style = (Stroke(width=5) + Label('NAME").linear()).where("TYPE = 'primary' OR TYPE = 'secondary'")
   >>> draw(hwy, style, format='mapwindow')

.. cssclass:: code js

.. code-block:: javascript

In the above the *where* method is used to provide a filter/predicate that constrains what the 
rule should apply too. 

The result is not very visually appealing. Create a more visually appealing style.

.. cssclass:: code py

.. code-block:: python

   >>> label = Label('NAME', font='bold Arial 12pt').linear(group=True, follow=True, offset=10)
   >>> style = (Stroke('gray', width=5) + label).where("TYPE = 'primary' OR TYPE = 'secondary'")

   >>> style += Stroke('gray', width=3).where("TYPE = 'primary' OR TYPE = 'secondary'").zindex(1)
   >>> draw(hwy, style, format='mapwindow')

.. cssclass:: code js

.. code-block:: javascript

Above a second stroke was added in order to render a second (slightly) thinner line on top of the existing line. The second stroke is given a *z-index* of 1 to force it to be drawn
on top of the first stroke, creating a "line-casing" affect.

Now add another rule that encompasses the rest of the roads.

.. cssclass:: code py

.. code-block:: python

   >>> style += Stroke('gray', width=1)
   >>> draw(hwy, style, format='mapwindow')

.. cssclass:: code js

.. code-block:: javascript

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

.. cssclass:: code js

.. code-block:: javascript

.. cssclass:: code py
  
The *range* function is used to apply scale constraints to a symbolizer. Values are specified as 
scale denominators.


