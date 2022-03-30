
firebase.auth().onAuthStateChanged(function(users) {
    if (users) {
      // User is signed in.
    } else {
      // No user is signed in.
    }
  });
firebase.auth().onAuthStateChanged((user) => {
    console.log('User: ', user);
    setupUI(user);

    const users = firebase.auth().currentUser;

    if( users != null){
    const displayName = users.displayName;
    const email = users.email;
    const photoURL = users.photoURL;
    document.getElementById('put-img').innerHTML = `<img src="${photoURL}" class="profile-img" id="profile-img" ></img> <p id=name>${displayName}</p>`;
    }
});

const btnLogout = document.querySelector('#btnLogout');
btnLogout.addEventListener('click', gglogout)//=> {
  //  firebase.auth().signOut();
    //console.log('Logout completed.');
    //signupForm.reset();
    //signupFeedback.innerHTML = ``;
    //loginForm.reset();
    //loginFeedback.innerHTML = ``;
//});
function gglogout(){
    document.getElementById('name').innerHTML = ``;
    firebase.auth().signOut().then(() => {
        console.log("Log out")
        users.reset();
    }).catch((error) => {
        // An error happened.
      });
}

var provider = new firebase.auth.GoogleAuthProvider();
// Login
const btnLogin = document.querySelector('#btnLogin');
btnLogin.addEventListener('click', loginUser);

//const loginFeedback = document.querySelector('#feedback-msg-login');
//const loginModal = new bootstrap.Modal(document.querySelector('#modal-login'));

function loginUser() {
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

const logoutItems = document.querySelectorAll('.logged-out');
const loginItems = document.querySelectorAll('.logged-in');

function setupUI(user){
    if (user) {
        loginItems.forEach(item => item.style.display = 'inline-block');
        logoutItems.forEach(item => item.style.display = 'none');
    } 
    else {
        loginItems.forEach(item => item.style.display = 'none');
        logoutItems.forEach(item => item.style.display = 'inline-block');
    }
}

