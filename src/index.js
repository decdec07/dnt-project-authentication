import './Styles/main.scss'

import { initializeApp} from 'firebase/app'
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider, signInWithPopup,
    signOut, signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth'

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
  const user = auth.currentUser;
  auth.languageCode = 'en'
  const provider = new GoogleAuthProvider();

  const googleLogin = document.getElementById("google-login-btn")
  googleLogin.addEventListener("click", function(){
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
  });


  })

updateProfile(auth.currentUser, {
    displayName: document.getElementById("signupUsername").value, photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {
  // Profile updated!
  // ...
}).catch((error) => {
  // An error occurred
  // ...
});


function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`); 
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });


    //Login    

    const loginForm = document.querySelector("#login");
    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        const password = loginForm.password.value
        const email = loginForm.email.value

        signInWithEmailAndPassword(auth, email, password)
            .then((cred) =>{
                // console.log('User logged in:', cred.user)
                window.location.href = "./home.html"
            })
            .catch((err) =>{
                setFormMessage(loginForm, "error", "Invalid username/password combination");
                console.log(err.message)
            })
    });

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

    //Signup
    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();

        const email = createAccountForm.email.value
        const password = createAccountForm.password.value

        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                // console.log('user created:', cred.user)
                createAccountForm.reset()
            })
            .catch((err) => {
                console.log(err.message)
            })
    });



    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});


//Subscribing to Auth Changes
onAuthStateChanged(auth, (user) => {
    console.log('User Status Changed:', user)
})

//Unsubcribing from changes
const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', () => {
    
})