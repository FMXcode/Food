import {closeModal, showModal} from './modal';

function forms() {
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
}

export default forms;