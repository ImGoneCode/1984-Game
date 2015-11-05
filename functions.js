var oldValues = []; //Used to test if oldValue of each slider was inRange
var totalValue = 0; //Total of all values after last run
var maxValue = 0;  //Value of current total amount - what it should be
var resources = 100; //Value of resources availible
var control = 0; //Value of control over citizens

var time = 0;
setInterval(myTimer, 1000); // Counts time

var controlDecayPercent = 1;
//Placeholder values ranges for possible values of events & description  of events.
var ranges;
var description;

window.onload = function () {
  setNextEvent(); //Sets new event, should refresh description and add to previousControl
};

//Called onchange of slider (after click&letting go of button)
function showValue(changedValue, rangeLabel, citizen, sliderID)
{
  var values = [document.getElementById("newspeak"), document.getElementById("fear"), 
   document.getElementById("unity"), document.getElementById("education"), 
   document.getElementById("needs"), document.getElementById("past"), document.getElementById("monitor")];

  //Defines values of before changing sliders
  oldValues = [];
  for (i = 0; i < values.length; i++) { 
    oldValues.push(values[i].innerHTML);
  } 

  //Change value of slider
  document.getElementById(rangeLabel).innerHTML= changedValue;
  document.getElementById(citizen).setAttribute("value", changedValue);

  

  //Calculate total values of all sliders(counts changedValue)
  totalValue = 0;
  for (i = 0; i < values.length; i++) { 
    totalValue += parseInt(values[i].innerHTML);
  }

  if(totalValue > resources) {
    maxValue = totalValue-resources;
    //Change value of slider based on the fact that
    //changedValue should be decreased by how much larger totalValue is in comparrison to resources
    changedValue -= maxValue;

    document.getElementById(rangeLabel).innerHTML= changedValue;
    document.getElementById(citizen).setAttribute("value", changedValue);

    document.getElementById(citizen).stepDown(maxValue);
    totalValue -= maxValue ;
  }
  document.getElementById("resources").innerHTML = totalValue + "%";

  calculateControl(ranges[sliderID], document.getElementById(rangeLabel).innerHTML, oldValues[sliderID]);
  //ocument.getElementById("hi").innerHTML = oldValues;
  if(isAllInRange(ranges, values)) { //possible Values, value of each slider
    //document.getElementById("hi").innerHTML = "In range";
    setNextEvent();
	  myTimer();
    controlDecayPercent *= .90;
  } else {
  //  document.getElementById("hi").innerHTML = "Out of range";
    
  } 
  document.getElementById("control").innerHTML = control;
}

function calculateControl(range, actualValue, oldValue) {
  document.getElementById("hi").innerHTML = range + " : " + actualValue + " : " + oldValue;
  if(inRange(range, actualValue) && !inRange(range, oldValue)) { //If before value wasn't already in range
    control += controlDecayPercent; //only needs to check current value
    document.getElementById("debug").innerHTML = "Before not inRange but is now";
  } else if(inRange(range, oldValue) && !inRange(range, actualValue)) {//else if already in range and not in range any more, 
    control -= controlDecayPercent;
    document.getElementById("debug").innerHTML = "Already && not anymore"; 
  } else if(!inRange(range, oldValue) && !inRange(range, actualValue)) { //neither
    document.getElementById("debug").innerHTML = "Neither";

  }else { //already in range and still in range
    document.getElementById("debug").innerHTML = "Both";
  }
  //document.getElementById("debug").innerHTML = control + " : " + controlDecayPercent;
}


function getRanges(values) {
  var numbers = [];
  //returns array that holds each value's number ranges
  for(x = 0; x < values.length; x++) {
    var tuple = values[x];
    numbers.push(this.range(tuple));
  }
  return numbers;
}

function range(values) { 
  var rangeNums = [];
  var min = values[0];
  var max = values[1];

  while(min <= max) {
	rangeNums.push(min);
	min++;
  }
  return rangeNums;
}

function myTimer() {
  //Controls Time
  time++;
  document.getElementById("time").innerHTML = time + "s"; //time + "s";
}

function isAllInRange(ranges, actualValues) { //ranges is an array in which each array inside array is the list of values it can be
  var acquired = []; //acquired when
	
  var sliderValues = [];
  var possibleValues = [];
  var values = [];

  
  for(x = 0; x < actualValues.length; x++) {
    sliderValues.push(actualValues[x].innerHTML);
	
    possibleValues.push(ranges[x]);
	 
    
  }
  var things = [];
  var z = 0; 
  while(z < sliderValues.length) {
    if(inRange(possibleValues[z], sliderValues[z])) {
			acquired.push(true);
		} else {
			acquired.push(false);
		} 
		
		things.push(z);
		z++;
  }
    for(x = 0; x < acquired.length; x++) { 
      if(!acquired[x]) { //if any values not in range, return false
        return false;
      }
    }
    return true;
}

function inRange(array, value) { //array, value
	
	for(x = 0; x < array.length; x++) {
		var zero = array[x];
		if(array[x] == value) {
				x = array.length;
				
				return true;
		}
	}
	return false;
}

function setNextEvent() {
  var events = [ //Should include information about each event
  [getRanges([[1, 10], [1, 10], [10, 20], [10, 20],[1, 10], [10, 20], [10, 20]]), "Bombings are increasing, enemies are winning!"],
  [getRanges([[10, 20], [10, 20], [1, 10], [1, 10], [10, 20], [1, 10], [1, 10]]), "Three-Minutes Hate is soon! Be there!"],
  ];

  
  var random = Math.floor((Math.random() * 2)); // Random number
  
  //Takes out random element from events, 0 = ranges, 1 = description
  for(x = 0; x < events.length; x++) {
    if(random == x) {
      ranges = events[x][0];
      description = events[x][1];
    }
  }
  document.getElementById("events").innerHTML = description; //Refreshs description
}