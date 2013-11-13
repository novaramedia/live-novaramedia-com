live.novaramedia.com
---

Our live player v1 [more like v0.5 rly]. Found at [live.novaramedia.com](http://live.novaramedia.com).

Currently supports FM only, with a live and offline state. The live state plays the Renosance FM icecast stream with two twitter plugins to show @novaramedia and #novarafm. The offline state pulls titles and links to the lastest 10 posts on novaramedia.com

todo
---

- Use schedual.json to inform schedule.js
- initTV() function that embeds youtube live player and displays appropriate hashtag

### schedual.json

The intention is that schedual.json will be a dynamically generated (probably by a non-public facing webapp) file listing regular and irregular programming. This file will drive the live player. However initially the file will be manually generated and then inform the creation of the schedualing webapp. At the moment the schedule is hard coded into the scedule.js file.

### what you can do [if you want]

Suggestions for / help with the implimentation of the schedual feature are very welcome. Please make Pull Requests or get in touch in another way. Please comment any commited code.