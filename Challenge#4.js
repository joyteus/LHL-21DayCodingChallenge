// 4
function loadModule(index) {
	availableModules[index].enabled = true;
	ship.modules.push(availableModules[index]);
}

function findModule() {
  for(var i = 0; i < availableModules.length; i++) {
    if(availableModules[i].name == "life-support") {
      return i;
    }
  }
}

findModule();
loadModule(findModule());
