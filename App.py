from flask import Flask, request, jsonify
import csv
import math
import random

app = Flask(__name__)

# Define the path to the CSV files
CSV_FILE = 'bear_sightings.csv'
BEAR_TIPS_FILE = 'bear_tips.csv'

# Define the field names for the CSV files
FIELDNAMES = ['latitude', 'longitude']
BEAR_TIP_FIELDNAMES = ['bear_tip']

# Function to append coordinates to the CSV file
def append_to_csv(file_path, data):
    with open(file_path, mode='a', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=FIELDNAMES)
        writer.writerow(data)

# Function to get a random bear tip from the CSV file
def get_random_bear_tip():
    with open(BEAR_TIPS_FILE, mode='r') as file:
        reader = csv.reader(file)
        bear_tips = list(reader)
        random_tip = random.choice(bear_tips)
        return random_tip[0]  # Assuming the bear tips are in the first column

@app.route('/random_bear_tip', methods=['GET'])
def random_bear_tip():
    # Get a random bear tip
    bear_tip = get_random_bear_tip()
    
    # Return the random bear tip as JSON
    return jsonify({'bear_tip': bear_tip})

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
    append_to_csv(CSV_FILE, {'latitude': latitude, 'longitude': longitude})
    
    # Return success message
    return jsonify({'message': 'Sighting added successfully!'}), 200

# Route to find the nearest sighting
@app.route('/nearest_sighting', methods=['GET'])
def nearest_sighting():
    # Get user's location from the request parameters
    user_latitude = float(request.args.get('user_latitude'))
    user_longitude = float(request.args.get('user_longitude'))

    # Initialize variables to store nearest sighting information
    nearest_distance = float('inf')
    nearest_sighting = None

    # Read data from CSV file and find the nearest sighting
    with open(CSV_FILE, mode='r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            sighting_latitude = float(row['latitude'])
            sighting_longitude = float(row['longitude'])
            distance = calculate_distance(user_latitude, user_longitude, sighting_latitude, sighting_longitude)
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
