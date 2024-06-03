---
title: Erlang's Theory
date: "2024-02-26T15:15:47"
---
## Erlang Queuing Models

### Erlang B Model
- **Purpose**: finite number of servers, no waiting space.
- **Characteristic**: All arriving jobs that find all servers busy are immediately blocked and lost (cleared from the system).
- **Application**: Commonly used in telecommunication systems to determine the number of circuits required to handle a given call volume with a certain quality of service.

### Erlang C Model
- **Purpose**: finite number of servers, infinite waiting space.
- **Characteristic**: Jobs that find all servers busy will wait in an infinite queue.
- **Application**: Used in call centers to calculate the probability of a caller having to wait and the expected waiting time, helping to determine the necessary staffing levels for a desired service level.

### Erlang A Model
- **Purpose**: finite number of servers, the possibility of customers abandoning the queue if the wait is too long.
- **Characteristic**: Adds customer impatience to the Erlang C model.
- **Application**: Useful in environments where customer patience is a significant factor, such as in call centers where callers may hang up if not served within a certain timeframe.

Each model provides a framework for understanding how different system designs will perform under various conditions, allowing businesses to plan and allocate resources effectively.
