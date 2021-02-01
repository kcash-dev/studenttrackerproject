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
const bodyDiv = document.querySelector('.body-div');
const tabPanes = document.querySelectorAll('.tab-panes');
const newStudent = document.querySelector('.add-new-student');
const newClass = document.querySelector('.add-new-class');
const deleteStudent = document.querySelector('.delete-student');
const uploadPhoto = document.querySelector('.add-student-photo');



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
    
    
    let smallName = j.name.toLowerCase();


    
    // Date

    var d = new Date();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var month = month[d.getMonth()];

    // Total Calculation

    let rate = 26;
    let hours = (j.numClasses * j.classLength) / 60;
    let monthTotal = hours * rate;
    
    

    studentCollection.push(change.doc.data());

    let studentPhoto;

    if (j.studentPhotoURL == undefined) {
        studentPhoto = `/student-photo.png`
    } else {
        studentPhoto = j.studentPhotoURL
    }

    let newStudentInfo = '';
    let studentInfo = '';
    let studentTab = '';
    let photoUploadInfo = '';
    let deleteStudentSelect = '';

    

    // Populate Photo form with students

    photoUploadInfo = `<option value="${change.doc.id}" data-id="${change.doc.id}">${j.name}</option>`;
    studentPhotoSelect.innerHTML += photoUploadInfo;

    // Populate delete form with students

    deleteStudentSelect = `<option value="${change.doc.id}" data-id="${change.doc.id}">${j.name}</option>`;
    studentDeleteSelect.innerHTML += deleteStudentSelect;


    // Create student option in select for new class tab
    newStudentInfo = `<option value="${change.doc.id}" data-id="${change.doc.id}">${j.name}</option>`;
    studentSelect.innerHTML += newStudentInfo;


    // Create student tab
    studentTab = `
    <li class="nav-item" role="presentation" data-id="${change.doc.id}">
        <a class="nav-link student-tab" id="${smallName}-home-tab" data-bs-toggle="tab" href="#${smallName}" role="tab" aria-controls="home" aria-selected="true">${j.name}</a>
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
        <div class="col-md-12 col-sm-12 row student-profile bg-info m-0">
            <div class="student-info col-md-6 col-sm-6">
                <h2>${j.name}</h2>
                Birthday: ${j.birthday}<br>
                Nationality: ${j.nationality}<br>
                Number of Classes: ${j.numClasses} classes<br>
                Class Length: ${j.classLength} minutes<br>
                <div class="student-profile-buttons-all">
                    <button class="btn btn-warning student-profile-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseStudentNotes" id="student-notes-collapse-button" aria-expanded="false" aria-controls="collapseStudentNotes">
                        <i class="far fa-clipboard"></i>
                    </button>
                    <button class="btn btn-danger student-profile-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseStudentVideo" id="student-video-collapse-button" aria-expanded="false" aria-controls="collapseStudentVideo">
                        <i class="fab fa-youtube"></i>
                    </button>
                </div>
                <div class="collapse" id="collapseStudentNotes">
                    <div class="card card-body student-notes-card-body">
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
            <div class="col-md-6 col-sm-6 student-profile-photo">
                <img id="${smallName}-photo" src="${studentPhoto}" width="100%" alt="Student Photo">
            </div>
        </div>
        <div class="col-md-12 col-sm-12 payment-container">
            <div class="card ${paymentVerification} ${smallName}-payment-card" data-id="${change.doc.id}">
                <div class="card-body text-center">
                    <h1 class="text-center paymentH1">${month} Payment</h1>
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
                            <td class="month-total">$${monthTotal}</td>
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

    let docRef = db.collection("students").doc(change.doc.id).collection('classes');
    
    
    // Get individual classes
        
    docRef.get().then((snapshot) => {
        a = 1;

        let accordion = document.createElement('DIV');
        accordion.className = `accordion col-md-4 col-sm-4 d-none`;
        accordion.setAttribute('id', `${smallName}-accordion`);

        snapshot.forEach(doc => {
            let docData = doc.data();
            let classesObj = docData;
            let date = [];
            let notes = [];
            date.push(classesObj.date);
            notes.push(classesObj.classNotes);

            let accordionItem = document.createElement('DIV');
            accordionItem.className = "accordion-item";

            let accordionH2 = document.createElement('H2');
            accordionH2.className = "accordion-header";
            accordionH2.setAttribute('id', `heading${a}`);

            let accordionButton = document.createElement('BUTTON');
            accordionButton.className = "accordion-button";
            accordionButton.setAttribute('type', 'button');
            accordionButton.setAttribute('data-bs-toggle', 'collapse');
            accordionButton.setAttribute('data-bs-target', `#collapse${a}`);
            accordionButton.setAttribute('aria-expanded', "true");
            accordionButton.setAttribute('aria-controls', `collapse${a}`)
            accordionButton.innerHTML = date;

            // Append Selection elements together
            accordionH2.appendChild(accordionButton);
            accordionItem.appendChild(accordionH2);

            let accordionCollapse = document.createElement('DIV');
            accordionCollapse.setAttribute('id', `collapse${a}`);
            accordionCollapse.className = "accordion-collapse collapse";
            accordionCollapse.setAttribute('aria-labelledby', `heading${a}`);
            accordionCollapse.setAttribute('data-bs-parent', `${smallName}-accordion`);

            let accordionBody = document.createElement('DIV');
            accordionBody.className = "accordion-body";

            let pTag = document.createElement('P');
            pTag.innerHTML = notes[0];

            // Append Body Elements together
            accordionBody.appendChild(pTag);
            accordionCollapse.appendChild(accordionBody);

            // Append to Accordion Parent Div

            accordion.appendChild(accordionItem);
            accordion.appendChild(accordionCollapse);
        
            bodyDiv.appendChild(accordion);
            console.log(accordion);

            a++;

            const tabName = document.querySelector(`#${smallName}-home-tab`);
            const accordions = document.querySelectorAll('.accordion');
            const accordionName = document.querySelector(`#${smallName}-accordion`);
            tabName.addEventListener('click', (e) => {
                    if(accordionName == null){
                        accordions.forEach(div => {
                            div.classList.add('d-none');
                        });
                    } else if (newStudent.classList.contains('d-none') === false || newClass.classList.contains('d-none') === false || deleteStudent.classList.contains('d-none') === false || uploadPhoto.classList.contains('d-none') === false) {
                        accordionName.classList.add('d-none');
                    } else {
                        accordions.forEach(div => {
                            div.classList.add('d-none');
                        });
                        accordionName.classList.remove('d-none');
                    }
            })
        })
    });
    


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
    let idSmall = id.toLowerCase();
    let classDateValue = classDate.value;
    let classNotesValue = classNotes.value;
    const increment = firebase.firestore.FieldValue.increment(1);
    let dateNotesBefore = `[{"date": "${classDateValue}","notes": "${classNotesValue}"}]`;
    let dateNotesArr = JSON.parse(dateNotesBefore);
    const dateObj = Object.assign({}, dateNotesArr)

    console.log(dateObj);

    console.log(typeof dateObj);

    db.collection('students').doc(id).update({
        numClasses: increment,
        studentNotes: classNotesValue
    })

    db.collection('students').doc(id).collection('classes').doc(`"${classDateValue}"`).set({
        date: classDateValue,
        classNotes: classNotesValue
    });
    alert("Class added successfully")
});


