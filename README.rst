geoscript.org
=============

This repo contains what is needed to build the geoscript.org website.

Getting the source
------------------

Clone the repository from github::

    ~$ git clone git://github.com/tschaub/geoscript.org.git

Building the site
-----------------

Run (with python 2.5) the setup_website script in your copy of the repository::

    ~$ cd geoscript.org
    ~/geoscript.org$ python2.5 setup_website

This pulls in all dependencies and creates what you need for a virtual
environment. With this environment, you can run ant tasks to build the site::

    ~/geoscript.org$ . bin/activate
    (geoscript.org)~/geoscript.org$ ant site-doc

This will generate the website in a `build` directory.
