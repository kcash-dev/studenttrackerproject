
const popup = document.querySelector('.popup-wrapper');
const payment = document.getElementsByClassName('.payment-container');
const verifyButton = document.querySelector('.verify-button');
const cancelButton = document.querySelector('.cancel-button');
const accordion = document.querySelector('.accordion');



// Show 'Student Photo' Upload Input
document.querySelector('#upload-image-button').addEventListener('click', () => {

    if (uploadPhoto.classList.contains('d-none')) {
        uploadPhoto.classList.remove('d-none');
    } else if(uploadPhoto.classList.contains('d-none') == false) {
        uploadPhoto.classList.add('d-none');
    }

    if (newClass.classList.contains('d-none') === false) {
        newClass.classList.add('d-none');
    }

    if (deleteStudent.classList.contains('d-none') === false) {
        deleteStudent.classList.add('d-none');
    }

    if (newStudent.classList.contains('d-none') === false) {
        newStudent.classList.add('d-none');
    }
})


// Show 'Add Student' input
document.querySelector('#add-student-button').addEventListener('click', () => {
    

    if (newStudent.classList.contains('d-none')) {
        newStudent.classList.remove('d-none');
    } else if(newStudent.classList.contains('d-none') == false) {
        newStudent.classList.add('d-none');
    }

    if (newClass.classList.contains('d-none') === false) {
        newClass.classList.add('d-none');
    }

    if (deleteStudent.classList.contains('d-none') === false) {
        deleteStudent.classList.add('d-none');
    }

    if (uploadPhoto.classList.contains('d-none') === false) {
        uploadPhoto.classList.add('d-none');
    }
});


// Show 'Add Class' input
document.querySelector('#add-class-button').addEventListener('click', () => {

    if (newClass.classList.contains('d-none')) {
        newClass.classList.remove('d-none');
    } else if(newClass.classList.contains('d-none') == false) {
        newClass.classList.add('d-none');
    }

    if (newStudent.classList.contains('d-none') === false) {
        newStudent.classList.add('d-none');
    }

    if (deleteStudent.classList.contains('d-none') === false) {
        deleteStudent.classList.add('d-none');
    }

    if (uploadPhoto.classList.contains('d-none') === false) {
        uploadPhoto.classList.add('d-none');
    }
});

// Show 'Delete Student' input
document.querySelector('#delete-student-button').addEventListener('click', () => {

    if (deleteStudent.classList.contains('d-none')) {
        deleteStudent.classList.remove('d-none');
    } else if (deleteStudent.classList.contains('d-none') == false) {
        deleteStudent.classList.add('d-none');
    }

    if (newStudent.classList.contains('d-none') === false) {
        newStudent.classList.add('d-none');
    }

    if (newClass.classList.contains('d-none') === false) {
        newClass.classList.add('d-none');
    }

    if (uploadPhoto.classList.contains('d-none') === false) {
        uploadPhoto.classList.add('d-none');
    }
})

// Get clicked button ID


function getID(clicked_id){
    id = clicked_id;
}

// Show Popup
function showPopup() {
    popup.classList.remove('d-none');
}

// Get Button ID to find parent
var id = undefined;
function callTwoFuncs(clicked_id){
    getID(clicked_id);
    showPopup();
}



// Verify Payment

verifyButton.addEventListener('click', () => {
    document.querySelector(`#${id}`).parentElement.parentElement.classList.remove('bg-danger');
    document.querySelector(`#${id}`).parentElement.parentElement.classList.add('bg-success');
    popup.classList.add('d-none');

    
    var studentID = document.querySelector(`#${id}`).getAttribute('data-id');
    console.log(studentID);
    
    db.collection('students').doc(studentID).update({
        paidMonth: true
    })
})

cancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.add('d-none');
})

// if (uploadPhoto.classList.contains('d-none') === false || newClass.classList.contains('d-none') === false || deleteStudent.classList.contains('d-none') || newStudent.classList.contains('d-none') {
//     accordion.classList.add('d-none');
// } else {
//     if (accordion.classList.contains('d-none') === true) {
//         accordion.classList.remove('d-none');
//     }
// }
