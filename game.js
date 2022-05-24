// Delare all variables to be used in the script
var game;
var start_button;
var danger_zone;
var end_button;
var h2_message;
var pressed = false;
var stats;
var total_score;
var live_time = 0;
var best_time = 0;
var last_time = 0;
var time_score;
var best_time_score;
var first_trial = true;
var interval;
var score = 0;
var starting_position;


window.addEventListener("load", grab_elements);


// Grab all elements and lunch script
function grab_elements(){
   start_button = document.querySelector("#start");
   danger_zone = document.querySelectorAll(".boundary");
   end_button  = document.querySelector("#end");
   h2_message  = document.querySelector("h2")
   total_score = document.querySelector(".example")
   game = document.querySelector("#game")
   total_score.style.height = "50px"
   total_score.style.borderRadius = "30px"
   total_score.style.width = "80px" 
   total_score.style.textAlign = "center"
   add_StopWatch();
   add_reset_button();
   lunch_script();
}


// Start listening to start button click
function lunch_script(){
   start_button.addEventListener("mouseover", () => {
         start_button.style.backgroundColor = "green";
         start_button.style.cursor = "crosshair";
         h2_message.innerHTML = "Press S ";});
   start_button.addEventListener("mouseout", () => {
         start_button.style.backgroundColor = "#88ff88"});
   start_button.onclick = play;
}


// Add event listener to danger zone and cheating area
function play(){
   if(!pressed){
      pressed = true;
      play_style();
      start_timer();
      
      //catch start_button location relative to screen width
      starting_position = start_button.getBoundingClientRect().left;
      // 3 possible outcomes      
      document.addEventListener("mousemove", check_if_cheating)
      danger_zone.forEach(zone => {
         zone.addEventListener("mousemove", game_over);
         zone.style.backgroundColor = "grey";
         zone.style.border = "5px dotted red";});
      end_button.addEventListener("mouseover", win);
   }
}


// 1. Cheating Area
function check_if_cheating(XY){
   if(XY.pageX < starting_position){
      document.removeEventListener("mousemove", check_if_cheating);
      game_over();
   }
}

// 2. Game over section
function game_over(){
   game_over_style();
   clearInterval(interval)
   document.querySelector("#last_score").innerHTML = live_time;
   score -= 10;
   total_score.innerHTML = score;
   document.removeEventListener("mousemove", check_if_cheating);
   danger_zone.forEach(zone => {
      zone.removeEventListener("mousemove", game_over)
      document.body.style.cursor = "default"
      end_button.removeEventListener("mouseover", win);
   })
   pressed = false;
}

// 3. Win Section
function win(){
   win_style();
   clearInterval(interval);
   if(first_trial){
      best_time = live_time;
      best_time_score = time_score;
      document.querySelector("#best_time_score").innerHTML = live_time;
      first_trial = false;
   }
   check_with_best_time(score);
   document.querySelector("#last_score").innerHTML = live_time;
   score += 5;
   h2_message.innerHTML = "YOU Win !!! Total Score: " + score;
   total_score.innerHTML = score
   end_button.removeEventListener("mouseover", win);
   document.removeEventListener("mousemove", check_if_cheating);
   danger_zone.forEach(zone => {
      zone.removeEventListener("mousemove", game_over)
   });
   pressed = false;
}



//Game over page style
function game_over_style(){
   h2_message.innerHTML = "YOU LOST !!! Total Score: " + score;
   h2_message.style.backgroundColor = "red"
   h2_message.style.color = "white"
   total_score.style.fontSize = "32px"
   total_score.style.backgroundColor = "red"
   danger_zone.forEach(zone => {
      zone.style.border = "0";
      zone.style.backgroundColor = "red";
   }) 
}

// Win dispay style
function win_style(){
   total_score.style.fontSize = "32px"
   total_score.style.backgroundColor = "#88ff88"
   danger_zone.forEach(zone => {
      zone.style.backgroundColor = "#88ff88";
      zone.style.border = "0";});
   total_score.style.height = "50px"
   document.body.style.cursor = "default"
   h2_message.style.backgroundColor = "#88ff88";
}

// Play display style
function play_style(){
   total_score.innerHTML = score;
   total_score.style.backgroundColor = "white"
   document.body.style.cursor = "crosshair"
   h2_message.style.backgroundColor = "white";
   start_button.addEventListener("mouseover", () => {
      danger_zone.forEach(zone=> {
         zone.style.backgroundColor = "#eeeeee";
         h2_message.style.backgroundColor = "white";
      });
   });
}


// Add Reset Score Button
function add_reset_button(){
   const bttn = document.querySelector("#reset");
   bttn.innerText = "Reset button";
   bttn.style.height = "50px";
   bttn.style.width = "150px";
   bttn.style.margin = "0px auto";
   bttn.style.padding = "15px";
   bttn.style.paddingLeft = "30px";
   bttn.style.backgroundColor = "#8888ff" 
   bttn.style.fontWeight = "bolder"
   bttn.style.borderRadius = "10px"
   bttn.style.display = "flex";
   bttn.style.back
   bttn.addEventListener("click", ()=> {
      score = 0;
      h2_message.innerHTML = "Press S to Start";
      h2_message.style.backgroundColor = "#88ff88"
      total_score.innerHTML = 0;
      danger_zone.forEach(zone=> {
         zone.style.backgroundColor = "#eeeeee";
         h2_message.style.backgroundColor = "white";
      });
   });
}


// Added Player Stats
function add_StopWatch(){
   let html = `<h3>Time Stats</h3>
               <button id="reset">press me </button>
               <div class="stats"> 
                  <h3> Live <p id="live_score"> </p> </h3>
                  <h3> Last <p id="last_score"> </p></h3>
                  <h3> Best <p id="best_time_score"> </p></h3>
               </div>`;
   game.insertAdjacentHTML("afterend", html);
   stats = document.querySelector(".stats");
   document.querySelector("h3").style.textAlign = "center";
   document.querySelector("h3").style.marginTop = "10px";
   document.querySelectorAll("p").forEach(e => e.style.display = "");
   stats.style.display = "flex";
   document.querySelector("body > div + p").style.display = "none";
   stats.style.justifyContent = "space-evenly";
   document.querySelectorAll(".stats > h3").forEach(e => e.style.width= "5%")
}

//start the timer
function start_timer(){
   let hundreths = 0;
   let seconds = 0;
   let minutes = 0;
   live_time = '0:0:0'
   time_score = 0;
   
   interval = setInterval(() => {
      time_score++;
      if (hundreths <9){
         hundreths++;
         hundreths = '0' + hundreths;
      } else{
         hundreths = 0;
         if (seconds <10){
            seconds++;
            seconds = '0' + seconds;
         } else if (seconds < 60){
            seconds++;
            seconds = seconds
         } else{
            seconds = 0;
            if (minutes <10){
               minutes++;
               minutes = '0' + minutes;
            } else if (minutes < 60){
               minutes++;
               minutes = minutes;
            } else{
               minutes = 0;
            }
         }
      }
      
      live_time = `${minutes}:${seconds}:${hundreths}`;
      document.querySelector("#live_score").innerHTML = live_time;
      
   }, 100);
}

function check_with_best_time(time){
   if(time_score < best_time_score){
      best_time_score = time_score;
      best_time = live_time;
      document.querySelector("#best_time_score").innerHTML = live_time;
   }
}