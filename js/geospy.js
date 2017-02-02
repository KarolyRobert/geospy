

var map;
var locations = new Array();
var cluster = null;

function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: 15.0, lng: 0.0},
         zoom: 3,
         minZoom: 3
       });
     }
var first = $('<div class="icon"><i class="fa fa-angle-double-left" aria-hidden="true"></i></div>').on("click",function(){
  clearMap();
  $.ajax({
    method: "POST",
    url: "/first",
    success: function(response){
      var json = $.parseJSON(response);
      showLocations(json);
    }
  });;
}).appendTo("#controll");
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

var last = $('<div class="icon"><i class="fa fa-angle-double-right" aria-hidden="true"></i></div>').on("click",function(){
  clearMap();
  $.ajax({
    method: "POST",
    url: "/last",
    success: function(response){
      var json = $.parseJSON(response);
      showLocations(json);
    }
  });;
}).appendTo("#controll");

var all = $('<div class="icon"><i class="fa fa-globe" aria-hidden="true"></i></div>').on("click",function(){
  clearMap();
  $.ajax({
    method: "POST",
    url: "/all",
    success: function(response){
      var json = $.parseJSON(response);
      showLocations(json);
    }
  });;
}).appendTo("#controll");


function clearMap(){
  //cluster.removeMarkers(cluster.getMarkers());
  $(locations).each(function(){
    cluster.removeMarker(this["mark"],true);
  });
  cluster.repaint();
  /*
  for(var i = 0; i< locations.length; i++){
    cluster.removeMarker(locations[i].mark);
  }*/
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
      url: "/all",
      success: function(response){
        var json = $.parseJSON(response);
        showLocations(json);
      }
    });
});
