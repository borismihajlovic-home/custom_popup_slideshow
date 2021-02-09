console.log(' slideshow js loaded....');

class Slideshow{
    slideshowModal = document.querySelector('#slideshow');
    modalCloseElement = document.querySelector('.close');
    imagesList = document.querySelectorAll('.images-wrapper img');
    nextSlideEl = this.slideshowModal.querySelector('.right');
    previousSlideEl = this.slideshowModal.querySelector('.left');
    imageContainerList = document.querySelectorAll(`#imagesContainer div`);  // gallery images container
    

    openSlideshowModal(galleryModal, imagesWrapper){
        galleryModal.style.setProperty('z-index', 99);
        setTimeout(()=>{
            imagesWrapper.classList.add('visible');
        }, 200);
    };

    closeSlideshowModal(galleryModal, imagesWrapper){
        setTimeout(()=>{
            galleryModal.style.removeProperty('z-index');
            imagesWrapper.classList.remove('visible');
        }, 250);
    }

    toggleSlideshowHandler(galleryModal){
        const imagesWrapper = galleryModal.querySelector('.images-wrapper');
        galleryModal.classList.contains('opened') ? this.closeSlideshowModal(galleryModal, imagesWrapper) : this.openSlideshowModal(galleryModal, imagesWrapper);
        galleryModal.classList.toggle('opened');
    }

    setImagesPosition(galleryModal, imagesList){
        imagesList.forEach(img => {
            const positionLeft = this.calculateImagePosition(galleryModal, img);
            img.style.setProperty('left', `${positionLeft}px`);
        });
    }

    calculateImagePosition(container, childElement){
        const slideshowsWrapper = container.querySelector('.images-wrapper');
        const slideshowsWrapperWidth = slideshowsWrapper.getBoundingClientRect().width;
        const childElementWidth = childElement.getBoundingClientRect().width;
        let positionValue = 0;
        
        positionValue = slideshowsWrapperWidth/2 - childElementWidth/2;
        
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


    // main setup method
    setup(){
        if(this.slideshowModal){
            this.setImagesPosition(this.slideshowModal, this.imagesList);
    
            this.imageContainerList.forEach(item => item.addEventListener('click', this.toggleSlideshowHandler.bind(this, this.slideshowModal)));
            this.modalCloseElement.addEventListener('click', this.toggleSlideshowHandler.bind(this, this.slideshowModal));
    
            window.onresize = ()=>{
                setImagesPosition(this.slideshowModal, this.imagesList);
            };
    
            // next/previous slide
            this.nextSlideEl.addEventListener('click', this.prevNextSlideHandler.bind(this, this.slideshowModal, true));
            this.previousSlideEl.addEventListener('click', this.prevNextSlideHandler.bind(this, this.slideshowModal, false));
    
        }else{
            console.warn('ERROR: No slideshow modal');
        }
    }
    

}



const slideshow = new Slideshow();
slideshow.setup()