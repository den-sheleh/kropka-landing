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
