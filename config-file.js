var firebaseConfig = {
    apiKey: "AIzaSyD8g77Oa4XK93uj8p1-yi-y0Wbl2Hn71P0",
    authDomain: "student-tracker-babab.firebaseapp.com",
    projectId: "student-tracker-babab",
    storageBucket: "student-tracker-babab.appspot.com",
    messagingSenderId: "886497130279",
    appId: "1:886497130279:web:84ede1ad54ffbb7f7d1b02",
    measurementId: "G-F2K5KS1JQ9"
};

    // Your web app's Firebase configuration
     // For Firebase JS SDK v7.20.0 and later, measurementId is optional
     firebaseConfig;
     // Initialize Firebase
     firebase.initializeApp(firebaseConfig);
     firebase.analytics();
     const db = firebase.firestore();
     db.settings({ timestampsInSnapshots: true });