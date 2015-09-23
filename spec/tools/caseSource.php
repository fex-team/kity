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

    public $empty = false;

    public $case_id;

    function __construct(  $name = ''  )
    {
        $this->projroot = Config::$projroot;
        $this->srcPath = Config::$projroot.Config::$src_PATH;
        $this->testPath = Config::$projroot.Config::$test_PATH;
        $this->name = $name;
        $this->case_id = 'id_case_' . join( '_' , explode( '.' , $name ) );
    }
    public function print_js(  $cov)
    {

        if($cov){
            $basePath =  '../../spec/jscoverage';
        }
        else{
            $basePath =  '../../src';
        }
        print "<script type='text/javascript' src='../../dev-lib/sea.js' ></script>\n";
        print "<script>seajs.config( {
            base:'".$basePath."'
        } );
        </script>\n";
        print "<script type='text/javascript' src='../../dev-lib/exports.js' ></script>\n";

        print "<script type='text/javascript' src='../exports.js' ></script>\n";
        /*load ua*/
        print "<script type='text/javascript' src='./js/UserAction.js' ></script>\n";
        /* load case source*/
//        $importurl = "../import.js";
//        $importurl = "./import.php";
//        print "<script type='text/javascript' src='".$importurl."' ></script>\n";

        /* load case and case dependents*/
        $ps = explode( '/' , $this->name );
        /*load helper*/
        foreach(Config::$helperFiles as $f){
            if ( file_exists( $this->testPath .  $f  ) ) {
                print '<script type="text/javascript" src="' . $this->testPath . $f  . '"></script>' . "\n";
            }
        }
//        $testFilePath = dirname( __FILE__ ) . '/../' . $this->name . '.js';
//        if(file_exists($testFilePath)){
//            $caseContent = file_get_contents($testFilePath, 'r' );
//            print '<script>define("case_start", function ( require ) {'. $caseContent .'});</script>';
//            print '<script>seajs.use( "case_start" )</script>';
//        }
//       
        $ts = time();
        print '<script type="text/javascript" src="../' . $this->name . '.js?_='.$ts.'"></script>' . "\n";

    }
    public function match( $matcher )
    {
        if ( $matcher == '*' )
            return true;
        $len = strlen( $matcher );

        /**
         * 处理多选分支，有一个成功则成功，filter后面参数使用|切割
         * @var unknown_type
         */
        $ms = explode( ',' , $matcher );
        if ( sizeof( $ms ) > 1 ) {
            foreach ( $ms as $matcher1 ) {
                if ( $this->match( $matcher1 ) )
                    return true;
            }
            return false;
        }

        /**
         * 处理反向选择分支
         */
        if ( substr( $matcher , 0 , 1 ) == '!' ) {
            $m = substr( $matcher , 1 );
            if ( substr( $this->name , 0 , strlen( $m ) ) == $m )
                return false;
            return true;
        }

        if ( $len > strlen( $this->name ) ) {
            return false;
        }
        return substr( $this->name , 0 , $len ) == $matcher;
    }
    public static function listcase( $matcher = "*" ,$cov)
    {

        require_once 'fileHelper.php';
        /*get files both in src path and test path*/
        $caselist = getSameFile(Config::$projroot.Config::$src_PATH , Config::$projroot.Config::$test_PATH , '' );
        sort($caselist,SORT_STRING);
        foreach ( $caselist as $caseitem ) {
            /*remove '.js' */
            $name = substr( $caseitem , 0 , -3 );
            $c = new Kiss(  $name );
            if ( $c->empty )
                continue;
            if ( $c->match( $matcher ) ) {
                $newName = explode( '\\.' , $name );
                $newName = $newName[ count( $newName ) - 1 ];

                if($cov){
                    $covMsg = "&cov=true";
                }else{
                    $covMsg="";
                }
                print( "<a href=\"run.php?case=$name".$covMsg."\" id=\"$c->case_id\"  target=\"_blank\" title=\"$name\" onclick=\"run('$name');return false;\">". $newName . "</a>" );
            }
        }
    }
    public static function listSrcOnly( $print = true  )
    {
        $srcpath = Config::$projroot.Config::$src_PATH;
        $testpath = Config::$projroot.Config::$test_PATH;
        require_once 'fileHelper.php';
        $caselist = getSameFile( $srcpath , $testpath , '' );
        $srclist = getSrcOnlyFile( $srcpath , $testpath , '' );
        $srcList = array();
        foreach ( $srclist as $case ) {
            if ( in_array( $case , $caselist ) )
                continue;
            $name = str_replace( '/' , '.' , substr( $case , 0 , -3 ) );
            $tag = "<a  title=\"$name\">" . ( strlen( $name ) > 20 ? substr( $name , 6 )
                    : $name ) . "</a>";
            array_push( $srcList , $tag );
            if ( $print )
                echo $tag;
        }
        return $srcList;
    }
}