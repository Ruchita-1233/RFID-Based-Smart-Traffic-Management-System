# IoT Communication Architecture

## Objective

The communication architecture defines the planned flow of
emergency-event information from the RFID-based traffic controller
to the backend application.

## Planned Architecture

```text
+----------------------+
|     RFID Reader      |
|      MFRC522         |
+----------+-----------+
           |
           | RFID Detection
           v
+----------------------+
|      Arduino UNO     |
|  Traffic Controller  |
+----------+-----------+
           |
           | Emergency Event
           v
+----------------------+
|        ESP32         |
|  Wi-Fi Communication |
+----------+-----------+
           |
           | Structured Event Data
           | over Wi-Fi
           v
+----------------------+
|    Backend Server    |
|   Event Processing   |
+----------+-----------+
           |
           v
+----------------------+
| Database / Dashboard |
+----------------------+
