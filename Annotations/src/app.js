(function ($) {
 
        var vadata = 
        [
            {
                "kind": "ValueAnnotation",
                "target": "NetflixCatalog.Title",
                "targetSchemaType": "EntityType",
                "termNamespace": "Org.Odata.Display", 
                "term": "isHidden", 
                "expression": "Boolean",
                "value": "true"
            },
            {
                "kind": "ValueAnnotation",
                "target": "NorthWind",
                "targetSchemaType": "EntitySet",
                "termNamespace": "Org.Odata.Display", 
                "term": "isHidden", 
                "expression": "Boolean",
                "value": "true"
            }
        ];

        //MODELS
        var AnnotationSchema = Backbone.Model.extend({});
        var ValueAnnotation = Backbone.Model.extend({
                clear: function() {
                        this.destroy();
                }
        });

        //COLLECTIONS
        var ValueAnnotationList = Backbone.Collection.extend({
                model: ValueAnnotation,

                url: "./src/data/valueannotations.json",

                initialize:function(){
                        console.log("ValueAnnotationList coll init");
                },

        });

        //Create the global collection of value annotations
        var ValueAnnotations = new ValueAnnotationList;

        //VIEWS 
        var ValueAnnotationView = Backbone.View.extend({
                tagName: "li",
                
                template: $("#valueAnnotationTemplate").html(),

                events: {
                        "click a.delete-va": "clear"
                },

                initialize: function() {
                        this.model.bind('change', this.render, this);
                        this.model.bind('destroy', this.remove, this);
                },

                render: function () {
                        console.log("ValueAnnotationView render");
                        var tmpl = _.template(this.template);
                        this.$el.html(tmpl(this.model.toJSON()));
                        return this;
                },

                clear: function() {
                        console.log("deleting value annotation");
                        this.model.clear();
                }

        });

        var AppView = Backbone.View.extend({
            el: $("#mainContainer"),

            events: {
                "click #add-va": "createVA"
            },
         
            initialize: function () {
                console.log("Appview init");
                this.input = this.$("#target");
                ValueAnnotations.bind('add', this.addOne, this);
                ValueAnnotations.bind('reset', this.addAll, this);
                // ValueAnnotations.fetch();
                ValueAnnotations.add(vadata);
            },
         
            addAll: function (va) {
                ValueAnnotations.each(this.addOne);
            },

            addOne: function (va) {
                var view = new ValueAnnotationView({model: va});
                this.$("#va-list").append(view.render().el);

            },    

            createVA: function () {
                console.log("Creating value annotation");
                var newVA = {};
                $("#create-va").children("input").each(function (i, el) {
                        console.log('iterating over value annotation inputs');
                        if ($(el).val() !== "") {
                                newVA[el.id] = $(el).val();
                        }
                });
                // ValueAnnotations.create(newVA);
                ValueAnnotations.push(newVA);
            },

            deleteVA: function () {
                console.log("deleting value annotation");
            }

            
        });
 
        var mainView = new AppView();


/*        if($(el.id) == "target" || $(el.id) == "targetSchemaType") {
                newVA[el.id] = $(el).val();
        }
        else {
                var annotation = {};
                annotation[el.id] = $(el).val();
        }
*/

// addValueAnnotation: function(e){
//                         console.log("adding value annotation");
//                         this.$el.html(this.template(this.model.toJSON()));
//                         return this;
//                         /*var newVA = {};
//                         var targetInfo = {};
//                         newVA["kind"] = "ValueAnnotation";
//                         $("#create-va").children("input").each(function (i, el) {
//                                 console.log('iterating over value annotation inputs');
//                                 if ($(el).val() !== "") {
//                                         if(el.id == "target" || el.id == "targetSchemaType") {
//                                                 targetInfo[el.id] = $(el).val();
//                                         }
//                                         else {
//                                             newVA[el.id] = $(el).val();
//                                         }
//                                 }
//                         });
//                         // valueAnnotations.push(newVA);
//                         this.updateAnnotationsData(targetInfo, newVA);*/
//                 }

               /*render: function () {
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
            },



            updateAnnotationsData: function(targetInfo, annotation) {
                console.log(targetInfo);
                for(var index in annotationsdata)
                {
                        console.log("iterating") 
                        if (annotationsdata[index].target == targetInfo.target &&
                                annotationsdata[index].targetSchemaType == targetInfo.targetSchemaType) 
                        {
                                annotationsdata[index].annotations.push(annotation);
                        }
                }
            }*/  

} (jQuery));