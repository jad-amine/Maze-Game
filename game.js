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


// Start listening to start button click
function lunch_script(){
   start_button.addEventListener("mouseover", () => {
         start_button.style.backgroundColor = "green";
         start_button.style.cursor = "crosshair"});
   start_button.addEventListener("mouseout", () => {
         start_button.style.backgroundColor = "#88ff88"});
   start_button.onclick = play;
}


// Add event listener to danger zone and cheating area
function play(){
   play_style();
   //catch start_button location relative to screen width
   starting_position = start_button.getBoundingClientRect().left;
   // 3 possible outcomes      
   document.addEventListener("mousemove", check_if_cheating)
   danger_zone.forEach(zone => zone.addEventListener("mousemove", game_over));
   end_button.addEventListener("mouseover", win);
}