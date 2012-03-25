(function ($) {
 
        var annotations = 
        [
                {
                        "kind": "ValueAnnotation",
                        "target": "NetflixCatalog", 
                        "termNamespace": "Org.Odata.Display", 
                        "term": "isHidden", 
                        "annotationValue": {
                                "expression": "Boolean",
                                "value": "true"
                        }
                },
                {
                        "kind": "TypeAnnotation",
                        "target": "NetflixCatalog.Title", 
                        "termNamespace": "Com.Movies", 
                        "term": "Movie", 
                        "propertyValue": {
                                "termProperty": "Title",
                                "expression": "Path",
                                "value": "Title"
                        }
                },
                {
                        "kind": "ValueAnnotation",
                        "target": "NorthWind", 
                        "termNamespace": "Org.Odata.Display", 
                        "term": "Title", 
                        "annotationValue": {
                                "expression": "String",
                                "value": "Products"
                        }
                }
        ]


        var ValueAnnotation = Backbone.Model.extend({});

        var ValueAnnotationColl = Backbone.Collection.extend({
                model: ValueAnnotation
        })

        var ValueAnnotationView = Backbone.View.extend({
                tagName: "article",
                template: $("#valueAnnotationTemplate").html(),

                render: function () {
                        var tmpl = _.template(this.template);

                        this.$el.html(tmpl(this.model.toJSON()));
                        return this;
                }
        });

        var AnnotationView = Backbone.View.extend({
            el: $("#mainContainer"),
         
            initialize: function () {
                this.collection = new ValueAnnotationColl(annotations);
                this.render();
            },
         
            render: function () {
                var that = this;
                _.each(this.collection.models, function (item) {
                    that.renderValueAnnotation(item);
                }, this);
            },
         
            renderValueAnnotation: function (item) {
                var valueAnnotationView = new ValueAnnotationView({
                    model: item
                });
                this.$el.append(valueAnnotationView.render().el);
            }
        });
 
        var mainView = new AnnotationView();


} (jQuery));