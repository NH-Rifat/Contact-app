class Ui{
    constructor(){
        this.containerClass = document.querySelector('.container-class');
        this.contactInput = document.querySelector('#contacts');
        this.firstName = document.querySelector('#firstName');
        this.lastName = document.querySelector('#lastName');
        this.email = document.querySelector('#email');
        this.phone = document.querySelector('#phone');
        this.contactSubmit = document.querySelector('#contact-submit')
        this.contactForm = document.querySelector('.contact-form')
        this.formEnd = document.querySelector('.form-end')
        this.idInput = document.querySelector('#id');
    }
    paint(contacts){
        let output='';
        
        contacts.forEach((contact)=>{
            const {firstName,lastName,email,phone,id} = contact;
            output +=`
        <div class="card mb-4">
            <div class="card-body mb-3">
                <h5 class="card-title">${firstName} ${
                    lastName}</h5>
                <p class="card-text">${email}</p>
                <p class="card-text">${phone}</p>
                <a href="#" class="mr-3" id="edit" data-id="${id}">
                    <i class="fas fa-pencil-alt"  ></i>
                </a>
                <a href="#"  id="delete" data-id="${id}">
                    <i class="fas fa-trash-alt"></i>
                </a>
            </div>
        </div>
        `;
        });

        this.contactInput.innerHTML = output;
    }

    clearField(){
        this.firstName.value='';
        this.lastName.value='';
        this.email.value='';
        this.phone.value='';
    }

    fillForm(contact){
        console.log(contact);
        const {firstName,lastName,email,phone,id} = contact;
        console.log(firstName,lastName,email,phone,id);
        this.firstName.value=firstName;
        this.lastName.value=lastName;
        this.email.value=email;
        this.phone.value=phone;
        this.idInput.value=id;
    }

    editBtnHandle(){
        this.contactSubmit.textContent='Update Contact'
        this.contactSubmit.classList.remove('btn-primary');
        this.contactSubmit.classList.add('btn-danger');

        this.addCancelBtn();
    }

    addCancelBtn(){
        const btn=document.createElement('button');
        btn.className = 'btn btn-block btn-success'
        btn.id = 'Cancel';
        btn.textContent='Cancel';

        //? insert cancel Button 
        this.contactForm.insertBefore(btn,this.formEnd)
    }
    
    changeState(state){
        if(state==='add'){
            if(document.querySelector('#Cancel')){
                document.querySelector('#Cancel').remove();
            }
            this.contactSubmit.textContent = 'Submit Contact';
            this.contactSubmit.classList.add('btn-primary');
            this.contactSubmit.classList.remove('btn-danger');
            this.idInput.value = '';
            
        }
    }

    showAlert(msg,className){
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.textContent=msg;
        this.containerClass.insertBefore(div,this.contactInput);
        setTimeout(()=>{
            this.clearAlert();
        },2000)

    }

    clearAlert(){
        if(document.querySelector('.alert')){
            document.querySelector('.alert').remove();
        }
    }

}

export const ui = new Ui();