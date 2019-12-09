{addcss file="%schemacatalog%/schema_dir.css"}
{addjs file="%schemacatalog%/schema_dir.js"}

<div class="schema-dir" id="schemaDir" data-urls='{ "addPropertyUrl": "{adminUrl do="addSchemaDirPropery"}" }'>
    <div class="schema-switcher">
        <input type="checkbox" name="is_schema" class="is-schema" value="1" {if $elem.is_schema}checked{/if} id="is-schema">
        <label for="is-schema">{t}Включить отображение каталога в виде схемы{/t}</label>
        <div class="fieldhelp">
            {t}Включение опции означает, что при просмотре данной категории будут отображены товары, соответствующие указанным критериям. Выбранные товары могут находиться в том числе и в других категориях, таким образом вы сможете создать "виртуальную" категорию с нужной выборкой товаров, уникальными meta-тегами и URL-адресом.{/t}
        </div>
    </div>
    <div class="schema-fields" {if !$elem.is_schema}style="display:none"{/if}>
        <table class="otable">
            <tr>
                <td class="otitle">
                    {t}Изображение{/t}
                </td>
                <td>
                    {include file=$elem.__schema_image->getRenderTemplate() field=$elem.__schema_image}
                </td>
            </tr>
            <tr>
                <td class="otitle" style="vertical-align:top; line-height:30px;">
                    {t}Товары{/t}
                </td>
                <td>
                    {$elem->getProductsThisFolder()->getHtml()}
                </td>
            </tr>
            <tr>
                <td class="otitle" style="vertical-align:top; line-height:30px;">
                    {t}Распределение товаров по схеме{/t}
                </td>
                <td>
                    <div id="schema_list">
                        {if $elem.schema_image}<img id="imageToSchema" src="{$elem->getSchemaImage(1000, 1000, 'xy')}">{/if}
                    </div>
                </td>
            </tr>
            <tr>
                <td class="otitle" style="vertical-align:top; line-height:30px;">
                    Отладка
                </td>
                <td>
                    {var_dump($elem.schema_product)}
                    <div id="codetest"></div>
                </td>
            </tr>
        </table>
    </div>
</div>
