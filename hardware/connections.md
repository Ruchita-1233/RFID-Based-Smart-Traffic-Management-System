
# Hardware Connections

## Arduino UNO to RFID Reader (MFRC522)

| MFRC522 Pin | Arduino UNO Pin |
|---|---|
| SDA / SS | D10 |
| SCK | D13 |
| MOSI | D11 |
| MISO | D12 |
| RST | D9 |
| GND | GND |
| 3.3V | 3.3V |

## Traffic Signal Connections

| Component | Arduino UNO Pin |
|---|---|
| Red LED | D7 |
| Yellow LED | D6 |
| Green LED | D5 |
| Buzzer | D2 |

## LCD Connection

The 16x2 LCD uses an I2C interface.

| LCD I2C Pin | Arduino UNO |
|---|---|
| VCC | 5V |
| GND | GND |
| SDA | SDA |
| SCL | SCL |

## Hardware Operation

The Arduino UNO acts as the main controller. The MFRC522 RFID reader reads the authorized ambulance RFID tag. When the registered tag is detected, the controller gives priority to the ambulance by activating the green traffic signal and the buzzer. The LCD displays the corresponding traffic status.

## Testing

The hardware connections were checked as part of the RFID and traffic-signal testing process. The assembled system was observed for RFID detection, traffic-light operation, LCD output and ambulance-priority indication.
