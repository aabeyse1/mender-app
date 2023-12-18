from pymongo import MongoClient
from settings import MONGO_DB_SETTINGS

connection_string = MONGO_DB_SETTINGS['connection_string']
client = MongoClient(connection_string)
mongo_db = client["mender"]


class Mentor:
    def __init__(self, name, area, hometown, interests, industry, company, contact, matches=None, likes=None):
        self.name = name
        self.company = company
        self.area = area
        self.hometown = hometown
        self.interests = interests or []
        self.industry = industry
        self.contact = contact or []
        self.matches = matches or []
        self.likes = likes or []

    @staticmethod
    def get_mentor_collection():
        mentor_collection = mongo_db['mentor']
        return mentor_collection
    
    @staticmethod
    def create_mentor(name, area, hometown, interests, industry, company, contact):
        existing_mentor = Mentor.get_mentor_collection().find_one({'name': name, 'contact': contact})

        if existing_mentor:
            return False, existing_mentor['_id']

        mentor = Mentor(name, area, hometown, interests, industry, company, contact, matches=None, likes=None)
        mentor_id = Mentor.get_mentor_collection().insert_one(vars(mentor)).inserted_id
        return True, mentor_id  
    

class Mentee:
    def __init__(self, name, area, hometown, industry, interests, college, contact, matches=None, likes=None):
        self.name = name
        self.area = area
        self.hometown = hometown
        self.industry = industry
        self.interests = interests or []
        self.college = college
        self.contact = contact or []
        self.matches = matches or []
        self.likes = likes or []

    @staticmethod
    def get_mentee_collection():
        mentee_collection = mongo_db['mentee']
        return mentee_collection
    
    @staticmethod
    def create_mentee(name, area, hometown, industry, interests, college, contact):
        existing_mentee = Mentee.get_mentee_collection().find_one({'name': name, 'contact': contact})

        if existing_mentee:
            return False, existing_mentee['_id']

        mentee = Mentee(name, area, hometown, interests, industry, college, contact, matches=None, likes=None)
        mentee_id = Mentee.get_mentee_collection().insert_one(vars(mentee)).inserted_id
        return True, mentee_id


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

        # Remove mentor mentee's like list
        mentee_likes = mentee.get('likes', [])
        if mentor_id in mentee_likes:
            mentee_likes.remove(mentor_id)
            Mentee.get_mentee_collection().update_one({'_id': mentee_id}, {'$set': {'likes': mentee_likes}})

        # Remove mentee from the mentor's like list
        mentor_likes = mentor.get('likes', [])
        if mentee_id in mentor_likes:
            mentor_likes.remove(mentee_id)
            Mentor.get_mentor_collection().update_one({'_id': mentor_id}, {'$set': {'likes': mentor_likes}})

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
            return mentor['_id']
        elif mentee:
            return mentee['_id']
        else:
            return None
        

    @staticmethod
    def add_like(user1_id, user2_id):
        mentor_user = Mentor.get_mentor_collection().find_one({'_id': user1_id})
        mentee_user = Mentee.get_mentee_collection().find_one({'_id': user1_id})

        if mentor_user:
            mentor_user_likes = mentor_user.get('likes', [])
            if user2_id not in mentor_user_likes:
                mentor_user_likes.append(user2_id)
                Mentor.get_mentor_collection().update_one({'_id': user1_id}, {'$set': {'likes': mentor_user_likes}})
            
            # if match
            mentee_user = Mentee.get_mentee_collection().find_one({'_id': user2_id})
            if user1_id in mentee_user.get('likes', []):
                Match.create_match(user1_id, user2_id)

        elif mentee_user:
            mentee_user_likes = mentee_user.get('likes', [])
            if user2_id not in mentee_user_likes:
                mentee_user_likes.append(user2_id)
                Mentee.get_mentee_collection().update_one({'_id': user1_id}, {'$set': {'likes': mentee_user_likes}})
            
            mentor_user = Mentor.get_mentor_collection().find_one({'_id': user2_id})
            if user1_id in mentor_user.get('likes', []):
                Match.create_match(user1_id, user2_id)


    @staticmethod
    def update_user(user_id, name, area, hometown, interests, industry, college, company, contact):

        user_collection = Mentee.get_mentee_collection() if Mentee.get_mentee_collection().find_one({'_id': user_id}) else Mentor.get_mentor_collection()

        existing_user = user_collection.find_one({'_id': user_id})
        if not existing_user:
            return False

        update_query = {
            '$set': {
                'name': name,
                'area': area,
                'hometown': hometown,
                'interests': interests,
                'industry': industry,
                'college': college if user_collection == Mentee.get_mentee_collection() else None,
                'company': company if user_collection == Mentor.get_mentor_collection() else None,
                'contact': contact,
            }
        }

        user_collection.update_one({'_id': user_id}, update_query)
        return True
    