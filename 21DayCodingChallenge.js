// 1 ---------------------------------------------------------
function powerOn() {
  if (ship.powerOn === false) {
    ship.powerOn = true;
  }
}

// 2 ---------------------------------------------------------
function countModules() {
  return availableModules.length;
}

// 3 ---------------------------------------------------------
function countEssential() {
  var essentialModules = 0;
  for(var i = 0; i < countModules(); i++) {
    if(availableModules[i].essential) {
      essentialModules++;
    }
  }
  return essentialModules;
}

// 4 ---------------------------------------------------------
function loadModule(index) {
	availableModules[index].enabled = true;
	ship.modules.push(availableModules[index]);
}

function findModule() {
  for(var i = 0; i < countModules(); i++) {
    if(availableModules[i].name == "life-support") {
      return i;
    }
  }
}
findModule();
loadModule(findModule());

// 5 ---------------------------------------------------------
function findModuleIndex(moduleName) {
  for (let i = 0; i < countModules(); i++) {
    if (availableModules[i].name === moduleName && availableModules[i].essential === true) {
      return i;
    }
  }
}

loadModule(findModuleIndex("life-support"));
loadModule(findModuleIndex("propulsion"));

// 6 ---------------------------------------------------------
loadModule(findModuleIndex("navigation"));

// 7 ---------------------------------------------------------
function resetLARRY() {
  for (var i = 0; i < 10; i++) {
    LARRY.quack();
  }
}
resetLARRY();

// 8 ---------------------------------------------------------
loadModule(findModuleIndex("communication"));

// 9 ---------------------------------------------------------
function setMessage() {
  radio.message = JSON.stringify(navigation);
}
setMessage();

// 10 ---------------------------------------------------------
function activateBeacon() {
  if (radio.beacon === false) {
    radio.beacon = true;
  }
}

// 11 ---------------------------------------------------------
function setFrequency() {
  radio.frequency = (radio.range.low + radio.range.high) / 2
}

// 12 ----------------------------------------------------
function initialize() {
  navigation.x = 0;
  navigation.y = 0;
  navigation.z = 0;
}

// 13 ----------------------------------------------------
function calibrateX() {
  for(var i = 1; i <= 12; i++) {
    var signal = checkSignal();
    if (typeof signal != 'undefined') {
      navigation.x = signal;
      break; 
    }
  }
}

// 14 ----------------------------------------------------
function calibrateY() {
  for(var i = 1; i <= 60; i++) {
    var signal = checkSignal();
    if (typeof signal != 'undefined') {
      navigation.y = signal;
      break; 
    }
  }
}

function calibrateZ() {
  for(var i = 1; i <= 60; i++) {
    var signal = checkSignal();
    if (typeof signal != 'undefined') {
      navigation.z = signal;
      break; 
    }
  }
}

// calibrateX();
// calibrateY();
// calibrateZ();

// 15 ----------------------------------------------------
function calibrate() {
  calibrateX();
  calibrateY();
  calibrateZ();
}

// 16 ----------------------------------------------------
function setSpeed(speed) { //speed is a string
  var parsedSpeed = parseInt(speed); //navigation.speed string to integer
  if (parsedSpeed >= 0) {
    navigation.speed = parsedSpeed
  }
}

// 17 ----------------------------------------------------
function activateAntenna() {
  if (ship.antenna.active === false) {
    ship.antenna.active = true;
  }
}
//activateAntenna();

// 18 ----------------------------------------------------
function sendBroadcast() {
  for(var i = 0; i < 100; i++) {
    broadcast();
  }
}
//sendBroadcast();

// 19 ----------------------------------------------------
// functions from 11,17,18; commented-out calling the functions on 17 & 18
function configureBroadcast() {
  setFrequency();
  activateAntenna();
  sendBroadcast();
}
configureBroadcast();

// 20 ----------------------------------------------------
function decodeMessage(message) {
  return message.replace(/1/g, "i")
    .replace(/4/g, "a")
    .replace(/3/g, "e")
    .replace(/0/g, "o")
    .replace(/5/g, "y")
    .replace(/2/g, "u");
}

// 21 ----------------------------------------------------
function returnToEarth() {
  navigation.x = parseInt(decodeMessage(broadcast("x")), 16);
  navigation.y = parseInt(decodeMessage(broadcast("y")), 16);
  navigation.z = parseInt(decodeMessage(broadcast("z")), 16);
}

returnToEarth();
