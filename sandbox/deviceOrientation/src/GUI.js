class GUI {

    static print(string) {
        GUI.outputString = "<p>" + GUI.outputString + string + "</p>"
        GUI.output.innerHTML = GUI.outputString;
    }
    static printPos(string) {
        GUI.positionOutputString = "<p>" + GUI.positionOutputString + string + "</p>"
        GUI.positionOutput.innerHTML = GUI.positionOutputString;
    }



}
GUI.outputString = "";
GUI.positionOutputString = "";
GUI.output = document.getElementById("consoleOutput");
GUI.positionOutput = document.getElementById("devicePositionOutput");