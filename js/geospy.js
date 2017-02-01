

var map;
var locations = new Array();
var cluster = null;

function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: 15.0, lng: 0.0},
         zoom: 3
       });
     }

var prev = $('<div class="icon"><i class="fa fa-caret-left" aria-hidden="true"></i></div>').on("click",function(){
  clearMap();
  $.ajax({
    method: "POST",
    url: "/prev",
    success: function(response){
      var json = $.parseJSON(response);
      showLocations(json);
    }
  });

}).appendTo("#controll");

var data = $('<div class="data"></div>').attr("id","date").appendTo("#controll");

var next = $('<div class="icon"><i class="fa fa-caret-right" aria-hidden="true"></i></div>').on("click",function(){
  clearMap();
  $.ajax({
    method: "POST",
    url: "/next",
    success: function(response){
      var json = $.parseJSON(response);
      showLocations(json);
    }
  });
}).appendTo("#controll");


function clearMap(){
  for(var i = 0; i< locations.length; i++){
    cluster.removeMarker(locations[i].mark);
  }
  locations = new Array();
}

function showLocations(json){
  $("#date").html(json.day);
  var markers = [];
  $(json.geodata).each(function(){
    var that = this;

    $(locations).each(function(){
        if((that.latitude == this["data"].latitude) && (that.longitude == this["data"].longitude)){
         that.latitude += (Math.random()-0.5)/100;
         that.longitude += (Math.random()-0.5)/100;
        // console.log("this:"+this.data.longitude+","+this.data.latitude+" that:"+that.latitude+","+that.longitude);
        }
    });

    var location = {
      lat: that.latitude,
      lng: that.longitude,
    };
    var marker = new google.maps.Marker({
      position : location
    });
    marker.addListener('click',function(){
      var that = this;
      $(locations).each(function(){
        var m = this["mark"];
        var d = this["data"];
        if(m == that){
          $.ajax({
            method: "POST",
            url: "/getdata",
            data: {ip: d.ip},
            success: function(response){
              var infow = new google.maps.InfoWindow({
                content: response,
                maxWidth: 200
              });
              infow.open(map,m);
              google.maps.event.addListener(infow,'domready',function(){
                  console.log("infovindow ready");
                  var selector = "#info"+d.ip;
                  var div = $("#info"+d.ip).appendTo(document.body);
                  div.css({
                    height: "300px"
                  });
                  console.log(selector);
              });
            }
          });
        }
      });
    });
    markers.push(marker);
    locations.push({
        mark: marker,
        data: that
      });
  });
  if(cluster == null){
    cluster = new MarkerClusterer(map,markers,{"gridSize":50,"averageCenter":true});
  }else{
    cluster.addMarkers(markers);
  }
}

$(document).ready(function(){
    $.ajax({
      method: "POST",
      url: "/init",
      success: function(response){
        var json = $.parseJSON(response);
        showLocations(json);
      }
    });
});
