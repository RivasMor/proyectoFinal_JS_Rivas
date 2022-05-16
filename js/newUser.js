//newUser
//page newUser
function validateFields(...fields) {
    return !fields.includes("");
}


function clear() {
    document.getElementById('nameNewUser').value = '';
    document.getElementById('lastNameNewUser').value = '';
    document.getElementById('dniNewUser').value = '';
    document.getElementById('newUser').value = '';
    document.getElementById('newPassword').value = '';
}

function addNewUser() {
    let nameNewUser = document.getElementById('nameNewUser').value;
    let lastNameNewUser = document.getElementById('lastNameNewUser').value;
    let dniNewUser = document.getElementById('dniNewUser').value;
    let newUser = document.getElementById('newUser').value;
    let newPassword = document.getElementById('newPassword').value;
    let isValid = false;
    isValid = validateFields(nameNewUser, lastNameNewUser, dniNewUser, newUser, newPassword);
    let userArray = JSON.parse(localStorage.getItem('users')) || [];

    if (isValid) {
        userArray.push({
            nameNewUser,
            lastNameNewUser,
            dniNewUser,
            newUser,
            newPassword
        });

        localStorage.setItem('users', JSON.stringify(userArray));

        Swal.fire({

            text: "¡Ya registramos tus datos!",

        }).then(function () {
            window.location = "../index.html";
        });



    } else {
        Swal.fire('¡No pudimos registrar tus datos! Intenta nuevamente');
        clear();

    }
}

let buttonNewUser = document.getElementById('buttonNewUser');
buttonNewUser.onclick = () => {
    addNewUser();
}