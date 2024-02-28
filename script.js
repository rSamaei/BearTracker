// Define an empty array to store bear data
let bears = [];

// Function to initialize the map
function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.785834, lng: -122.406417},
        zoom: 18,
        mapId: '54b8450dc2f9e06'
    });
    // Fetch bear data from CSV and set markers on the map
    fetch('bear_sightings.csv')
        .then(response => response.text())
        .then(data => {
            parseCSV(data);
            setMarkers(map);
        });
}

// Function to parse CSV data
function parseCSV(csv) {
    // Split CSV into lines
    const lines = csv.split('\n');
    // Iterate over each line
    lines.forEach(line => {
        // Split line into columns
        const columns = line.split(',');
        // Extract bear data from columns and push to bears array
        bears.push({
            latitude: parseFloat(columns[0]),
            longitude: parseFloat(columns[1]),
        });
    });
}

// Function to set markers on the map
function setMarkers(map) {
    bears.forEach(bear => {
        const marker = new google.maps.Marker({
            position: { lat: bear.latitude, lng: bear.longitude },
            icon: {
                url: "bear-face-color-icon.svg",
                scaledSize: new google.maps.Size(38, 31)
            },
            animation: google.maps.Animation.DROP,
            map: map,
        });

        const infowindow = new google.maps.InfoWindow({
            content: "There is a bear here! \n Don't get too close! \n It's dangerous!"
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    });
}

// Call the initMap function to start the map
initMap();
