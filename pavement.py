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
        repo = "git://github.com/tschaub/geoscript.git",
        docs = "doc"
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
@needs(["build_js"])
def build_site():

    sh("sphinx-build -E -b html %s %s" % (curdir / "src", options.build))

