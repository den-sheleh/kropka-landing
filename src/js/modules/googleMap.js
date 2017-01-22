function initMap() {
  var position = { lat: 53.9062185, lng: 27.5570181 }

  var map = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 17,
    draggable: false,
    scrollwheel: false,
    center: position,
    language: 'by',
    mapTypeControl: true
  });

  console.log(map)

  var marker = new google.maps.Marker({
    position: position,
    map: map,
    title: "KROPKA. Магазин подарков и сувениров"
  });
};
