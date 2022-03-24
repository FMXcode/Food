function showModal(modalSelector) {
    const modalContent = document.querySelector(modalSelector);
    modalContent.classList.add('show');
    modalContent.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
}

function closeModal(modalSelector) {
    const modalContent = document.querySelector(modalSelector);
    modalContent.classList.add('hide');
    modalContent.classList.remove('show');
    document.body.style.overflow = '';
}


function modal(triggerSelector, modalSelector) {
    //modal

    const dataModal = document.querySelectorAll(triggerSelector),
          modalContent = document.querySelector(modalSelector);
    

    dataModal.forEach( btn => {
        btn.addEventListener('click', () => showModal(modalSelector));
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
            showModal(modalSelector);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export {closeModal};
export {showModal};