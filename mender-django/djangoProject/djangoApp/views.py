from django.http import HttpResponse, JsonResponse
from djangoProject.mongo_connector import Database, Mentee, Mentor
from bson import ObjectId

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
    userInstance = Database.find_user(emailToFind)
    if userInstance is None:
        return JsonResponse(None, safe=False)
    else:
        for user in userInstance:
            user.pop('_id', None)
        return JsonResponse(userInstance, safe=False)

def retrieveUsers(request, email):
    users = Database.getUsers(email)
    for user in users:
            user.pop('_id', None)
    return JsonResponse(users, safe=False)