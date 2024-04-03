mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hpZmZtYW4iLCJhIjoiY2xwOGxnMThxMDBvajJsbzdjdDI3NXFlOSJ9.Ytrc05lBxHAEO1OPt7zZWQ"

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
})

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude])

  const userCircle = new mapboxgl.CircleLayer({
    id: 'user-location',
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: userLocation
        }
      }
    },
    paint: {
      'circle-radius': 8,
      'circle-color': '#007cbf',
      'circle-opacity': 0.7
    }
  });

  map.addLayer(userCircle);

  map.setCenter(userLocation);
}

function errorLocation() {
  setupMap([-0.0, 0.0])
}

function setupMap(center) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 15
  })

  const nav = new mapboxgl.NavigationControl({
    showCompass: true,
    visualizePitch: true,
    showZoom: true,
    localization: {
      "Choose a starting plac": "Eliga una ubicacion",
      "Reset bearing to north": "Restablecer orientación al norte",
      "Reset bearing to the current direction": "Restablecer orientación a la dirección actual",
      "Zoom in": "Acercar",
      "Zoom out": "Alejar",
      "Turn left": "Girar a la izquierda",
      "Turn right": "Girar a la derecha",
      "Go straight": "Continuar recto",
      "Your destination": "Tu destino",
      "You have arrived at your destination": "Has llegado a tu destino",
      "Close": "Cerrar",
      "Back": "Volver",
      "Search": "Buscar",
      "Directions": "Direcciones",
      "From": "Desde",
      "To": "Hacia",
      "A": "A",
      "B": "B",
      "C": "C",
      "D": "D",
      "E": "E",
      "Loading": "Cargando",
      "Calculate": "Calcular",
      "Choose a starting place": "Punto de partida",
      "Destination": "Destino",
      "Arrival time": "Hora de llegada",
      "Distance": "Distancia",
      "Duration": "Duración"
    }
  })
  map.addControl(nav)

  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    language: 'es',
    unit: 'metric'
  })

  map.addControl(directions, "top-left")

  successLocation(center);
}
