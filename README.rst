.. image:: https://travis-ci.org/geoscript/geoscript.net.svg?branch=master
    :target: https://travis-ci.org/geoscript/geoscript.net

GeoScript Web Site
------------------

This is the source for the geoscript.net web site.  It is published on Github Pages by TravisCI.

It is a Sphinx web site that requires python, pip, java, maven, ant to build the various GeoScript projects.

To build::

    pip install --upgrade -r requirements

    ant site
