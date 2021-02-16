console.log(' slideshow js loaded....');

class Slideshow{
    slideshowModal = document.querySelector('#slideshow');
    modalCloseElement = document.querySelector('.close');
    imagesList = document.querySelectorAll('.images-wrapper img');
    nextSlideEl = this.slideshowModal.querySelector('.right');
    previousSlideEl = this.slideshowModal.querySelector('.left');
    imageContainerList = document.querySelectorAll('#gallery .item');  // gallery images container
    

    
    openSlideshowModal(galleryModal, imagesWrapper, clickedImageNumber){
        const slideshowImagesList = imagesWrapper.querySelectorAll('img');
        slideshowImagesList[clickedImageNumber].style.setProperty('opacity', '1');
        imagesWrapper.dataset.selectedSlide = clickedImageNumber;
        galleryModal.style.setProperty('z-index', 99);
        setTimeout(()=>{
            imagesWrapper.classList.add('visible');
        }, 200);
    };

    

    closeSlideshowModal(galleryModal, imagesWrapper){
        const imagesInSlideshow = imagesWrapper.querySelectorAll('img');
        setTimeout(()=>{
            galleryModal.style.removeProperty('z-index');
            imagesWrapper.classList.remove('visible');
            imagesInSlideshow.forEach(item=>item.style.removeProperty('opacity'));

        }, 250);
    }

    toggleSlideshowHandler(galleryModal, event){
        console.log(event.target);
        const clickedImageNumber = event.target.dataset.imageNumber;
        const imagesWrapper = galleryModal.querySelector('.images-wrapper');
        galleryModal.classList.contains('opened') ? this.closeSlideshowModal(galleryModal, imagesWrapper) : this.openSlideshowModal(galleryModal, imagesWrapper, clickedImageNumber);
        galleryModal.classList.toggle('opened');
    }

    setImagesPosition(galleryModal, imagesList){
        imagesList.forEach(img => {
            const position = this.calculateImagePosition(galleryModal, img);
            img.style.setProperty('left', `${position.left}px`);
            img.style.setProperty('top', `${position.top}px`);
        });
    }

    calculateImagePosition(container, childElement){
        const slideshowsWrapper = container.querySelector('.images-wrapper');
        const slideshowsWrapperWidth = slideshowsWrapper.getBoundingClientRect().width;
        const slideshowsWrapperHeight = slideshowsWrapper.getBoundingClientRect().height;
        const childElementHeight = childElement.getBoundingClientRect().height;
        const childElementWidth = childElement.getBoundingClientRect().width;
        let positionValue = {};
        
        positionValue.left = slideshowsWrapperWidth/2 - childElementWidth/2;
        positionValue.top = slideshowsWrapperHeight/2 - childElementHeight/2;
        
        return positionValue;
    }

    nextSlide(imagesWrapper, imagesList, nextSlide){
        let currentSlide;
        nextSlide === 0 ? currentSlide = imagesList.length-1 : currentSlide = nextSlide - 1;
        
        imagesList[currentSlide].style.removeProperty('opacity');
        imagesList[nextSlide].style.setProperty('opacity', '1');
        imagesWrapper.dataset.selectedSlide = nextSlide;
        imagesWrapper.classList.add('visible');
    }

    previousSlide(imagesWrapper,imagesList, previousSlide){
        let currentSlide;
        previousSlide == imagesList.length - 1 ? currentSlide = 0 : currentSlide = previousSlide + 1;

        imagesList[currentSlide].style.removeProperty('opacity');
        imagesList[previousSlide].style.setProperty('opacity', '1');
        imagesWrapper.dataset.selectedSlide = previousSlide;
        imagesWrapper.classList.add('visible');
    }

    prevNextSlideHandler(galleryModal, isNext){
        const imagesWrapper = galleryModal.querySelector('.images-wrapper');
        const currentVisibleSlide = parseInt(imagesWrapper.dataset.selectedSlide);
        let nextVisibleSlide = currentVisibleSlide + 1;
        let previousVisibleSlide = currentVisibleSlide - 1;
        const imagesList = imagesWrapper.querySelectorAll('img');
         
        imagesWrapper.classList.remove('visible');
        setTimeout(()=>{
            if(isNext && nextVisibleSlide < imagesList.length){ this.nextSlide(imagesWrapper, imagesList, nextVisibleSlide); } 
            if(isNext && nextVisibleSlide == imagesList.length){ this.nextSlide(imagesWrapper, imagesList, 0); } 
            if (!isNext  && previousVisibleSlide >= 0){ this.previousSlide(imagesWrapper, imagesList, previousVisibleSlide); }
            if (!isNext  && previousVisibleSlide < 0){ this.previousSlide(imagesWrapper, imagesList, imagesList.length - 1); }
        }, 200);
        
    }

    createElement(el, elementClass){
        const newElement = document.createElement(el);
        newElement.className = elementClass;
        return newElement;
    }

    createSlideshowModal(){
        const slideshowModal = this.createElement('section', 'slider-modal');
        slideshowModal.id = 'slideshow';
        const leftArrowElement = this.createElement('div', 'left');
        const rightArrowElement = this.createElement('div', 'right');
        const closeButtonElement = this.createElement('div', 'close');
        slideshowModal.appendChild(leftArrowElement);
        slideshowModal.appendChild(rightArrowElement);
        slideshowModal.appendChild(closeButtonElement);
        
        return slideshowModal;
    }

    createSlideshowImageWrapper(galleryImages){
        const wrapperElement = this.createElement('div', 'images-wrapper');

        galleryImages.forEach(image => {
            const imageForSlideshow = image.cloneNode(true);
            const imageNumber = image.dataset.imageNumber;
            imageForSlideshow.removeAttribute('data-image-number');
            imageForSlideshow.setAttribute('data-slide', imageNumber);
            wrapperElement.appendChild(imageForSlideshow);
        });

        return wrapperElement;
    }


    // main setup method
    init(){

        /* ********************* Create and append slideshow  ************************* */
        // REFORMAT SO USER PASS GALLERY ID, PULL EVERYTHING OUT THAT CAN BE PULLED
        const gallery = document.querySelector('#gallery');
        const galleryImagesList = gallery.querySelectorAll('img');
        const slideshowContainerElement = this.createSlideshowModal();
        const imagesWrapperElement = this.createSlideshowImageWrapper(galleryImagesList);

        slideshowContainerElement.appendChild(imagesWrapperElement);        
        // document.body.appendChild(slideshowContainerElement);
        /* ********************* End Create and append slideshow  ************************* */

        if(this.slideshowModal){
            this.setImagesPosition(this.slideshowModal, this.imagesList);
    
            this.imageContainerList.forEach(item => {
                item.addEventListener('click', this.toggleSlideshowHandler.bind(this, this.slideshowModal))
            });
            this.modalCloseElement.addEventListener('click', this.toggleSlideshowHandler.bind(this, this.slideshowModal));
    
            window.onresize = ()=>{
                this.setImagesPosition(this.slideshowModal, this.imagesList);
            };
    
            // next/previous slide
            this.nextSlideEl.addEventListener('click', this.prevNextSlideHandler.bind(this, this.slideshowModal, true));
            this.previousSlideEl.addEventListener('click', this.prevNextSlideHandler.bind(this, this.slideshowModal, false));
    
        }else{
            console.warn('ERROR: No slideshow modal');
        }
    }
    

}