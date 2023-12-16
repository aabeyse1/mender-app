from mongo_connector import Mentee, Mentor, Match

## testing methods with fake data
mentor1 = Mentor.create_mentor('John Doe', 'MN', 'Tech', 'Software', 'ABC Corp', 'Linkedin')
mentee1 = Mentee.create_mentee('Jane Smith', 'MN', 'Tech', 'Software', 'Macalester', 'Linkedin')

Match.create_match(mentor1, mentee1)

