<?php
namespace SchemaCatalog\Model\Orm;
use \RS\Orm\Type;

/**
* ORM объект
*/
class Model extends \RS\Orm\OrmObject
{
    protected static
        $table = 'schemacatalog';

    function _init()
    {
        parent::_init()->append(array(
            'title' => new Type\Varchar(array(
                'description' => t('Название'),
            ))
        ));
    }
}
