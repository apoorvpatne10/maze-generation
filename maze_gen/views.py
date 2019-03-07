from django.shortcuts import render

def home(request):
    return render(request, "maze_gen/index.html")
