var totalValue = 0; //Total of all values after last run
var maxValue = 0;  //Value leftover after last change
var lastValue = 0; //last newValue
var time = 0;
setInterval(myTimer, 1000);

function showValue(newValue, range, citizen)
{ 
  var values = [document.getElementById("newspeak"), document.getElementById("fear"),
   document.getElementById("unity"), document.getElementById("education"), 
   document.getElementById("needs"), document.getElementById("past"), document.getElementById("monitor")];

  //Change value of slider
  document.getElementById(range).innerHTML= newValue;
  document.getElementById(citizen).setAttribute("value", newValue);

  //Calculate total
  totalValue = 0;
  for (i = 0; i < values.length; i++) { 
    totalValue += parseInt(values[i].innerHTML);
  }

  if(totalValue > 100) {
    document.getElementById("time").innerHTML = "Value over 100";
    //if over change slider position and values
    //Change value of slider based on how much higher
    newValue -= totalValue-100;

    document.getElementById(range).innerHTML= newValue;
    document.getElementById(citizen).setAttribute("value", newValue);

    document.getElementById(citizen).stepDown(totalValue-100);
    
    

    totalValue -= totalValue-100 ;
  } else {
    document.getElementById("time").innerHTML = "Value under /= 100";    
  }
  document.getElementById("resources").innerHTML = totalValue + "%";

 /*
  //maxValue+=newValue
  //maxValue+totalValue should always = 100  
  //therefore if maxValue + newValue <= totalValue,

  //if(newValue < lastValue), then OKAY
  if(newValue >= maxValue) { //Should be held true if maxValue+newValue >= 100
	  document.getElementById(citizen).stepDown(newValue-maxValue);
	  newValue = maxValue;
  }



  document.getElementById(range).innerHTML=newValue;
  document.getElementById(citizen).setAttribute("value", newValue);

   //Sets values for each slider
  var values = [document.getElementById("newspeak"), document.getElementById("fear"),
   document.getElementById("unity"), document.getElementById("education"), document.getElementById("needs"), document.getElementById("past"), document.getElementById("monitor")];
  totalValue = 0;
  for (i = 0; i < values.length; i++) { 
    totalValue += parseInt(values[i].innerHTML);
    maxValue = 100 - totalValue;
  }

  lastValue = newValue;

  document.getElementById("resources").innerHTML = totalValue + "%";
*/}

function myTimer() {
  

  var ranges = ["newspeak", "fear", "unity", "education", "needs", "past", "monitor"];

  //Grab citizen-control and change attribute based on maxValue

  //Controls Time
  time++;
 // document.getElementById("time").innerHTML = maxValue;//time + "s";
}

function refreshSliders(values) {
  
}