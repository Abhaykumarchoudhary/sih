document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([20.5937, 78.9629], 5); // Center of India

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let locations = {};

    fetch('data/locations.json')
        .then(response => response.json())
        .then(data => {
            locations = data;
        });

    document.getElementById('search-button').addEventListener('click', () => {
        const state = document.getElementById('state').value.trim();
        const district = document.getElementById('district').value.trim();

        if (locations[state] && locations[state].districts[district]) {
            const { coords, description } = locations[state].districts[district];
            map.setView(coords, 12);

            L.marker(coords).addTo(map)
                .bindPopup(description)
                .openPopup();

            document.getElementById('description').textContent = description;
        } else {
            document.getElementById('description').textContent = 'Location not found. Please try again.';
        }
    });
});
