function countEssential() {
	var essentialModules=0;
	for(var i=0; i<availableModules.length; i++) {
		if(availableModules[i].essential) {
			essentialModules++;
		}
	}
	return essentialModules;
}
