# Custom simple popup slideshow
Simple and responsive popup image slideshow.


## How to start this example locally
To do that you will need to downolad and install [Node.js](https://nodejs.org/en/download/) on your local machine.

The quickest way to get started is to use *serve*. Go to the project directory and just run `npx serve`.
If you want to install *serve* on your local computer (and for all other information) you can visit their page [here](https://www.npmjs.com/package/serve).

  
## How to use 

### CSS/SCSS
Copy slideshow.css (or slideshow.scss if you prefer) to its respective folder and load it in your .html document. 


### HTML
Implement *POPUP SLIDESHOW MODAL* section from index.html into your .html document where the image gallery is located. Populate `<div class="images-wrapper" data-selected-slide="0"></div>` refer to the example in index.html. 

Element that contains items for the slideshow must have  `id="gallery"` and each item in that element must have `class="item"`.


### JavaScript
There are 2 ways to implement slideshow functionality.
1. Just copy slideshow.js and load it in your .html document.
2. Copy ClassSlideshow.js, load it in your .html document. Then instantiate and run the slider in your .js document like in custom.js
```JavaScript
const slideshow = new Slideshow();
slideshow.setup();
```


## To be continued...
There will be additional updates and improvements. So don't forget to check it up from time to time. ;)