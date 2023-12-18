from mongo_connector import Mentee, Mentor, Match, Database

# clear database
def delete_all_data():
    Mentor.get_mentor_collection().delete_many({})
    Mentee.get_mentee_collection().delete_many({})
    Match.get_matches_collection().delete_many({})

##### MAKING FAKE DATA #####
from faker import Faker
fake = Faker()

def generate_fake_mentor():
    return {
        'name': fake.name(),
        'area': fake.state(),
        'hometown': fake.city(),
        'industry': fake.job(),
        'interests': fake.job(),
        'company': fake.company(),
        'email': fake.email(),
        'linkedin': fake.user_name(),
    }

def generate_fake_mentee():
    return {
        'name': fake.name(),
        'area': fake.state(),
        'hometown': fake.city(),
        'industry': fake.job(),
        'interests': fake.job(),
        'college': fake.company(),
        'email': fake.email(),
        'linkedin': fake.user_name(),
    }

##### CREATE NEW FAKE DATA ######
# # Populate mentors collection with fake data
# for _ in range(2):  # Generate 10 fake mentors
#     mentor_data = generate_fake_mentor()
#     created, mentor_id = Mentor.create_mentor(**mentor_data)

# # Populate mentees collection with fake data
# for _ in range(2):  # Generate 10 fake mentees
#     mentee_data = generate_fake_mentee()
#     created, mentee_id = Mentee.create_mentee(**mentee_data)


#### TESTING CREATE MENTOR + MENTEE ###
# created, mentor1 = Mentor.create_mentor('John Doe', 'MN', 'Minneapolis', 'Tech', 'Software', 'ABC Corp', 'Linkedin')
# created, mentee1 = Mentee.create_mentee('Jane Smith', 'MN', 'Minneapolis', 'Tech', 'Software', 'Macalester', 'Linkedin')

# Match.create_match(mentor1, mentee1)

##### TESTING FINDING USER ###
# from bson import ObjectId

# user_id_str = "6580b99685e161a2b9bd5e6e" 
# user_id = ObjectId(user_id_str)

# user = Database.find_user(user_id)
# if user:
#     print(f"found with ID {user}")
# else:
#     print("User not found")


##### TESTING LIKE+MATCH #######
# Database.add_like(Database.find_user("John Walker", "morganjim"), Database.find_user("Judy Everett", "robert16"))
# Database.add_like(Database.find_user("Judy Everett", "robert16"), Database.find_user("John Walker", "morganjim"))


##### TESTING UPDATE USER #####
# user = Database.find_user('John Walker', 'morganjim')
# Database.update_user(user, 'Jonny Walker', 'Iowa', 'Troyberg', 'Painting', 'Software', 'Macalester', None, 'morganjim')
