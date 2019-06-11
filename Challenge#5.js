//**Challenge #5**

function findModuleIndex(moduleName) {
  for (let i = 0; i < availableModules.length; i++) {
    if (availableModules[i].name === moduleName && availableModules[i].essential === true) {
    return i;
    }
  }
}

loadModule(findModuleIndex("life-support"));
loadModule(findModuleIndex("propulsion"));
