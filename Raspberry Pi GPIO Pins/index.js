'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Raspberry Pi GPIO Pins';

/*
 * Array containing pin function.
 * Information from:
 *   https://pinout.xyz
 */
 
var pin2name = [
    ["3 point 3 volts", "3.3v."],
    ["5 volts", "5v."],
    ["g.p.i.o 2 or wiring pi 8","GPIO 2 or Wiring Pi 8\nOn very early rev 1 Pis it is GPIO 0\nIt can also be used as I2C1 SDA\nBe aware that this pin has a fixed 1.8kohm pull up resistor to 3.3v."],
    ["5 volts", "5v."],
    ["g.p.i.o 3 or wiring pi 9", "GPIO 3 or Wiring Pi 9\nOn very early rev 1 Pis it is GPIO 1\nIt can also be used as I2C1 SCL\nBe aware that this pin has a fixed 1.8kohm pull up resistor to 3.3v."],
    ["ground", "ground."],
    ["g.p.i.o 4 or wiring pi 7", "GPIO 4 or Wiring Pi 7\nIt is also the 1-wire interface pin"],
    ["g.p.i.o 14 or wiring pi 15", "GPIO 14 or Wiring Pi 15\nIt can also be used for UART0 TXD"],
    ["ground", "ground."],
    ["g.p.i.o 15 or wiring pi 16", "GPIO 15 or Wiring Pi 16\nIt can also be used for UART0 RXD"],
    ["g.p.i.o 17 or wiring pi 0", "GPIO 17 or Wiring Pi 0\nIt can also be used as SPI1 CE1"],
    ["g.p.i.o 18 or wiring pi 1", "GPIO 18 or Wiring Pi 1\nIt can also be used as PWM0\nIt can also be used as SPI1 CE0"],
    ["g.p.i.o 27 or wiring pi 2", "GPIO 27 or Wiring Pi 2\nOn very early rev 1 pies it is GPIO 21"],
    ["ground", "ground."],
    ["g.p.i.o 22 or wiring pi 3", "GPIO 22 or Wiring Pi 3"],
    ["g.p.i.o 23 or wiring pi 4", "GPIO 23 or Wiring Pi 4"],
    ["3 point 3 volts.", "3.3v."],
    ["g.p.i.o 24 or wiring pi 5", "GPIO 24 or Wiring Pi 5"],
    ["g.p.i.o 10 or wiring pi 12", "GPIO 10 or Wiring Pi 12\nIt can also be used as SPI0 MOSI"],
    ["ground", "ground."],
    ["g.p.i.o 9 or wiring pi 13", "GPIO 9 or Wiring Pi 13\nIt can also be used as SPI0 MISO"],
    ["g.p.i.o 25 or wiring pi 6", "GPIO 25 or Wiring Pi 6"],
    ["g.p.i.o 11 or wiring pi 14", "GPIO 11 or Wiring Pi 14\nIt can also be used as SPI0 SCLK"],
    ["g.p.i.o 8 or wiring pi 10", "GPIO 8 or Wiring Pi 10\nIt can also be used as SPI0 CE0"],
    ["ground", "ground."],
    ["g.p.i.o 7 or wiring pi 11", "GPIO 7 or Wiring Pi 11\nIt can also be used as SPI0 CE1"],
    ["reserved for eye squared sea communication with an e e prom", "generally reserved for I2C communication with an EEPROM.\n It can be used as I2C0 SDA\nBe aware that this pin has a fixed 1.8kohm pull up resistor to 3.3v."],
    ["reserved for eye squared sea communication with an e e prom", "generally reserved for I2C communication with an EEPROM.\n It can be used as I2C0 SCL\nBe aware that this pin has a fixed 1.8kohm pull up resistor to 3.3v."],
    ["g.p.i.o 5 or wiring pi 21", "GPIO 5 or Wiring Pi 21"],
    ["ground", "ground."],
    ["g.p.i.o 6 or wiring pi 22", "GPIO 6 or Wiring Pi 22"],
    ["g.p.i.o 12 or wiring pi 26", "GPIO 12 or Wiring Pi 26"],
    ["g.p.i.o 13 or wiring pi 23", "GPIO 13 or Wiring Pi 23\nIt can also be used as PWM1"],
    ["ground", "ground."],
    ["g.p.i.o 19 or wiring pi 24", "GPIO 19 or Wiring Pi 24\nIt can also be used as SPI1 MISO"],
    ["g.p.i.o 16 or wiring pi 27", "GPIO 16 or Wiring Pi 27\nIt can also be used as SPI1 CE2"],
    ["g.p.i.o 26 or wiring pi 25", "GPIO 26 or Wiring Pi 25"],
    ["g.p.i.o 20 or wiring pi 28", "GPIO 20 or Wiring Pi 28\nIt can also be used as SPI1 MOSI"],
    ["ground", "ground."],
    ["g.p.i.o 21 or wiring pi 29", "GPIO 21 or Wiring Pi 29\nIt can also be used as SPI1 SCLK"],
];

var wiringPi2Pin = [
    "11",
    "12",
    "13",
    "15",
    "16",
    "18",
    "22",
    "7",
    "3",
    "5",
    "24",
    "26",
    "19",
    "21",
    "23",
    "8",
    "10",
    null,
    null,
    null,
    null,
    "29",
    "31",
    "33",
    "35",
    "37",
    "32",
    "36",
    "38",
    "40",
    "27",
    "28"
];

