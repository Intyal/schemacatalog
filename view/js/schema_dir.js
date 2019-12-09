/**
* Plugin, активирующий вкладку категория как схема
*/
(function($){
    $.fn.schemaDir = function(method) {
        var defaults = {
            isSchemaSwitcher: '.is-schema',
            fields: '.schema-fields'
        },
        args = arguments;

        return this.each(function() {
            var $this = $(this),
                data = $this.data('schemaDir');

            var methods = {
                init: function(initoptions) {
                    if (data) return;
                    data = {}; $this.data('schemaDir', data);
                    data.options = $.extend({}, defaults, initoptions);

                    $this
                        .on('change', data.options.isSchemaSwitcher, toggleSchema);
                }
            }

            //private
            var
                toggleSchema = function() {
                    $(data.options.fields).toggle($(this).is(':checked'));
                };

            if ( methods[method] ) {
                methods[ method ].apply( this, Array.prototype.slice.call( args, 1 ));
            } else if ( typeof method === 'object' || ! method ) {
                return methods.init.apply( this, args );
            }
        });
    }
})(jQuery);

$.contentReady(function() {
    $('#schemaDir').schemaDir();
});
