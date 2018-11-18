class Validator {
    validateName(name) {
        const REGEXP = new RegExp('[a-zA-Z]{' + name.length + '}');
        
        name = name.trim();
        if(REGEXP.test(name)) {
            return true;
        }
    
        console.error('Invalid name. ');
        return false;
    }
  
    validateEmail(email) {
        const REGEXP = new RegExp('[a-zA-Z0-9]+[@]{1}[a-zA-Z]+[.]{1}[a-zA-Z]{2,3}');
        
        email = email.trim();
        if(REGEXP.test(email)) {
            return true;         
        }
        
        console.error('Invalid email. ');
        return false;
    }
  
    validatePassword(password) {
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
  
    isAdult(dateString) {
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var birthdate = new Date(dateString);
        return currentDate.getMonth() - birthdate.getMonth() > 0 && currentYear - birthdate.getFullYear() >= 18;
    }
  
    validateBirthdate(birthdate) {
        const REGEXP = new RegExp(
            '(19[0-9]{2}|20[0-9]{2})-(02-[^30|^31][0-9]{2}|[0-9]{2}-(0[0-9]{1}|(1|2)[0-9]{1}|3[0-1]{1}))'
        );
        
        if(REGEXP.test(birthdate)) {
            if(!isAdult(birthdate)) {
                console.error('User must be +18 to register. ');
                return false;
            }
    
            return true;
        }
    
        console.error('Invalid Birthdate. ');
        return false;
    }
}