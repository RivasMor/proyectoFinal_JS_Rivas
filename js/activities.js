function clear() {
    document.getElementById('activity').value = '';
    document.getElementById('dificult').value = '';
    document.getElementById('availableSeats').value = '';
}

function generarID(array) {
    if (array.length > 0) {
        let max = Math.max.apply(Math, array.map(function (o) {
            return o.id;
        }));
        let num = max + 1;
        return num;
    }
    return 1;
}

function buscarCiudades() {
    let ciudadesDrop = document.getElementById('ciudadesDropdown');
    let ciudadesInnerHtml = `<option selected="true" disabled="disabled"></option>>`;
   fetch('https://628278e29fac04c65415c40e.mockapi.io/ciudades')
        .then((resp) => resp.json())
        .then((data) => {
            data.provincias.forEach(element => {
                ciudadesInnerHtml += `<option value="${element.nombre}">${element.nombre}</option>`
            });
            ciudadesDrop.innerHTML = ciudadesInnerHtml;
        });
}

function buscarCiudadesConDefault(ciudad) {
    let ciudadesDrop = document.getElementById('ciudadesDropdown');
    let ciudadesInnerHtml = "";
    fetch('https://628278e29fac04c65415c40e.mockapi.io/ciudades')
        .then((resp) => resp.json())
        .then((data) => {
            data.provincias.forEach(element => {
                ciudadesInnerHtml += `<option value="${element.nombre}">${element.nombre}</option>`
            });
            ciudadesDrop.innerHTML = ciudadesInnerHtml;
            ciudadesDrop.value = ciudad;
        });
}
//Activities
function activities(id) {
    let idEditActivity = document.getElementById('idEditActivity').value;
    if (idEditActivity == "") {
        addNewActivity();
    } else {
        let arrayActivities = JSON.parse(localStorage.getItem('activities'));
        let id = document.getElementById('idEditActivity').value;
        let activity = document.getElementById('activity').value;
        let dificult = document.getElementById('dificult').value;
        let availableSeats = document.getElementById('availableSeats').value;
        let cities = document.getElementById('ciudadesDropdown');
        let city = cities.options[cities.selectedIndex].value;
        let newArray = arrayActivities.filter((act) => act.id != id);
        newArray.push({
            id,
            activity,
            dificult,
            availableSeats,
            city
        });
        localStorage.setItem('activities', JSON.stringify(newArray));

        let cancelActivity = document.getElementById('cancelActivity');
        cancelActivity.click();
        setTimeout(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Modificacion exitosa',
                showConfirmButton: false,
                timer: 1500
            })
        }, 200);
        deletTable();
        showActivities();
    }
}

function addNewActivity() {
    let activity = document.getElementById('activity').value;
    let dificult = document.getElementById('dificult').value;
    let cities = document.getElementById('ciudadesDropdown');
    let availableSeats = document.getElementById('availableSeats').value;
    let arrayActivities = JSON.parse(localStorage.getItem('activities')) || [];
    let city = cities.options[cities.selectedIndex].value;
    let id = generarID(arrayActivities);
    arrayActivities.push({
        id,
        activity,
        dificult,
        city,
        availableSeats

    })
    localStorage.setItem('activities', JSON.stringify(arrayActivities));
    clear();
    let cancelActivity = document.getElementById('cancelActivity');
    cancelActivity.click();

    setTimeout(() => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Guardamos tu actividad',
            showConfirmButton: false,
            timer: 1500
        })
    }, 200);
    deletTable();
    showActivities();
}

function showActivitiesModal(id) {
    let exampleModalLongTitle = document.getElementById('exampleModalLongTitle');
    exampleModalLongTitle.innerHTML = 'Modificar Actividad';
    let arrayActivities = JSON.parse(localStorage.getItem('activities'));
    for (act of arrayActivities) {
        if (act.id == id) {
            let id = document.getElementById('idEditActivity');
            id.value = act.id;
            let activity = document.getElementById('activity');
            activity.value = act.activity;
            let dificult = document.getElementById('dificult');
            dificult.value = act.dificult;
            let availableSeats = document.getElementById('availableSeats');
            availableSeats.value = act.availableSeats;
            let city = act.city;
            buscarCiudadesConDefault(city);



        }
    }
}


function deletTable() {
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = "";
}


function showActivities() {  
    let table = document.getElementById('tableActivities');
        let headerTable = document.getElementById('headerTable');
        let tableBody = document.getElementById('tableBody');    
        deletTable();  
    let arrayActivities = JSON.parse(localStorage.getItem('activities'));    
    if (arrayActivities && arrayActivities !== []) {        
        for (activity of arrayActivities) {
            let hilera = document.createElement("tr");
            let celda = document.createElement('td');
            let textoCelda = document.createTextNode(activity.id);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);

            celda = document.createElement('td');
            textoCelda = document.createTextNode(activity.activity);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);

            celda = document.createElement('td');
            textoCelda = document.createTextNode(activity.dificult);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);

            celda = document.createElement('td');
            textoCelda = document.createTextNode(activity.city);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);

            celda = document.createElement('td');
            textoCelda = document.createTextNode(activity.availableSeats);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
            celda = document.createElement('td');
            textoCelda = `
                     <ul class="action-list">
                    <li><a href="#" class="btn btn-warning" data-toggle="modal" data-target="#exampleModalCenter"  onclick="showActivitiesModal('${activity.id}')" id="btnShowModalEdit"><i class="fa fa-pencil-alt"></i></a></li>
                    <li><a href="#" class="btn btn-danger" onclick="removeActivity('${activity.id}')" id="bntRemove"><i class="fa fa-times"></i></a></li>
                    </ul>`
            celda.innerHTML = textoCelda;
            hilera.appendChild(celda);
            tableBody.appendChild(hilera);
        }
    }
}

function removeActivity(id) {
    Swal.fire({
        title: '¿Estas seguro de eliminarlo?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminado',
                'Tu actividad fue eliminada!',
                'success'
            )
            let arrayActivities = JSON.parse(localStorage.getItem('activities'));
            let arrayActivities2 = arrayActivities.filter(function (actividad) {
                return actividad.id != id
            })

            localStorage.setItem('activities', JSON.stringify(arrayActivities2));
            showActivities();
        }
    })

}


let btnShowModalAdd = document.getElementById('btnShowModalAdd');
btnShowModalAdd.onclick = () => {
    let exampleModalLongTitle = document.getElementById('exampleModalLongTitle');
    exampleModalLongTitle.innerHTML = 'Nueva Actividad';
    clear();
    buscarCiudades();
}
let btnSaveActivity = document.getElementById('btnSaveActivity');
btnSaveActivity.onclick = () => {

    let id = document.getElementById('idEditActivity').value;
    activities(id);
}

