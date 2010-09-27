import re
import os

import aspen
import aspen.restarter
import twitter
from aspen.handlers.simplates import stdlib


TMPL = os.path.join(aspen.paths.root, '__', 'etc', 'template.html')
aspen.restarter.track(TMPL)
TMPL = open(TMPL).read()

LINK = r"""<a title="Search #xmin on Twitter"
              href="http://twitter.com/search?q=#xmin">\1</a>"""
TWEET = """\
    %(text)s
    <span class="citation">&mdash;
    <a title="Go to this tweet." 
       "href="http://twitter.com/%(from_user)s/status/%(id)s">%(from_user)s</a>
    </span>
"""

tag_re = re.compile(r'([#][Xx][Mm][Ii][Nn])')

def get_tweet():
    searcher = twitter.Twitter(domain="search.twitter.com")
    result = searcher.search(q='#xmin')['results'][0]
    result['text'] = tag_re.sub(LINK, result['text'])
    return TWEET % result

def webpage(environ, start_response):
    tweet = get_tweet()
    orig = stdlib(environ, start_response)[0]
    new = TMPL % (orig, tweet)
    return [new]