var gpio2Pin = [
        "27",
        "28",
        "3",
        "5",
        "7",
        "29",
        "31",
        "26",
        "24",
        "22",
        "21",
        "19",
        "23",
        "32",
        "33",
        "8",
        "10",
        "36",
        "11",
        "12",
        "35",
        "38",
        "40",
        "15",
        "16",
        "18",
        "22"
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('AMAZON.HelpIntent');
    },
    'GetGpioFromPinNumber': function () {
        var pinSlot = this.event.request.intent.slots.physicalPin;
        var userPin;
        var pinName;
        var cardText;
        var speechOutput;
        var reprompt;
        if (pinSlot && pinSlot.value) {
            userPin = pinSlot.value.toLowerCase();
        }
        if (userPin === undefined || pin2name[(userPin - 1)] === undefined) {
            speechOutput = "I'm sorry, I didn't recognise the pin you asked for";
            reprompt = "Please try again";
            this.emit(':ask', speechOutput, reprompt);
        } else {
            speechOutput = "Physical pin " + userPin + " is " + pin2name[(userPin - 1)][0];
            cardText = "Physical pin " + userPin + " is " + pin2name[(userPin - 1)][1];
            pinName = "Physical Pin " + userPin;
            this.emit(':tellWithCard', speechOutput, pinName, cardText);
        }
    },
    'GetWiringPiPinNumber': function () {
        var wiringSlot = this.event.request.intent.slots.wiringPiPin;
        var userPin;
        var pinName;
        var cardText;
        var speechOutput;
        var reprompt;
        if (wiringSlot && wiringSlot.value) {
            userPin = wiringSlot.value.toLowerCase();
        }
        if (userPin === undefined || wiringPi2Pin[userPin] === undefined) {
            speechOutput = "I'm sorry, I didn't recognise the pin you asked for";
            reprompt = "Please try again";
            this.emit(':ask', speechOutput, reprompt);           
        } else if (userPin > 16 && userPin < 21) {
            speechOutput = "Wiring Pi " + userPin + " is not available on the 40 pin header";
        } else {
            speechOutput = "Wiring Pi " + userPin + " is physical pin " + wiringPi2Pin[userPin];
        }
        pinName = "Wiring Pi " + userPin;
        cardText = speechOutput;
        this.emit(':tellWithCard', speechOutput, pinName, cardText);
    },
    'GetGpioPinNumber': function () {
        var gpioSlot = this.event.request.intent.slots.gpioPin;
        var userPin;
        var pinName;
        var cardText;
        var speechOutput;
        var reprompt;
        if (gpioSlot && gpioSlot.value) {
            userPin = gpioSlot.value.toLowerCase();
        }
        if (userPin === undefined || gpio2Pin[userPin] === undefined) {
            speechOutput = "I'm sorry, I didn't recognise the pin you asked for";
            reprompt = "Please try again";
            this.emit(':ask', speechOutput, reprompt);           
        }
        speechOutput = "g.p.i.o " + userPin + " is physical pin " + gpio2Pin[userPin];
        pinName = "GPIO " + userPin;
        cardText = "GPIO " + userPin + " is physical pin " + gpio2Pin[userPin];
        if (userPin < 2) {
            cardText = cardText + "\nThis pin is generally reserved for I2C communication with an EEPROM.";
        }
        if (userPin < 4) {
            cardText = cardText + "\nBe aware that this pin has a fixed 1.8kohm pull up resistor to 3.3v.";
        }
        this.emit(':tellWithCard', speechOutput, pinName, cardText);
    },
    'GetThreeVPinNumber': function () {
        var speechOutput = "3 point 3 volts is on physical pin 1 and physical pin 17";
        var pinName = "3.3V";
        var cardText = "3.3v is on physical pin 1 and 17";
        this.emit(':tellWithCard', speechOutput, pinName, cardText);
    },
    'GetFiveVPinNumber': function () {
        var speechOutput = "5 volts is on physical pin 2 and physical pin 4";
        var pinName = "5V";
        var cardText = "5v is on physical pin 2 and 4";        
        this.emit(':tellWithCard', speechOutput, pinName, cardText);
    },
    'GetGroundPinNumber': function () {
        var speechOutput = "Ground is on physical pins 6, 9, 14, 20, 25, 30, 34 and 39.";
        var pinName = "Ground";
        var cardText = "Ground is on physical pins 6, 9, 14, 20, 25, 30, 34 and 39.\nThe Ground pins on the Raspberry Pi are all electrically connected, so it doesn't matter which one you use if you're wiring up a voltage supply.\nGenerally the one that's most convenient or closest to the rest of your connections is tidier and easier, or alternatively the one closest to the supply pin that you use.\nFor example, it's a good idea to use Physical Pin 17 for 3v3 and Physical Pin 25 for ground when using the SPI connections, as these are right next to the important pins for SPI0.";
        this.emit(':tellWithCard', speechOutput, pinName, cardText);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can ask for what's on a physical pin, where a wiring pi pin is, where a g.p.i.o pin is, where power pins are, like five volts, three point three volts and ground, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'SessionEndedRequest':function () {
        console.log('session ended!');
    },
    'Unhandled': function () {
        this.emit(':ask','I\'m sorry, but I\'m not sure what you asked me... What can I help you with?');
    } 
};
