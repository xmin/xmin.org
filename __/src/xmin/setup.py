from setuptools import setup, find_packages

setup(
    name='xmin.org',
    version='0.1',
    author='Chad Whitacre',
    packages=['xmin']
    include_package_data=True,
    install_requires=[
        'twitter == 1.4.2',
    ],
)
