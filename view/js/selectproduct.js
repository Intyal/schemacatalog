/**
* JQuery plug-in добавления товаров на схему.
*/
(function($){
    $.fn.schemaProduct = function( method )
    {
        var make = function()
        {
            var $product_list = $( "#product_list" ), // DIV со списком товаров
                $schema_list = $( "#schema_list" ); // DIV с изображением

            // Перемещение продуктов
            $( ".schema-label-table", $product_list ).draggable( {
                //cancel: "a.ui-icon", // нажатие значка не приведет к перетаскиванию
                //revert: "invalid", // элемент вернется в исходное положение, если не был перемещен на схему
                containment: "parent",
                scroll: false,
                //helper: "clone",
                cursor: "move",
                stop: function( event, ui ) {
                    // Убираем лишние свойства
                    $( this ).css( {"width":"", "height":"", "right":"" , "bottom":""} );
                    // Переписываем значения left и top
                    var $prod = $product_list.find( "li[val='" + $( this ).attr( "val" ) + "']" );

                    $prod.find( ".prop_left" ).val( parseInt( $( this ).css( "left" ) ) );
                    $prod.find( ".prop_top" ).val( parseInt( $( this ).css( "top" ) ) );



                }
            } );

            // Добавление/Удаление точки на схему переключателем
            $( ".visible" ).change( function( event ) {
                var $id =$( this ).parents( "li" ).attr( "val" ),
                    $product = $( "div[val='" + $id + "']" );

                if ( $( this ).prop( "checked" ) ) {
                    addPointToSchema( $product );
                } else {
                    delPointToSchema( $product );
                }

                return false;
            } );

            // Перенос отмеченных продуктов на схему
            $( ".visible" ).each( function( i, elem ) {
                var $id = $( this ).parents("li").attr("val"),
                    $product = $( "div[val='" + $id + "']" );

            	if ( $( this ).prop( "checked" ) ) {
            		addPointToSchema( $product );
            	}
            } );

            // Функция добавления продукта на схему
            function addPointToSchema( $item ) {
                $item.fadeOut( function() {
                    var $prod = $product_list.find( "li[val='" + $item.attr( "val" ) + "']" ),
                        $left = $prod.find( ".prop_left" ).val(),
                        $top = $prod.find( ".prop_top" ).val();

                    $item
                        .css( {"left": $left + "px", "top": $top + "px"} )
                        .removeClass( "schema-label-off" )
                        .addClass( "schema-label-on" )
                        .appendTo( $schema_list )
                        .fadeIn();
                } );
            }

            // Функция удаления продукта со схемы
            function delPointToSchema( $item ) {
                $item.fadeOut( function() {
                    $item
                        .css( {"left":"", "top":""} )
                        .removeClass( "schema-label-on" )
                        .addClass( "schema-label-off" )
                        .appendTo( $product_list.find( "li[val='" + $item.attr("val") + "']" ) )
                        .fadeIn();
                } );
            }

            // Развертывание доп. информации метки
            $( ".schema-label-table" ).on( "click", function( event ) {
                var $item = $( this ).find( ".schema-label-display" );
                var $item_w = $( this ).find( ".schema-label-win" );

                if ( $item.is( ".schema-label-display_off" ) ) {
                    $item.fadeIn(250).removeClass( "schema-label-display_off" );
                    $item_w.animate({borderRightWidth: "2px", width: "22px"}, 250);
                } else {
                    $item.fadeOut(250).addClass( "schema-label-display_off" );
                    $item_w.animate({borderRightWidth: "8px", width: "30px"}, 250);
                }

                return false;
            } );

            // Меняем имя у метки при вводе в поле
            $( "li.product .name" ).on( "keyup", function( event ) {
                var $name = $( this ).val(),
                    $id = $( this ).parents( "li" ).attr( "val" ),
                    $label = $( ".schema-label-table[val='" + $id + "'] .schema-label-name" );

                $label.html( $name );
            } )
        };

        return this.each( make );
    }
})(jQuery);
