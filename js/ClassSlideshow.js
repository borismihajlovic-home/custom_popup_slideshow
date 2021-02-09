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

    nextSlide(imagesWrapper, imagesList, currentSlide){
        imagesList[currentSlide].style.removeProperty('opacity');
        imagesList[currentSlide + 1].style.setProperty('opacity', '1');
        imagesWrapper.dataset.selectedSlide = currentSlide + 1;
        imagesWrapper.classList.add('visible');
    }

    previousSlide(imagesWrapper,imagesList, currentSlide){
        imagesList[currentSlide].style.removeProperty('opacity');
        imagesList[currentSlide - 1].style.setProperty('opacity', '1');
        imagesWrapper.dataset.selectedSlide = currentSlide - 1;
        imagesWrapper.classList.add('visible');
    }

    prevNextSlideHandler(galleryModal, isNext){
        const imagesWrapper = galleryModal.querySelector('.images-wrapper');
        const currentVisibleSlide = parseInt(imagesWrapper.dataset.selectedSlide);
        // let nextVisibleSlide = currentVisibleSlide++;
        // let previousVisibleSlide = currentVisibleSlide--;
        const imagesList = imagesWrapper.querySelectorAll('img');
     
        (isNext && currentVisibleSlide < imagesList.length - 1) || (!isNext  && currentVisibleSlide > 0) ? imagesWrapper.classList.remove('visible') : null;
    
        setTimeout(()=>{
            if(isNext && currentVisibleSlide < imagesList.length - 1){            
                this.nextSlide(imagesWrapper, imagesList, currentVisibleSlide);
            } else if (!isNext  && currentVisibleSlide > 0){
                this.previousSlide(imagesWrapper, imagesList, currentVisibleSlide)
            }
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