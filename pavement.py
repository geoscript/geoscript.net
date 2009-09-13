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
def clone_docs():
    repo_cache = options.repo_cache
    repo_cache.makedirs()
    # clone js
    js = repo_cache / "js"
    if not js.exists():
        sh("git clone %s %s" % (options.js.repo, js))

@task
@needs(['clone_docs'])
def pull_docs():
    js = options.repo_cache / "js"
    js.chdir()
    sh("git pull")
    curdir.chdir()

@task
@needs(['pull_docs'])
def build_site():
    jsbuild = options.build / "js"
    jsbuild.makedirs()
    jssrc = options.repo_cache / "js" / options.js.docs
    sh("sphinx-build -E -b html %s %s" % (jssrc, jsbuild))

    sh("sphinx-build -E -b html %s %s" % (curdir / "src", options.build))

