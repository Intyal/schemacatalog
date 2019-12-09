<?php
namespace SchemaCatalog\Model\Behavior;

class CatalogDir extends \RS\Behavior\BehaviorAbstract{

    /**
    * Возвращает фотографию схемы
    * @return \Photo\Model\Orm\Image
    */
    function getSchemaImage($width = null, $height = null, $type = 'xy')
    {
        $img = $this->owner['schema_image'] ? $this->owner->__schema_image : $this->owner->getImageStub();

        return ($width === null) ? $img : $img->getUrl($width, $height, $type);
        //return var_dump($img);
    }

    /**
     * Возвращает HTML код с продуктами данного каталога
     * @return \SchemaCatalog\Model\SchemaProduct
     */
    function getProductsThisFolder()
    {
        $schema_product = new \SchemaCatalog\Model\SchemaProduct($this->owner['id'], 'schema_product_arr', @(array) $this->owner['schema_product_arr']);
        $schema_product->setTemplate('%schemacatalog%/dialog/view_selected_schema.tpl');
        return $schema_product;
    }

}
