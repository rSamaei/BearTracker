from flask import Flask, request, jsonify
import csv
import math
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Define the path to the CSV file
CSV_FILE = 'bear_sightings.csv'

# Define the field names for the CSV file
FIELDNAMES = ['latitude', 'longitude']

# Function to append coordinates to the CSV file
def append_to_csv(latitude, longitude):
    with open(CSV_FILE, mode='a', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=FIELDNAMES)
        writer.writerow({'latitude': latitude, 'longitude': longitude})

# Function to calculate distance between two coordinates (Haversine formula)
def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371.0  # Earth radius in kilometers
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

    dlon = lon2_rad - lon1_rad
    dlat = lat2_rad - lat1_rad

    a = math.sin(dlat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    distance = R * c
    return distance

# Route to handle adding sightings via HTTP POST requests
@app.route('/add_sighting', methods=['POST'])
def add_sighting():
    # Get latitude and longitude from the request
    data = request.get_json()
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    
    # Append coordinates to the CSV file
    append_to_csv(latitude, longitude)
    
    # Return success message
    return jsonify({'message': 'Sighting added successfully!'}), 200

# Route to find the nearest sighting
from flask import Flask, request, jsonify
import csv
import math
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Define the path to the CSV file
CSV_FILE = 'bear_sightings.csv'

# Define the field names for the CSV file
FIELDNAMES = ['latitude', 'longitude']

# Function to append coordinates to the CSV file
def append_to_csv(latitude, longitude):
    with open(CSV_FILE, mode='a', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=FIELDNAMES)
        writer.writerow({'latitude': latitude, 'longitude': longitude})

# Function to calculate distance between two coordinates (Haversine formula)
def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371.0  # Earth radius in kilometers
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

    dlon = lon2_rad - lon1_rad
    dlat = lat2_rad - lat1_rad

    a = math.sin(dlat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    distance = R * c
    return distance

# Route to handle adding sightings via HTTP POST requests
@app.route('/add_sighting', methods=['POST'])
def add_sighting():
    # Get latitude and longitude from the request
    data = request.get_json()
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    
    # Check if the CSV file exists, if not, create it with headers
    if not os.path.isfile(CSV_FILE):
        with open(CSV_FILE, mode='w', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=FIELDNAMES)
            writer.writeheader()

    # Append coordinates to the CSV file
    append_to_csv(latitude, longitude)
    
    # Return success message
    return jsonify({'message': 'Sighting added successfully!'}), 200

# Route to find the nearest sighting
@app.route('/nearest_sighting', methods=['GET'])
def nearest_sighting():
    # Get user's location from the request parameters
    latitude = float(request.args.get('latitude'))
    longitude = float(request.args.get('longitude'))

    # Initialize variables to store nearest sighting information
    nearest_distance = float('inf')
    nearest_sighting = None

    # Read data from CSV file and find the nearest sighting
    with open(CSV_FILE, mode='r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            sighting_latitude = float(row['latitude'])
            sighting_longitude = float(row['longitude'])
            distance = calculate_distance(latitude, longitude, sighting_latitude, sighting_longitude)
            if distance < nearest_distance:
                nearest_distance = distance
                nearest_sighting = (sighting_latitude, sighting_longitude)

    # Check if the nearest sighting is within 1km
    if nearest_distance <= 1.0:
        return "You're in trouble! Nearest sighting is within 1km."
    else:
        return "You're safe. Nearest sighting is farther than 1km."

if __name__ == '__main__':
    app.run(debug=True)

if __name__ == '__main__':
    app.run(debug=True)
