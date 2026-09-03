# RFID Testing and Validation

## Objective

To test the RFID-based ambulance identification mechanism used in the smart traffic management system.

## RFID Module

The MFRC522 RFID reader is used to read the RFID tag assigned to the ambulance.

## Testing Procedure

1. Power on the Arduino-based traffic signal system.
2. Observe the normal traffic signal sequence.
3. Bring the authorized RFID ambulance tag near the MFRC522 reader.
4. Check whether the RFID reader detects the tag.
5. Observe the traffic signal response after detection.
6. Verify that the green signal is provided for ambulance clearance.
7. Verify the buzzer alert.
8. Observe the corresponding information displayed on the LCD.

## Expected Result

When the authorized ambulance RFID tag is detected, the system should provide priority to the ambulance by activating the green traffic signal and providing an alert.

## Validation

The RFID-based ambulance detection and priority mechanism were tested on the assembled traffic signal model.

## Individual Contribution

My contribution to the project focuses on the RFID and hardware section. I worked on understanding the MFRC522 RFID module, its connection with the Arduino controller, RFID tag detection, and validation of the ambulance-priority response.
