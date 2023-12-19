from pymongo import MongoClient
# from settings import MONGO_DB_SETTINGS

# connection_string = MONGO_DB_SETTINGS['connection_string']
# client = MongoClient(connection_string)
# mongo_db = client["mender"]

connection_string = "mongodb+srv://cluster0.yl9k9ng.mongodb.net/"
username = "mender-admin"
password = "446projxyz"   
database_name = "mender" 

client = MongoClient(connection_string, username=username, password=password)
mongo_db = client[database_name]


class Mentor:
    def __init__(self, name, area, hometown, interests, industry, company, college, email, linkedin, matches=None, likes=None):
        self.name = name
        self.company = company
        self.college = college
        self.area = area
        self.hometown = hometown
        self.interests = interests or []
        self.industry = industry
        self.email = email
        self.linkedin = linkedin
        self.matches = matches or []
        self.likes = likes or []

    @staticmethod
    def get_mentor_collection():
        mentor_collection = mongo_db['mentor']
        return mentor_collection
    
    @staticmethod
    def create_mentor(name, area, hometown, interests, industry, company, college, email, linkedin):
        existing_mentor = Mentor.get_mentor_collection().find_one({'name': name, 'email': email})

        if existing_mentor:
            return False, existing_mentor['_id']

        mentor = Mentor(name, area, hometown, interests, industry, company, college, email, linkedin, matches=None, likes=None)
        mentor_id = Mentor.get_mentor_collection().insert_one(vars(mentor)).inserted_id
        return True, mentor_id  
    

class Mentee:
    def __init__(self, name, area, hometown, industry, interests, college, email, linkedin, matches=None, likes=None):
        self.name = name
        self.area = area
        self.hometown = hometown
        self.industry = industry
        self.interests = interests or []
        self.college = college
        self.email = email 
        self.linkedin = linkedin
        self.matches = matches or []
        self.likes = likes or []

    @staticmethod
    def get_mentee_collection():
        mentee_collection = mongo_db['mentee']
        return mentee_collection
    
    @staticmethod
    def create_mentee(name, area, hometown, industry, interests, college, email, linkedin):
        existing_mentee = Mentee.get_mentee_collection().find_one({'name': name, 'email': email})

        if existing_mentee:
            return False, existing_mentee['_id']

        mentee = Mentee(name, area, hometown, interests, industry, college, email,linkedin, matches=None, likes=None)
        mentee_id = Mentee.get_mentee_collection().insert_one(vars(mentee)).inserted_id
        return True, mentee_id


class Match:
    def __init__(self, mentor_email, mentee_email):
        self.mentor_email = mentor_email
        self.mentee_email = mentee_email  

    @staticmethod
    def get_matches_collection():
        match_collection = mongo_db['match']
        return match_collection

    @staticmethod
    def create_match(mentor_email, mentee_email):
        match = Match(mentor_email=mentor_email, mentee_email=mentee_email)
        match_id = Match.get_matches_collection().insert_one(vars(match)).inserted_id

        # Update the mentor's matches list
        mentor = Mentor.get_mentor_collection().find_one({'email': mentor_email})
        mentor_matches = mentor.get('matches', [])
        mentor_matches.append(match_id)
        Mentor.get_mentor_collection().update_one({'email': mentor_email}, {'$set': {'matches': mentor_matches}})

        # Update the mentee's matches list
        mentee = Mentee.get_mentee_collection().find_one({'email': mentee_email})
        mentee_matches = mentee.get('matches', [])
        mentee_matches.append(match_id)
        Mentee.get_mentee_collection().update_one({'email': mentee_email}, {'$set': {'matches': mentee_matches}})

        # Remove mentor mentee's like list
        mentee_likes = mentee.get('likes', [])
        if mentor_email in mentee_likes:
            mentee_likes.remove(mentor_email)
            Mentee.get_mentee_collection().update_one({'email': mentee_email}, {'$set': {'likes': mentee_likes}})

        # Remove mentee from the mentor's like list
        mentor_likes = mentor.get('likes', [])
        if mentee_email in mentor_likes:
            mentor_likes.remove(mentee_email)
            Mentor.get_mentor_collection().update_one({'email': mentor_email}, {'$set': {'likes': mentor_likes}})

        return match_id    


