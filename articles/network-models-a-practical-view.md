---
title: "Network-Models-A-Practical-View"
date: "2025-04-16T19:15:05"
---

# Network Models: A Practical View

## Example: Accessing `https://www.example.com` (Simplified Top-Down)

1.  **Application Layer:**
    * You use a **Browser** (Application).
    * Browser needs the IP for `www.example.com`, so it uses **DNS** (Application protocol, often using UDP).
    * Browser uses **HTTPS** (Application protocol: HTTP over TLS/SSL) to request the webpage securely. TLS/SSL handles encryption (OSI Presentation/Session aspects).

2.  **Transport Layer:**
    * **TCP** (Transport protocol) is used for the HTTPS request/response to ensure reliable, ordered delivery.
    * TCP establishes a connection (3-way handshake) to the server's IP on **port 443** (standard HTTPS port).
    * Data (encrypted HTTP request) is broken into **TCP Segments**, adding sequence numbers.

3.  **Network / Internet Layer:**
    * **IP** (Network/Internet protocol) takes TCP segments and adds source/destination IP addresses, creating **IP Packets**.
    * IP handles logical addressing and routing across networks towards the destination server.

4.  **Data Link Layer:**
    * The IP packet is passed to the Data Link layer for transmission on the local network (e.g., **Ethernet**, **Wi-Fi**).
    * The packet is encapsulated into a **Frame**, adding source/destination **MAC Addresses**. (Destination MAC is often the local router's).
    * **ARP** might be used to find the router's MAC address if not cached.

5.  **Physical Layer:**
    * The Frame (sequence of bits) is converted into **physical signals** (e.g., electrical signals for Ethernet cable, radio waves for Wi-Fi).
    * Signals are transmitted over the **physical medium** (e.g., copper cable, air).

## Layer Model Comparison Table

| Layer (Conceptual)    | OSI Model (7 Layers)      | TCP/IP Model (5 Layers) | TCP/IP Model (4 Layers)     | Examples from Scenario                             | Data Unit (Typical) |
| :-------------------- | :------------------------ | :---------------------- | :-------------------------- | :------------------------------------------------- | :------------------ |
| Application Data      | Application Layer         | Application Layer       | Application Layer           | Browser, HTTP/HTTPS, DNS, TLS/SSL (Encryption)     | Data                |
|                       | Presentation Layer        | (In Application)        | (In Application)            |                                                    |                     |
|                       | Session Layer             | (In Application)        | (In Application)            |                                                    |                     |
| End-to-End Transport  | Transport Layer           | Transport Layer         | Transport Layer             | TCP (reliability, ports), UDP (for DNS)            | Segment (TCP/UDP)   |
| Network Routing       | Network Layer             | Network Layer           | Internet Layer              | IP (addressing, routing), IP Addresses             | Packet              |
| Local Network Delivery| Data Link Layer           | Data Link Layer         |                             | Ethernet, Wi-Fi, MAC Addresses, ARP, Frame         | Frame               |
| Physical Transmission | Physical Layer            | Physical Layer          | Network Interface / Link Layer| Electrical Signals, Radio Waves, Cables, Connectors| Bit                 |