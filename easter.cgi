#!/usr/bin/env python
"""Output the date of the next Easter.
"""
from __future__ import division

import datetime
from math import floor


def easter(year):
    """Given a year of the Gregorian calendar, return a datetime object.

    http://en.wikipedia.org/wiki/Computus#Anonymous_algorithm

    """
    Y = year
    a = Y % 19
    b = floor (Y / 100)
    c = Y % 100
    d = floor (b / 4)
    e = b % 4
    f = floor ((b + 8) / 25)
    g = floor ((b - f + 1) / 3)
    h = ((19*a) + b - d - g + 15) % 30
    i = floor (c / 4)
    k = c % 4
    L = (32 + (2*e) + (2*i) - h - k) % 7
    m = floor ((a + (11*h) + (22*L)) / 451)
    month = floor ((h + L - (7*m) + 114) / 31)
    day = ((h + L - (7*m) + 114) % 31) + 1
    return datetime.date(int(year), int(month), int(day))


today = datetime.date.today()
next_easter = easter(today.year)
if next_easter <= today:
    next_easter = easter(today.year + 1)

print "Content-Type: text/plain"
print
print next_easter
