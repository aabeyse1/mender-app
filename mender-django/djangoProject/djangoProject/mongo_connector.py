from pymongo import MongoClient

class Mentor:
    def __init__(self, name, area, interests, industry, company, contact, matches=None):
        self.name = name
        self.company = company
        self.area = area
        self.interests = interests
        self.industry = industry
        self.contact = contact or []
        self.matches = matches or []

    def create_mentor(name, area, interests, industry, company, contact):
        mentor = Mentor(name, area, interests, industry, company, contact, matches=None)
        mentor_id = mentors_collection.insert_one(vars(mentor)).inserted_id
        return mentor_id

class Mentee:
    def __init__(self, name, area, industry, interests, college, contact, matches=None):
        self.name = name
        self.area = area
        self.industry = industry
        self.interests = interests
        self.college = college
        self.contact = contact or []
        self.matches = matches or []
    
    def create_mentee(name, area, industry, interests, college, contact):
        mentee = Mentee(name, area, interests, industry, college, contact, matches=None)
        mentee_id = mentee_collection.insert_one(vars(mentee)).inserted_id
        return mentee_id

class Match:
    def __init__(self, mentor_id, mentee_id):
        self.mentor_id = mentor_id
        self.mentee_id = mentee_id  

    def create_match(mentor_id, mentee_id):
        match = Match(mentor_id=mentor_id, mentee_id=mentee_id)
        match_id = matches_collection.insert_one(vars(match)).inserted_id

        # Update the mentor's matches list
        mentor = mentors_collection.find_one({'_id': mentor_id})
        mentor_matches = mentor.get('matches', [])
        mentor_matches.append(match_id)
        mentors_collection.update_one({'_id': mentor_id}, {'$set': {'matches': mentor_matches}})

        # Update the mentee's matches list
        mentee = mentee_collection.find_one({'_id': mentee_id})
        mentee_matches = mentee.get('matches', [])
        mentee_matches.append(match_id)
        mentee_collection.update_one({'_id': mentee_id}, {'$set': {'matches': mentee_matches}})

        return match_id    

class Database:
    def find_user(name, linkedin_username):
        mentor = mentors_collection.find_one({'name': name, 'contact': linkedin_username})
        mentee = mentee_collection.find_one({'name': name, 'contact': linkedin_username})

        if mentor:
            return mentor['_id'], mentor, 'mentor'
        elif mentee:
            return mentee['_id'], mentee, 'mentee'
        else:
            return None, None, None
 
    
connection_string = "mongodb+srv://cluster0.yl9k9ng.mongodb.net/"
username = "mender-admin"
password = "446projxyz"   
database_name = "mender" 

# initial connection to db
client = MongoClient(connection_string, username=username, password=password)
mongo_db = client[database_name]

# get collections
mentors_collection = mongo_db['mentor']
mentee_collection = mongo_db['mentee']
credentials_collection = mongo_db['credential']
matches_collection = mongo_db['match']