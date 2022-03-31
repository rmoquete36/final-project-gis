mapboxgl.accessToken =
  "pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A";

// launches modal on page load
$(document).ready(function () {
  $("#exampleModal").modal("show");
});

// lngLat to show entire NYC on load
var mapCenter = [-73.993219, 40.713746];

// bounds for a citywide view of New York
var nycBounds = [
  [-74.333496, 40.469935],
  [-73.653717, 40.93219],
];

var map = new mapboxgl.Map({
  container: "mapContainer", // HTML container id
  style: "mapbox://styles/mapbox/dark-v9", // style URL
  center: mapCenter, // starting position as [lng, lat]
  zoom: 10,
});

map.on("load", function () {
  map.addSource("nypdpp-scounts", {
    type: "geojson",
    // Use a URL for the value for the `data` property.
    data: "./data/nypdpp-scounts.geojson",
  });

  map.addLayer({
    id: "nypdpp-scounts-fill",
    type: "fill",
    source: "nypdpp-scounts",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "count_vals"],
        0,
        "#fff7fb",
        10,
        "#ece7f2",
        20,
        "#d0d1e6",
        30,
        "#a6bddb",
        40,
        "#74a9cf",
        50,
        "#3690c0",
        60,
        "#0570b0",
        70,
        "#045a8d",
        80,
        "#023858",
        90,
        "#101e52",
        100,
        "#0a1642",
        110,
        "#030f38",
      ],
      "fill-outline-color": "#171515",
    },
  });

  map.addSource("census-08-12", {
    type: "geojson",
    // Use a URL for the value for the `data` property.
    data: "./data/census-08-12.geojson",
  });

  map.addLayer({
    id: "census-08-12-fill",
    type: "fill",
    source: "census-08-12",
    paint: {
      "fill-opacity": 0.7,
      "fill-outline-color": "#f5eeed",
      "fill-color": "#8994a1",
    },
  });

  // create legend
  var shootingLegendEl = document.getElementById("shooting-legend");
  map.on("zoom", () => {
    shootingLegendEl.style.display = "none";
    shootingLegendEl.style.display = "block";
  });

  $("#toggle-shootings").on("click", function () {
    var visibility = map.getLayoutProperty("nypdpp-scounts-fill", "visibility");
    if (visibility === "none") {
      map.setLayoutProperty("nypdpp-scounts-fill", "visibility", "visible");
    } else {
      map.setLayoutProperty("nypdpp-scounts-fill", "visibility", "none");
    }
  });

  $("#toggle-census-data").on("click", function () {
    var visibility = map.getLayoutProperty("census-08-12-fill", "visibility");
    if (visibility === "none") {
      map.setLayoutProperty("census-08-12-fill", "visibility", "visible");
    } else {
      map.setLayoutProperty("census-08-12-fill", "visibility", "none");
    }
  });

  map.on("click", "nypdpp-scounts-fill", function (e) {
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      // .setHTML(e.features[0].properties.ntaname) - original code; (`<p>${e.features[0].properties.ntaname}</p>${e.features[0].properties.popunemplo}`)
      .setHTML(
        `<strong>Number of Shooting Incidents:</strong> ${e.features[0].properties.count_vals}
              <strong>Precinct:</strong> ${e.features[0].properties.precinct}`
      )
      .addTo(map);
  });

  // When a click event occurs on a feature in the nta-map-fill,
  // open a popup at the location of the click, with nta name
  // HTML from the click event's properties.
  map.on("click", "census-08-12-fill", function (e) {
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      // .setHTML(e.features[0].properties.ntaname) - original code; (`<p>${e.features[0].properties.ntaname}</p>${e.features[0].properties.popunemplo}`)
      .setHTML(
        `
      <strong>Neighborhood:</strong> ${e.features[0].properties.ntaname}
      <li><strong>Total Population:</strong> ${e.features[0].properties.poptot}</li>
      <li><strong>Population Unemployed:</strong> ${e.features[0].properties.popunemplo}</li>
      <li><strong>Population Poor/Struggling:</strong> ${e.features[0].properties.poororstru}</li>
      <li><strong>Families on Public Assistance:</strong> ${e.features[0].properties.withpubass}</li>
        `
      )
      .addTo(map);
  });

  // listen for click on the 'Back to City View' button
  $(".reset").on("click", function () {
    map.fitBounds(nycBounds);
  });

  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
});
