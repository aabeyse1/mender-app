from mongo_connector import Mentee, Mentor, Match, Database

## testing methods with fake data
# mentor1 = Mentor.create_mentor('John Doe', 'MN', 'Minneapolis', 'Tech', 'Software', 'ABC Corp', 'Linkedin')
# mentee1 = Mentee.create_mentee('Jane Smith', 'MN', 'Minneapolis', 'Tech', 'Software', 'Macalester', 'Linkedin')

# Match.create_match(mentor1, mentee1)

## testing finding user
# user_id, user, user_type = Database.find_user(name='John Doe', linkedin_username='Linkedin')
# if user:
#     print(f"{user_type.capitalize()} found with ID {user_id}: {user}")
# else:
#     print("User not found")


from faker import Faker
fake = Faker()

# Function to generate fake mentor data
def generate_fake_mentor():
    return {
        'name': fake.name(),
        'area': fake.state(),
        'hometown': fake.city(),
        'industry': fake.job(),
        'interests': fake.job(),
        'company': fake.company(),
        'contact': fake.user_name(),
    }

def generate_fake_mentee():
    return {
        'name': fake.name(),
        'area': fake.state(),
        'hometown': fake.city(),
        'industry': fake.job(),
        'interests': fake.job(),
        'college': fake.company(),
        'contact': fake.user_name(),
    }

# Populate mentors collection with fake data
for _ in range(2):  # Generate 10 fake mentors
    mentor_data = generate_fake_mentor()
    mentor_id = Mentor.create_mentor(**mentor_data)

# Populate mentees collection with fake data
for _ in range(2):  # Generate 10 fake mentees
    mentee_data = generate_fake_mentee()
    mentee_id = Mentee.create_mentee(**mentee_data)
