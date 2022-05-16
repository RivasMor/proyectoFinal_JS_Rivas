//index

function clearInitSesion() {
    document.getElementById('user').value = '';
    document.getElementById('pass').value = '';
}

function validLogin() {
    let user = document.getElementById('user').value;
    let pass = document.getElementById('pass').value;
    let userArray = JSON.parse(localStorage.getItem('users'));
    if (userArray) {
        for (us of userArray) {
            if (us.newUser === user) {
                if (us.newPassword === pass) {
                    clearInitSesion();
                    let errorMessage = document.getElementById("errorMessage");
                    errorMessage.style.display = "none";
                    window.open("html/activities.html");
                } else {
                    errorMessage.style.display = "block";
                    clearInitSesion();
                }
            } else {
                errorMessage.style.display = "block";
                clearInitSesion();
            }
        }
    } else {
        errorMessage.style.display = "block";
        clearInitSesion();
    }
}

let initSession = document.getElementById('initSession');
initSession.onclick = () => {
    validLogin();
}