
// 浏览器定位
var map = new BMap.Map("bd_map");
// var point = new BMap.Point(116.331398,39.897445);
// console.log(map)
map.setMapStyle({
  styleJson:[
          {
                    "featureType": "highway",
                    "elementType": "labels",
                    "stylers": {
                              "visibility": "off"
                    }
          },
          {
                    "featureType": "arterial",
                    "elementType": "all",
                    "stylers": {}
          },
          {
                    "featureType": "poilabel",
                    "elementType": "all",
                    "stylers": {
                              "visibility": "off"
                    }
          },
          {
                    "featureType": "subway",
                    "elementType": "all",
                    "stylers": {
                              "visibility": "off"
                    }
          },
          {
                    "featureType": "local",
                    "elementType": "all",
                    "stylers": {
                              "visibility": "off"
                    }
          },
          {
                    "featureType": "highway",
                    "elementType": "geometry.stroke",
                    "stylers": {
                              "color": "#c7bdbaff",
                              "visibility": "on"
                    }
          },
          {
                    "featureType": "highway",
                    "elementType": "geometry.fill",
                    "stylers": {
                              "color": "#ffffffff"
                    }
          },
          {
                    "featureType": "arterial",
                    "elementType": "all",
                    "stylers": {
                              "visibility": "off"
                    }
          },
          {
                    "featureType": "land",
                    "elementType": "geometry.fill",
                    "stylers": {
                              "color": "#f9f4ed"
                    }
          },
          {
                    "featureType": "local",
                    "elementType": "geometry.fill",
                    "stylers": {
                              "color": "#990c19"
                    }
          },
          {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": {
                              "color": "#f4efedff"
                    }
          },
          {
                    "featureType": "district",
                    "elementType": "labels.text.stroke",
                    "stylers": {
                              "color": "#ea9999ff",
                              "weight": "1.6",
                              "visibility": "on"
                    }
          },
          {
                    "featureType": "district",
                    "elementType": "labels.text.fill",
                    "stylers": {
                              "color": "#ffffff",
                              "visibility": "on"
                    }
          },
          {
                    "featureType": "green",
                    "elementType": "all",
                    "stylers": {
                              "visibility": "off"
                    }
          },
          {
                    "featureType": "building",
                    "elementType": "geometry.stroke",
                    "stylers": {
                              "color": "#4c1130ff",
                              "visibility": "on"
                    }
          }
] 
});

var geolocation = new BMap.Geolocation();
var lon,lat;

