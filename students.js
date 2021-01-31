const deleteStudentForm = document.querySelector('#delete-student-form');
const studentDeleteSelect = document.querySelector('#student-delete-select');
const addNewClassButton = document.querySelector('#add-new-class-button');
const newStudentForm = document.querySelector('#add-new-student-form');
const studentSelect = document.querySelector('#student-select');
const classDate = document.querySelector('#class-date');
const classNotes = document.querySelector('#class-notes');
const myTab = document.querySelector('#myTab');
const myTabContent = document.querySelector('#myTabContent');
const studentPhotoSelect = document.querySelector('#student-photo-select');
const paymentCard = document.querySelectorAll('.payment-container');



function Student(name, birthday, nationality, numClasses, classLength, studentNotes, studentPhotoURL, studentVideoURL, paidMonth) {
    this.name = name,
    this.birthday = birthday,
    this.nationality = nationality,
    this.numClasses = numClasses,
    this.classLength = classLength,
    this.studentNotes = studentNotes
    this.studentPhotoURL = studentPhotoURL,
    this.studentVideoURL = studentVideoURL
    this.paidMonth = paidMonth
}

let studentCollection = []

let i = 1;

function addStudentInfo(change) {
    // Populate Student info
    const j = new Student(change.doc.data().name, change.doc.data().birthday, change.doc.data().nationality, change.doc.data().numClasses, change.doc.data().classLength, change.doc.data().studentNotes, change.doc.data().studentPhotoURL, change.doc.data().studentVideoURL, change.doc.data().paidMonth);
            
    let rate = 26;
    let hours = (j.numClasses * j.classLength) / 60;
    let monthTotal = hours * rate;
    
    studentCollection.push(change.doc.data());

    let newStudent = '';
    let studentInfo = '';
    let studentTab = '';
    let photoUploadInfo = '';
    let deleteStudentSelect = '';

    let smallName = j.name.toLowerCase();

    // Populate Photo form with students

    photoUploadInfo = `<option value="${change.doc.id}" data-id="${change.doc.id}">${j.name}</option>`;
    studentPhotoSelect.innerHTML += photoUploadInfo;

    // Populate delete form with students

    deleteStudentSelect = `<option value="${change.doc.id}" data-id="${change.doc.id}">${j.name}</option>`;
    studentDeleteSelect.innerHTML += deleteStudentSelect;


    // Create student option in select for new class tab
    newStudent = `<option value="${change.doc.id}" data-id="${change.doc.id}">${j.name}</option>`;
    studentSelect.innerHTML += newStudent;


    // Create student tab
    studentTab = `
    <li class="nav-item" role="presentation" data-id="${change.doc.id}">
        <a class="nav-link" id="home-tab" data-bs-toggle="tab" href="#${smallName}" role="tab" aria-controls="home" aria-selected="true">${j.name}</a>
    </li>
    `
    myTab.innerHTML += studentTab;

    // Check Payment Status
    let paymentVerification = undefined;
    if (j.paidMonth === true) {
        paymentVerification = 'bg-success'
    } else {
        paymentVerification = 'bg-danger'
    }


    // Create student info on tab
    studentInfo = `
    <div data-id="${change.doc.id}" class="tab-pane fade row" id="${smallName}" role="tabpanel" aria-labelledby="${smallName}-tab">
        <div class="col-md-12 col-sm-12 row">
            <div class="student-info col-md-6 col-sm-6">
                Name: ${j.name}<br>
                Birthday: ${j.birthday}<br>
                Nationality: ${j.nationality}<br>
                Number of Classes: ${j.numClasses} classes<br>
                Class Length: ${j.classLength} minutes<br>
                <div>
                    <button class="btn btn-warning" type="button" data-bs-toggle="collapse" data-bs-target="#collapseStudentNotes" id="student-notes-collapse-button" aria-expanded="false" aria-controls="collapseStudentNotes">
                        <i class="far fa-clipboard"></i>
                    </button>
                    <button class="btn btn-danger" type="button" data-bs-toggle="collapse" data-bs-target="#collapseStudentVideo" id="student-video-collapse-button" aria-expanded="false" aria-controls="collapseStudentVideo">
                        <i class="fab fa-youtube"></i>
                    </button>
                </div>
                <div class="collapse" id="collapseStudentNotes">
                    <div class="card card-body">
                        <h4 class="text-success">Previous Class Notes</h4>
                        <p>${j.studentNotes}</p>
                    </div>
                </div>
                <div class="collapse" id="collapseStudentVideo">
                    <div class="card card-body student-video-body">
                        <h4 class="text-success">Previous Class Video Replay</h4>
                        ${j.studentVideoURL}
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-sm-6 student-profile-photo bg-success">
                <img id="${smallName}-photo" src="${j.studentPhotoURL}" width="100%" alt="Student Photo">
            </div>
        </div>
        <div class="col-md-12 col-sm-12 payment-container">
            <div class="card ${paymentVerification} ${smallName}-payment-card" data-id="${change.doc.id}">
                <div class="card-body text-center">
                    <h1 class="text-center paymentH1">Payment</h1>
                    <table class="table text-center">
                        <thead>
                        <tr>
                            <th scope="col">Total Classes</th>
                            <th scope="col">Rate</th>
                            <th scope="col">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">${j.numClasses}</th>
                            <td>$${rate}</td>
                            <td>$${monthTotal}</td>
                        </tr>
                        </tbody>
                    </table>
                    <button type="button" id="${smallName}-verify-payment-button" onclick="callTwoFuncs(this.id)" class="btn btn-warning" data-id="${change.doc.id}">Verify Payment</button>
                </div>
            </div>
            
        </div>
    </div>
    `;
    

    myTabContent.innerHTML += studentInfo;
    
    i++;
}

// Real-time Listener
db.collection('students').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added') {
            addStudentInfo(change);
        } else if (change.type == 'removed') {
            let li = myTab.querySelector('[data-id=' + change.doc.id + ']');
            myTab.removeChild(li);
        }
    })
});

console.log(studentCollection);

// Add student to server


newStudentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('students').add({
        name: newStudentForm.name.value,
        birthday: newStudentForm.birthday.value,
        nationality: newStudentForm.nationality.value,
        classLength: newStudentForm.classLength.value,
        studentNotes: newStudentForm.newStudentNotes.value,
        numClasses: 0,

    })

    newStudentForm.name.value = '';
    newStudentForm.birthday.value = '';
    newStudentForm.nationality.value = '';
    newStudentForm.classLength.value = '';
    newStudentForm.newStudentNotes.value = '';
    newStudentForm.numClasses = 0;
    alert("Student added successfully")
});

// Delete Student from Server


deleteStudentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    let id = studentDeleteSelect.value;

    db.collection('students').doc(id).delete();

    let option = studentSelect.querySelector('[data-id=' + id + ']');
    studentSelect.removeChild(option);

    let option2 = studentDeleteSelect.querySelector('[data-id=' + id + ']');
    studentDeleteSelect.removeChild(option2);
    alert("Student deleted successfully")
});

// Add class to student


addNewClassButton.addEventListener('click', (e) => {
    e.stopPropagation();

    let id = studentSelect.value;
    let classDateValue = classDate.value;
    let classNotesValue = classNotes.value;
    const increment = firebase.firestore.FieldValue.increment(1);
    

    db.collection('students').doc(id).update({
        numClasses: increment,
        classDates: classDateValue,
        studentNotes: classNotesValue
    })
    alert("Class added successfully")
});




