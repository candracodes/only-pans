// WHEN THE DOCUMENT LOADS, MAKE SURE THIS FUNCTIONALITY WORKS (SHOW/HIDE FORMS)
$(document).ready(function () {
  // HIDE SIGN-UP FORM BY DEFAULT
  $("#signUpContainer").show();
  // SHOW SIGN-IN FORM BY DEFAULT
  $("#signInContainer").hide();

});

// FIRE WHEN USER CLICKS "SIGN IN"
$(".showSignIn").on("click", function () {
  $("#signInContainer").show();
  $("#signUpContainer").hide();
});

// FIRE WHEN USER CLICKS "SIGN UP"
$(".showSignUp").on("click", function () {
  $("#signInContainer").hide();
  $("#signUpContainer").show();
});

const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#floatingInput').value.trim();
  const password = document.querySelector('#floatingPassword').value.trim();

  if (email && password) {
    const response = await fetch('/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      document.location.replace('/homepage');
    } else {
      alert('Failed to log in.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#fullname').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (username && email && password) {
    const response = await fetch('/users', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      console.log('Sign up successfully!')
      document.location.replace('/homepage');
    } else {
      alert('Failed to sign up.');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);