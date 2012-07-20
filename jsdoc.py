import sys 
from jstools import jst

len(sys.argv) > 3 or sys.exit("Usage: doc.py <repo> <template> <output>")

parser = jst.DocParser({
  "root": sys.argv[1], "template": sys.argv[2], "output": sys.argv[3]
})
parser.add_section("geoscript.js")
parser.run()
