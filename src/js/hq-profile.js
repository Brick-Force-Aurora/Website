// Brick HQ player profile: tabs of the maps / battle stats boxes and the carousels (as on the original page)
// runs right away (the script sits below the content): the site's own ready handlers throw before ours could run
(function () {
  function verticalTab(count) {
    for (var c = 1; c <= 2; c++) {
      if (c == count) {
        $('.tabs .view-v-' + c).fadeIn('slow');
        $('.tabs .tabs-vertical .tab-' + c).addClass('selected');
      } else {
        $('.tabs .view-v-' + c).fadeOut('fast');
        $('.tabs .tabs-vertical .tab-' + c).removeClass('selected');
      }
    }
  }
  function horizontalTab(count) {
    var total = $('.tabs .tabs-horizontal li').length;
    for (var c = 1; c <= total; c++) {
      if (c == count) {
        $('.tabs .view-h-' + c).fadeIn('slow');
        $('.tabs .tabs-horizontal .tab-' + c).addClass('selected');
      } else {
        $('.tabs .view-h-' + c).fadeOut('fast');
        $('.tabs .tabs-horizontal .tab-' + c).removeClass('selected');
      }
    }
  }
  $('.tabs .tabs-vertical li').click(function () { verticalTab($(this).index() + 1); });
  $('.tabs .tabs-horizontal li').click(function () { horizontalTab($(this).index() + 1); });
  $('#fm, #rm').jcarousel({ scroll: 1, start: 1, offset: 1 });
  $('.view-v-2').css('display', 'none');
  $('.view-v-2').css('visibility', 'visible');
  $('#wl').jcarousel();
})();
