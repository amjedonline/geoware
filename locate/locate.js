if (Meteor.isClient) {

  Meteor.startup(function() {
    GoogleMaps.load();
  });

  GoogleMaps.ready('myMap', function(map) {
    // Add a marker to the map once it's ready
    navigator.geolocation.getCurrentPosition(function(location){
      var position = { lat:location.coords.latitude, 
                      lng:location.coords.longitude };
      window.cdeb = map;
      console.log(map);
      var marker = new google.maps.Marker({
          position: position,
          map: map.instance,
          draggable: true,
          animation: google.maps.Animation.DROP
      });
      window.cmarker = marker;
      console.log("now centering");
      map.instance.setCenter(new google.maps.LatLng(
        position.lat, position.lng));
      });
      map.instance.setZoom(15);
  });

  Template.body.helpers({
    myMapOptions: function() {
      // Map initialization options
      return {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      };
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
