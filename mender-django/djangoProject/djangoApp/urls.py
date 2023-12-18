from django.urls import path
from . import views

urlpatterns = [
    path('display/', views.display, name='display'),
    path('add_mentee/', views.add_person_mentee, name='addMentee'),
    path('add_mentor/', views.add_person_mentor, name='addMentor'),
    path ('get/<str:email>/', views.retrieveUser)
]