mapboxgl.accessToken = 'pk.eyJ1IjoiZGItZGF2ZS0iLCJhIjoiY2tsemgwbTh6MHV1NDJucWtqbmtzNHNkbCJ9.nTUDmu_Hvs3AIqiot5LGxQ'; 
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.0915, 42.3588],
  zoom:13
});

  var marker
  
  async function run(){ //pulls the getBus locations every 15 seconds and uses the data    
      const locations = await getBusLocations();
      console.log(locations);
    if (marker) {
      marker.remove()
    }
    marker = new mapboxgl.Marker()
    marker.setLngLat([locations[0].attributes.longitude, locations[0].attributes.latitude])
   .addTo(map);
    // timer
      setTimeout(run, 15000);
  }

  async function getBusLocations(){ // Request bus data from MBTA and gets the bus data for bus #1 - fetch
      const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
      const response = await fetch(url);
      const json     = await response.json(); //extracting the data from the response 
      return json.data;
  }

  function move() {
    setTimeout(() => {
      marker.setLngLat(busStops[counter]);
      move();
    },15000)

  }
run();