// function createAccordion(id, date, notes){
//     let element = document.querySelector("#" + id + "-accordion");

//     if(typeof(element) == 'undefined' && element == null) {
//     // Make parent div
//     let accordion = document.createElement("DIV");
//     accordion.classList.add('accordion')
//                         .add('col-md-4')
//                         .add('col-sm-4');
//     accordion.setAttribute("id", id + "-accordion");
    
//     // Make child div
//     let accordionItem = document.createElement('DIV');
//     accordionItem.classList.add('accordion-item');

//     // Make H2
//     let accordionH2 = document.createElement('H2');
//     accordionH2.classList.add('accordion-header');
//     accordionH2.setAttribute("id", "class1");

//     // Make button
//     let button = document.createElement('BUTTON');
//     button.classList.add('accordion-button')
//                     .add('collapsed');
//     button.setAttribute("type", "button")
//             .setAttribute("data-bs-toggle", "collapsed")
//             .setAttribute("data-bs-target", "#collapseClass1")
//             .setAttribute("aria-expanded", "true")
//             .setAttribute("aria-controls", "collapseClass1");

//     // Put date as header

//     button.innerHTML = date;
    
//     // Append Header Div
//     accordion.appendChild(accordionItem);
//     accordionItem.appendChild(accordionH2);
//     accordionH2.appendChild(button);

//     // Create accordion body parent div
//     let accordionBodyParent = document.createElement('DIV');
//     accordionBodyParent.classList.add('accordion-collapse')
//                                 .add('collapse')
//                                 .add('show');
//     accordionBodyParent.setAttribute('id', "collapseClass1")
//                         .setAttribute('aria-labelledby', "class1")
//                         .setAttribute("data-bs-parent", id + "-accordion");

//     let accordionBodyChild = document.createElement('DIV');
//     accordionBodyChild.classList.add('accordion-body');

//     // Put notes inside accordion body

//     accordionBodyChild.innerHTML += notes

//     // Append Child div

//     accordionBodyChild.appendChild(button);
//     accordionBodyParent.appendChild(accordionBodyChild);

//     // Append first class to accordion div

//     accordion.appendChild(accordionBodyParent);

//     document.querySelector(".body-div").appendChild(accordion);

//     } 

// }

// console.log(createAccordion("john", "2021-01-31", "Great student!"));
