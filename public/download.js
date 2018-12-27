$(document).ready(function() {
  $("form").submit(function(e) {
    e.preventDefault(); 
    var $this = $(this);
    window.location.replace("https://dtai-d3g1d5.c9users.io/download?" + decodeURIComponent($this.serialize()))
  });
});

/*  $("#boton").click(function() {
    window.location.replace("https://dtai-d3g1d5.c9users.io/download")
  });
    $("form").submit(function(e) {
    e.preventDefault(); 
    var $this = $(this); 
    $.post(
        $this.attr("action"), 
        $this.serialize(), 
        function(data) {  },
        "json" 
    );
  });
  alert(decodeURIComponent($this.serialize()))
  */
