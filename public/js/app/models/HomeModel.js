// IndexModel.js

define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var HomeModel = Backbone.Model.extend({
            idAttribute: "uuid"
        });

        // Returns the Model class
        return  HomeModel;
    }

);
