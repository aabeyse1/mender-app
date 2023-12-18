import json
from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from .models import menteeCollection
from .models import mentorCollection
from djangoProject.mongo_connector import Database, mongo_db
from bson.objectid import ObjectId


@api_view(['GET'])
def display(request):
    return Response({'message': 'Testing testing'})
    return Response({'message': 'Testing testing'}) #delete this later

# @api_view(['POST'])
# def add_person(request):
#     if request.method == 'POST':
#         data = request.data  # Assuming you are sending data in JSON format

#         # Extract mentee data from the request
#         name = data.get('name')
#         area = data.get('area')
#         hometown = data.get('hometown')
#         industry = data.get('industry')
#         interests = data.get('interests')
#         college = data.get('college')
#         contact = data.get('contact')

#         mentee_id = Mentee.create_mentee(
#             name, area, hometown, industry, interests, college, contact
#         )

# #         collection.insert_one(mentee_id)

#         return Response("Mentee added successfully")
#     else:
#         return Response({'error': 'Invalid request method'})

# def add_person(request):
#     data = request.POST
#     record = {
#         "name": data.get("name"),
#         "area": data.get("area"),
#         "hometown": data.get("hometown"),
#         "industry": data.get('industry'),
#         "interests": data.get('interests'),
#         "college": data.get('college'),
#         "contact": data.get('contact'),
#     }
    
#     newCollection.insert_one(record)
#     return HttpResponse("we made it")

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
    # idToFind = '6580b99685e161a2b9bd5e6e' this is for testing
    #emailToFind = yharris@example.org
    emailToFind = email # hopefully this works
    # userId = ObjectId(idToFind)
    userInfo = Database.find_user(emailToFind)
    return HttpResponse(userInfo)