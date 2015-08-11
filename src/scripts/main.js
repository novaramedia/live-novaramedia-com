var animationLength, l, layout, $mainContent;

l = function(data) {
  return console.log(data);
};

animationLength = 200;
$mainContent = $('#main-content');
var $jsLive = $('.js-live');
var $jsOffline = $('.js-offline')

var liveStatus = {
  live: function() {
    $jsLive.show();
    $('.js-offline').hide();
  },
  offline: function() {
    $('.js-offline').show();
    $jsLive.hide();
  }
};

var latestPosts = {
  visible: false,
  $container: $('#latest'),
  $latestFm: $('#latest-fm'),
  $latestTv: $('#latest-tv'),
  $latestWire: $('#latest-wire'),
  initFmTv: function() {
    var _this = this;

    $.getJSON('http://novaramedia.com/api/fm/?callback=?', null, function(data) {
      var posts_insert = [];

      $.each(data.posts, function(i, item) {
        posts_insert.push('<a target="_blank" href="' + item.permalink + '"><li class="latest-post"><img src="' + item.thumb_medium + '"/><h3>'+ item.title + '</h3></li></a>');
      });
      $(posts_insert.join('')).prependTo(_this.$latestFm);

      if (!_this.visible) {
        _this.$container.show();
      }
    });

    $.getJSON('http://novaramedia.com/api/tv/?callback=?', null, function(data) {
      var posts_insert = [];

      $.each(data.posts, function(i, item) {
        posts_insert.push('<a target="_blank" href="' + item.permalink + '"><li class="latest-post"><img src="' + item.thumb_medium + '"/><h3>'+ item.title + '</h3></li></a>');
      });
      $(posts_insert.join('')).prependTo(_this.$latestTv);

      if (!_this.visible) {
        _this.$container.show();
      }
    });

  },
  initWire: function() {
    var _this = this;

    $.getJSON('http://wire.novaramedia.com/api/all/?callback=?', null, function(data) {
      var posts_insert = [];

      $.each(data.posts, function(i, item) {
        posts_insert.push('<a target="_blank" href="' + item.permalink + '"><li class="latest-post"><img src="' + item.thumb_medium + '"/><h3>'+ item.title + '</h3><h4>by '+ item.author + '</h4></li></a>');
      });
      $(posts_insert.join('')).prependTo(_this.$latestWire);

      if (!_this.visible) {
        _this.$container.show();
      }
    });

  },
  init: function() {
    this.initFmTv();
    this.initWire();
  }
}

jQuery(document).ready(function($) {

  // THIS IS JUST FOR TESTING
      liveStatus.live();
/*
  $.getScript('http://tools.novaramedia.com/tool/novara_live/schedule.min.js', function() {
    if (isLive()) {
      liveStatus.live();
    }

    setInterval((function() {
      if (isLive()) {
        liveStatus.live();
      } else {
        liveStatus.offline();
      }
    }), 15000);
  });
*/

  latestPosts.init();

  layout();
  $(window).resize(function() {
    return layout();
  });

  $('.js-toggle-drawer').click(function() {
    return $('#drawer-main').slideToggle(animationLength);
  });

  $('.masonry').each(function() {
    var t;
    t = $(this);
    return $(this).imagesLoaded(function() {
      return t.masonry();
    });
  });
});

layout = function() {
  var footerHeight, headerHeight, windowHeight;
  windowHeight = $(window).height();
  headerHeight = $('#header').outerHeight(true);
  footerHeight = $('#footer').outerHeight(true);
  return $mainContent.css({
    'min-height': (windowHeight - headerHeight - footerHeight) + 'px'
  });

};