live.novaramedia.com
---

Our live player v1 [more like v0.5 rly]. Found at [live.novaramedia.com](http://live.novaramedia.com). 

Currently it is always on and plays the Renosance FM icecast stream with two twitter plugins to show @novaramedia and #novarafm. However it is build with intention of modularity and most of the action happens in my.js

todo
---

- Use schedual.json to change player state according to time & date
- initTV() function that embeds youtube live player and displays appropriate hashtag

###schedual.json


The intention is that schedual.json will be a dynamically generated (probably by a non-public facing webapp) file listing regular and irregular programming. This file will drive the live player. However initially the file will be manually generated and then inform the creation of the schedualing webapp.

### what you can do [if you want]

Suggestions for / help with the implimentation of the schedual feature are very welcome. Please make Pull Requests or get in touch in another way. Please  comment any commited code.