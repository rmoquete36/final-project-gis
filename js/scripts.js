
  mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A'

  // lngLat to show entire NYC on load
  var mapCenter = [-73.993219, 40.713746]

  // bounds for a citywide view of New York
  var nycBounds = [[-74.333496,40.469935], [-73.653717,40.932190]]

  var map = new mapboxgl.Map({
    container: 'mapContainer', // HTML container id
    style: 'mapbox://styles/mapbox/dark-v9', // style URL
    center: mapCenter, // starting position as [lng, lat]
    zoom: 10,
  });

  map.on('load', function() {
    map.addSource('nypdpp-scounts', {
      type: 'geojson',
      // Use a URL for the value for the `data` property.
      data: './data/nypdpp-scounts.geojson'
    })

  map.addLayer({
    id: 'nypdpp-scounts-fill',
    type: 'fill',
    source: 'nypdpp-scounts',
    paint: {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'count_vals'],
        0,
        '#fff7fb',
        10,
        '#ece7f2',
        20,
        '#d0d1e6',
        30,
        '#a6bddb',
        40,
        '#74a9cf',
        50,
        '#3690c0',
        60,
        '#0570b0',
        70,
        '#045a8d',
        80,
        '#023858'
      ],
    'fill-outline-color': '#6a7280'
    }
    });

  map.addSource('census-08-12', {
    type: 'geojson',
    // Use a URL for the value for the `data` property.
    data: './data/census-08-12.geojson'
  })

  map.addLayer({
    id: 'census-08-12-fill',
    type: 'fill',
    source: 'census-08-12',
    paint: {
    'fill-opacity': .5,
    'fill-outline-color': '#f5eeed',
    'fill-color': '#f5eeed'
  }
  });

// style these lines differently - MAY NOT NEED THIS PIECE OF CODE
  // map.addLayer({
  //   id: 'census-08-12-line',
  //   type: 'line',
  //   source: 'census-08-12',
  //   paint: {
  //   'line-color': '#1f1d1d'
  // }
  // });


    // create legend
    var shootingLegendEl = document.getElementById('shooting-legend');
    map.on('zoom', () => {
    shootingLegendEl.style.display = 'none';
    shootingLegendEl.style.display = 'block';
  });

  $('#toggle-shootings').on('click', function() {
    var visibility = map.getLayoutProperty('nypdpp-scounts-fill', 'visibility')
    if (visibility === 'none') {
      map.setLayoutProperty('nypdpp-scounts-fill', 'visibility', 'visible');
    } else {
      map.setLayoutProperty('nypdpp-scounts-fill', 'visibility', 'none');
    }
  })

  $('#toggle-census-data').on('click', function() {
    var visibility = map.getLayoutProperty('census-08-12-fill', 'visibility')
    if (visibility === 'none') {
      map.setLayoutProperty('census-08-12-fill', 'visibility', 'visible');
    } else {
      map.setLayoutProperty('census-08-12-fill', 'visibility', 'none');
    }
  })


  // When a click event occurs on a feature in the nta-map-fill,
  // open a popup at the location of the click, with nta name
  // HTML from the click event's properties.
  map.on('click', 'census-08-12-fill', function(e) {
    new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(e.features[0].properties.ntaname)
    .addTo(map);
});


  // listen for click on the 'Back to City View' button
    $('.reset').on('click', function() {
      map.fitBounds(nycBounds)
    })






    //
    // $('#toggle-census-data').on('click', function() {
    //   var visibility = map.getLayoutProperty('census-08-12-line', 'visibility')
    //   if (visibility === 'none') {
    //     map.setLayoutProperty('census-08-12-line', 'visibility', 'visible');
    //   } else {
    //     map.setLayoutProperty('census-08-12-line', 'visibility', 'none');
    //   }
    // })
    // })



  //   // When a click event occurs on a feature in the census-08-12,
  //   // open a popup at the location of the click, with nta name
  //   // HTML from the click event's properties.
  //   map.on('click', 'nypdpp-scounts-fill', function(e) {
  //   new mapboxgl.Popup()
  //   // .setLngLat(e.coordinates)
  //   .setHTML(e.features[0].properties.poptot)
  //   .addTo(map);
  // });
  //
  //
  //   // Create a popup.
  //   const popup = new mapboxgl.Popup({
  //     closeButton: false,
  //     closeOnClick: false
  //   });
  //
  //   map.on('mouseenter', 'robberymap-circle', function(e) {
  //     // Change the cursor style as a UI indicator.
  //     map.getCanvas().style.cursor = 'pointer';
  //
  //     // Copy coordinates array.
  //     const coordinates = e.features[0].geometry.coordinates.slice();
  //     const robType = e.features[0].properties.PD_DESC;
  //     const precinct = e.features[0].properties.ADDR_PCT_CD;
  //
  //     // Ensure that if the map is zoomed out such that multiple
  //     // copies of the feature are visible, the popup appears
  //     // over the copy being pointed to.
  //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  //     }
  //
  //   // Populate the popup and set its coordinates
  //   // based on the feature found.
  //       popup.setLngLat(coordinates).setHTML(`${precinct}`).addTo(map);
  //   });
  //
  //       map.on('mouseleave', 'robberymap-circle', function() {
  //       map.getCanvas().style.cursor = '';
  //       popup.remove();
  //     });




});
