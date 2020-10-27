/** 
 * This class uses the library Quicksettings. See http://bit101.github.io/quicksettings/
 */
class ContextualGUI {
    // This constructor is not needed, but it is here because the documentation generatior requires it to format the documentation
    constructor() {}

    static subscribe(obj) { ContextualGUI.observers.push(obj) }

    static unsubscribe(obj) {}

    static notifyObservers(data) {
        for (const obs of ContextualGUI.observers) {
            obs.getDataFromContextualGUI(data);
        }
    }

    /**
     * Init from string 
     * @param {string} kinds comma separated names
     */
    static init(kinds) {
        if (ContextualGUI.menu && ContextualGUI.menu._content) {
            ContextualGUI.menu.destroy();
        }

        // Create Contextual GUI
        ContextualGUI.createmenu();

        // populate contextual menu
        ContextualGUI.edgeCategories = kinds.split(',')
        ContextualGUI.addCheckboxes("Projects", ContextualGUI.edgeCategories)
            //console.log('contextual menu initialized');
    }

    /**
     * Init from collection of strings
     * @param {Object} collection collection of strings
     */
    static init2(collection) {
        if (ContextualGUI.menu && ContextualGUI.menu._content) {
            ContextualGUI.menu.destroy();
        }

        // Create Contextual GUI
        ContextualGUI.createmenu();
        ContextualGUI.addCheckboxes("Categories", collection)
            //console.log('contextual menu re-initialized');
    }

    static createmenu() {
        ContextualGUI.menu = QuickSettings.create(100, 200, 'Choose a project', document.getElementById('model'));
        //ContextualGUI.menu.toggleVisibility();
    }

    static addCheckboxes(label, items) {
        // the callback here is used when a new option is chosen
        ContextualGUI.menu.addDropDown(label, items, (val) => {
            ContextualGUI.menuChoice = val.value;
            ContextualGUI.notifyObservers(val.value);
        });
        // get the value of first selected item in the dropdown at the moment of adding new checkboxes
        let tmp = ContextualGUI.menu._controls.Projects.control.value;
        ContextualGUI.notifyObservers(tmp);
        ContextualGUI.menuChoice = tmp;
    }

    static getValue(val) {
        ContextualGUI._menuValue = val.value;
        console.log('value changed');
    }

    static setmenuValue(val) {
        ContextualGUI._menuValue = val;
    }

    static addEdgeCategory(cat) {
        let rtn = false;
        if (!ContextualGUI.edgeCategories.includes(cat)) {
            ContextualGUI.edgeCategories.push(cat)
            rtn = true;
        }
        return rtn;
    }

}
ContextualGUI.menu;
ContextualGUI.observers = [];
ContextualGUI.edgeCategories = [];
ContextualGUI.menuChoice;