class Database:

    @staticmethod
    def get_credentials_collection():
        credentials_collection = mongo_db['credential']
        return credentials_collection
    
    @staticmethod
    def find_user(user_email):
        mentor_collection = Mentor.get_mentor_collection()
        mentee_collection = Mentee.get_mentee_collection()

        mentor_cursor = mentor_collection.find({'email': user_email})
        mentee_cursor = mentee_collection.find({'email': user_email})

        mentor_documents = [document for document in mentor_cursor]
        mentee_documents = [document for document in mentee_cursor]

        if mentor_documents:
            return mentor_documents
        elif mentee_documents:
            return mentee_documents
        else:
            return None

    @staticmethod
    def getUsers(email):
        mentor_collection = Mentor.get_mentor_collection()
        mentee_collection = Mentee.get_mentee_collection()

        mentor_cursor = mentor_collection.find().limit(4)
        mentee_cursor = mentee_collection.find().limit(4)

        mentor_documents = [document for document in mentor_cursor]
        mentee_documents = [document for document in mentee_cursor]

        if mentor_documents:
            return mentor_documents
        elif mentee_documents:
            return mentee_documents
        else:
            return None

    @staticmethod
    def add_like(user1_email, user2_email):
        mentor_user = Mentor.get_mentor_collection().find_one({'email': user1_email})
        mentee_user = Mentee.get_mentee_collection().find_one({'email': user1_email})

        if mentor_user:
            mentor_user_likes = mentor_user.get('likes', [])
            if user2_email not in mentor_user_likes:
                mentor_user_likes.append(user2_email)
                Mentor.get_mentor_collection().update_one({'email': user1_email}, {'$set': {'likes': mentor_user_likes}})
            
            # if match
            mentee_user = Mentee.get_mentee_collection().find_one({'email': user2_email})
            if user1_email in mentee_user.get('likes', []):
                Match.create_match(user1_email, user2_email)
                return True

        elif mentee_user:
            mentee_user_likes = mentee_user.get('likes', [])
            if user2_email not in mentee_user_likes:
                mentee_user_likes.append(user2_email)
                Mentee.get_mentee_collection().update_one({'email': user1_email}, {'$set': {'likes': mentee_user_likes}})
            
            mentor_user = Mentor.get_mentor_collection().find_one({'email': user2_email})
            if user1_email in mentor_user.get('likes', []):
                Match.create_match(user1_email, user2_email)
                return True
        
        return False

    @staticmethod
    def update_user(name, area, hometown, interests, industry, college, company, email, linkedin):

        user_collection = Mentee.get_mentee_collection() if Mentee.get_mentee_collection().find_one({'email': email}) else Mentor.get_mentor_collection()

        existing_user = user_collection.find_one({'email': email})
        if not existing_user:
            return False

        update_query = {
            '$set': {
                'name': name,
                'area': area,
                'hometown': hometown,
                'interests': interests,
                'industry': industry,
                'college': college,
                'company': company if user_collection == Mentor.get_mentor_collection() else None,
                'linkedin': linkedin,
            }
        }

        user_collection.update_one({'email': email}, update_query)
        return True
    
    @staticmethod
    def calculate_euclidean_distance(user1, user2):
        attributes = ['area', 'hometown', 'interests', 'industry']

        distance_squared = sum((float(str(user1[attr]) if isinstance(user1, dict) and isinstance(user1[attr], (int, float)) else 0) - float(str(user2[attr]) if isinstance(user2, dict) and isinstance(user2[attr], (int, float)) else 0))**2 for attr in attributes)
        return distance_squared 

    @staticmethod
    def sort_users_by_similarity(target_user, users, num_users):
        distances = [(user, Database.calculate_euclidean_distance(target_user, user)) for user in users]
        sorted_users = sorted(distances, key=lambda x: x[1])
        return [user[0] for user in sorted_users[:num_users]]

    @staticmethod
    def get_users_from_opposite_collection(target_user_email):
        mentor = Mentor.get_mentor_collection().find_one({'email': target_user_email})
        mentee = Mentee.get_mentee_collection().find_one({'email': target_user_email})

        if mentor:
            opposite_collection = Mentee.get_mentee_collection()
        elif mentee:
            opposite_collection = Mentor.get_mentor_collection()
        else:
            raise ValueError("Invalid user Email")

        opposite_users = list(opposite_collection.find({'email': {'$ne': target_user_email}}))
        opposite_users_dicts = [dict(user) for user in opposite_users]

        return opposite_users_dicts
    