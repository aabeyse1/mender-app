from django.urls import path
from . import views

urlpatterns = [
    path('update-profile/', views.update_profile, name='update_profile'),
    path('add_mentor/', views.add_person_mentor, name='addMentor'),
    path ('get/<str:email>/', views.retrieveUser),
    path ('get/moreUsers/<str:email>/', views.retrieveUsers),
    path ('like/<str:email1>/<str:email2>/', views.like),
    path('updateUser/<str:email>/<str:name>/<str:location>/<str:college>/<str:company>/<str:hometown>/<str:industry>/<str:interests>/<str:linkedin>/', views.updateUser)

]