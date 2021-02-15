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

    // Month&Day YYYY-MM formation
    var dateObj = new Date();
    var month1 = dateObj.getUTCMonth() + 1; //months from 1-12
    var year = dateObj.getUTCFullYear();
    
    newdate = year + "-0" + month1;

    // Format birthday

    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    function formatDate(date) {
        var d = new Date(date),
            month = new Intl.DateTimeFormat('en',{ month: 'long' }).format(d);
            day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
            year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
            // month = '' + d.getMonth(),
            // day = '' + d.getDay(),
            // year = d.getFullYear()
    
        // if (month.length < 2) 
        //     month = '0' + month;
        // if (day.length < 2) 
        //     day = '0' + day;
    
        return [month, day, year].join(' ');
    }

    let birthday = formatDate(j.birthday);


    studentCollection.push(change.doc.data());


    // Student photo
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


// Get individual classes

let accordion = document.createElement('DIV');
accordion.className = `accordion col-lg-4 col-md-4 col-sm-4`;
accordion.setAttribute('id', `${smallName}-accordion`);

// let h2 = document.createElement('H3');
// h2.className = 'text-center text-success';
// h2.innerHTML = 'Class History';
// accordion.appendChild(h2);

let docRef = db.collection("test-students").doc(change.doc.id).collection(newdate + ' classes');

docRef.get().then((snapshot) => {
    const studentTabsBody = document.querySelector('.' + smallName + '-student-profile');
    a = 1;
    snapshot.forEach(doc => {
        console.log(doc.data());
        let docData = doc.data();
        let classesObj = docData;
        let date = [];
        let notes = [];
        date.push(classesObj.date);
        notes.push(classesObj.classNotes);

        let classDate = formatDate(date);

        // Make accordion item outer
        let accordionItem = document.createElement('DIV');
        accordionItem.className = "accordion-item";

        // Make accordion H2
        let accordionH2 = document.createElement('H2');
        accordionH2.className = "accordion-header";
        accordionH2.setAttribute('id', `heading${a}`);

        // Make accordion button
        let accordionButton = document.createElement('BUTTON');
        accordionButton.className = "accordion-button";
        accordionButton.setAttribute('type', 'button');
        accordionButton.setAttribute('data-bs-toggle', 'collapse');
        accordionButton.setAttribute('data-bs-target', `#collapse${a}`);
        accordionButton.setAttribute('aria-expanded', "true");
        accordionButton.setAttribute('aria-controls', `collapse${a}`)
        accordionButton.innerHTML = classDate;

        // Append Selection elements together
        accordionH2.appendChild(accordionButton);
        accordionItem.appendChild(accordionH2);

        // Make accordion collapse outer
        let accordionCollapse = document.createElement('DIV');
        accordionCollapse.setAttribute('id', `collapse${a}`);
        accordionCollapse.className = "accordion-collapse collapse";
        accordionCollapse.setAttribute('aria-labelledby', `heading${a}`);
        accordionCollapse.setAttribute('data-bs-parent', `${smallName}-accordion`);

        // Make accordion body
        let accordionBody = document.createElement('DIV');
        accordionBody.className = "accordion-body";

        // Make P tag to hold notes
        let pTag = document.createElement('P');
        pTag.innerHTML = notes[0];

        // Append Body Elements together
        accordionBody.appendChild(pTag);
        accordionCollapse.appendChild(accordionBody);

        // Append to Accordion Parent Div
        accordion.appendChild(accordionItem);
        accordion.appendChild(accordionCollapse);
        
        // Append to body
        studentTabsBody.appendChild(accordion);

        a++;
    })
});



    let payment;
    // Payment card
    function getPayment(classes) {
        
        let paymentTab = '';
        let rate = 26;
        let hours = (classes * j.classLength) / 60;
        let monthTotal = hours * rate;

        // Check Payment Status
        let paymentVerification = undefined;
        if (payment == true) {
            paymentVerification = 'bg-success'
        } else {
            paymentVerification = 'bg-danger'
        }

        
        

        paymentTab = `
        <div class="col-lg-12 col-md-12 col-sm-12 payment-container">
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
                            <th scope="row">${classes}</th>
                            <td>$${rate}</td>
                            <td class="${smallName}-month-total"></td>
                        </tr>
                        </tbody>
                    </table>
                    <button type="button" id="${smallName}-verify-payment-button" onclick="callTwoFuncs(this.id)" class="btn btn-success verify-button" data-id="${change.doc.id}"><i class="fas fa-check"></i></button>
                </div>
            </div>
        </div>
        `

        const parentDiv = document.querySelector('.' + smallName + "-payment-container");
        parentDiv.innerHTML += paymentTab;

        const tabName = document.querySelector(`#${smallName}-home-tab`);

        const monthTotalDiv = document.querySelector('.' + smallName + '-month-total');
        tabName.addEventListener('click', () => {
            let output = 0;
            const timer = setInterval(() => {
            monthTotalDiv.textContent = `$${output}`;
            if(output === monthTotal) {
                clearInterval(timer);
            } else {
                output+= .5;
            }
            }, 5);

        })
    }

    // get numClasses of month

    let monthNumClasses = 0;
    db.collection('test-students').doc(change.doc.id).collection(`${newdate} classes`).get().then((snapshot) => {
        snapshot.forEach(doc => {
            monthNumClasses++;
        })
        getPayment(monthNumClasses);
    })

    


    // Create student info on tab
    studentInfo = `
    <div data-id="${change.doc.id}" class="tab-pane fade row container col-lg-12 col-md-12 col-sm-12" id="${smallName}" role="tabpanel" aria-labelledby="${smallName}-tab">
        <div class="col-lg-12 col-md-12 col-sm-12 row ${smallName}-student-profile">
            <div class="student-info col-lg-8 col-md-8 col-sm-8 row bg-info">
                <div class="col-lg-6 col-md-6 col-sm-6 student-info-text">
                    <h2 class="student-info-text-h2">${j.name}</h2>
                    Birthday: ${birthday}<br>
                    Nationality: ${j.nationality}<br>
                    Number of Classes: ${j.numClasses} classes<br>
                    Class Length: ${j.classLength} minutes<br>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 student-profile-photo">
                    <img id="${smallName}-photo" src="${studentPhoto}" width="100%" alt="Student Photo">
                </div>
                <div class="student-profile-buttons-all">
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
        </div>
        <div class="row ${smallName}-payment-container col-lg-12 col-md-12 col-sm-12">
        </div>
        
    </div>
    `;
    

    myTabContent.innerHTML += studentInfo;
    
    i++;



    console.log(studentCollection);


}
// Real-time Listener
db.collection('test-students').orderBy('name').onSnapshot(snapshot => {
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

    db.collection('test-students').add({
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

    db.collection('test-students').doc(id).delete();

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
    let monthYear = classDateValue.slice(0, 7);
    let classNotesValue = classNotes.value;
    const increment = firebase.firestore.FieldValue.increment(1);
    let dateNotesBefore = `[{"date": "${classDateValue}","notes": "${classNotesValue}"}]`;
    let dateNotesArr = JSON.parse(dateNotesBefore);
    const dateObj = Object.assign({}, dateNotesArr)

    db.collection('test-students').doc(id).update({
        numClasses: increment,
        studentNotes: classNotesValue
    })

    db.collection('test-students').doc(id).collection(`${monthYear} classes`).doc(`${classDateValue}`).set({
        date: classDateValue,
        classNotes: classNotesValue,
        numClasses: increment
    });
    alert("Class added successfully")
});
