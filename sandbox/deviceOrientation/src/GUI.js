class GUI {

    static print(string) {
        GUI.outputString = "<p>" + GUI.outputString + string + "</p>"
        GUI.output.innerHTML = GUI.outputString;
    }
}
GUI.outputString = "";
GUI.positionOutputString = "";
GUI.output = document.getElementById("consoleOutput");
GUI.positionOutput = document.getElementById("devicePositionOutput");