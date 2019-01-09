from django.contrib.auth.models import AnonymousUser
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.shortcuts import redirect

from django.contrib.auth import logout as auth_logout


def logout(request):
    auth_logout(request)
    return redirect("../../../")


def disable(request):
    if not isinstance(request.user, AnonymousUser):
        request.user.enabled = False
        request.user.save()
        auth_logout(request)
        return render(request, 'accountdisabled.html')
    else:
        return redirect("../../login")
