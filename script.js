// Define an empty array to store bear data
let bears = [];

// Function to initialize the map
function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.512073987518264, lng: -0.1156107619657062},
        zoom: 18,
        mapId: '54b8450dc2f9e06'
    });
    // Fetch bear data from CSV and set markers on the map
    fetch('bearData.csv')
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
        bears.push([columns[0], parseFloat(columns[1]), parseFloat(columns[2]), parseInt(columns[3])]);
    });
}

// Function to set markers on the map
function setMarkers(map) {
    bears.forEach(bear => {
        const marker = new google.maps.Marker({
            position: { lat: bear[1], lng: bear[2] },
            icon: {
                url: "bear-face-color-icon.svg",
                scaledSize: new google.maps.Size(38,31)
            },
            animation: google.maps.Animation.DROP,
            map: map,
            title: bear[0],
            zIndex: bear[3]
        });

        const infowindow = new google.maps.InfoWindow({
            content: "There is a bear here! \n Don't get too close! \n It's dangerous!"
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    });
}
