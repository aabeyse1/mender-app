from pymongo import MongoClient

connection_string = "mongodb+srv://cluster0.yl9k9ng.mongodb.net/"
username = "mender-admin"
password = "446projxyz"   
database_name = "mender" 

# initial connection to db
client = MongoClient(connection_string, username=username, password=password)
mongo_db = client[database_name]

class Mentor:
    def __init__(self, name, area, hometown, interests, industry, company, contact, matches=None):
        self.name = name
        self.company = company
        self.area = area
        self.hometown = hometown
        self.interests = interests
        self.industry = industry
        self.contact = contact or []
        self.matches = matches or []

    @staticmethod
    def get_mentor_collection():
        mentor_collection = mongo_db['mentor']
        return mentor_collection
    
    @staticmethod
    def create_mentor(name, area, hometown, interests, industry, company, contact):
        mentor = Mentor(name, area, hometown, interests, industry, company, contact, matches=None)
        mentor_id = Mentor.get_mentor_collection().insert_one(vars(mentor)).inserted_id
        return mentor_id
    
    

class Mentee:
    def __init__(self, name, area, hometown, industry, interests, college, contact, matches=None):
        self.name = name
        self.area = area
        self.hometown = hometown
        self.industry = industry
        self.interests = interests
        self.college = college
        self.contact = contact or []
        self.matches = matches or []

    @staticmethod
    def get_mentee_collection():
        mentee_collection = mongo_db['mentee']
        return mentee_collection
    
    @staticmethod
    def create_mentee(name, area, hometown, industry, interests, college, contact):
        mentee = Mentee(name, area, hometown, interests, industry, college, contact, matches=None)
        mentee_id = Mentee.get_mentee_collection().insert_one(vars(mentee)).inserted_id
        return mentee_id

class Match:
    def __init__(self, mentor_id, mentee_id):
        self.mentor_id = mentor_id
        self.mentee_id = mentee_id  

    @staticmethod
    def get_matches_collection():
        match_collection = mongo_db['match']
        return match_collection

    @staticmethod
    def create_match(mentor_id, mentee_id):
        match = Match(mentor_id=mentor_id, mentee_id=mentee_id)
        match_id = Match.get_matches_collection().insert_one(vars(match)).inserted_id

        # Update the mentor's matches list
        mentor = Mentor.get_mentor_collection().find_one({'_id': mentor_id})
        mentor_matches = mentor.get('matches', [])
        mentor_matches.append(match_id)
        Mentor.get_mentor_collection().update_one({'_id': mentor_id}, {'$set': {'matches': mentor_matches}})

        # Update the mentee's matches list
        mentee = Mentee.get_mentee_collection().find_one({'_id': mentee_id})
        mentee_matches = mentee.get('matches', [])
        mentee_matches.append(match_id)
        Mentee.get_mentee_collection().update_one({'_id': mentee_id}, {'$set': {'matches': mentee_matches}})

        return match_id    

class Database:

    @staticmethod
    def get_credentials_collection():
        credentials_collection = mongo_db['credential']
        return credentials_collection
    
    @staticmethod
    def find_user(name, linkedin_username):
        mentor = Mentor.get_mentor_collection().find_one({'name': name, 'contact': linkedin_username})
        mentee = Mentee.get_mentee_collection().find_one({'name': name, 'contact': linkedin_username})

        if mentor:
            return mentor['_id'], mentor, 'mentor'
        elif mentee:
            return mentee['_id'], mentee, 'mentee'
        else:
            return None, None, None