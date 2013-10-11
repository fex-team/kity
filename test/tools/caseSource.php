<?php
/**
 * Created by JetBrains PhpStorm.
 * User: dongyancen
 * Date: 13-10-10
 * Time: 上午1:20
 * To change this template use File | Settings | File Templates.
 */
require_once 'config.php';
class Kiss
{
    public $projroot ;

    public $name;

    public $srcPath;

    public $testPath;

    function __construct(  $name = ''  )
    {
        $this->projroot = Config::$projroot;
        $this->srcPath = Config::$projroot.Config::$src_PATH;
        $this->testPath = Config::$projroot.Config::$test_PATH;
        $this->name = $name;
    }
    public function print_js(  )
    {

        /* load case source*/
        $importurl = "./import.php";
        print "<script type='text/javascript' src='".$importurl."' ></script>\n";

        /* load case and case dependents*/
        $ps = explode( '/' , $this->name );
        //读取helper
        foreach(Config::$helperFiles as $f){
            array_pop( $ps );
            array_push( $ps , $f );
            if ( file_exists( $this->testPath . implode( '/' , $ps ) ) ) {
                print '<script type="text/javascript" src="' . $this->testPath .  implode( '/' , $ps ) . '"></script>' . "\n";
            }
        }
        print '<script type="text/javascript" src="' . $this->testPath. $this->name . '.js"></script>' . "\n";
    }
}
$a = new Kiss();
$a->print_js(  );