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

function validateForm(formID) {
    var form = document.forms[formID];
    
    if(validateEmail(form['email'].value) && validatePassword(form['password'].value)) {
        form.submit();
        return true;
    }

    console.error('Invalid fields were found in form. ');
    return false;
}