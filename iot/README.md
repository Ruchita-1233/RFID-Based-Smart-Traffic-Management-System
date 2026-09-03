# IoT & Communication Module

## Team Member

Nesha Sarika

## Module

IoT & Communication

## Current Project Phase

Communication architecture planning and event transmission design.

## Week 1: Communication Architecture Planning

The first week was dedicated to understanding how the hardware
would communicate with the software system. The ESP32 Wi-Fi module
was studied as the planned communication bridge between the
Arduino-based traffic controller and the backend application.

The information that should be transferred when an emergency
vehicle is detected was analyzed, including:

- Ambulance identification
- Signal status
- Timestamp
- Emergency priority event

Based on this analysis, the overall communication workflow was
planned for later implementation.

## Week 2: Event Transmission Design

During the second week, the structure of emergency-event
transmission over Wi-Fi was designed.

The planned communication process converts an RFID detection event
from the hardware into structured information that can later be
transmitted to the backend server.

The event information was defined to include essential ambulance
and traffic details. Communication requirements between the
hardware and backend were also reviewed with a focus on reliable
emergency-event transmission.

## Current Status

The IoT communication architecture and event transmission design
have been planned.

ESP32 integration, Wi-Fi communication, and backend connectivity
will be implemented during the integration phase.
