---
title: "Projects"
date: "2024-04-14T03:52:50"
---

## [Online Japanese Shrine](https://www.eshrine.org)
<figure align="center">
  <img src="assets/images/projects/1.png" alt="Alt text" width="80%">
  <figcaption>Screenshot of Eshrine Page</figcaption>
</figure>
Designed and implemented a microservice-based Japanese-style community platform. Built with Next.js frontend and Go backend implementing RESTful APIs. Features include infinite scroll with virtual list technology, Zustand for state management, and secure authentication with AWS Cognito and JWT-based middleware to prevent CSRF attacks.

## [Fast P2P Chat](https://www.p2pchat.org)
<figure align="center">
  <img src="assets/images/projects/2.png" alt="Alt text" width="80%">
  <figcaption>Index Page</figcaption>
</figure>
<figure align="center">
  <img src="assets/images/projects/3.png" alt="Alt text" width="80%">
  <figcaption>Screenshot of Chat Room</figcaption>
</figure>
Developed a peer-to-peer chat application utilizing WebRTC for direct browser-to-browser communication. The frontend interface shows peer connection states and network diagnostics, while WebRTC signaling with ICE/STUN protocols enables direct P2P connectivity. Implemented Redis caching to reduce message delivery latency and improve system responsiveness.

## [GeoTraceroute - Network Path Visualization Tool](https://github.com/jettzgg/geotraceroute)
<figure align="center">
  <img src="assets/images/projects/4.png" alt="Alt text" width="80%">
  <figcaption>Screenshot of Tracing 8.8.8.8</figcaption>
</figure>
Developed a network diagnostic tool for visualizing TCP/IP traceroute paths with geographic mapping and autonomous system identification. The tool implements asynchronous traceroute functionality with Python for TTL-based network hop discovery, and integrates MaxMind GeoIP and ASN databases to map network paths to geographic locations.

## [Job Applications Tracker](https://github.com/JettZgg/jobtracker)
<figure align="center">
  <img src="assets/images/projects/5.png" alt="Alt text" width="80%">
  <figcaption>My Tracker Example</figcaption>
</figure>
Developed a minimal, elegant job application tracking system with visualization tools to manage the job search process. Features include application status tracking, flow chart visualization using D3.js and D3-Sankey, filtering capabilities, and a Node.js CLI tool for managing applications from the command line. The system tracks applications through various recruitment stages and provides summary statistics to visualize job search progress.