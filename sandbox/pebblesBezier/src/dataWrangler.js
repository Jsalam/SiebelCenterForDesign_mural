class DataWrangler {

    static makeTable(data) {
        console.log(data);
        DataWrangler.table = new p5.Table();
        let columns = ["ChronologicalValue", "InnovationTitle", "InnovationTypes_A", "Colleges_B", "Departments_C", "Decade_D", "People_E", "Theme"]
        for (const colName of columns) {
            DataWrangler.table.addColumn(colName)
        }

        try {
            for (const cluster of data) {
                for (const node of cluster.nodes) {
                    let row = DataWrangler.table.addRow();

                    row.setString("ChronologicalValue", cluster.clusterID + "-" + node.id);

                    row.setString("InnovationTitle", node.nodeLabel);

                    let tmpString = node.nodeAttributes.Primary_ToI
                    let tmpStringB = node.nodeAttributes.Secondary_ToI
                    let types = 1;
                    if (tmpStringB.length > 0) types++;
                    row.setNum("InnovationTypes_A", types);

                    row.setNum("Colleges_B", node.nodeAttributes.N_colleges);

                    row.setNum("Departments_C", node.nodeAttributes.N_departments);

                    tmpString = node.nodeAttributes.Date_or_Decade
                    let tokens = tmpString.split('-')
                    row.setNum("Decade_D", tokens[0]);

                    tmpString = node.nodeAttributes.Faculty_Staff_Graduate_Undergrad
                    tokens = tmpString.split(',')
                    row.setNum("People_E", tokens.length);

                    row.setString("Theme", cluster.clusterLabel);
                }
            }

            if (DataWrangler.table.getRowCount() > 0) {
                main.init();
            } else {
                throw ("The file uploaded does not comply with the format")
            }
        } catch (error) {
            console.log(error);
            if (window.confirm("The file uploaded does not comply with the format.\nIf you click 'OK' you will be taken to NetInt where you can download the file. Cancel will keep you in this website")) {
                window.location.href = 'http://muralaugmented.web.illinois.edu/sandbox/innovationNetwork/'
            }

        }
    }

    static printTable() {
        //print the results
        console.log(DataWrangler.table);
    }

    static saveTable() {
        gp5.saveTable(DataWrangler.table, "dataForPebbles.csv")
    }
}

DataWrangler.dataOut;
DataWrangler.table;