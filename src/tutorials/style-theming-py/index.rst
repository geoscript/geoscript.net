.. _tutorials.style-theming-py:

Thematic Styling
================

This tutorial focuses on the creation of thematic styles. Tasks performed include:

* Analyzing and classifying attributes of a layer
* Building styles with multiple thematic rendering rules

Prerequisites
-------------

It is recommended that the :ref:`tutorials.style-basic` be completed before proceeding, as it introduces the basic concepts of styling and rendering.

Classifying Attribute Data
--------------------------

The *Layer* class contains a number of methods that can be used to analyze the distribution of layer attributes. Consider the *cencus_boundaries* layer that was loaded in a previous tutorial.

.. cssclass:: code py

.. code-block:: python

  >>> from geoscript.workspace import PostGIS
  >>> db = PostGIS('denver')
 
  >>> census = db['census_boundaries']
  >>> census.schema
  census_boundaries [the_geom: MultiPolygon, SD_CDC_BND: float, PERIMETER: float, BLKGRP2000: long, BLKGRP20_1: long, STFID: str, STATE: str, COUNTY: str, COUNTYNAME: str, TRACT: str, BLKGRP: str, POP2000: int, POPDENSITY: float, WHITE: int, BLACK: int, AMERI_ES: int, ASIAN: int, HAWN_PI: int, OTHER: int, MULT_RACE: int, HISPANIC: int, MALES: int, FEMALES: int, AGE_UNDER5: int, AGE_5_17: int, AGE_18_21: int, AGE_22_29: int, AGE_30_39: int, AGE_40_49: int, AGE_50_64: int, AGE_65_UP: int, MED_AGE: float, MED_AGE_M: float, MED_AGE_F: float, HOUSEHOLDS: int, AVE_HH_SZ: float, HSEHLD_1_M: int, HSEHLD_1_F: int, MARHH_CHD: int, MARHH_NO_C: int, MHH_CHILD: int, FHH_CHILD: int, FAMILIES: int, AVE_FAM_SZ: float, HSE_UNITS: int, URBAN: int, RURAL: int, VACANT: int, OWNER_OCC: int, RENTER_OCC: int, SHAPE_AREA: float, SHAPE_LEN: float

The layer contains an attribute named "POP2000" that represents the total population of each census block. Using the *histogram* method it is possible to view the distribution of the population attribute.

.. cssclass:: code py

.. code-block:: python

    >>> for classes,values in census.histogram('POP2000'):
    >>> ... print k, v
	(0.0, 319.8) 21
	(319.8, 639.6) 29
	(639.6, 959.4) 144
	(959.4, 1279.2) 129
	(1279.2, 1599.0) 78
	(1599.0, 1918.8) 44
	(1918.8, 2238.6) 25
	(2238.6, 2558.4) 5
	(2558.4, 2878.2) 6
	(2878.2, 3198.0) 4
	
The histogram provides a set of intervals/classes that can be used to build up a thematic style for the layer. 

.. cssclass:: code py

.. code-block:: python

    >>> from geoscript.style import *
    >>> from geoscript.render import *
    >>> from random import randint

    >>> style = Stroke()
    >>> for classes,values in census.histogram('POP2000'):
    ...   fill = Fill(tuple([randint(0,255) for x in range(0,3)]))
    ...   style += fill.where("POP2000 BETWEEN %f and %f" % classes)

    >>> draw(census, style, format='mapwindow')
	
	
Thematic Styles with Color Interpolation
----------------------------------------

The thematic style created from a random set of colors in the last section is far from visual appealing. What would be better is a set of colors forming a gradient with lighter values representing low population areas and darker colors representing higher population areas.

The *interpolate* function is used to interpolate intermediate values between two symbolizers. 

.. cssclass:: code py

.. code-block:: python

    >>> histo = census.histogram('POP2000')
    >>> fills = Fill('#FFDFDF').interpolate(Fill('#FF4848'), len(histo))

    >>> style = Stroke()
    >>> for i in range(0, len(histo)):
    ...   style += fills[i].where("POP2000 BETWEEN %f and %f" % histo[i][0]) 

    >>> draw(census, style, format='mapwindow')



