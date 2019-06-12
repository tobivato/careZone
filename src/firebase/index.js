import firebase from 'firebase';

module.exports = {
    init: () => {
        firebase.initializeApp({
            apiKey: "AIzaSyD8TMsR1PHpe1WONMXXlPAhr0VxP6Ed46o",
            authDomain: "carezone-fd9c2.firebaseapp.com",
            databaseURL: "https://carezone-fd9c2.firebaseio.com",
            projectId: "carezone-fd9c2",
            storageBucket: "carezone-fd9c2.appspot.com",
            messagingSenderId: "1091716940899",
            appId: "1:1091716940899:web:2439d106f30f0d8f"
        })
    }
}