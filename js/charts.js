toggleChart = function(){
  $("#charts-jumbo").toggle(300);
  console.log('TC func fired');
};


//--- Toggle The Charts---\\
$("#chart-toggle").on('click', function(){
  $("#charts-jumbo").show();
  fontSizeToggler();
  console.log("on(click) fired");
});
//$("#chart-toggle").click($("#charts-jumbo").toggle(300));


$(document).keydown(function(e) {
    if(e.which == 67 || e.which == 77) {
      toggleChart();
    }
});
