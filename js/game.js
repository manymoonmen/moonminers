var Game = {
    _name: 'Moon Miners',
    _version: '0.0',
    _session: null, // will eventually hold live game data
    _display: null, // the ROT canvas object
    _currentScreen: null,
    // !to-do: determine minimum screen size
    _displayWidth: 80,
    _displayHeight: 42,
    _lastCommand:   'None',
    _gameOver: false,

    init:   function() {
        var game = this;
        game._display = new ROT.Display({width: game._displayWidth,
                                        height: game._displayHeight,
                                        fontFamily: "monospace",
                                        fontSize: 12,
                                    });
    },

    getDisplay: function() {
        return this._display;
    },
};

window.onload = function() {
    if (false) {
    //// ROT got rid of isSupported()??? to-do: informative links
    //// if (!ROT.isSupported()) {
    ////     // !to-do: change game div to paragraph w/
    ////     // links to supported browsers
    ////     alert("Your browser is old and sad");
    //// } 
    } else {
        //alert("sup");
        Game.init();
        var display = Game.getDisplay();
        document.getElementById("game").appendChild(display.getContainer());
        /*
        // Load start screen
            Game.switchScreen('Title');
        */
        display.drawText(Game._displayWidth/2,
                            Game._displayHeight/2,
                            'hi');
    }
};