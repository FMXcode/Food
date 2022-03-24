function slider() {
    // слайдер номер №1


    const current = document.querySelector('#current'),
          total = document.querySelector('#total'),
          sliderPrev = document.querySelector('.offer__slider-prev'),
          sliderNext = document.querySelector('.offer__slider-next'),
          offerSlide = document.querySelectorAll('.offer__slide'),
          slidesWapper = document.querySelector('.offer__slider-wrapper'),
          slidesInner = document.querySelector('.offer__slide-inner'),
          slider = document.querySelector('.offer__slider'),
          width = window.getComputedStyle(slidesWapper).width;
    let indexSlide = 1,
        offset = 0;  


    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
          
    indicators.classList.add('carousel-indicators')
    indicators.style.cssText = 
    `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;
 
    slider.append(indicators);

    for( let i = 0; i < offerSlide.length; i ++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = 
        `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
        
    }
 

    slidesInner.style.width = 100 * offerSlide.length + '%';
    slidesInner.style.display = 'flex';
    slidesInner.style.transition = 'all 1s';

    slidesWapper.style.overflow = 'hidden';

    offerSlide.forEach(slide => {
        slide.style.width = width;
    });


    function changeIndicator() {
        dots.forEach(dot => dot.style.opacity = .5)
        dots[indexSlide - 1].style.opacity = 1;
    }

    sliderNext.addEventListener('click', () =>{
        if (offset == +width.slice(0, width.length - 2) * (offerSlide.length - 1)) {
            offset = 0;
            /* document.querySelector(`[data-slide-to = "${offerSlide.length}"]`).style.opacity = 1; */
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slidesInner.style.transform = `translateX(-${offset}px)`;
        plusSlide(1);
        changeIndicator();
    });
    
    
    sliderPrev.addEventListener('click', () =>{
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (offerSlide.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesInner.style.transform = `translateX(-${offset}px)`;
        plusSlide(-1);
        changeIndicator();
    });

    showSlide(indexSlide);

    if (offerSlide.length < 10) {
        total.innerHTML = `0${offerSlide.length}`;
    } else {
        total.innerHTML = `${offerSlide.length}`;
    }

    function showSlide(n) {
        for (i = 1; i <= offerSlide.length; i++) {
        }

        if (n > offerSlide.length) {
            indexSlide = 1;
        }

        if(n < 1) {
            indexSlide = offerSlide.length;
        }
        /* offerSlide.forEach(item => item.style.display = 'none');

        offerSlide[indexSlide - 1].style.display = 'block'; */

        if (indexSlide < 10) {
            current.innerHTML = `0${indexSlide}`;
        } else {
            current.innerHTML = `${indexSlide}`;
        }
        

    }

    function plusSlide(n) {
        showSlide(indexSlide += n);
    }
    
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
        indexSlide = dots.indexOf(e.target) + 1;
            dots.forEach(dots => dots.style.opacity = .5)
            e.target.style.opacity = 1;
            if (indexSlide < 10) {
                current.innerHTML = `0${dots.indexOf(e.target) + 1}`;
            } else {
                current.innerHTML = `${dots.indexOf(e.target) + 1}`;
            }
            offset = +width.slice(0, width.length - 2) * dots.indexOf(e.target);
            slidesInner.style.transform = `translateX(-${offset}px)`;
            
        });
    });
}

export default slider;