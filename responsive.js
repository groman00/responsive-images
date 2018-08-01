/**
 * jQuery Responsive Images
 * List for screen size change and load configured image source.
 */
(($, window) => {
  const instances = [];
  const timeout = 1000;
  // const timeout = 150;
  const mobileMax = 320;
  const tabletMax = 1024;

  // Create ResponsiveImage instance
  function ResponsiveImage(image, initialWidth) {
    this.$el = $(image);
    this.resize(initialWidth);
  }

  // Determine image size based on screen width.
  ResponsiveImage.prototype.resize = function(screenWidth) {
    let screen = 'mobile';
    if (screenWidth > tabletMax) {
      screen = 'desktop'
    } else if (screenWidth > mobileMax) {
      screen = 'tablet'
    }
    this.setSrc(screen);
  };

  // Set image source for screen size
  ResponsiveImage.prototype.setSrc = function(screen) {
    this.$el.attr('src', this.$el.data(`src-${screen}`));
  };

  // Create ResponsiveImage instances for all .responsive-image elements.
  $('.responsive-image').each(function() {
    instances.push(new ResponsiveImage(this, window.screen.width));
  });

  // Trigger resize for all instances when screen size changes.
  $(window).on('resize', UTILS.debounce(() => {
    instances.forEach(instance => instance.resize(this.screen.width));
  }, timeout));

})(jQuery, window);
