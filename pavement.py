try:
    from paver.virtual import bootstrap
except :
    # minilib does not support bootstrap
    pass
import os
from paver.easy import *
from paver.tasks import help, needs
from ConfigParser import ConfigParser

curdir = path(os.path.abspath(os.curdir))

options(
    virtualenv = Bunch(
        script_name = "setup_website",
        packages_to_install = ["sphinx", "jstools"]
    ),
    repo_cache = curdir / ".repos",
    build = curdir / "build",
    js = Bunch(
        repo = "git://github.com/tschaub/geoscript-js.git",
        docs = "doc"
    ),
    py = Bunch(
        repo = "git://github.com/jdeolive/geoscript-py.git",
        docs = "doc"
    ),
    scala = Bunch(
        repo = "git://github.com/dwins/geoscript.scala.git",
        docs = "docs"
    )
)
 
@task
def clone_js():
    repo_cache = options.repo_cache
    repo_cache.makedirs()
    js = repo_cache / "js"
    if not js.exists():
        sh("git clone %s %s" % (options.js.repo, js))

@task
@needs(["clone_js"])
def pull_js():
    js = options.repo_cache / "js"
    js.chdir()
    sh("git pull")
    curdir.chdir()

@task
@needs(["pull_js"])
def parse_js():
    from jstools import jst
    repo = options.repo_cache / "js"
    parser = jst.DocParser({
        "root": repo / "lib/geoscript",
        "template": repo / "doc/api/module.jst",
        "output": repo / "doc/api"
    })
    parser.add_section("geoscript.js")
    parser.run()

@task
@needs(["parse_js"])
def build_js():
    jsbuild = options.build / "js"
    jsbuild.makedirs()
    jssrc = options.repo_cache / "js" / options.js.docs
    sh("sphinx-build -E -b html -c %s -D html_title='GeoScript JS' -D html_short_title='GeoScript JS' -D html_theme=geoscript-js %s %s" % (curdir / "src", jssrc, jsbuild))


@task
def clone_py():
    repo_cache = options.repo_cache
    repo_cache.makedirs()
    py = repo_cache / "py"
    if not py.exists():
        sh("git clone %s %s" % (options.py.repo, py))

@task
@needs(["clone_py"])
def pull_py():
    py = options.repo_cache / "py"
    py.chdir()
    sh("git pull")
    curdir.chdir()

@task
@needs(["pull_py"])
def build_py():
    pybuild = options.build / "py"
    pybuild.makedirs()
    pysrc = options.repo_cache / "py" / options.py.docs
    sh("sphinx-build -E -b html -c %s -D html_title='GeoScript PY' -D html_short_title='GeoScript PY' -D html_theme=geoscript-py %s %s" % (curdir / "src", pysrc, pybuild))

@task
def clone_scala():
    repo_cache = options.repo_cache
    repo_cache.makedirs()
    scala = repo_cache / "scala"
    if not scala.exists():
        sh("git clone %s %s" % (options.scala.repo, scala))

@task
@needs(["clone_scala"])
def pull_scala():
    scala = options.repo_cache / "scala"
    scala.chdir()
    sh("git pull")
    curdir.chdir()

@task
@needs(["pull_scala"])
def build_scala():
    scalabuild = options.build / "scala"
    scalabuild.makedirs()
    scalasrc = options.repo_cache / "scala" / options.scala.docs
    sh("sphinx-build -E -b html -c %s -D html_title='GeoScript Scala' -D html_short_title='GeoScript Scala' -D html_theme=geoscript-py %s %s" % (curdir / "src", scalasrc, scalabuild))

@task
def clean(): 
    options.build.rmtree()

@task
@needs(["clean", "build_js", "build_py", "build_scala"])
def build_site():

    sh("sphinx-build -E -b html %s %s" % (curdir / "src", options.build))

