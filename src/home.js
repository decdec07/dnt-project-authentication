import './Styles/map.scss'


// DROPDOWN MENU
const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector('.toggle_btn i')
const dropDownMenu = document.querySelector('.dropdown_menu')

toggleBtn.onclick = function () {
    dropDownMenu.classList.toggle('open')
    const isOpen = dropDownMenu.classList.contains('open')

    toggleBtnIcon.classList = isOpen
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars'
}


// ACCOUNT DETAILS MODAL
let popup = document.getElementById("modal-account");

window.openPopup = function() {
    popup.classList.add("open-popup", "modal-transition");
}

window.closePopup = function() {
    popup.classList.remove("open-popup");
}


import { initializeApp} from 'firebase/app'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'
import { doc } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCFj6BVuXDyuhf6niD47KFiy3ONEHwoz8M",
    authDomain: "fir-trial-f4e50.firebaseapp.com",
    projectId: "fir-trial-f4e50",
    storageBucket: "fir-trial-f4e50.appspot.com",
    messagingSenderId: "796189778157",
    appId: "1:796189778157:web:5b86c28c8f508ea17aace4",
    measurementId: "G-PS2E3G38KQ"
  };
  
//Initialize app
initializeApp(firebaseConfig)

//Initialize services
const auth = getAuth()
const user = auth.currentUser

//Subscribing to Auth Changes
onAuthStateChanged(auth, (user) => {
    console.log('User Status Changed:', user)

    if (user) {
        updateUserProfile(user)

        const uid = user.uid
        return uid
    } else {
        alert("Create Account and Login")
        // window.location.href = "./index.html"
    }
})

function updateUserProfile(user) {
    const userName = user.displayName;
    const userEmail = user.email;
    // const userProfilePicture = user.photoURL;

    document.getElementById("userName").textContent = userName;
    document.getElementById("userEmail").textContent = userEmail;
    // document.getElementById("userProfilePicture").src = userProfilePicture;
}

const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
signOut(auth)
     .then(() =>{
        // console.log('The user has been signed out')
    })
    .catch((err) => {
        console.log(err.message)
    })
})