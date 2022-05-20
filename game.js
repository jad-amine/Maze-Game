// Delare all variables to be used in the script
var start_button;
var danger_zone;
var end_button;
var h2_message;
var total_score;
var score = 0;
var starting_position;


window.onload = grab_elements


// Grab all elements and lunch script
function grab_elements(){
   start_button = document.querySelector("#start");
   danger_zone = document.querySelectorAll(".boundary");
   end_button  = document.querySelector("#end");
   h2_message  = document.querySelector("h2")
   total_score = document.querySelector(".example")
   total_score.style.height = "50px"
   total_score.style.width = "50px" 
   total_score.style.textAlign = "center"
   lunch_script();
}