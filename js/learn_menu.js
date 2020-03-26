$("#learn-menu-label").on("click", function(){
  $("#learn-menu").toggle();
}) // END .on("click"

$(document).on("ready", function(){
  $("#learn-menu").css('top', "-" + $("#learn-menu").height() + "px");
})
