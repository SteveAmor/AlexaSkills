## Invocation Name

g.p.i.o info

## Intent Schema
```
{
  "intents": [
    {
      "intent": "GetGpioFromPinNumber",
      "slots": [
        {
          "name": "physicalPin",
          "type": "physicalPinNumber"
        }
      ]
    },
    {
      "intent": "GetWiringPiPinNumber",
      "slots": [
        {
          "name": "wiringPiPin",
          "type": "wiringPiPinNumber"
        }
      ]
    },
    {
      "intent": "GetThreeVPinNumber"
    },
    {
      "intent": "GetFiveVPinNumber"
    },
    {
      "intent": "GetGroundPinNumber"
    },
    {
      "intent": "AMAZON.HelpIntent"
    },
    {
      "intent": "AMAZON.StopIntent"
    },
    {
      "intent": "AMAZON.CancelIntent"
    }
  ]
}
```

## Slots

### physicalPinNumber
```
one
two
three
four
five
six
seven
eight
nine
ten
eleven
twelve
thirteen
fourteen
fifteen
sixteen
seventeen
eighteen
nineteen
twenty
twenty one
twenty two
twenty three
twenty four
twenty five
twenty six
twenty seven
twenty eight
twenty nine
thirty
thirty one
thirty two
thirty three
thirty four
thirty five
thirty six
thirty seven
thirty eight
thirty nine
forty
```

### wiringPiPinNumber
```
zero
one
two
three
four
five
six
seven
eight
nine
ten
eleven
twelve
thirteen
fourteen
fifteen
sixteen
seventeen
eighteen
nineteen
twenty
twenty one
twenty two
twenty three
twenty four
twenty five
twenty six
twenty seven
twenty eight
twenty nine
thirty
thirty one
```

## Sample Utterances
```
GetGpioFromPinNumber what is on pin {physicalPin}
GetGpioFromPinNumber what is pin {physicalPin}
GetGpioFromPinNumber what's on pin {physicalPin}
GetGpioFromPinNumber what's pin {physicalPin}
GetGpioFromPinNumber pin {physicalPin}
GetGpioFromPinNumber what is on physical pin {physicalPin}
GetGpioFromPinNumber what is physical pin {physicalPin}
GetGpioFromPinNumber what's on physical pin {physicalPin}
GetGpioFromPinNumber what's physical pin {physicalPin}
GetGpioFromPinNumber physical pin {physicalPin}
GetWiringPiPinNumber where is wiring pi {wiringPiPin}
GetWiringPiPinNumber where wiring pi {wiringPiPin} is
GetWiringPiPinNumber where's wiring pi {wiringPiPin}
GetWiringPiPinNumber wiring pi {wiringPiPin}
GetWiringPiPinNumber where is wiring pi pin {wiringPiPin}
GetWiringPiPinNumber where's wiring pi pin {wiringPiPin}
GetWiringPiPinNumber wiring pi pin {wiringPiPin}
GetThreeVPinNumber where's three point three volts
GetThreeVPinNumber where is three point three volts
GetThreeVPinNumber where three point three volts is
GetThreeVPinNumber what pin is three point three volts on
GetThreeVPinNumber what are the three point three volt pins
GetThreeVPinNumber what physical pin is three point three volts on
GetThreeVPinNumber what are the three point three volt physical pins
GetFiveVPinNumber where's five volts
GetFiveVPinNumber where is five volts
GetFiveVPinNumber where five volts is
GetFiveVPinNumber what pin is five volts on
GetFiveVPinNumber what are the five volt pins
GetFiveVPinNumber what physical pin is five volts on
GetFiveVPinNumber what are the five volt physical pins
GetGroundPinNumber where's ground
GetGroundPinNumber where is ground
GetGroundPinNumber where ground is
GetGroundPinNumber what pin is ground on
GetGroundPinNumber what are the ground pins
GetGroundPinNumber what physical pin is ground on
GetGroundPinNumber what are the ground physical pins
```
