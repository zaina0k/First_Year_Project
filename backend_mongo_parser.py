import profile
from re import search
import pymongo
from pymongo import MongoClient
from datetime import date

today = date.today().strftime("%d/%m/%Y")

client = pymongo.MongoClient("mongodb+srv://zain_a0k:8syuxpqBXiDptba@cluster0.u1yzn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client["project_imap"]
collection = db["profiles"]

post1 = {"_id": 0, "name": "nathan"}
post2 = {"_id": 1, "name": "Dilan"}


#inserting 
def insert1(post1):
    collection.insert_one(post1)

def insert_many(post1,post2):
    collection.insert_many([post1,post2])

#searching
def searching_name(username):
    search_res = collection.find({"name":username})
    for profile in search_res:
        print(profile)

def searching_specific(x):
    search_res = collection.find_one({"_id":x})
    print(search_res)

def show_all():
    search_res = collection.find({})
    for profile in search_res:
        print(profile)

#deleting
def delete_profile(x):
    """delete profile by id"""
    collection.delete_one({"_id":x})

#updating
def update1(profile_id,new_name=None):
    """when using $set the 'name' can be made to any field.
    if the field isnt already there it will make a new field"""
    collection.update_one({"_id":profile_id},{"$set":{"hello":new_name}})

#counting
def total_posts():
    cur_count = collection.count_documents({})
    return cur_count

# my_count = total_posts()
# print(my_count)

insert1(post1)