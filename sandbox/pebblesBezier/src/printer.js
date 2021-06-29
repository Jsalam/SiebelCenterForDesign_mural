class Printer {
    static log(output) {

        if (Printer.txt != undefined) {

            Printer.txt = Printer.txt.concat('\n' + output.toString())
        } else {
            Printer.txt = output.toString();
        }

        gp5.noStroke();
        gp5.fill(0);
        gp5.text(Printer.txt, Printer.coords.x, Printer.coords.y);
        gp5.stroke(0);
        gp5.line(0, 0, Printer.coords.x, Printer.coords.y);
    }

    static clear() {
        Printer.txt = undefined;
    }
}

Printer.txt;
Printer.coords = { x: 10, y: 10 };