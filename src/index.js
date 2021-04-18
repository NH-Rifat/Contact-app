//! import http modules
import {http} from './http';
//! import ui
import {ui} from './ui'



document.addEventListener('DOMContentLoaded',getContacts);
getContacts();

function getContacts(){
    http.get('http://localhost:3000/contacts')
    .then((data)=>{
        ui.paint(data)
    })
    .catch((err)=>{
        ui.showAlert('Problem in getting Contacts', 'alert-danger');;
    })
}

    document.querySelector('#contact-submit').addEventListener('click',submitContact);

    function submitContact(event){
        
            event.preventDefault();
            const firstName = document.querySelector('#firstName').value;
            const lastName = document.querySelector('#lastName').value;
            const email = document.querySelector('#email').value;
            const phone = document.querySelector('#phone').value;
            const id = document.querySelector('#id').value;
            //console.log(firstName,lastName,email,phone);
            if(firstName==='' || lastName==='' || email==='' || phone===''){
                ui.showAlert('please provide necessary information', 'alert-danger');
            }else{
                const data={
                    firstName,
                    lastName,
                    email,
                    phone
                }
                if(id===''){
                    http.post('http://localhost:3000/contacts',data)
                    .then((res)=>{
                        ui.showAlert('Contact Added Successfully', 'alert-success');
                        //console.log(res);
                        getContacts();
                        ui.clearField();
                    });
                    
                }else{
                    
                    http.update(`http://localhost:3000/contacts/${id}`,data)
                        .then(()=>{
                            ui.showAlert('Contact Updated Successfully', 'alert-success');
                            ui.changeState('add');
                            ui.clearField();

                            getContacts();
                        })
                }
            }
        
    }

// !...Delete contacts....
document.querySelector('#contacts').addEventListener('click',deleteContact);

function deleteContact(event){
    //console.log(event.target);
    if(event.target.parentElement.id==='delete'){
        //console.log('contact deleted');
        const targetId = event.target.parentElement.dataset.id;
        //console.log(targetId);
        http.delete(`http://localhost:3000/contacts/${targetId}`)
        .then(()=>{
            ui.showAlert('Contact successfully Deleted','alert-success');
            getContacts()
        })
        .catch((err)=>ui.showAlert('Contact can not be Deleted', 'alert-danger'))
        
    }
}

// !....contact update......

document.querySelector('#contacts').addEventListener('click',updateContact);

function updateContact(event){
    //console.log(event.target);
    if(event.target.parentElement.id==='edit'){
        //console.log('contact deleted');
        const editId = event.target.parentElement.dataset.id;
        //console.log(editId);
        http.get(`http://localhost:3000/contacts/${editId}`)
        .then((data)=>{
            //console.log(data);
            ui.fillForm(data);

            ui.editBtnHandle()
        })
        .catch((err)=>console.log(err))
        
    }
}

//!...cancel button remove for clicking the cancel button.......
document.querySelector('.contact-form').addEventListener('click',cancelUpdate);

function cancelUpdate(event){
    if(event.target.id==='Cancel'){
        ui.changeState('add');
        ui.clearField();
    }
    event.preventDefault();
}

    // const obj={
    //         id:5,
    //         firstName:"Modu",
    //         lastName:"mia",
    //         email:"modu@gmail.com",
    //         phone:"01634987510"
    // }

// http.post('http://localhost:3000/contacts',obj)
//     .then((data)=>{
//         console.log(data);
//     })

// http.update('http://localhost:3000/contacts/2',obj)
// .then((data)=>{
//     console.log(data);
// })

// http.delete('http://localhost:3000/contacts/2')
// .then((data)=>{
//     console.log(data);
// })
