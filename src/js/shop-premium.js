// Premium account page: the tooltip of a package appears while hovering it (as on the original page)
$(document).ready(function () {
  var content = $(".content.shop.premium");
  $(".premium-tooltip").hide();
  $(".packages a[class^='month-']").each(function () {
    var m = $(this).attr("class").match(/month-(\d+)/)[1];
    $(this).hover(
      function () {
        $(".premium-tooltip").hide();
        content.removeClass("tooltip-m1 tooltip-m3 tooltip-m6 tooltip-m12").addClass("tooltip-m" + m);
        $(".premium-tooltip.tooltip-m" + m).show();
      },
      function () {
        $(".premium-tooltip.tooltip-m" + m).hide();
      }
    );
  });
});
