Providers = new Mongo.Collection("providers");

if (Meteor.isClient) {

  Template.providersBoard.helpers({
    providers: function () {
      return Providers.find({});
    }
  });

  Template.newProviders.events({
    'click .add-provider': function (event, template) {
        var addressElement = template.find(".address");
        Providers.insert({
            address: addressElement.value,
            createdAt: new Date()
        });
        addressElement.value="";
    }
  });
    
  Template.provider.events({
    'click .delete': function(event, template) {
        Providers.remove(this._id);
    }
  });
  

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
