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
          dataClose = document.querySelector('[data-close]'),
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

    
    dataClose.addEventListener('click', closeModal);

    modalContent.addEventListener('click', (e) => {
        if (e.target === modalContent) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalContent.classList.contains('show')) {
            closeModal();
        }
    });

    //const modalTimerId = setTimeout(showModal, 10000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelecter) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelecter);
            this.transfer = 27;
            this.changToUAN();
        }

        changToUAN() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container' 
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container' 
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container' 
    ).render();


});