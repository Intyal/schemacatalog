{addcss file="%schemacatalog%/selectproduct.css" basepath="root"}
{addjs file="%schemacatalog%/selectproduct.js" basepath="root"}

<div class="schema-product-group-container" data-urls='{ "getChild": "{adminUrl mod_controller="catalog-dialog" do="getChildCategory"}", "getProducts": "{adminUrl mod_controller="catalog-dialog" do="getProducts"}", "getDialog": "{adminUrl mod_controller="catalog-dialog" do=false}" }'>
        <div class="selected-container ui-widget ui-helper-clearfix">
            <ul id="product_list" class="product-block ui-helper-reset ui-helper-clearfix">
                {foreach from=$productArr.prod item=item}
                    <li class="product" val="{$item}">
                        <input class="prop_left" type="hidden" name="{$fieldName}[prop][x][{$item}]" value="{$productArr.prop.x.$item}">
                        <input class="prop_top" type="hidden" name="{$fieldName}[prop][y][{$item}]" value="{$productArr.prop.y.$item}">
                        <input type="hidden" name="{$fieldName}[prop][w][{$item}]" value="20">
                        <input type="hidden" name="{$fieldName}[prop][h][{$item}]" value="20">
                        <span class="toggle-switch margin-span">
                            <input class="visible" id="{$fieldName}[prop][v][{$item}]" name="{$fieldName}[prop][v][{$item}]" type="checkbox" hidden="hidden" {if $productArr.prop.v.$item}checked{/if} value="1">
                            <label for="{$fieldName}[prop][v][{$item}]" class="ts-helper"></label>
                        </span>
                        <span class="margin-span">
                            <input class="name" name="{$fieldName}[prop][n][{$item}]" value="{$productArr.prop.n.$item}" maxlength="30" size="1" type="text">
                        </span>
                        <span class="product_image cell-image" data-preview-url="{$extdata.prod.$item.obj->getMainImage()->getUrl(200, 200)}">
                            <img src="{$extdata.prod.$item.obj->getMainImage()->getUrl(30, 30)}" alt=""/>
                        </span>
                        <span class="barcode">{$extdata.prod.$item.obj.barcode}</span>
                        <span class="value">{$extdata.prod.$item.obj.title}</span>
                        <div class="schema-label-table schema-label-off schema-label-opacity" val="{$item}">
                            <div class="row">
                                <div class="cell schema-label-win"></div>
                                <div class="cell schema-label-display schema-label-name">{$productArr.prop.n.$item}</div>
                                <div class="cell schema-label-display schema-label-barcode">{$extdata.prod.$item.obj.barcode}</div>
                            </div>
                        </div>
                    </li>
                {/foreach}
            </ul>
        </div>
</div>

<script>
    $.allReady(function() {
        $('.schema-product-group-container').schemaProduct();
    });
</script>
