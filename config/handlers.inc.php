<?php
namespace SchemaCatalog\Config;
use \RS\Orm\Type as OrmType;

/**
* Класс содержит обработчики событий, на которые подписан модуль
*/
class Handlers extends \RS\Event\HandlerAbstract
{
    /**
    * Добавляет подписку на события
    *
    * @return void
    */
    function init()
    {
        $this
            ->bind('orm.init.catalog-dir')
            ->bind('orm.afterload.catalog-dir')
            ->bind('orm.beforewrite.catalog-dir')
            ->bind('orm.geturl.catalog-dir')
            ->bind('initialize')
            ->bind('getroute')  //событие сбора маршрутов модулей
            ->bind('getmenus'); //событие сбора пунктов меню для административной панели
    }

    public static function initialize()
    {
        \Catalog\Model\Orm\Dir::attachClassBehavior(new \SchemaCatalog\Model\Behavior\CatalogDir());
    }

    /**
    * Расширяем объект Каталога
    *
    * @param \Catalog\Model\Orm\Dir $dir - объект каталога
    */
    public static function ormInitCatalogDir(\Catalog\Model\Orm\Dir $dir)
    {
        $dir->getPropertyIterator()->append(array(
            t('Схема'),
                'is_schema' => new OrmType\Integer(array(
                    'description' => t('Включить отображение каталога в виде схемы'),
                    'checkboxView' => array(1,0),
                    'visible' => false,
                )),
                'schema_image' => new OrmType\Image(array(
                    'max_file_size' => 10000000,
                    'allow_file_types' => array('image/pjpeg', 'image/jpeg', 'image/png', 'image/gif'),
                    'description' => t('Изображение'),
                    'rootVisible' => false,
                    'visible' => false,
                )),
                'schema_product' => new OrmType\Varchar(array(
                    'maxLength' => 4000,
                    'description' => t('Товары для схемы'),
                    'visible' => false,
                )),
                'schema_product_arr' => new OrmType\ArrayList(array(
                    'visible' => false,
                )),
                '__schema__' => new OrmType\UserTemplate('%schemacatalog%/form/dir/schema.tpl', null, array(
                    'rootVisible' => false,
                    'getProperties' => function() {
                        return \Catalog\Model\PropertyApi::staticSelectList();
                    }
                )),
        ));
    }

    /**
     * Функция срабатывает до сохранения.
     *
     * @param array $params - массив с параметрами перед записью
     */
    public static function ormBeforeWriteCatalogDir($params)
    {
        $dir = $params['orm'];

        if ($dir->isModified('schema_product_arr')){ //Если изменялись продукты для схемы
            $dir['schema_product'] = serialize($dir['schema_product_arr']);
        }
    }

    /**
    * Действия после загрузки самого объекта
    *
    * @param array $params - массив с параметрами перед записью
    */
    public static function ormAfterloadCatalogDir($params)
    {
         $dir = $params['orm'];

         if (!empty($dir['schema_product'])) {
             $dir['schema_product_arr'] = @unserialize($dir['schema_product']);
         }
    }

    /**
    * Возвращает маршруты данного модуля. Откликается на событие getRoute.
    * @param array $routes - массив с объектами маршрутов
    * @return array of \RS\Router\Route
    */
    public static function getRoute(array $routes)
    {
        //Просмотр категории продукции
        $routes[] = new \RS\Router\Route('schemacatalog-front-listproducts', array(
            '/scatalog/{category}/',
            '/scatalog/'
        ), null, t('Просмотр категории продукции 2'));

        return $routes;
    }

    /**
    * Возвращает пункты меню этого модуля в виде массива
    * @param array $items - массив с пунктами меню
    * @return array
    */
    public static function getMenus($items)
    {
        $items[] = array(
            'title' => 'Пункт модуля SchemaCatalog',
            'alias' => 'schemacatalog-control',
            'link' => '%ADMINPATH%/schemacatalog-control/',
            'parent' => 'modules',
            'sortn' => 40,
            'typelink' => 'link',
        );
        return $items;
    }

}
