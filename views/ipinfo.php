
<div class="info" id="info<?php echo $_SESSION["ip"]?>">
  <div class="info_row">Támadó IP-cím: <b><?php echo $_SESSION["ip"]?></b></div>
  <div class="info_row">Első támadás: <b><?php
        $result = DB::query("select min(date) from hackers_log where ip =\"".$_SESSION["ip"]."\"");
        echo $result[0]["min(date)"];
  ?></b></div>
  <div class="info_row">Összes támadás: <b><?php
        $result = DB::query("select count(ip) from hackers_log where ip =\"".$_SESSION["ip"]."\"");
        echo "".$result[0]["count(ip)"]."db";
   ?>
  </b></div>
  <div>Használt nevek:<b>
      <?php
        $result = DB::query("select distinct user from hackers_log where ip =\"".$_SESSION["ip"]."\" and (type =\"Invalid\" or type = \"Root\");");
        $names = "";
        $first = true;
        foreach ($result as $key) {
            if($first){
              $first = false;
            }else{
              $names .=", ";
            }
            $names .= $key["user"];
        }
        echo $names;
       ?>

  </b></div>
</div>
