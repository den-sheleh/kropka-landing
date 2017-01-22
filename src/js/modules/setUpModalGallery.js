var setUpModalGallery = (function() {

  var setUpModalGallery = {
    init: function() {
      $(".js-modalgallery").fancybox({
        padding: 0,
        maxHeight: 500,
        overlayOpacity: 0.1,
        closeBtn: false,
        // arrows: false,
        helpers: {
          overlay: {
            css: {
              'background': 'rgba(0, 0, 0, 0.9)'
            }
          }
        }
      });
    }
  };

  return setUpModalGallery;
}());

$(window).bind("load resize", function() {
  var height = $('.gallery__img-wrap').width();
  $('.gallery__img-wrap').height(height);
});
