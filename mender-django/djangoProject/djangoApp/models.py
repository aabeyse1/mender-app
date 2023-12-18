from django.db import models

from djangoProject.mongo_connector import mongo_db

menteeCollection = mongo_db['mentee']
mentorCollection = mongo_db['mentor']

# newCollection = mongo_db['mentee']

# Create your models here.
