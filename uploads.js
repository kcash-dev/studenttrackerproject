const ref = firebase.storage().ref();
const uploadButton = document.querySelector('#upload-button');
const studentPhoto = document.querySelector('#student-photo');
const videoUploadButton = document.querySelector('#video-upload-button');
const video = document.querySelector('#video');



// Student Photo Upload

function uploadImage(){
    const name = studentPhotoSelect.value;
    const file = document.querySelector('#photo').files[0];
    const metadata = {
        contentType: file.type,
    }
    const task = ref.child(name).put(file, metadata)

    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            console.log(url)
            alert("Image Upload Successful")
            db.collection('test-students').doc(name).update({
                studentPhotoURL: url
            })
        });
};

uploadButton.addEventListener('click', (e) => {
    e.preventDefault();
    uploadImage();
})

// Video Insertion


videoUploadButton.addEventListener('click', (e) => {
    e.preventDefault();
    let id = studentPhotoSelect.value;
    let studentVideo = video.value;

    db.collection('test-students').doc(id).update({
        studentVideoURL: studentVideo
    })
    alert("Video added successfully")
})

