from pymongo import MongoClient
# import random
# import string

def get_db_handle(db_name):
    connection_string = "mongodb+srv://mender-admin:446projxyz@cluster0.yl9k9ng.mongodb.net/?retryWrites=true&w=majority"
    mongo_client = MongoClient(connection_string)
    db_handle = mongo_client[db_name]
    return db_handle, mongo_client
    # our db_name: mender

def get_collection_handle(db_handle, collection_name):
    return db_handle[collection_name]
    # current db_collection: users


# def generate_random_string(length):
#     letters = string.ascii_letters
#     return ''.join(random.choice(letters) for _ in range(length))

# num_users = 10

# for _ in range(num_users):
#     user_data = {
#         "name": generate_random_string(8),   
#         "email": f"{generate_random_string(5)}@example.com"  
#     }
#     collection.insert_one(user_data)

# print(f"{num_users} placeholder users added to the 'users' collection.")

