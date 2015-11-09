/* TODO
 * More events
 * Better explanations
*/ 

var oldValues = []; //Used to test if oldValue of each slider was inRange
var totalValue = 0; //Total of all values after last run
var maxValue = 0;  //Value of current total amount - what it should be
var resources = 100; //Value of resources availible
var control = 0; //Value of control over citizens
var population = 10000; //Theoretical amunt of people based on how many have turned into Big Brother

var time = 0;
setInterval(myTimer, 1000); // Counts time

var placeholder = 1;
var controlDecayPercent = 1;

//Placeholder values ranges for possible values of events & description  of events.
var ranges;
var description;

var lastEvent = [];

window.onload = function () {
  setNextEvent(); //Sets new event, should refresh description and add to previousControl
};

//Called onchange of slider (after click&letting go of button)
function showValue(changedValue, rangeLabel, citizen, sliderID)
{
  var values = [document.getElementById("newspeak"), document.getElementById("fear"), 
    document.getElementById("unity"), document.getElementById("education"), 
    document.getElementById("needs"), document.getElementById("past"), document.getElementById("monitor")];

  var numberValues = [];
  for(x = 0; x < values.length; x++) {
    numberValues.push(values[x].innerHTML);
  }

  for(x = 0; x < numberValues.length; x++) {
    if(numberValues[x] == "doesn't matter") {
      numberValues[x] = 0;
    } else if(numberValues[x] == "poor") {
      numberValues[x] = 1;
    } else if(numberValues[x] == "low") {
      numberValues[x] = 2;
    } else if(numberValues[x] == "medium") {
      numberValues[x] = 3;
    } else if(numberValues[x] == "high") {
      numberValues[x] = 4;
    } else if(numberValues[x] == "very high") {
      numberValues[x] = 5;
    }
  }

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
    totalValue -= maxValue;
  }
 
  //Change value of slider
  if(changedValue == 0) {
    document.getElementById(rangeLabel).innerHTML = "doesn't matter";
  } else if(changedValue == 1) {
    document.getElementById(rangeLabel).innerHTML= "poor";
  } else if(changedValue == 2) {
    document.getElementById(rangeLabel).innerHTML= "low";
  } else if(changedValue == 3) {
    document.getElementById(rangeLabel).innerHTML= "medium";
  } else if(changedValue == 4) {
    document.getElementById(rangeLabel).innerHTML= "high";
  } else if(changedValue == 5) {
    document.getElementById(rangeLabel).innerHTML= "very high";
  }
  
  calculateControl(ranges[sliderID], changedValue, numberValues[sliderID]);

  if(isAllInRange(ranges, values)) { //possible Values, value of each slider
    setNextEvent();
	  myTimer();

    placeholder +=1; // Close enough
    controlDecayPercent = (100 * Math.exp(-placeholder / 10)) / 50;
    if(control <= 7) {
    } else {
      population -= population/control*1.1; 
    }
  } else {
    
  } 
  document.getElementById("control").innerHTML = control;
  document.getElementById("pop").innerHTML = population;
}

function calculateControl(range, actualValue, oldValue) {
  //document.getElementById("hi").innerHTML = (range + " : " + actualValue + " : " + oldValue);
  if(inRange(range, actualValue) && !inRange(range, oldValue)) { //If before value wasn't already in range
    control += controlDecayPercent; //only needs to check current value
  } else if(inRange(range, oldValue) && !inRange(range, actualValue)) {//else if already in range and not in range any more, 
    control -= controlDecayPercent;
  } else if(!inRange(range, oldValue) && !inRange(range, actualValue)) { //neither

  }else { //already in range and still in range
  }
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
  //Needs all of numberValues && all currentValues
  var acquired = [];
  var currentValues = [];
  for(x = 0; x < actualValues.length; x++) {
    
    if(actualValues[x].innerHTML == "doesn't matter") {
      currentValues.push(0);
    } else if(actualValues[x].innerHTML == "poor") {
      currentValues.push(1);
    } else if(actualValues[x].innerHTML == "low") {
      currentValues.push(2);
    } else if(actualValues[x].innerHTML == "medium") {
      currentValues.push(3);
    } else  if(actualValues[x].innerHTML == "high") {
      currentValues.push(4);
    } else if(actualValues[x].innerHTML == "very high") {
      currentValues.push(5);
    } else {
      currentValues.push(0);
    }
  }

  var z = 0; 
  while(z < currentValues.length) {
    if(inRange(currentValues[z], ranges[z])) {
      acquired.push(true);
    } else {
      acquired.push(false);
    } 
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
	if(array == value) { 
    return true;
  }
	return false;
}

function setNextEvent() {
  var events = [ //Should include information about each event
  //newspeak fear, unity, education, needs, past, monitor
  [[2, 5, 4, 2, 1, 1, 3], "Bombings are increasing, enemies are winning!"],
  [[2, 5, 4, 3, 2, 3, 3], "Three-Minutes Hate is soon! Be there!"],
  [[2, 4, 2, 4, 1, 2, 4], "Big Brother is watching you! (Propoganda)"],
  [[2, 5, 2, 2, 1, 2, 5], "Telescreens are becoming more popular. Grab yours today!"],
  [[4, 1, 3, 2, 5, 3, 5], "Rations have gone up!"],
  [[1, 1, 4, 4, 3, 5, 2], "Oceana has switched allies and enemies."],
  [[2, 4, 1, 5, 2, 2, 1], "Children are the answer to our spy problem! Make sure to feed them well!"],
  [[2, 2, 4, 1, 1, 3, 4], "Buildings are falling apart, elevators aren't working, and water doesn't reach the top of the apartments."]
  ];

  for(x = 0; x < events.length; x++) {
    if(lastEvent[1] == events[x][1]) {
      events.splice(x, 1);
      random = 0;
    }
  }

  var random = Math.floor((Math.random() * events.length)); // Random number
  
  //Takes out random element from events, 0 = ranges, 1 = description
  for(x = 0; x < events.length; x++) {
    if(random == x) {
      ranges = events[x][0];
      description = events[x][1];
    }
  }
  lastEvent = [ranges, description];
  document.getElementById("events").innerHTML = description; //Refreshs description
}