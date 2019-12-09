$( function() {

var
    $product_list = $( "#product_list" ),
    $schema_list = $( "#schema_list" );

/*
// Перемещение продуктов
$( "div.product_point", $product_list ).draggable({
    cancel: "a.ui-icon", // нажатие значка не приведет к перетаскиванию
    revert: "invalid", // элемент вернется в исходное положение, если не был перемещен на схему
    containment: "document",
    scroll: false,
    //helper: "clone",
    cursor: "move"
});
*/
/*
// Схема, принимает продукты
$schema_list.droppable({
    accept: ".product_point",
    classes: {
        "ui-droppable-active": "ui-state-highlight"
    },
    drop: function( event, ui ) {
        if( $( ui.draggable ).hasClass( "schema_off" ) ){
            addPointToSchema( ui.draggable );
        }
    }
});
*/
/*
// Продукты, примает продукты обратно при удалении
$product_list.droppable({
    accept: ".product_point.schema_on",
    classes: {
        "ui-droppable-active": "custom-state-active"
    },
    drop: function( event, ui ) {
        delPointToSchema( ui.draggable );
    }
});
*/

// Добавление/Удаление точки на схему переключателем
$( ".visible" ).change( function( event ) {
    var $item = $( this ),
        $id = $item.parents("li").attr("val"),
        $product = $( "div[val='" + $id + "']" );

    console.log($product.html());

    if ( $item.prop('checked') ) {
        addPointToSchema( $product );
    } else {
        delPointToSchema( $product );
    }

    return false;
});

//
$( ".visible" ).each( function( i, elem ) {

    var $item = $( this ),
        $id = $item.parents("li").attr("val"),
        $product = $( "div[val='" + $id + "']" );

    //console.log($product.html());

	if ( $item.prop( "checked" ) ) {
		addPointToSchema( $product );
	}
});

// Функция добавления продукта на схему
//var del_schema_icon = "<a href='#' title='del' class='ui-icon ui-icon-circle-close'>del</a>";
function addPointToSchema( $item ) {
    $item.fadeOut(function() {
        var $list = $( $schema_list );
        //$item.find( "a.ui-icon-circle-arrow-s" ).remove();
        $item
            .css("left","")
            .css("top","")
            .removeClass( "schema_off" )
            .addClass( "schema_on" )
            //.append( del_schema_icon )
            .appendTo( $list )
            .fadeIn();
    });
}

// Функция удаления продукта со схемы
//var add_schema_icon = "<a href='#' title='add' class='ui-icon ui-icon-circle-arrow-s'>add</a>";
function delPointToSchema( $item ) {
    $item.fadeOut(function() {
        $item
            .css("left","")
            .css("top","")
            .removeClass( "schema_on" )
            .addClass( "schema_off" )
            //.find( "a.ui-icon-circle-close" )
            //.remove()
            //.end()
            //.append( add_schema_icon )
            .appendTo( $product_list.find( "li[val='" + $item.attr("val") + "']" ) )
            .fadeIn();
    });
}

// Назначение действий кнопкам Добавления/Удаления
/*
$( "ul#product_list > li > div.product_point" ).on( "click", function( event ) {
    var $item = $( this ),
        $target = $( event.target );

    //console.log($item.html());

    if ( $target.is( "a.ui-icon-circle-arrow-s" ) ) {
        addPointToSchema( $item );
    } else if ( $target.is( "a.ui-icon-circle-close" ) ) {
        delPointToSchema( $item );
    }

    return false;
});
*/

} );
