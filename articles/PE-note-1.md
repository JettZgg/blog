---
title: Queueing Theory
date: "2024-01-28T21:59:19"
---

## System Flow
<figure align="center">
  <img src="assets/images/image-15.png" alt="Alt text" width="100%">
  <figcaption>System Flow</figcaption>
</figure>

- Arrival process, $\lambda$ average rate
- Queue process, method, size
- Service process, $\mu$ average rate
- Arrival and service processes are stochastic (random with probabilities)

## Stable system in steay state
Average input rate = Average output rate

## John Little's Law
- The average number of customers stored in a system is equal to the product of the **average arrival rate** to the system and the **average time spent in the system**.
- N = $\lambda$ T

## State in queueing system
- A queueing systems can be thought of having a number of states
- State 0 is when the system is empty
- State 1 means that there is 1 customer in the system 
- State n means that there are n customers in the system
- If $\lambda$  is the arrival rate then the probability of getting 1 arrival in a very short time interval $d$ is $\lambda$ $d$. Also if the departure rate is $\mu$  then the probability of getting 1 departure in a very short time interval $d$ is $\mu$ $d$.
<figure align="center">
  <img src="assets/images/image-16.png" alt="Alt text" width="100%">
  <figcaption>State Flow</figcaption>
</figure>

## Probability of a finite Queueing System
- The long term probability of being in any state $S_n$ is defined by $P_n$. If this is in steady state, then we can cut the chain at any point and balance the flows in each direction.
<figure align="center">
  <img src="assets/images/image-17.png" alt="Alt text" width="60%">
  <figcaption>The flow balance equations</figcaption>
</figure>


- We notice that the dependency on $d$ is gone.
- We also see that the dependency on the actual values of $\lambda$ and $\mu$ are gone and all that matters is the ratio of them, or $\rho = \frac{\lambda}{\mu}$.
- We need 1 more equation to solve this and we get it from the fact that we must be in a state at every time, or the sum of the probabilities must be 1.

<div align="center">
$1 = P_0 + P_1 + P_2 + \ldots + P_{n-1} + P_n$
</div>
<div align="center">
$1 = P_0 + \rho P_0 + \rho^2 P_0 + \ldots + \rho^{n-1} P_0 + \rho^n P_0$
</div>
<div align="center">
$P_0 = \frac{1}{1 + \rho + \rho^2 + \ldots + \rho^{n-1} + \rho^n}$
</div>
<br>

<div align="center">
$\sum_{i=0}^{n} \rho^i = \sum_{i=0}^{\infty} \rho^i - \sum_{i=n+1}^{\infty} \rho^i = \frac{1}{1 - \rho} - \frac{\rho^{n+1}}{1 - \rho} = \frac{1 - \rho^{n+1}}{1 - \rho} ; \quad \rho < 1$
</div>
<br>

<div align="center">
$P_0 = \frac{1 - \rho}{1 - \rho^{n+1}}$
</div>
<div align="center">
$P_1 = \rho P_0 = \frac{\rho(1 - \rho)}{1 - \rho^{n+1}}$
</div>
<div align="center">
$P_i = \rho^i P_0 = \frac{\rho^i(1 - \rho)}{1 - \rho^{n+1}}$
</div>
<div align="center">
$P_n = \rho^n P_0 = \frac{\rho^n(1 - \rho)}{1 - \rho^{n+1}}$
</div>
<br>

- In a finite queue, the blocking probability, denoted as $P_B$, is the probability that the queue has reached its capacity limit, which is the same as the probability of there being $n$ customers, expressed as $P_B = P_n$.
- For an infinite queue, there is no blocking, meaning customers are never turned away, thus the system's equations will not include loss terms.

## Probability of an infinite Queueing System
<br>
<div align="center">
$P_0 = \frac{1}{1 + \rho + \rho^2 + \dots} = 1 - \rho$
</div>
<div align="center">
$P_1 = \rho P_0 = \rho (1 - \rho)$
</div>
<div align="center">
$P_i = \rho^i P_0 = \rho^i (1 - \rho)$
</div>
<br>

- There is no loss in this system and the queue could be unstable if $\rho \geq 1$. In fact for $\rho = 1$ the equations that we have derived do not hold.
- Once we have found the state probabilities we can then find out any information that we want from the system.

## Why a queueing system is unstable when $\rho \geq 1$
Consider a small café where customers arrive randomly and a single barista serves them, similar to an M/M/1 queue model.

- **Poisson Process**: Suppose the café averages 30 customers per hour, denoted as $\lambda = 30$. This arrival rate is modeled as a Poisson process, indicating that customer arrivals are random and independent over time.

- **Exponential Distribution**: The barista serves at an average rate of one customer every 2 minutes, which translates to a service rate of $\mu = 30$ customers per hour. The service times follow an exponential distribution, meaning the actual time to serve each customer varies randomly around the 2-minute average.

