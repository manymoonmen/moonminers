var input = {
    // Mostly lists of keyboard inputs for English (US) to
    // help normalize crowse-brower inputs.
    //
    // !to-do: other languages/accented characters, assuming
    // anyone else ever sees this
    //
    // Literally minutes after I had finished writing these tables I found
    // this wonderful reference: http://www.javascripter.net/faq/keycodes.htm)

    KeyNormalized: {
        // List of various input values from event.key that don't
        // match up with standards and their corresponding value.
        // Notably,
        // 1.) arrow keys have "Arrow" prepended to them per standards,
        // 2.) Numpad keys can't be reliably detected everywhere and
        //  will be treated like their normal counterparts
        //
        // There is no extra intent here to correct for IE
        // versions below 11-- life is too short.
        //
        // More values to be added, only tested on
        // my crappy microsoft keyboard
        Space:  ' ',
        Spacebar:   ' ',
        Esc:    'Escape',
        Del:    'Delete',
        Up:     'ArrowUp',
        Down:   'ArrowDown',
        Left:   'ArrowLeft',
        Right:  'ArrowRight',
        Add:    '+',
        Subtract: '-',
        Decimal: '.',
        Divide: '/',
        Multiply: '*',
        Scroll: 'ScrollLock',
        Win:    'Meta',
        OS:     'Meta',
        Apps:   'ContextMenu',
    },
    KeyCodeNormalized:  {
        // List of various input values from event.which and their
        // event.key counterpart values. Like above, Numpad keys
        // will be mapped to their generic counterparts
        //
        // Most browsers seem to support event.key so this should
        // be unecessary but here are some random hold-outs
        // as of now (caniuse.com, 3/29/2018):
        //  - Opera Mini
        //  - UC Browser for Android
        //  - Safari < 10.3
        8:  'Backspace',
        9:  'Tab',
        12: 'Clear',
        13: 'Enter',
        16: 'Shift',
        17: 'Control',
        18: 'Alt',
        19: 'Pause',
        20: 'CapsLock',
        27: 'Escape',
        32: ' ',
        33: 'PageUp',
        34: 'PageDown',
        35: 'End',
        36: 'Home',
        37: 'ArrowLeft',
        38: 'ArrowUp',
        39: 'ArrowRight',
        40: 'ArrowDown',
        44: 'PrintScreen', // Only works on keyup event?
        45: 'Insert',
        46: 'Delete',
        48: '0',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5',
        54: '6',
        55: '7',
        56: '8',
        57: '9',
        59: ';',
        61: '=', // Firefox
        65: 'a',
        66: 'b',
        67: 'c',
        68: 'd',
        69: 'e',
        70: 'f',
        71: 'g',
        72: 'h',
        73: 'i',
        74: 'j',
        75: 'k',
        76: 'l',
        77: 'm',
        78: 'n',
        79: 'o',
        80: 'p',
        81: 'q',
        82: 'r',
        83: 's',
        84: 't',
        85: 'u',
        86: 'v',
        87: 'w',
        88: 'x',
        89: 'y',
        90: 'z',
        91: 'Meta',
        92: 'Meta', // Windows only?
        93: 'ContextMenu',
        // 96-105: numpad numbers
        96:  '0',
        97:  '1',
        98:  '2',
        99:  '3',
        100: '4',
        101: '5',
        102: '6',
        103: '7',
        104: '8',
        105: '9',
        // 106-111: numpad keys
        106: '*',
        107: '+',
        109: '-',
        110: '.',
        111: '/',
        // F Keys are hard to rely on in IE
        112: 'F1',
        113: 'F2', 
        114: 'F3',
        115: 'F4',
        116: 'F5',
        117: 'F6',
        118: 'F7',
        119: 'F8',
        120: 'F9',
        121: 'F10',
        122: 'F11',
        123: 'F12',
        144: 'NumLock',
        145: 'ScrollLock',
        173: '-', // Firefox
        186: ';',
        187: '=',
        188: ',',
        189: '-',
        190: '.',
        191: '/',
        192: '`',
        219: '[',
        220: '\\',
        221: ']',
        222: '\'',
    },
    KeyCodeShifted:  {
        // Shifted keys don't have different keycodes :'(
        48: ')',
        49: '!',
        50: '@',
        51: '#',
        52: '$',
        53: '%',
        54: '^',
        55: '&',
        56: '*',
        57: '(',
        59: '-',
        60: '+',
        61: '+', // Firefox
        65: 'A',
        66: 'B',
        67: 'C',
        68: 'D',
        69: 'E',
        70: 'F',
        71: 'G',
        72: 'H',
        73: 'I',
        74: 'J',
        75: 'K',
        76: 'L',
        77: 'M',
        78: 'N',
        79: 'O',
        80: 'P',
        81: 'Q',
        82: 'R',
        83: 'S',
        84: 'T',
        85: 'U',
        86: 'V',
        87: 'W',
        88: 'X',
        89: 'Y',
        90: 'Z',
        173: '_', // Firefox
        186: ':',
        187: '+',
        188: '<',
        189: '_',
        190: '>',
        191: '?',
        192: '~',
        219: '{',
        220: '|',
        221: '}',
        222: '"',
    },
}

