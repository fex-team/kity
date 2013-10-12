<?php
/**
 * Created by JetBrains PhpStorm.
 * User: dongyancen
 * Date: 13-10-10
 * Time: 上午1:48
 * To change this template use File | Settings | File Templates.
 */
$import = 'import.js';
function importSrc(){
    global $import;
    $source = '';
    require_once 'config.php';
    if(file_exists(Config::$projroot.Config::$test_PATH.$import)){
        $cnt = file_get_contents(Config::$projroot.Config::$test_PATH.$import);
    }

    if($cnt == ''){
        if(Config::$DEBUG)
            print "fail read file : ".Config::$test_PATH.$import;
        return '';
    }

    $is = array();
    //正则匹配，提取所有(///import xxx;)中的xxx
    preg_match_all('/\/\/\/import\s+([^;]+);?/ies', $cnt, $is, PREG_PATTERN_ORDER);
    foreach($is[1] as $i) {

        $path = $i.'.js';

                if(file_exists(Config::$projroot.Config::$src_PATH.$path)){
                    $source.= file_get_contents(Config::$projroot.Config::$src_PATH.$path);
                    $source.="\n";//读取文件内容必须加个回车
                }
        }

    return $source;
}
echo importSrc();