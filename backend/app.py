from flask import Flask, request
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CORS(app)

client = MongoClient(
    os.getenv("MONGO_URI")
)

db = client["gameops"]

servers_collection = db["servers"]

activity_collection = db["activities"]


@app.route("/")
def home():

    return {
        "message": "GameOps AI Backend Running"
    }


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