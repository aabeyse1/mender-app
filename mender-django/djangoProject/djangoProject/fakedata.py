from mongo_connector import Mentee, Mentor, Match, Database

## testing methods with fake data
mentor1 = Mentor.create_mentor('John Doe', 'MN', 'Tech', 'Software', 'ABC Corp', 'Linkedin')
mentee1 = Mentee.create_mentee('Jane Smith', 'MN', 'Tech', 'Software', 'Macalester', 'Linkedin')

Match.create_match(mentor1, mentee1)

## testing finding user
user_id, user, user_type = Database.find_user(name='John Doe', linkedin_username='Linkedin')
