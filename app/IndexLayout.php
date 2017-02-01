<?php

class IndexLayout {

    public static function home() {
        include 'views/main_view.php';
    }

    public static function init() {
      try{
         $result = DB::query("select min(date) from hackers_log");
         $time = strtotime($result[0]["min(date)"]);
         $sdate = date("Y-m-d 00:00:00",$time);
         $_SESSION['date'] = $sdate;
         $time = strtotime($sdate);
         $tomorrow = mktime(0,0,0,date("m",$time),date("d",$time)+1,date("Y",$time));
         $edate =   date("Y-m-d 00:00:00",$tomorrow);
         $res = IndexLayout::getInterval($sdate,$edate);
         echo "{\"day\":\"".date("Y-m-d",strtotime($sdate))."\",\"geodata\":".$res."}";
        }catch (Exception $ex) {
            fb($ex,__CLASS__.'::'.__FUNCTION__);
        }
    }
    public static function next(){
        $d = $_SESSION['date'];
        fb($d);
        $time = strtotime($d)+86400;
        $ntime = $time+86400;
        $sdate = date("Y-m-d 00:00:00",$time);
        $_SESSION['date'] = $sdate;
        $edate = date("Y-m-d 00:00:00",$ntime);
        $res = IndexLayout::getInterval($sdate,$edate);
        echo "{\"day\":\"".date("Y-m-d",strtotime($sdate))."\",\"geodata\":".$res."}";
    }
    public static function prev(){
        $d = $_SESSION['date'];
        $ntime = strtotime($d);
        $time = $ntime-86400;
        $sdate = date("Y-m-d 00:00:00",$time);
        $_SESSION['date'] = $sdate;
        $edate = date("Y-m-d 00:00:00",$ntime);
        $res = IndexLayout::getInterval($sdate,$edate);
        echo "{\"day\":\"".date("Y-m-d",strtotime($sdate))."\",\"geodata\":".$res."}";
    }

    public static function getIPData(){
        $_SESSION["ip"] = $_POST["ip"];
        include "views/ipinfo.php";
    }

    private static function getInterval($s,$e){
      try{
        $result = DB::query("select distinct hip.ip,hip.geodata as geodata from hackers_ip as hip inner join hackers_log as hl where hip.ip = hl.ip and hl.date > \"".$s."\" and hl.date < \"".$e."\"");
        $response = "[";
        $first = true;
        foreach($result as $row){
          if($first){
            $first = false;
          }else{
            $response .= ",";
          }
          $response .= $row["geodata"];
        }
        $response .= "]";
        return $response;
      }catch (Exception $ex){
        fb($ex,__CLASS__.'::'.__FUNCTION__);
      }
    }

}
