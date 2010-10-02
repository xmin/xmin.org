import re
import os

import aspen
import aspen.restarter
from aspen.handlers.simplates import stdlib


TMPL = os.path.join(aspen.paths.root, '__', 'etc', 'template.html')
aspen.restarter.track(TMPL)
TMPL = open(TMPL).read()


def webpage(environ, start_response):
    orig = stdlib(environ, start_response)[0]
    orig = orig.replace('``', '&ldquo;').replace("''", '&rdquo;')
    orig = orig.replace('`', '&lsquo;').replace("'", '&rsquo;')
    new = TMPL % orig
    return [new]
