---
title: Performance Engineering Intro
date: "2024-06-03T11:26:19"
---

## What does performance mean?
### measures
- response time
- throughput
- efficiency
- users' QoE(Quality of Experience)

### goals
- **Best** performance for a **Given cost**
- **Acceptable** performance at **Minimum cost**
- **Performance/cost trade-off** determination for each of a number of alternatives
- **Find and fix** Perfermance problems
- **When and How** the system should be modified/upgraded so that its performance remains **acceptable**
- etc...

## How to measure performance?
### meaningful metrics
- user response time
- component metrics that explain it
- etc...

### reproducibility
- machine configuration
- cluster/network/database configuration
- user input/requests

### real applications benchmark
- **SPEC** (Standard Performance Evaluation Corporation)
- **TPC** (Transaction Processing Performance Council)

### simulation & modelling
- long execution runs, with warm start to mimic steady-state behaviour
- usually, application only, sometimes OS simulation
- internal checks & simulator "validation" for accuracy

## Why is performance evaluation difficult?
- no goals for the performance study: goals are unclear, biased
- unsystematic approach: arbitrary parameter and workload values
- inappropriate performance metrics: not related to user's QoE
- unrealistic workload
- inappropriate level of detail in the model
- no analysis/incorrect analysis: simulation run too short
- ignoring variability, or future possibilities
- inaapropriate presentation of results
- etc...

## An example of misleading performance results
<figure align="center">
  <img src="assets/images/PE-note-0/image1.png" alt="Alt text" width="100%">
  <figcaption>'wrt' means 'with respect to' here</figcaption>
</figure>

## Systematic approach to performance evaluation
- State goals of the study and define system scope
- Define system services and possible outcomes of user requests
- Select performance metric(s)
- Identify system parameters that affect performance
  - Select which parameters are variable
- Select evaluation technique(s)
  - Analytical modelling
  - Simulation/emulation
  - Experimental (real system/prototype)
- Select workload(s) to be studied
- Design experiments
- Analyse and interpret the data (statistical techniques)
- Present the results in an understandable manner
