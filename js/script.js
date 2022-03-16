window.addEventListener('DOMContentLoaded', () => {

const   contentTab = document.querySelectorAll('.tabcontent'),
        menuTab = document.querySelectorAll('.tabheader__item'),
        parentTab = document.querySelector('.tabheader__items');

function hideTabContent() {
    contentTab.forEach( item => {
        item.classList.add('hide'); 
        item.classList.remove('show');
    });

    menuTab.forEach ( item => {
        item.classList.remove('tabheader__item_active');
    });
}

function showTabContent(i = 0) {
    contentTab[i].classList.add('show', 'fade');
    contentTab[i].classList.remove('hide');
    menuTab[i].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent();

parentTab.addEventListener('click', event => {
    const target = event.target;
    if ( target && target.classList.contains('tabheader__item') ) {
        menuTab.forEach( (item, i) => {
            if (target == item ) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
    
});

//timer
    const deadline = '2023-02-25';


    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    function secClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();


        function updateClock() {
            const t = getTimeRemaining(endtime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);
            
            
            if(t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    secClock('.timer', deadline);

    //modal

    const dataModal = document.querySelectorAll('[data-modal]'),
          modalContent = document.querySelector('.modal');
    
    function showModal() {
        modalContent.classList.add('show');
        modalContent.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    
    function closeModal() {
        modalContent.classList.add('hide');
        modalContent.classList.remove('show');
        document.body.style.overflow = '';
    }

    dataModal.forEach( btn => {
        btn.addEventListener('click', showModal);
    });


    modalContent.addEventListener('click', (e) => {
        if (e.target === modalContent || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalContent.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(showModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelecter, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelecter);
            this.transfer = 27;
            this.changToUAN();
        }

        changToUAN() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                element.classList.add('menu__item');
            }
            this.classes.forEach(className => element.classList.add(className));
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            `;
            this.parent.append(element);
        }
    }

    const getResourse = async (url, data) => {
        const res = await fetch(url);

        if (!res.ok) {
           throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    /* getResourse('http://localhost:3000/menu')
        .then( data => {
            data.forEach( ({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        }); */
  
    axios.get('http://localhost:3000/menu')
        .then (data => {
            data.forEach(({}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .containet').render();
            });
        });

   /*  getResourse('http://localhost:3000/menu')
        .then( data => createCard(data));

        function createCard(data) {
            data.forEach(({img, altimg, title, descr, price}) => {
                const element = document.createElement('div');

                element.classList.add('menu__item');

                element.innerHTML = 
                `
                <img src=${img} alt=${altimg}>
                    <h3 class="menu__item-subtitle">${title}</h3>
                    <div class="menu__item-descr">${descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${price}</span> грн/день</div>
                
                `;

                document.querySelector('.menu .container').append(element);
            });
        }
 */
    
    //формс 
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'спасибо мы свами свяжимся',
        failure: 'Что-то пошло не так!'
    }

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        }); 

        return await res.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margim: 0 auto;
            `
            form.insertAdjacentElement('afterend', statusMessage);


          
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            

            postData('http://localhost:3000/menu', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('.modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `

        document.querySelector('.modal').append(thanksModal);
        setTimeout( ()=>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.add('hide');
            closeModal();
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
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

}); 