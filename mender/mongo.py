from pymongo import MongoClient

# MongoDB connection details
connection_string = "mongodb+srv://cluster0.yl9k9ng.mongodb.net/"
username = "mender-admin"
password = "446projxyz"   
database_name = "mender" 

# connect to MongoDB
client = MongoClient(connection_string, username=username, password=password)

# get database
db = client[database_name]

# get collection
collection_name = "users"  
collection = db[collection_name]

# test data insert
document_to_insert = {"test": "testing"}
collection.insert_one(document_to_insert)

result = collection.find()
for document in result:
    print(document)

client.close()

## alternative code???? will test and delete later

# from pymongo import MongoClient

# def get_db_handle():
#     connection_string = "mongodb+srv://mender-admin:446projxyz@cluster0.yl9k9ng.mongodb.net/mender/?retryWrites=true&w=majority"
#     mongo_client = MongoClient(connection_string)
#     return mongo_client
#     # our db_name: mender

# def get_users_db():
#     db = get_db_handle()["mender"]  
#     collection = db["users"]
#     return collection


# # Get database and collection handles
# db = get_db_handle()
# users = get_users_db()


# try:
#     # MongoDB operations
#     print(f"working")
# # test operations
#     document_to_insert = {"name": "Region 1", "population": 1000000}
#     users.insert_one(document_to_insert)

#     documents_to_update = {"name": "Region 1"}
#     update_operation = {"$set": {"population": 1500000}}
#     users.update_one(documents_to_update, update_operation)

#     # Query documents
#     result = users.find({"name": "Region 1"})
#     for document in result:
#         print(document)

# except Exception as e:
#     print(f"Error: {e}")

# # Close the MongoDB client when done
# db.close()