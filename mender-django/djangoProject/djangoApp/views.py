import json
from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from .models import menteeCollection
from .models import mentorCollection
from djangoProject.mongo_connector import Database, mongo_db, Mentee, Mentor
from bson.objectid import ObjectId


def add_person_mentee(request):
    data = request.POST
    
    name = data.get('name')
    area = data.get('area')
    hometown = data.get('hometown')
    industry = data.get('industry')
    interests = data.get('interests')
    college = data.get('college')
    contact = data.get('contact')
    
    mentee = Mentee(
        name,
        area,
        hometown,
        industry,
        interests,
        college,
        contact,
        [],
        []
    )

    mentee.create_mentee(
        name, area, hometown, industry, interests, college, contact
    )

    return HttpResponse("we made it")

def add_person_mentor(request):
    data = request.POST
    
    name = data.get('name')
    area = data.get('area')
    hometown = data.get('hometown')
    industry = data.get('industry')
    interests = data.get('interests')
    college = data.get('college')
    contact = data.get('contact')
    
    mentor = Mentor(
        name,
        area,
        hometown,
        industry,
        interests,
        college,
        contact,
        [],
        []
    )

    mentor.create_mentor(
        name, area, hometown, industry, interests, college, contact
    )

    return HttpResponse("we made it")

def retrieveUser(request, email):
    emailToFind = email
    userInfo = Database.find_user(emailToFind)
    return HttpResponse(userInfo)