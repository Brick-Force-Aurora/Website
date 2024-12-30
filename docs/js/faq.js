$(document).ready(function () {
  // Ensure all <dd> are hidden initially
  $("dl.faq dd").hide();

  $("dl.faq dt").click(function () {
    // Toggle 'open' class on the clicked dt
    $(this).toggleClass("open");

    // Slide toggle the next dd element
    $(this).next("dd").slideToggle("fast");

    return false;
  });
});
