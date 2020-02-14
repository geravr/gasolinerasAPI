class UI {
  constructor() {
    this.api = new API();

    // create LayerGroup markers
    this.markers = new L.LayerGroup();

    this.map = this.initializeMap();
  }

  initializeMap() {
    // Initialize & get map property
    const map = L.map("mapa").setView([20.6506194, -103.3214156], 11.5);
    const mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; " + mapLink + " Contributors",
      maxZoom: 18
    }).addTo(map);
    return map;
  }

  showGasStation() {
    this.api.getData().then(data => {
      const response = data.responseJSON.results;

      // ejecutar
      this.showPins(response);
    });
  }

  showPins(data) {
      // Clean markers
    this.markers.clearLayers();

    // Iterate de gas station
    data.forEach(data => {
        const {latitude, longitude, calle, regular, premium} = data
        let floatLatitude = parseFloat(latitude);
        let floatLongitude = parseFloat(longitude);
        
        // Limit pin only for Guadalajara, Jalisco
        if (floatLatitude >= 20.512000 && floatLatitude <= 20.815000 && floatLongitude <= -103.166000 && floatLongitude >= -103.480000 ) {

        // add popup for data prices
        const popUpOptions = L.popup()
            .setContent(`
            <p>Calle: ${calle}</p>
            <p><strong>Regular:</strong> $ ${regular}</p>
            <p><strong>Premium:</strong> $ ${premium}</p>
            `)
                 // add PIN
        const marker =  new L.marker([
            parseFloat(latitude),
            parseFloat(longitude)
        ]).bindPopup(popUpOptions);
        this.markers.addLayer(marker);
        }
    });
    this.markers.addTo(this.map);
  }
}
