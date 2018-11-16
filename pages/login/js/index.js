const validator = new Validator();
/*onclick="validateForm('form1');"*/
// function validateForm(formID) {
//     var form = document.forms[formID];
//     var isEmailValid = validator.validateEmail(form['email'].value);
//     var isPasswordValid = validator.validatePassword(form['password'].value);

//     if(!isEmailValid) {
//         document.getElementById('form1').classList.add('animated', 'jello');
//         document.getElementById('email').parentElement.classList.add('has-error');
//         document.getElementById('email').parentElement.classList.remove('has-success');
//         var node = document.createElement('label');
//         var textnode = document.createTextNode('Ingrese una dirección de correo válida. ');
//         node.appendChild(textnode);
//         node.id = 'email-error';
//         node.classList = node.classList.add('error');
//         document.getElementById('email').parentElement.appendChild(node);
//         setTimeout(function() {
//             document.getElementById('form1').classList.remove('animated', 'jello');
//         }, 1000);
//         return false;
//     } else {
//         document.getElementById('email').parentElement.classList.remove('has-error');
//         document.getElementById('email').parentElement.classList.add('has-success');
//     }

//     if(!isPasswordValid) {
//         document.getElementById('form1').classList.add('animated', 'jello');
//         document.getElementById('password').parentElement.classList.add('has-error');
//         document.getElementById('password').parentElement.classList.remove('has-success');
//         var node = document.createElement('label');
//         var textnode = document.createTextNode('Compruebe su contraseña. ');
//         node.appendChild(textnode);
//         node.id = 'password-error';
//         node.classList = node.classList.add('error');
//         document.getElementById('password').parentElement.appendChild(node);
//         setTimeout(function() {
//             document.getElementById('form1').classList.remove('animated', 'jello');
//         }, 1000);
//         return false;
//     } else {
//         document.getElementById('password').parentElement.classList.remove('has-error');
//         document.getElementById('password').parentElement.classList.add('has-success');
//     }

//     document.getElementById('email-error').nextElementSibling.remove();
//     document.getElementById('password-error').nextElementSibling.remove();
//     form.submit();
//     return true;
// }