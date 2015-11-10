Providers = new Mongo.Collection("providers");

if (Meteor.isClient) {

  Meteor.startup(function() {
    GoogleMaps.load();
  });

 Template.providersBoard.helpers({
    providers: function () {
      console.log(Providers.find({}));
      return Providers.find({});
    }   
  }); 

  GoogleMaps.ready('myMap', function(map) {
    // Add a marker to the map once it's ready
    navigator.geolocation.getCurrentPosition(function(location){
      var position = { lat:location.coords.latitude, 
                      lng:location.coords.longitude };
      var marker = new google.maps.Marker({
          position: position,
          map: map.instance,
          draggable: true,
          animation: google.maps.Animation.DROP
      });
      map.instance.setCenter(new google.maps.LatLng(
        position.lat, position.lng));
      });
      map.instance.setZoom(15);
  });

  GoogleMaps.ready('myMap', function(map) {
    console.log(" here is the providers");
      var providers = Providers.find({}).fetch();
    _.each(providers, function(provider){
      var position = { lat:provider.position.lat, 
                      lng:provider.position.lng };
      console.log(position);
      var provider = new google.maps.Marker({ position:position, map: map.instance, animation:google.maps.Animation.DROP});
      console.log(provider)
      map.instance.setZoom(13);
    });
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
