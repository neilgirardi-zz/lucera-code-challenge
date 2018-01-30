// IndexView.js

define(["jquery", "backbone", "models/HomeModel", "collections/HomeCollection", "text!templates/Home.html"],

    function($, Backbone, HomeModel, HomeCollection, template){

        var HomeView = Backbone.View.extend({


            // The DOM Element associated with this view
            el: ".main-content",

            collection: HomeCollection,

            // View Event Handlers
            events: {
                "click .pagination a" : "paginationClickHandler",
                "click th" : "sortTableClickHandler"
            },

            // View constructor
            initialize: function() {

                this.collection.url += '/page/1';

                this.collection.fetch({
                    success : function(collection, response) {
                        console.log('the models:', collection.models);
                        this.render()
                    }.bind(this),

                    error : function(collection, response) {
                        console.log(response)
                    }

                });

                this.listenTo(this.collection, "sort", this.render)
            },

            paginationClickHandler: function(e) {
                const pageNumber =  $(e.currentTarget).attr('data-page-number');
                const collection = this.collection;
                e.preventDefault();

                collection.url = ( pageNumber === 'all') ? '/api/getData/' : `/api/getData/page/${pageNumber}`;

                collection.fetch({

                    success : function(collection, response) {
                        this.render()
                    }.bind(this),

                    error : function(collection, response) {
                        console.log(response)
                    }

                });
            },

            sortTableClickHandler: function(e) {
                const comparator = $(e.currentTarget).text();
                const collection = this.collection;
                const map = {
                    Latency: "latency",
                    LiquidityProvider: "LiquidityProvider",
                    Client: "Client",
                    Volume: "volume"
                };
                collection.comparator= map[comparator.replace(' ', '')];
                collection.sort();
            },

            // Renders the view's template to the UI
            render: function() {

                console.log('render!');

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {data: this.collection.models} );

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return HomeView;

    }

);
