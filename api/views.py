from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.shortcuts import redirect

from django.contrib.auth import logout as auth_logout


def logout(request):
    auth_logout(request)
    return redirect("../../../")