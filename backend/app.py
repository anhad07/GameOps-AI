from flask import Flask, request
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv

import bcrypt
import jwt
import datetime

load_dotenv()

app = Flask(__name__)

CORS(app)

SECRET_KEY = "gameops_secret_key"

client = MongoClient(
    os.getenv("MONGO_URI")
)

db = client["gameops"]

servers_collection = db["servers"]

activity_collection = db["activities"]

users_collection = db["users"]


@app.route("/")
def home():

    return {
        "message": "GameOps AI Backend Running"
    }


# =========================
# SIGNUP
# =========================

@app.route("/signup", methods=["POST"])
def signup():

    data = request.json

    username = data.get("username")

    email = data.get("email")

    password = data.get("password")

    existing_user = users_collection.find_one({

        "email": email
    })

    if existing_user:

        return {

            "message": "User already exists"
        }, 400

    hashed_password = bcrypt.hashpw(

        password.encode("utf-8"),

        bcrypt.gensalt()
    )

    users_collection.insert_one({

        "username": username,

        "email": email,

        "password": hashed_password
    })

    return {

        "message": "Signup successful"
    }


# =========================
# LOGIN
# =========================

@app.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")

    password = data.get("password")

    user = users_collection.find_one({

        "email": email
    })

    if not user:

        return {

            "message": "Invalid email"
        }, 401

    if not bcrypt.checkpw(

        password.encode("utf-8"),

        user["password"]
    ):

        return {

            "message": "Invalid password"
        }, 401

    token = jwt.encode({

        "email": email,

        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)

    },

    SECRET_KEY,

    algorithm="HS256")

    return {

        "message": "Login successful",

        "token": token,

        "username": user["username"]
    }


# =========================
# CREATE SERVER
# =========================

@app.route("/create-server", methods=["POST"])
def create_server():

    data = request.json

    servers_collection.insert_one(data)

    activity = {

        "title": f'{data.get("name")} deployed',

        "desc": f'AI assigned {data.get("mode")} optimization profile',

        "time": "Now"
    }

    activity_collection.insert_one(activity)

    return {

        "message": "Server created successfully"
    }


# =========================
# GET SERVERS
# =========================

@app.route("/servers")
def get_servers():

    servers = []

    for server in servers_collection.find():

        servers.append({

            "id": str(server.get("_id", "")),

            "name": server.get("name", "Unknown Server"),

            "region": server.get("region", "Unknown"),

            "status": server.get("status", "Online"),

            "cpu": server.get("cpu", "50%"),

            "ram": server.get("ram", "40%"),

            "maxPlayers": server.get("maxPlayers", "500"),

            "mode": server.get("mode", "Normal")
        })

    return servers


# =========================
# ACTIVITIES
# =========================

@app.route("/activities")
def get_activities():

    activities = []

    for activity in activity_collection.find().sort("_id", -1):

        activities.append({

            "title": activity.get("title"),

            "desc": activity.get("desc"),

            "time": activity.get("time")
        })

    return activities


if __name__ == "__main__":

    app.run(debug=True)