
const firebaseConfig = {
  apiKey: "AIzaSyDnxdCNRJNVhn00WkIGlgyEsDTnN8N20wg",
  authDomain: "smokescreen-5f80d.firebaseapp.com",
  databaseURL: "https://smokescreen-5f80d-default-rtdb.firebaseio.com",
  projectId: "smokescreen-5f80d",
  storageBucket: "smokescreen-5f80d.firebasestorage.app",
  messagingSenderId: "792570880464",
  appId: "1:792570880464:web:a6274da8d83e4146a6d9d5",
  measurementId: "G-47WD26R01Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
auth = firebase.auth();