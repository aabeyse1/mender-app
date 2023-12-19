from django.http import HttpResponse, JsonResponse
from djangoProject.mongo_connector import Database, Mentee, Mentor, Match

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
    return JsonResponse(userInfo)

def retrieveUsers(request, email):
    users = Database.getUsers(email)
    return JsonResponse(users)

# def like(request, email1, email2):
#     if request.method == 'POST':
#         email1 = request.POST.get('email1')
#         email2 = request.POST.get('email2')

#         match_successful = Database.add_like(email1, email2)

#         return match_successful

def like(request, email1, email2):
    if request.method == 'POST':
        email1 = request.POST.get('email1')
        email2 = request.POST.get('email2')

        match_successful = Database.add_like(email1, email2)

        return match_successful