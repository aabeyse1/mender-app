from django.urls import path
from . import views

urlpatterns = [
    path('add_mentee/', views.add_person_mentee, name='addMentee'),
    path('add_mentor/', views.add_person_mentor, name='addMentor'),
    path ('get/<str:email>/', views.retrieveUser),
    path ('get/moreUsers/<str:email>/', views.retrieveUsers),
    path ('like/<str:email1>/<str:email2>/', views.like)
]