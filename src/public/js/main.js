$(function() {
        // alert('ok')
        $("#product ").on("mouseenter", function(){
            $("#productcontainer").show().attr("style", "display: flex !important;")
        })
        $("#product ").on("click", function(){
            $("#productcontainer").show().attr("style", "display: none")
        })

        $("#company-btn").on("mouseenter", function(){
            $("#company-container").show().attr("style", "display: flex !important;")
        })
        $("#company-btn").on("click", function(){
            $("#company-container").show().attr("style", "display: none")
        })



        $("#menu-btn").on("click", function(){
          $("#menu-item").toggle(1500)
        })
})


$(document).on('ready', function () {
  // initialization of aos
  AOS.init({
    duration: 1200,
    once: true
  });
});

window.
onload
= function() {
  Particles.
init({
    selector: '.background',
    speed: 0.8,
    color: '#03f801',
    maxParticles: 340,
    minDistance: 130,
    sizeVariations: 3,
    // connectParticles: true,
    responsive: [
        {
          breakpoint: 
    768
    ,
          options: {
            maxParticles: 
    200
    ,
            color: 
    '#48F2E3'
    ,
            connectParticles: 
    false
          }
        }, {
          breakpoint: 
    425
    ,
          options: {
            maxParticles: 
    100
    ,
            connectParticles: 
    true
          }
        }, {
          breakpoint: 
    320
    ,
          options: {
            maxParticles: 
    0
     
    // disables particles.js
          }
        }
      ]
  });
};