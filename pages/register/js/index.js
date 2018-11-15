/**
 * Surely there's some improvements to make, comments/help always appreciated :3
 */

function init() {
  // Generate li foreach fieldset
  for (var i = 0; i < count; i++) {
    var ul = document.querySelector('ul.items'),
        li = document.createElement("li");

    ul.appendChild(li);
  }
  // Add class active on first li
  ul.firstChild.classList.add('active');
}

function next(target) {
  var input = target.previousElementSibling;
  var isFieldValid;
  
  // Check if input is empty
  if (input.value === '') {
    body.classList.add('error');
  } else {
    // Data validation.
    switch(input.name.toLowerCase()) {
      case 'username': 
        isFieldValid = validateName(input.value);
        break;
      case 'password':
        isFieldValid = validatePassword(input.value);
        break;
      case 'birthdate': 
        isFieldValid = validateBirthdate(input.value);
        break;
      case 'email':
        isFieldValid = validateEmail(input.value);
        break;
    }

    if(!isFieldValid) {
      body.classList.add('error');
      return;
    }
    
    body.classList.remove('error');
    
    var enable = document.querySelector('form fieldset.enable'),
        nextEnable = enable.nextElementSibling;
    enable.classList.remove('enable');
    enable.classList.add('disable');
    nextEnable.classList.add('enable');
    // Switch active class on left list
    var active = document.querySelector('ul.items li.active'),
        nextActive = active.nextElementSibling;
    active.classList.remove('active');
    nextActive.classList.add('active');
  }
}

function keyDown(event) {
  var key = event.keyCode,
      target = document.querySelector('fieldset.enable .button');
  if (key == 13 || key == 9) next(target);
}

var body = document.querySelector('body'),
    form = document.querySelector('form'),
    count = form.querySelectorAll('fieldset').length;

window.onload = init;
document.body.onmouseup = function (event) {
    var target = event.target || event.toElement;
    if (target.classList.contains("button")) next(target);
};
document.addEventListener("keydown", keyDown, false);

// Validation functions.
function validateName(name) {
  const REGEXP = new RegExp('[a-zA-Z]{' + name.length + '}');
  
  name = name.trim();
  if(REGEXP.test(name)) {
      return true;
  }

  console.error('Invalid name. ');
  return false;
}

function validateEmail(email) {
  const REGEXP = new RegExp('[a-zA-Z0-9]+[@]{1}[a-zA-Z]+[.]{1}[a-zA-Z]{2,3}');
  
  email = email.trim();
  if(REGEXP.test(email)) {
      return true;         
  }
  
  console.error('Invalid email. ');
  return false;
}

function validatePassword(password) {
  password = password.trim();
  if(password.length < 8) {
      console.error('Password must be at least 8 characters long. ');
      return false;
  }

  if(password.match(/\W/) != null &&
      password.match(/\d/) != null && 
      password.match(new RegExp('[A-Z]+')) != null) {
      return true;
  }

  console.error('Password does not match the criteria. ');
  return false;
}

function isOver18(dateString) {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var birthdate = new Date(dateString);
  return currentDate.getMonth() - birthdate.getMonth() > 0 && currentYear - birthdate.getFullYear() >= 18;
}

function validateBirthdate(birthdate) {
  const REGEXP = new RegExp(
      '(19[0-9]{2}|20[0-9]{2})-(02-[^30|^31][0-9]{2}|[0-9]{2}-(0[0-9]{1}|(1|2)[0-9]{1}|3[0-1]{1}))'
  );
  
  if(REGEXP.test(birthdate)) {
      if(!isOver18(birthdate)) {
          console.error('User must be +18 to register. ');
          return false;
      }

      return true;
  }

  console.error('Invalid Birthdate. ');
  return false;
}

// Validate the entire form.
// function validateForm(formID) {
//   var form = document.forms[formID];
  
//   if(validateName(form['firstName'].value) &&
//       validateName(form['secondName'].value) && 
//       validateName(form['firstSurname'].value) && 
//       validateName(form['secondSurname'].value) && 
//       validateBirthdate(form['birthDate'].value) && 
//       validateEmail(form['email'].value) && 
//       validatePassword(form['password'].value)) {
//       form.submit();
//       return true;
//   }

//   console.error('Invalid fields were found in form. ');
//   return false;
// }