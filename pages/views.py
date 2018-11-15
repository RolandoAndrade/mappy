from django.shortcuts import render
from django.contrib.auth.models import AnonymousUser
from django.shortcuts import redirect

# Create your views here.

def signup(request):
    if isinstance(request.user, AnonymousUser):
        # signup
        return render(request, 'register.html')
    else:
        # already registered
        return redirect("../main/")

def main(request):
    return render(request, 'inicio.html')