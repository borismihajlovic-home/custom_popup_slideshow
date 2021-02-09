console.log(' slideshow js loaded....');

const openSlideshowModal = (galleryModal, imagesWrapper)=>{
    // const imagesList = imagesWrapper.querySelectorAll('img');
    console.log('opennnn');
    galleryModal.style.setProperty('z-index', 99);
    setTimeout(()=>{
        imagesWrapper.classList.add('visible');
    }, 200);
};

const closeSlideshowModal = (galleryModal, imagesWrapper)=>{
    setTimeout(()=>{
        galleryModal.style.removeProperty('z-index');
        imagesWrapper.classList.remove('visible');
    }, 250);
};

const toggleSlideshowHandler = (galleryModal)=>{
    const imagesWrapper = galleryModal.querySelector('.images-wrapper');
    galleryModal.classList.contains('opened') ? closeSlideshowModal(galleryModal, imagesWrapper) : openSlideshowModal(galleryModal, imagesWrapper);
    galleryModal.classList.toggle('opened');
}

const setImagesPosition = (galleryModal, imagesList)=>{
    imagesList.forEach(img => {
        const positionLeft = calculateImagePosition(galleryModal, img, 'left');
        img.style.setProperty('left', `${positionLeft}px`);
    });
};

const calculateImagePosition = (container, childElement, positionStartAttribute)=>{
    const slideshowsWrapper = container.querySelector('.images-wrapper');
    const slideshowsWrapperWidth = slideshowsWrapper.getBoundingClientRect().width;
    const slideshowsWrapperHeight = slideshowsWrapper.getBoundingClientRect().height;
    const childElementWidth = childElement.getBoundingClientRect().width;
    const childElementHeight = childElement.getBoundingClientRect().height;
    let positionValue = 0;
    
    (positionStartAttribute === 'left' || positionStartAttribute === 'right') ? 
        positionValue = slideshowsWrapperWidth/2 - childElementWidth/2 : positionValue = slideshowsWrapperHeight/2 - childElementHeight/2;
    
    return positionValue;
};

const nextSlide = (imagesWrapper, imagesList, currentSlide)=>{
    imagesList[currentSlide].style.removeProperty('opacity');
    imagesList[currentSlide + 1].style.setProperty('opacity', '1');
    imagesWrapper.dataset.selectedSlide = currentSlide + 1;
    imagesWrapper.classList.add('visible');
};

const previousSlide = (imagesWrapper,imagesList, currentSlide)=>{
    imagesList[currentSlide].style.removeProperty('opacity');
    imagesList[currentSlide - 1].style.setProperty('opacity', '1');
    imagesWrapper.dataset.selectedSlide = currentSlide - 1;
    imagesWrapper.classList.add('visible');
};

const prevNextSlideHandler = (galleryModal, isNext)=>{
    const imagesWrapper = galleryModal.querySelector('.images-wrapper');
    const currentVisibleSlide = parseInt(imagesWrapper.dataset.selectedSlide);
    const imagesList = imagesWrapper.querySelectorAll('img');
 
    (isNext && currentVisibleSlide < imagesList.length - 1) || (!isNext  && currentVisibleSlide > 0) ? imagesWrapper.classList.remove('visible') : null;

    setTimeout(()=>{
        if(isNext && currentVisibleSlide < imagesList.length - 1){            
            nextSlide(imagesWrapper, imagesList, currentVisibleSlide);
        } else if (!isNext  && currentVisibleSlide > 0){
            previousSlide(imagesWrapper, imagesList, currentVisibleSlide)
        }
    }, 200);
    
};


(function(){
     
    // Slideshow
    const slideshowModal = document.querySelector('#slideshow');
    const imageContainerList = document.querySelectorAll('#gallery .item');
    const modalCloseElement = document.querySelector('.close');
    const imagesList = document.querySelectorAll('.images-wrapper img');
    const nextSlideEl = slideshowModal.querySelector('.right');
    const previousSlideEl = slideshowModal.querySelector('.left');
    if(slideshowModal){
        setImagesPosition(slideshowModal, imagesList);

        imageContainerList.forEach(item => item.addEventListener('click', toggleSlideshowHandler.bind(false, slideshowModal)));
        modalCloseElement.addEventListener('click', toggleSlideshowHandler.bind(false, slideshowModal));

        window.onresize = ()=>{
            const imagesList = slideshowModal.querySelector('.images-wrapper').querySelectorAll('img');
            setImagesPosition(slideshowModal, imagesList);
        };

        // next/previous slide
        nextSlideEl.addEventListener('click', prevNextSlideHandler.bind(false, slideshowModal, true));
        previousSlideEl.addEventListener('click', prevNextSlideHandler.bind(false, slideshowModal, false));

    }
})()