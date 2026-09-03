
# Hardware Components

## Project
RFID-Based Smart Traffic Management System

## Components Used

| Component | Purpose |
|---|---|
| Arduino UNO | Main controller of the traffic signal system |
| MFRC522 RFID Reader | Detects and reads the RFID tag assigned to the ambulance |
| RFID Tag / Key Fob | Represents the authorized ambulance RFID tag |
| Red LED | Indicates STOP signal |
| Yellow LED | Indicates WAIT/transition state |
| Green LED | Indicates GO signal |
| 16x2 LCD with I2C | Displays traffic signal status and countdown |
| Buzzer | Provides an alert when ambulance priority is activated |
| Jumper Wires | Used for electrical connections between modules |
| USB Cable | Used for programming and powering the Arduino during testing |

## Hardware Responsibility

My individual contribution focuses on the hardware and RFID module of the project.

The hardware work includes:
- Identifying and organizing the required hardware components.
- Understanding the connections between the Arduino UNO and peripheral modules.
- Working with the MFRC522 RFID reader.
- Testing the RFID ambulance tag detection.
- Observing the traffic signal response when the authorized RFID tag is detected.
- Verifying the LCD and buzzer response during the ambulance-priority operation.
- Documenting the hardware setup for project development and testing.

## RFID Function

The RFID reader is used to identify an authorized ambulance tag. When the registered RFID tag is detected, the system provides priority to the ambulance by activating the green traffic signal and alerting through the buzzer.

## Hardware Testing

The assembled model was tested to verify:
1. RFID reader detects the ambulance tag.
2. Traffic signal changes according to the programmed sequence.
3. Ambulance detection activates the priority green signal.
4. LCD displays the corresponding traffic status.
5. Buzzer provides an alert during ambulance priority.
