---
title: Queueing Theory - Review
date: "2024-02-23T15:58:08"
---
## Two basic types
1. **Delay**: If $\rho < 1$, no delay, no loss, arrive rate = throughput

2. **Loss**: When arrive rate > throughput, there is loss. Now $\lambda > \gamma$, $\gamma = \lambda (1-P_B)$, $N = \gamma T$

## Fuctions
- Number in the system: $N$
- Time in the system: $T$
- Number in the waiting queue: $N_q$
- Time in the waiting queue: $W$
- Probability of blocking: $P_B$
- Average offered arrival rate: $\lambda$
- Average serving rate: $\mu$
- Average carried arrival rate: $\gamma = \lambda (1- P_B)$ 
- Time in system and queue (1 customer 1 server): $T = W + \frac{1}{\mu}$
- Number in the system: $N = \lambda T = \lambda W + \lambda / \mu$


### Infinite system (1 server):
- Little's law: $N = \lambda T$
- $N = \frac{\rho}{1 - \rho} = N_q + \rho$
- $T = \frac{1}{\mu (1 - \rho)}= \frac{1}{\mu- \lambda}$
- $N_q = \rho \frac{\rho}{1 - \rho}$
- $W = \rho \frac{1}{\mu (1 - \rho)}$

### Finite system:
- Little's law: $N = \gamma T$
- $N = \frac{\rho + (\rho n - n - 1)\rho^{n+1}}{(1 - \rho^{n+1})(1 - \rho)}$
- $T = \frac{1/\mu \sum_{i=0}^{n-1} (i + 1) P_i}{1 - P_B}$
- $efficiency = \frac{\gamma}{\mu} = \frac{\lambda (1-P_B)}{\mu}$

- In a loss system like the M/M/1/n queue we have :
  $$ P_B = P_n = \frac{(1 - \rho) \rho^n}{1 - \rho^{n+1}} $$

- Suppose that the offered load is twice the service rate and $n = 5$, what efficiency do we have ?

  $$ \lambda = 2\mu \; \rho = 2 \; P_B = \frac{(1 - \rho)^(2^5)}{1 - 2^6} = \frac{32}{63} $$

  $$ efficiency = \frac{\gamma}{\mu} = \frac{\lambda(1 - P_B)}{\mu} = 2(1 - \frac{32}{63}) = 98.4\% $$

## How we get average number in the system (N)
<br>

$$N = \sum_{i=0}^{\infty} i P_i = \sum_{i=0}^{\infty} i \rho^i P_0 = P_0 \sum_{i=0}^{\infty} i \rho^i$$

$$\sum_{i=0}^{\infty} i \rho^i = \rho \frac{d}{d \rho} \sum_{i=0}^{\infty} \rho^i$$


### Infinite system:
<br>

$$\sum_{i=0}^{\infty} i \rho^i = \rho \frac{d}{d \rho} \sum_{i=0}^{\infty} \rho^i = \rho \frac{d}{d \rho} \frac{1}{1 - \rho} = \frac{\rho}{(1 - \rho)^2}$$

$$N = P_0 \frac{\rho}{(1 - \rho)^2} = (1 - \rho) \frac{\rho}{(1 - \rho)^2} = \frac{\rho}{1 - \rho}$$


### Finite system
<br>

$$N = P_0 \rho \frac{d}{d \rho} \sum_{i=0}^{n} \rho^i$$

$$P_0 = \frac{1 - \rho}{1 - \rho^{n+1}}$$

$$\sum_{i=0}^{n} \rho^i = \frac{1 - \rho^{n+1}}{1 - \rho}$$

$$N = \frac{1 - \rho}{1 - \rho^{n+1}} \rho \frac{d}{d \rho} \frac{1 - \rho^{n+1}}{1 - \rho}$$

$$N = \frac{1 - \rho}{1 - \rho^{n+1}} \rho \left( -(n + 1)\rho^n(1 - \rho) + \frac{(1 - \rho^{n+1})}{(1 - \rho)^2} \right)$$

$$N = \frac{\rho (1 - (n + 1)\rho^n + n\rho^{n})}{(1 - \rho^{n+1})(1 - \rho)} = \frac{\rho + (\rho n - n - 1)\rho^{n+1}}{(1 - \rho^{n+1})(1 - \rho)}$$

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
