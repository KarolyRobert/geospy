

var map;
var locations = new Array();

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
    locations[i].mark.setMap(null);
  }
  locations = new Array();
}

function showLocations(json){
  $("#date").html(json.day);
  $(json.geodata).each(function(){
    var that = this;
    var location = {
      lat: this.latitude,
      lng: this.longitude,
    };
    var marker = new google.maps.Marker({
      position : location,
      map : map
    });
    locations.push({
        mark: marker,
        data: this
      });
  });
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
