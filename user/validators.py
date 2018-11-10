import re

from django.core.exceptions import ValidationError
from django.utils.translation import ugettext as _
from datetime import date


def validate_legnth(password):
    min_length = 8
    if len(password) < min_length:
        raise ValidationError(
            _("La contraseña debe tener almenos 8 caracteres"),
            code = 'password_too_short',
        )


def validate_number(password):
    if not re.findall('\d', password):
        raise ValidationError(
            _("La contraseña debe tener almenos un caracter: 0-9"),
            code = 'password_no_number',
        )


def validate_Uppercase(password):
    if not re.findall('[A-Z]', password):
        raise ValidationError(
            _("La contraseña debe tener almenos un caracter en Mayuscula: A-Z"),
            code = 'password_no_uppercase',
        )


def validate_Symbol(password):
    if not re.findall('[()[\]{}|\\`~!@#$%^&;*_\-+=;:\'",<>./?]', password):
        raise ValidationError(
            _("La contraseña debe tener almenos un caracter: " +
              "()[]{}|\`~!@#$%^&;*_-+=;:'\",<>./?"),
            code = 'password_no_symbol',
        )


def validate_birthDate(birthdate):
    born = birthdate
    today = date.today()
    if ((born.year + 18, born.month, born.day) > (today.year, today.month, today.day)):
        raise ValidationError(
            _("El Usuario debe ser mayor de edad (+18)"),
            code = 'password_no_symbol',
        )
    else:
        return born
