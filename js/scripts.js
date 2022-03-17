
  mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A'

  // lngLat to show entire NYC on load
  var mapCenter = [-73.993219, 40.713746]


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
      }
      });

      map.addLayer({
        id: 'nypdpp-scounts-line',
        type: 'line',
        source: 'nypdpp-scounts',
        paint: {
          'line-color': '#6a7280',
          'line-width': .5,
        },
      });

      // create legend
      var stateLegendEl = document.getElementById('state-legend');
      map.on('zoom', () => {
      stateLegendEl.style.display = 'none';
      stateLegendEl.style.display = 'block';
    });

    // When a click event occurs on a feature in the nta-map-fill,
    // open a popup at the location of the click, with nta name
    // HTML from the click event's properties.
  //   map.on('click', 'nypdpp-scounts-fill', function(e) {
  //   new mapboxgl.Popup()
  //   .setLngLat(e.lngLat)
  //   .setHTML(e.features[0].properties.ntaname)
  //   .addTo(map);
  // });
  //
  //   // Change the cursor to a pointer when
  //   // the mouse is over the nta-map-fill.
  //   map.on('mouseenter', 'nta-map-fill', function() {
  //   map.getCanvas().style.cursor = 'pointer';
  // });
  //
  //   // Change the cursor back to a pointer
  //   // when it leaves the nta-map-fill.
  //   map.on('mouseleave', 'nta-map-fill', function() {
  //   map.getCanvas().style.cursor = '';
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

// WILL HAVE TO USE THIS FOR TOGGLING B/W LAYERS
//   $('#fly-to-midtown').on('click', function() {
//   // when this is clicked, let's fly the map to Midtown Manhattan
//   map.flyTo({
//     center: [-73.983102, 40.757933],
//     zoom: 12
//   })
// })
//
// $('#fly-to-jfk').on('click', function() {
//   // when this is clicked, let's fly the map to Midtown Manhattan
//   map.flyTo({
//     center: [-73.784021,40.645230],
//     zoom: 13
//   })
// })
//
// $('#toggle-population').on('click', function() {
//   var visibility = map.getLayoutProperty('community-districts-fill', 'visibility')
//   if (visibility === 'none') {
//     map.setLayoutProperty('community-districts-fill', 'visibility', 'visible');
//   } else {
//     map.setLayoutProperty('community-districts-fill', 'visibility', 'none');
//   }
// })
// })

});
