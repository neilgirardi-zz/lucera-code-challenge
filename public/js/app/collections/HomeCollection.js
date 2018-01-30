// IndexCollection.js

define(["jquery", "backbone", "models/HomeModel"],

	function($, Backbone, HomeModel) {

		// Creates a new Backbone Collection class object
		var HomeCollection = Backbone.Collection.extend({
			model: HomeModel,
			url: "/api/getData",
			comparator: "latency"
		});

		// Returns the Model class
		return new HomeCollection();
	}

);
