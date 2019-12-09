<?php
namespace SchemaCatalog\Model;

/**
* Класс предоставляет возможность управления товарами на схеме
*/
class SchemaProduct
{
    protected
        $dirid,
        $fieldname,
        $data,
        $template = '%shemacatalog%/dialog/view_selected_shema.tpl';

    /**
    * КОнструктор класса
    *
    * @param string $dirid - переменная с ID выбранного каталога
    * @param string $fieldname - имя переменной в которой будут записаны выбранные товары
    * @param array $data - массив с текущими выбранными позициями
    * @return ShemaProduct
    */
    function __construct($dirid = null, $fieldname, $data = null)
    {
        $this->fieldname = $fieldname;
        $this->dirid = $dirid;
        if ($data) {
            $this->setData($data);
        }
    }

    /**
    * Устанавливает текущие выбранные позиции папок и товаров
    *
    * @param array $data
    */
    function setData($data)
    {
        $this->data = $data;
    }

    function mergeData($data)
    {
        $this->data = array_merge($this->data, $data);
    }

    function setTemplate($template)
    {
        $this->template = $template;
    }

    /**
    * Возвращает HTML с товарами
    * @return string
    */
    function getHtml()
    {
       $extdata = array();

       // Загружаем продукты выбранной категории
       $productapi = new \Catalog\Model\Api();
       $list = $productapi
            ->setFilter('maindir', $this->dirid)
            ->loadAssocList('id');

        foreach($list as $id => $product) {
            $data['prod'][] = $id;
        }

        if (!empty($this->data) && !empty($data)) {
            $this->mergeData($data);
        } else {
            $this->setData($data);
        }

        //Загружаем недостающие данные для отображения продуктов
        if (!empty($this->data['prod']))
        {
            $productapi = new \Catalog\Model\Api();
            $product_dirs = $productapi->getProductsDirs($this->data['prod'], true);
            $list = $productapi
                ->setFilter('id', $this->data['prod'], 'in')
                ->loadAssocList('id');

            $extdata_products = array();
            foreach($list as $id => $product) {
                $extdata['prod'][$id] = array(
                    'obj' => $product,
                    'dirs' => isset($product_dirs[$id]) ? ','.implode(',', $product_dirs[$id]).',' : '' //Раскладываем id в строку (тех.данные - необходимо для JavaScript)
                );
            }
        }

        $view = new \RS\View\Engine();
        $view->assign( \RS\Module\Item::getResourceFolders($this)  )
             ->assign(array(
                'fieldName' => $this->fieldname,
                'productArr' => $this->data,
                'extdata' => $extdata
             ));

        return $view->fetch($this->template);
    }
}