input.NormalizeKeyInput = function(eventType, event) {
    var shiftKey = event.shiftKey;
    // can use but have no use for:
    //
    //  var altKey = event.altKey;
    //  var ctrlKey = event.ctrlKey;
    //  var metaKey = event.metaKey;
    //
    if (eventType === 'keydown') {
        // 'keydown' events sometimes ignore letter case but
        // 'keypress' events ignore other random keys (e.g. arrows)
        /*if (event.repeat) {
            // !to-do: throttle input to a certain no. per ms
            return;
        }*/
        // var numLock = event.getModifierState('NumLock');
        var capsLock = event.getModifierState('CapsLock');
        // var scrollLock = event.getModifierState('ScrollLock') || event.getModifierState('Scroll'); // IE, of course
        var eventKey = null;
        if (event.key) {
            // supported by most modern browsers
            eventKey = event.key;
            if (eventKey in input.KeyNormalized) {
                // Of course some browsers have specific non-standard values
                eventKey = input.KeyNormalized[eventKey];
            }
        } else {
            // sigh
            //
            // It is possible to detect some numpad-specific values but
            // future event.key standard doesn't/some browsers don't at all
            var keyCode = event.which|| event.keyCode || event.charCode;
            // console.log('key or code: ' + keyCode);
            if (shiftKey && keyCode in input.KeyCodeShifted) {
                // Checking if a letter is changed by capslock and shift
                if (keyCode > 64 && keyCode < 91) {
                    if (capsLock && keyCode in input.KeyCodeNormalized) {
                        eventKey = input.KeyCodeNormalized[keyCode];
                    } else {
                        eventKey = input.KeyCodeShifted[keyCode];
                    }
                } else {
                    // normal shifted key (affects numpads)
                    eventKey = input.KeyCodeShifted[keyCode];
                }
            } else if (capsLock) {
                // also affects some numpads?
                if (keyCode > 64 && keyCode < 91 &&
                    keyCode in input.KeyCodeShifted) {
                    eventKey = input.KeyCodeShifted[keyCode];
                } else if (keyCode in input.KeyCodeNormalized) {
                    eventKey = input.KeyCodeNormalized[keyCode];
                }
            } else if (keyCode in input.KeyCodeNormalized) {
                // normal key
                eventKey = input.KeyCodeNormalized[keyCode];
            }
        }
        // console.log('event.key: (' + eventKey + ')');
        // console.log('NumLock: ' + numLock);
        // console.log('CapsLock: ' + capsLock);
        // console.log('ScrollLock: ' + scrollLock);
        // console.log('Shift: ' + shiftKey);
        // console.log('Alt: ' + altKey);
        // console.log('Control: ' + ctrlKey);
        // console.log('Meta: ' + metaKey);
        return eventKey;
    }
}