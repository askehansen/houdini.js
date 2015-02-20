// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "houdini",
        defaults = {
        foo: "bar"
    };

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.settings).


            var scope = $(this.element);

            this.bindCheckbox(scope);
            this.bindSelect(scope);
            this.bindRadio(scope);
            
            
            scope.find("input[type=checkbox], select, input[type=radio]").on("change", function() {
    $(this).trigger("houdini");
  }).trigger("houdini");

            
        },
        updateCollection: function (scope, name, value) {
            scope.find("[data-show^='" + name + "']").each(function() {
              var target = $(this);
              var values = target.data("show").split("=")[1].split(",");
              
              if ($.inArray(value, values) >= 0) {
                target.show();
              } else {
                target.hide();
              }
            });
        },
        bindCheckbox: function(scope) {
            scope.find("input[type=checkbox]").on("houdini", function() {
              var name = this.name;
              var targets = scope.find("[data-show='" + name + "']");
              
              if ($(this).is(":checked")) {
                targets.show();
                targets.trigger('hn.show');
              } else {
                targets.hide();
                targets.trigger('hn.hide');
              }
            });
        },
        bindSelect: function(scope) {
            var extend = this;

            scope.find("select").on("houdini", function() {
              var name = this.name;
              var value = this.value;

              extend.updateCollection(scope, name, value);
            });
        },
        bindRadio: function(scope) {
            var scope = $(this.element);
            var extend = this;

            scope.find("input[type=radio]").on("houdini", function() {
              var name = this.name;
              var value = scope.find("input[type=radio][name='" + name + "']:checked").val();

              extend.updateCollection(scope, name, value);
            });
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });

        // chain jQuery functions
        return this;
    };

})( jQuery, window, document );