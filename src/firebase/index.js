import firebase from 'firebase';

module.exports = {
    init: () => {
        firebase.initializeApp({
            apiKey: "AIzaSyDuiHk85CEXDXpi31DXN1-gIPjNeXPeqWg",
            authDomain: "careapp-fe9dc.firebaseapp.com",
            databaseURL: "https://careapp-fe9dc.firebaseio.com",
            projectId: "careapp-fe9dc",
            storageBucket: "careapp-fe9dc.appspot.com",
            messagingSenderId: "944161958584",
            appId: "1:944161958584:web:9e0f27015e499a12"
        })
    }
}