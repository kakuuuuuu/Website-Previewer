# Website-Previewer
Test Project for using HTML Scraping tools as well as Regex practices.  Allows user to type anything and detects if the input contains a valid URL.  The URL once detected is sent to the server and pulls the website's HTML (if the website exists).  The HTML is then sent back to the front end and scraped for elements for previewing.

# Installation
The node modules were not omitted, but if they are not cloned please run:
npm install
To start the app you must have node installed and run:
node server.js
or
nodemon server.js

# Challenges
The biggest challenge was fine tuning regular expressions to work in various cases. Detecting the URL was not very difficult, but fine tuning the conditions around it were difficult as there were many cases that threw off the expected functionality.  For example I had to make a check at every update if the old url matches the url currently in the input field to avoid refreshing the preview if the url was not changed.  Another difficulty was researching where exactly the bits of information I needed were located.  I was not previously aware of the importance of meta tags so it took me a bit to find out that the description as well as the preview image would be located (if available) in open graph meta tags.  Probably the most lengthy challenge was discovering and covering the possible pitfalls from user error i.e. if the user enters a valid URL, but it returns a 404.

# Future Implementation
My main future effort would be to fix the regex to detect the url by just domain name.  When I modified the regex for ignoring trailing periods, I also created a bug that causes the regex to only recognize URLs with http(s):// and or www. Second is accounting for inputs with multiple URLs.  If the user expects multiple previews to appear, currently only the first website in the string will be displayed.  With more time I would like to have either all the websites display in a feed (like Facebook), or have a carousel to pan through them.  I would also like to account for more cases where data is unavailable.  One challenge I have yet to solve is accounting for websites not following the open graph convention.  For example, when you search Facebook or SoundCloud, the expected preview image is not contained in the meta tag.  For cases like SoundCloud I might have to do custom conditions to grab the appropriate image, but I may be able to find a separate convention to more efficiently cover my bases.  In the future I would also like to implement a database and/or caching system so that you can save the previews as posts and share them with friends and have old searches appear more quickly.  Also this goes without saying, but I would refactor my regex checks as there are a more than a few redundant regex lines to remove whitespace.  If I can get the initial url detection to omit trailing and leading whitespace, I wouldn't need to have so many conditions to check for spaces.

# General Experience
This project was actually really fun, because I really love piecing together information like a puzzle.  The best part was gaining more experience with the use and purpose of various meta tags and Open Graph items hidden in the header of websites.  It gave me a lot more practice with wrangling regular expressions the way I expect them to behave and some much needed first hand experience with web scraping, as it's something I tend to avoid implementing.

# Current Buglist
- Does not detect URL followed by a period (Fixed)
- Does not detect URL without http or www in front
