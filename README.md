NOVA Strong
===========
This is a nodeJS based website for the building campaign called NOVA Strong.

Sections
--------

* The webserver is called nova.js
* The pages served up in the site are all in the HTML folder.  These are loaded into the memory of the webserver at boot-time, then the pagers 
* The sitemap used for SEO is listed in the XML folder.
* The app has some AngularJS that is contained in the js folder.  This is the cost calculator page on the app.
* There is one API included that takes contact info from the site and writes it to a SQS queue.  This is also in the js folder.
