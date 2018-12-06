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
        const REGEXP = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

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
        const REGEXP =new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
        if(REGEXP.test(password))
            return true;
    
        console.error('Password does not match the criteria. ');
        return false;
    }
  
    isAdult(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() <= birthDate.getDate()))
            age--;
        return age>=18;
    }
  
    validateBirthdate(birthdate) {
        const REGEXP = new RegExp(
            '(19[0-9]{2}|20[0-9]{2})-(02-[^30|^31][0-9]{2}|[0-9]{2}-(0[0-9]{1}|(1|2)[0-9]{1}|3[0-1]{1}))'
        );
        
        if(REGEXP.test(birthdate)) {
            if(!this.isAdult(birthdate)) {
                console.error('User must be +18 to register. ');
                return false;
            }
    
            return true;
        }
    
        console.error('Invalid Birthdate. ');
        return false;
    }
}