- **Traffic Intensity**: Traffic intensity $\rho$ is the ratio of the arrival rate ($\lambda$) to the service rate ($\mu$). If $\rho = 1$, it suggests that the barista can just keep up with the customer arrivals on average.

- **Implications of $\rho = 1$**: Although it may seem balanced, random fluctuations can lead to times when customer arrivals outpace service, causing a queue build-up. Without additional capacity to handle sudden surges, the system can become unstable, unable to consistently clear the queue.

- **Stable System for $\rho < 1$**: If $\rho$ is less than 1, the system has the capacity to deal with peaks in demand, allowing the barista to catch up during less busy periods, leading to a stable queue length over time.


## Calculation of average number and wait time
- **$N$**: average number in the system
- **$N_q$**: average number in the queue
- **T**: average waiting time in the system
- **W**: average waiting time in the queue
- **S**: average serving time in the queue

### In the infinite system
<div align="center"> 
$N = \sum_{i=0}^{\infty} i P_i = \frac{\rho}{1 - \rho}$
</div>
<br>

### In the finite system
<div align="center"> 
$N = \sum_{i=0}^{n} i P_i = \frac{\rho + (\rho n - n - 1)\rho^{n+1}}{(1 - \rho^{n+1})(1 - \rho)}$
</div>
<br>

### Queueing result
- A non-linear curve
<figure align="center">
  <img src="assets/images/image-18.png" alt="Alt text" width="100%">
  <figcaption>Queueing result</figcaption>
</figure>

### Two types of arrivals
- **Offered Arrival Rate ($\lambda$)**: The average rate of customer arrivals per time unit, regardless of whether they are served or not.

- **Carried Arrival Rate ($\gamma$)**: The actual rate of customer arrivals that are served per time unit. This rate may be lower than $\lambda$ if the system is at full capacity and arriving customers are turned away.

- **Relationship between $\lambda$ and $\gamma$**: They are linked by the blocking probability ($P_B$), which is the chance that a customer is rejected. The carried rate $\gamma$ equals the offered rate $\lambda$ times the probability that a customer is not blocked, given by $(1 - P_B)$.

<div align="center"> 
$\gamma = \lambda (1 - P_B)$
</div>
<br>
<div align="center"> 
$ \text{efficiency} = \frac{\gamma}{\mu} = \rho (1 - P_B) $
</div>
<br>

### Waiting in the finite system
- **T** in S0: $1/\mu$ (only serving time **S**)
- **T** in S1: $2/\mu$ (waiting time **W** and serving time **S**)
- So on and so forth
- So we can get: $ N = \lambda T = \lambda W + \lambda/\mu$

<figure align="center">
  <img src="assets/images/image-19.png" alt="Alt text" width="100%">
  <figcaption>T in the finite system</figcaption>
</figure>

## State dependent queues
- Image there are M services, so the maximum service rate is $M\mu$
- If n services are in use, then the current service rate is $n\mu$
- Rather than having M servers it is always better to have 1 server at M times the rate of the previous one (due to the simplicity of managing a single server and perhaps the reduction in overhead). However this is not always possible to do.
- Always better to have a single queue rather than have multiple queues, reasons:
  - **Load Balancing**: In a single queue model, all servers fetch tasks from the same queue, which means every server has an equal chance to get the next task. This method can more evenly distribute the load, reducing the time any server is idle.
  - **Dynamic Adjustment**: If a server processes requests faster than others, it can handle more requests in a row. This avoids congestion issues that may arise from servers fixed to certain queues working more slowly.
  - **Reduced Waiting Time**: Tasks are handled by the first available server, which can reduce the average waiting time for clients or tasks, thereby improving overall efficiency and response speed.
  - **Simplified Management**: Managing one queue is simpler than managing multiple queues. In complex distributed systems, simplifying the design can reduce errors and management overhead.

- There might be practical limitations or specific use cases where multiple queues are necessary or more efficient.

## Kendall Notation
1. Arrival distribution
2. Service distribution
3. Number of servers

Distribution types:
1. Memoryless, or Markovian (M) process, that is equivalent to one with Poisson statistics.
2. Deterministic (D) where there is no randomness, fixed service or inter-arrival times.
3. General (G) where it does not fit one of the other known process.
4. E (Erlang Distribution), H (Hyperexponential or Heavy-tailed Distribution) and other extensions

Examples:
- M/G/1 is Markov arrivals, General service and single server
- D/M/2 is Deterministic arrivals, Markov service and 2 servers

Extensions:
- If the System is Finite with say k places, then we use M/G/1/k or D/M/2/k (k is the maximum customers number the system can hold)

## Full Kendall Notation
1. Arrival process
2. Service process
3. Number of servers
4. Queue capacity (default infinite) 
5. Population size (default infinite) 
6. Queueing discipline (default FIFO)

Example:
**M/M/5/40/1200/LCFS-PR** is Markov arrivals and service with 5 servers, 35 other waiting places and a possible population of 1200, and Last Come First Served with Preemptive interrupt and Resume
