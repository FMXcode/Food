function tabs() {


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
}

export default tabs;