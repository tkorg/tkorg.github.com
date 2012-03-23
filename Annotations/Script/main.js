var MetadataAnnotations = {
	Models: {},
	Collections: {},
	Views: {},
	Templates: {}
}

MetadataAnnotations.Models.Schema = Backbone.Model.extend({

});

MetadataAnnotations.Collections.Medatada = Backbone.Collection.extend({
	model: MetadataAnnotations.Models.Schema,
	url: "./Script/Data/metadata.json",
	initialize: function(){
		console.log("Metadata model initialize")
	}
});

MetadataAnnotations.Router = Backbone.Router.extend({
    routes: {
        "": "defaultRoute" 
    },
    defaultRoute: function () {
        console.log("defaultRoute");
        var metadata = new MetadataAnnotations.Collections.Medatada()
        metadata.fetch();
        console.log(metadata.length)
    }
})

var appRouter = new MetadataAnnotations.Router();
Backbone.history.start();