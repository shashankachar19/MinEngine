# minEngine --- GATEWAYS 2026 Hackathon Context

> **Purpose of this file:** This document is the complete working
> context for the minEngine project during GATEWAYS 2026. It is intended
> to be shared with teammates and pasted into another ChatGPT session so
> development can continue without losing the reasoning, decisions,
> architecture, demo flow, product positioning, constraints, or future
> implementation plans established during the hackathon.

------------------------------------------------------------------------

# 1. Hackathon Context

## Event

**GATEWAYS 2026 \| Hackathon --- Christ University, Bangalore**

The hackathon has multiple domains and problem statements.

The team initially considered:

-   **Domain 3 --- Personal Productivity & Lifestyle**
    -   HumanTwin AI: The Intelligent Digital Twin of a Person
-   **Domain 4 --- Public Safety & Emergency Response**
    -   Crisis Command: The Multi-Agent Emergency Response & Resource
        Coordination Agent

The team decided to choose **Domain 4**.

## Official chosen problem statement

### Domain 4 --- Public Safety & Emergency Response

**Crisis Command: The Multi-Agent Emergency Response & Resource
Coordination Agent**

The official problem asks teams to build an agent system that can:

-   understand several incoming incidents;
-   assess severity, location, urgency and resource requirements;
-   coordinate specialised roles;
-   allocate limited emergency resources;
-   revise the response plan when a new incident occurs or a resource
    becomes unavailable;
-   explain why resources were reallocated;
-   flag situations requiring human attention or approval.

The official demo expectation is a simulated emergency, potentially
using team-created incidents/resources, with a change occurring
mid-scenario followed by a revised response plan and explanation.

------------------------------------------------------------------------

# 2. Hackathon Timeline / Constraints

Round 1 was the Ideation & Architecture submission.

Round 2 is the Development Phase.

Important practical constraint:

-   The MVP has roughly one overnight / approximately 24-hour
    development window.
-   The Round 2 submission will include a GitHub URL and deployed
    application URL.
-   Evaluators may open the website independently without the team being
    physically beside them.
-   Therefore, the website must be self-explanatory and should guide a
    first-time evaluator through the core demo.
-   Reliability is more important than implementing every component as a
    genuinely live AI system.
-   The prototype should demonstrate the **behavior and architecture**
    of the proposed production system while safely simulating data and
    operational events.

------------------------------------------------------------------------

# 3. Team

## Team Name

**minEngine**

The name represents the mining/high-risk-site context combined with an
intelligent operational engine.

Recommended public branding:

# minEngine

### Sense. Reason. Coordinate. Respond.

## Team Members

-   **Vaibhav MS** --- Product & AI Architecture Lead
-   **Misbah Anjum G** --- Research, UX & System Design Lead
-   **Shashank S** --- Lead Developer --- Backend, Agents & Integration

### Responsibility split

### Vaibhav

Owns: - product vision; - problem framing; - AI/agent architecture; -
technical direction; - business/product positioning; - final pitch; -
integration decisions; - overall system coherence.

### Misbah

Owns: - real-world problem research; - mining/safety context; - UX and
user journey; - command-center presentation; - documentation; - visuals
and presentation support; - translating technical behavior into
understandable judge-facing experiences.

### Shashank

Owns: - main implementation; - React/frontend; - backend; - simulation
engine; - agent orchestration; - database/API integration; -
deployment; - connecting all components into the final MVP.

------------------------------------------------------------------------

# 4. Final Product Vision

## minEngine

**AI Crisis Command & Digital Twin for High-Risk Sites**

minEngine is an AI-powered crisis-command layer for high-risk
environments, initially focused on open-cast mining/quarry safety.

The system creates a live operational digital twin of a site and
combines information from:

-   IoT sensors;
-   CCTV;
-   GPS/worker tracking;
-   vehicle tracking;
-   environmental information;
-   incident reports;
-   emergency resource availability.

Specialised agents assess incidents, understand who/what is at risk,
coordinate emergency resources, recommend evacuation actions, and
dynamically replan when the situation changes.

The system keeps a human operator in control of critical actions.

## Core philosophy

The system is NOT primarily:

-   a 3D visualization;
-   a chatbot;
-   a sensor dashboard;
-   an accident-prediction product.

The core product is:

> **An adaptive multi-agent emergency response orchestration layer over
> a digital twin.**

The digital twin is the shared operational context in which the agents
reason.

------------------------------------------------------------------------

# 5. Core Product Flow

Memorize this as the central product story:

# SENSE → UNDERSTAND → DECIDE → COORDINATE → VERIFY → REPLAN

### Sense

Collect signals from sensors, CCTV, GPS, workers, vehicles,
weather/environmental systems and manual reports.

### Understand

Determine: - what happened; - how severe it is; - who/what is at risk; -
what resources are available.

### Decide

Generate a response plan.

### Coordinate

Assign: - ambulances; - rescue teams; - safety teams; - drones; -
evacuation routes; - other resources.

### Verify

Check whether the response occurred and whether the situation is
improving.

### Replan

If a new incident occurs, a route becomes unsafe, a resource becomes
unavailable, or new information changes the situation, invalidate the
old plan and generate a revised plan.

------------------------------------------------------------------------

# 6. Why Mining / Quarry Safety?

Mining is the initial vertical because it gives the system a concrete,
high-risk environment where:

-   slope instability can occur;
-   heavy vehicles operate;
-   workers operate in hazardous zones;
-   emergency resources are limited;
-   multiple incidents can occur simultaneously;
-   response time matters;
-   sensors, CCTV and GPS can provide useful operational data;
-   safety decisions already depend on monitoring and formal procedures.

The team has also been influenced by real-world mining digital-twin/IoT
safety concepts encountered through industry exposure, including systems
that represent mining areas digitally, integrate sensors, monitor
ground/slope behavior, manage vehicle GPS and support safety operations.

The project should NOT claim to copy or reproduce an existing company's
product.

The differentiation is:

> Existing safety infrastructure can detect/monitor hazards. minEngine
> is the AI decision and coordination layer that turns those signals
> into an adaptive emergency response plan.

------------------------------------------------------------------------

# 7. Real-World Grounding

DGMS (Directorate General of Mines Safety) material was reviewed to
ground the idea in real Indian mining safety concerns.

Relevant observations from current DGMS material include:

-   DGMS maintains safety alerts for mining incidents.
-   Recent safety alerts include incidents involving tippers/trucks,
    equipment, falling sides and other mining hazards.
-   DGMS has discussed slope stability as an important concern in
    opencast mining.
-   DGMS has discussed real-time Slope Stability Radar (SSR) and advance
    warning for slope/dump failures.
-   DGMS safety material discusses monitoring and safety features for
    heavy earth-moving equipment.

Important positioning:

Do NOT claim: - minEngine is certified for mine safety; - minEngine
predicts mine collapses with certainty; - minEngine replaces
geotechnical experts; - minEngine prevents accidents.

Instead say:

> **Earlier detection plus faster coordination can create more time for
> evacuation and response.**

And:

> **minEngine is an AI command layer that helps safety personnel
> understand changing conditions and coordinate a response.**

For production, the platform would consume validated/certified
monitoring systems and operate within established mine-safety processes.

------------------------------------------------------------------------

# 8. Important Safety / Credibility Positioning

Do not overclaim.

Avoid: - "AI predicts exactly when a mine will collapse." - "AI prevents
mining accidents." - "AI automatically shuts down mines." - "AI knows
exactly how many people are injured."

Use: - "detects simulated sensor trends"; - "estimates operational
risk"; - "identifies potentially exposed personnel"; - "recommends
evacuation"; - "assists resource allocation"; - "supports safety
personnel"; - "flags uncertainty"; - "keeps humans in control."

For computer vision:

Instead of: \> "AI knows exactly how many people were injured."

Say: \> "The Vision Agent estimates how many people may be exposed and
provides situational context for resource planning."

Example: \> Estimated exposed personnel: 6 \> Potential casualties: 2--4

The system can recommend dispatching a certain number of medical units,
with human verification.

------------------------------------------------------------------------

# 9. The Core Innovation

The obvious solution to the problem is an emergency dashboard that shows
alerts.

minEngine goes further.

### Obvious system

Alert → Human checks → Human calls people → Human finds resources →
Human coordinates → Human updates plan

### minEngine

Signal → Situation understanding → Risk assessment → Resource assessment
→ Response plan → Human approval → Execution → Continuous reassessment →
Dynamic replanning

The central innovation is:

> **The system does not merely detect an emergency; it continuously
> reasons about the current operational state and adapts the response
> plan when the situation changes.**

This is why multi-agent orchestration is justified.

------------------------------------------------------------------------

# 10. The Most Important Demo Scenario

The complete demo should be built around one controlled story.

## Scene 1 --- Normal Operation

An open-cast mine is operating normally.

Example state:

-   42 workers;
-   11 heavy vehicles;
-   24 sensors;
-   2 ambulances;
-   2 rescue teams;
-   safe zones;
-   hazardous/operational zones;
-   CCTV feeds;
-   GPS/RTLS positions.

Digital twin is green.

Status:

-   Site: NORMAL
-   Workers: 42
-   Vehicles: 11
-   Active incidents: 0
-   Resources: available

------------------------------------------------------------------------

## Scene 2 --- Slope Movement

A simulated slope-monitoring sensor begins showing accelerating
displacement:

``` text
5 mm
 ↓
8 mm
 ↓
14 mm
 ↓
23 mm
```

Other simulated signals may include increasing vibration or rainfall.

The Risk Agent detects an accelerating trend.

System displays:

> HIGH-RISK SLOPE MOVEMENT DETECTED

Then:

> Zone B3 potentially unstable.

The system uses simulated worker/CCTV/GPS information and determines:

> 17 personnel potentially exposed.

------------------------------------------------------------------------

# 11. Existing Workflow vs minEngine

The purpose of this comparison is not to claim that all existing mine
operations are identical.

It is a conceptual prototype comparison.

## Conventional / manual coordination concept

Sensor alert → human verification → supervisor communication → locate
workers → contact emergency team → identify resources → coordinate
evacuation → update everyone manually

Potential problem: - information may be distributed across different
systems/people; - response coordination can require several manual
steps; - changing conditions can make the original plan outdated.

## minEngine concept

Sensor alert → signal fusion → risk assessment → personnel exposure
estimation → resource assessment → response recommendation → human
approval → coordinated response → continuous verification/replanning

Key benefit claim:

> **Earlier detection + faster coordination can create more time for
> evacuation and response.**

Do not claim exact real-world time savings unless measured in an actual
deployment.

------------------------------------------------------------------------

# 12. Response Plan --- First Incident

minEngine recommends:

-   evacuate Zone B3;
-   identify 17 exposed personnel;
-   stage Ambulance A;
-   dispatch Rescue Team 1;
-   restrict unsafe Route R4;
-   use a safe evacuation route;
-   deploy a drone for monitoring if available;
-   notify the safety officer.

The system presents:

> EVACUATION RECOMMENDED\
> 17 personnel potentially exposed\
> 1 safe route available\
> 1 rescue team assigned\
> 1 ambulance staged\
> Human approval required

The human operator clicks:

**Approve Response**

Then:

> Response plan activated.

------------------------------------------------------------------------

# 13. Hero Moment --- Situation Changes

After the first response begins:

## New incident

A truck (T07) overturns on another access road.

CCTV / Vision Agent reports:

> Vehicle incident detected.

Estimated:

> 3--4 personnel potentially exposed.

At the same time:

-   Ambulance A is already committed;
-   Route R4 is unsafe/restricted.

Therefore the original response plan is no longer valid.

The system should visibly show:

# RESPONSE PLAN INVALIDATED

Then:

# REPLANNING RESPONSE...

Agent states:

-   Risk Agent --- updated severity;
-   Vision Agent --- estimated exposure;
-   Resource Agent --- re-evaluated resources;
-   Evacuation Agent --- recalculated route;
-   Command Agent --- generating revised plan.

------------------------------------------------------------------------

# 14. Revised Response Plan

Example:

``` text
Ambulance B → Truck T07
Rescue Team 1 → Zone B3
Drone → Truck incident assessment
Route R4 → BLOCKED
Route R7 → NEW EVACUATION ROUTE
17 workers → Assembly Point A
```

The Command Agent explains:

> "Ambulance A cannot be reassigned because it is committed to the
> active slope response. Ambulance B is therefore dispatched to the
> truck incident. Route R4 intersects the hazard zone and has been
> replaced by R7."

This explanation is extremely important.

The system must demonstrate not only what changed, but WHY.

------------------------------------------------------------------------

# 15. Closing the Loop

After the response:

Show an incident timeline:

``` text
08:47 — Ground movement detected
08:48 — 17 personnel identified
08:49 — Evacuation recommended
08:49 — Human approval received
08:52 — Truck accident detected
08:52 — Ambulance availability changed
08:53 — Response plan recalculated
08:54 — Revised response activated
```

Then:

> Incident report generated.

The final report can summarize: - initial incident; - evidence; -
actions; - resource assignments; - changes; - reasoning; - human
approvals; - outcome.

------------------------------------------------------------------------

# 16. MVP Feature Set --- LOCKED

Do NOT expand beyond this unless the core system is already stable.

## 1. Digital Twin

Visual mine/site environment: - zones; - roads; - workers; - vehicles; -
sensors; - emergency resources; - danger zones; - safe zones.

## 2. Simulated Sensor Streams

At minimum: - slope displacement; - vibration; - optional
rainfall/environment data.

## 3. Worker / Vehicle Tracking

Simulated GPS/RTLS positions.

## 4. Simulated CCTV / Vision Events

No need for actual production CCTV integration. Use simulated event data
or sample footage/state.

## 5. Multi-Agent Response

Core agents: - Risk/Incident Agent - Vision Agent - Resource Agent -
Evacuation Agent - Command Agent / Orchestrator

## 6. Dynamic Replanning

Hero feature: - new incident; - resource unavailable; - unsafe route; -
revised allocation.

## 7. Human Approval

High-impact action requires approval.

## 8. Incident Report

Final timeline and explanation.

------------------------------------------------------------------------

# 17. Agent Architecture

Recommended architecture:

``` text
                       HUMAN COMMANDER
                    Approve / Override
                            ▲
                            │
                    ┌───────┴────────┐
                    │  COMMAND AGENT │
                    │  ORCHESTRATOR  │
                    └───────┬────────┘
                            │
        ┌──────────────┬────┼────┬──────────────┐
        ▼              ▼    ▼    ▼              │
   RISK AGENT      VISION  RESOURCE  EVACUATION │
                    AGENT   AGENT      AGENT     │
        ▲              ▲    ▲    ▲              │
        └──────────────┴────┼────┴──────────────┘
                            │
                    ┌───────▼────────┐
                    │  DIGITAL TWIN  │
                    │  MINE/SITE     │
                    └───────▲────────┘
                            │
             ┌──────────────┼──────────────┐
             │              │              │
            IoT            CCTV           GPS
          Sensors          Feeds        Tracking
```

------------------------------------------------------------------------

# 18. What Each Agent Does

## Risk / Incident Agent

Inputs: - sensor state; - incident state; - environmental conditions; -
previous state.

Outputs: - incident classification; - severity; - affected zone; - risk
score; - confidence/uncertainty.

Example:

> HIGH RISK --- accelerating slope movement in B3.

------------------------------------------------------------------------

## Vision Agent

Inputs: - simulated CCTV event/frame metadata.

Outputs: - people count/exposure estimate; - vehicle involvement; -
movement/immobility context; - incident classification.

Example:

> Truck overturned; estimated 3--4 personnel potentially exposed.

------------------------------------------------------------------------

## Resource Agent

Inputs: - available ambulances; - rescue teams; - safety teams; -
capabilities; - locations; - current commitments.

Outputs: - recommended assignments; - resource conflicts; - alternative
assignments.

------------------------------------------------------------------------

## Evacuation Agent

Inputs: - affected zones; - worker positions; - safe zones; - blocked
routes; - route graph.

Outputs: - evacuation route; - affected personnel; - staging/assembly
points.

Use deterministic algorithms for routing in the MVP rather than asking
an LLM to calculate routes.

------------------------------------------------------------------------

## Command Agent

The main orchestrator.

Responsibilities: - combine outputs; - prioritize incidents; - produce
response plan; - trigger replanning; - explain decisions; - request
human approval; - produce incident summary.

------------------------------------------------------------------------

# 19. Important Architecture Decision: Simulation First

The MVP should NOT depend on live external systems.

Everything can be simulated:

-   IoT data;
-   GPS;
-   CCTV;
-   incidents;
-   resources;
-   agent transitions;
-   state changes.

The user should still experience the behavior of the proposed production
system.

This is intentional.

## Principle

> **Simulate the operational environment, not the value proposition.**

The system should visibly demonstrate: - detection; - reasoning; -
planning; - action; - adaptation.

------------------------------------------------------------------------

# 20. AI API / Token Strategy

This is a major constraint.

Do NOT send the entire operational state to an LLM every few seconds.

Bad approach:

``` text
47 workers
12 vehicles
32 sensors
all GPS coordinates
all CCTV observations
weather
history
...
```

repeatedly sent to the model.

This wastes tokens and creates latency/failure risk.

## Better approach

Use deterministic code to compress the state:

``` json
{
  "event": "SLOPE_RISK",
  "severity": "HIGH",
  "zone": "B3",
  "people_at_risk": 17,
  "available_ambulances": 1,
  "blocked_routes": ["R4"]
}
```

Then only send the compact operational state to an LLM if needed.

Use LLMs selectively for: - reasoning explanation; - incident
summarization; - natural-language command interpretation; -
human-readable response justification.

Use deterministic code for: - sensor thresholds; - trend calculations; -
distance; - resource availability; - route finding; - state
transitions; - simulation; - bookkeeping.

This gives:

**Fast + reliable + token-efficient + repeatable demo**

------------------------------------------------------------------------

# 21. Agent Simulation Is Acceptable

For the hackathon, even the "agents" can be simulated as deterministic
modules/state machines.

The UI can show:

``` text
Risk Agent       ✓ Updated severity
Vision Agent     ✓ Estimated exposure
Resource Agent   ✓ Re-evaluated resources
Evacuation Agent ✓ Recalculated route
Command Agent    ⟳ Generating revised plan
```

The behavior demonstrates the agent architecture without requiring
multiple real LLM calls.

If an LLM is used, it can be used selectively for natural-language
explanations.

Do NOT misrepresent simulated logic as a production autonomous AI
system.

------------------------------------------------------------------------

# 22. Production Architecture

The mature production architecture should use an edge layer.

``` text
Sensors / CCTV / GPS
        ↓
   Edge Gateway
        ↓
Local Event Detection
        ↓
Local Safety Rules
        ↓
Cloud / Command Center
        ↓
AI Coordination Layer
        ↓
Human Operator
```

## Why edge computing?

Critical safety alerts should not depend entirely on: - internet
availability; - cloud latency; - LLM availability.

The edge layer can: - detect threshold breaches; - maintain critical
local safety rules; - buffer sensor data; - trigger local alarms; -
communicate with the cloud when connectivity is available.

The cloud/AI layer handles: - multi-agent coordination; - analytics; -
historical context; - reporting; - cross-site management; - higher-level
decision support.

------------------------------------------------------------------------

# 23. Potential Production IoT Components

If a judge asks what real hardware could be used:

## Ground / slope monitoring

-   Slope Stability Radar (SSR)
-   GNSS/GPS monitoring
-   inclinometers
-   crack/displacement sensors
-   geotechnical monitoring systems

## Environmental

-   rain gauge
-   temperature/humidity sensors
-   dust/air-quality sensors
-   water-level sensors

## Equipment

-   GPS
-   IMU
-   machine telemetry
-   proximity sensors

## Personnel

-   RFID
-   BLE tags
-   UWB positioning
-   GPS where appropriate

## Vision

-   existing CCTV/IP cameras
-   computer vision models

The project should not imply that all these components are installed
during the hackathon.

------------------------------------------------------------------------

# 24. Edge Cases

Minimum edge cases to demonstrate:

## 1. New high-severity incident

The system should re-evaluate priorities.

## 2. Emergency resource becomes unavailable

The system should invalidate/revise the original plan.

## 3. Unsafe route

Remove route and find alternative.

## 4. Conflicting sensor information

Do not blindly act.

Example: \> Sensor A says high risk, Sensor B has missing data.

System: \> Flag uncertainty and request verification.

## 5. Missing GPS/CCTV

Fall back to latest verified state and flag stale data.

## 6. No suitable emergency resource

Escalate to human command.

## 7. Communication failure

Production edge layer should maintain critical local safety rules.

------------------------------------------------------------------------

# 25. Human-in-the-Loop

This is essential.

Do not position the system as fully autonomous safety control.

Example:

``` text
AI RECOMMENDATION

Evacuate Zone B3

Reason:
Accelerating ground movement
+
17 personnel potentially exposed

[ APPROVE RESPONSE ]

[ OVERRIDE ]

[ REQUEST MORE DATA ]
```

The operator remains responsible for critical actions.

Important positioning sentence:

> **"minEngine does not replace the safety officer --- it gives the
> safety officer a real-time AI command layer."**

------------------------------------------------------------------------

# 26. UX / Evaluator Experience

The Round 2 application may be evaluated through the deployment link by
someone who has never seen the project.

Therefore the application must teach the evaluator how to use it.

## First Visit

Opening modal:

### Welcome to minEngine

**AI Crisis Command for High-Risk Sites**

> A real-time AI command layer that turns safety signals into
> coordinated emergency response.

**Sense. Reason. Coordinate. Respond.**

Button:

**Start Mission →**

------------------------------------------------------------------------

# 27. Short Purpose Screen

After Start Mission:

### Why minEngine?

> Emergencies don't happen one at a time.

> When a hazard appears, responders need to know: **What happened? Who
> is at risk? What resources are available? What should happen next?**

> minEngine continuously reassesses the situation as conditions change.

Button:

**Enter Command Center →**

Keep this screen very short.

------------------------------------------------------------------------

# 28. Guided Mission

The preferred evaluator experience is:

# Guided Mission

A first-time evaluator should not have to guess which button to click.

The system should show contextual tooltips/highlights.

Example:

### Step 1 --- Detect a Hazard

> Simulate abnormal ground movement in Zone B3. This will trigger
> minEngine's risk assessment.

Button: **Simulate Slope Movement**

Then show the system reacting.

------------------------------------------------------------------------

# 29. Step 2 --- Coordinate Response

Tooltip:

> minEngine has identified the people and resources affected. Review the
> recommended response.

Show:

``` text
AI RESPONSE PLAN

Evacuate Zone B3
17 personnel exposed
Ambulance A → Staging Point S2
Rescue Team 1 → Zone B3
Route R4 → Restricted
```

Button:

**Review & Approve**

------------------------------------------------------------------------

# 30. Step 3 --- Situation Changes

Tooltip:

> Emergencies don't stay static. Introduce a second incident and see how
> minEngine adapts.

Button:

**Simulate Truck Accident**

Then show: - CCTV event; - estimated exposed personnel; - ambulance
commitment; - route restriction.

Then:

# RESPONSE PLAN INVALIDATED

# REPLANNING RESPONSE...

Show agent activity.

Then display revised response.

------------------------------------------------------------------------

# 31. Demo UX Principle

The evaluator should experience:

### 1. Understand

What is minEngine?

### 2. Observe

A hazard is detected.

### 3. Understand reasoning

Why is it dangerous?

### 4. See action

What should happen?

### 5. Human control

Should we approve?

### 6. Inject chaos

Something else happens.

### 7. See adaptation

The original plan is no longer valid.

### 8. See agentic behavior

Agents coordinate a new plan.

### 9. See outcome

Incident timeline + report.

This maps directly to the organizer requirement:

> The MVP should demonstrate that the agent reasons, plans, takes action
> and adapts.

------------------------------------------------------------------------

# 32. Guided Mission vs Explore Mode

Recommended UI:

## Guided Mission

For judges / first-time users.

> Run the 3-minute guided emergency simulation.

## Explore Mode

For users who want to inspect the dashboard manually.

Do not hide the actual command center behind a long onboarding.

The onboarding should take approximately 20--30 seconds.

------------------------------------------------------------------------

# 33. Visual Command Center

Recommended layout:

``` text
┌──────────────────────────────────────────────────────────┐
│ minEngine              COMMAND CENTER       🟢 NORMAL   │
├──────────────────────────────────────────────────────────┤
│                                                          │
│                  DIGITAL TWIN                            │
│                                                          │
│      Zone A                 Zone B                       │
│        🚚                    👷 👷                        │
│                              📡                          │
│                                      🚑                  │
│                                                          │
│                 SAFE ZONE 🟢                             │
├──────────────────────┬───────────────────────────────────┤
│ SITE STATUS          │ AI COMMAND LOG                    │
│ Workers: 42          │ System initialized                │
│ Vehicles: 11         │ All resources available           │
│ Sensors: 24          │ Monitoring site...                │
│ Incidents: 0         │                                    │
└──────────────────────┴───────────────────────────────────┘
```

The exact UI can differ, but it should communicate: - physical state; -
resource state; - AI activity; - current incidents.

------------------------------------------------------------------------

# 34. Technology Stack

Preferred stack:

## Frontend

-   React
-   TypeScript
-   Tailwind CSS
-   Three.js / React Three Fiber

## Backend

-   Python
-   FastAPI

## Database

-   PostgreSQL / Supabase

## Realtime

-   WebSockets / Supabase Realtime

## AI / Agent Layer

Use the agent framework/API the team is already comfortable with.

Possible options: - LangGraph - Google ADK - OpenAI Agents SDK - custom
Python orchestrator

Do not choose a framework only because it is trendy.

If simple custom orchestration is faster and more reliable, use it.

## Simulation

-   Python or TypeScript-based simulation engine
-   predefined event scenarios
-   deterministic state transitions

## Production IoT

-   MQTT
-   edge gateway
-   GPS/RTLS
-   industrial sensors

## Production vision

-   CCTV/IP cameras
-   computer vision models

------------------------------------------------------------------------

# 35. What Should Be AI vs Deterministic

## AI / LLM

Use for: - reasoning explanation; - incident summary; - command
interpretation; - response justification; - natural-language report.

## Deterministic algorithms

Use for: - sensor thresholds; - sensor trend calculation; - distance; -
route finding; - resource availability; - priority calculations; - state
transitions; - simulation.

This is both more reliable and easier to explain to judges.

------------------------------------------------------------------------

# 36. What NOT to Build

Do not spend the hackathon time on:

-   login/authentication;
-   complicated admin panels;
-   mobile app;
-   large user management system;
-   real hardware integration;
-   real mine deployment;
-   real-time industrial GPS hardware;
-   actual geotechnical collapse prediction;
-   15+ agents;
-   unnecessary chatbot functionality;
-   complex enterprise permissions;
-   large datasets;
-   over-engineered microservices.

Priority:

> **Core simulation + agent behavior + dynamic replanning + evaluator
> UX + polish**

------------------------------------------------------------------------

# 37. 24-Hour Development Priority

Recommended sequence:

## Phase 1 --- Core simulation/state engine

Build: - site state; - workers; - vehicles; - resources; - sensors; -
incident events.

## Phase 2 --- Command center

Build: - digital twin; - status cards; - event log; - resource state.

## Phase 3 --- Agent workflow

Implement: - Risk Agent; - Vision Agent; - Resource Agent; - Evacuation
Agent; - Command Agent.

These can initially be deterministic modules.

## Phase 4 --- Dynamic replanning

Implement: - second incident; - resource unavailable; - route blocked; -
revised plan; - explanation.

## Phase 5 --- Guided Mission

Build: - welcome modal; - short purpose screen; - contextual tooltips; -
step-by-step scenario.

## Phase 6 --- Polish

Add: - animations; - transitions; - danger-zone visualization; - agent
status; - approval modal; - report; - responsive UI; - deployment.

------------------------------------------------------------------------

# 38. Prototype Coordination-Time Benchmark

A potentially powerful demo metric:

Example:

### Manual-style simulated workflow

4 minutes 20 seconds

### minEngine simulated workflow

45 seconds

Show:

> **Simulated coordination time: 4:20 → 0:45**

Important: - Only show this after actually measuring the simulation. -
Label it clearly as a **prototype simulation benchmark**. - Do not claim
that this proves real-world time savings. - Do not claim accidents were
prevented.

The broader, defensible claim is:

> **Earlier detection plus faster coordination can create more time for
> evacuation and response.**

------------------------------------------------------------------------

# 39. Business Vision

minEngine should not be positioned as "just a mining app."

Mining is the initial vertical.

Potential expansion:

-   mining;
-   quarrying;
-   construction;
-   manufacturing;
-   power plants;
-   oil & gas;
-   infrastructure;
-   disaster management.

Core business product:

# AI Emergency Coordination Infrastructure

## Potential business model

B2B: - site-based SaaS; - enterprise subscriptions; -
deployment/integration fees; - IoT integration; - custom workflows; -
multi-site command centers.

Do not invent aggressive revenue numbers during the hackathon unless
supported by research.

The business value is: - faster situational awareness; - better resource
coordination; - reduced coordination overhead; - improved operational
visibility; - scalable command-center software.

------------------------------------------------------------------------

# 40. Production Roadmap

## Stage 1 --- Hackathon

Simulated: - sensors; - CCTV; - GPS; - incidents; - resources; - agents.

## Stage 2 --- Pilot

Integrate: - actual CCTV; - selected sensors; - GPS/RTLS; - site maps; -
operator workflows.

## Stage 3 --- Edge Deployment

Add: - edge gateway; - local safety rules; - offline operation; - local
alerting; - buffering.

## Stage 4 --- AI Coordination

Add: - validated risk models; - multi-agent coordination; - historical
incidents; - analytics; - operator feedback.

## Stage 5 --- Multi-Site Platform

Expand: - multiple sites; - centralized command center; - enterprise
reporting; - benchmarking; - predictive maintenance/safety analytics.

------------------------------------------------------------------------

# 41. Future Features

Possible future features, NOT MVP priorities:

### Blast-Zone Safety Orchestration

Before blasting: - verify worker locations; - verify vehicle
locations; - verify restricted zones; - verify evacuation; - human
authorization.

### Historical Incident Intelligence

Use past incidents to improve recommendations.

### Predictive Risk

Combine: - ground movement; - rainfall; - vibration; - historical
incidents; - equipment conditions.

### Automated Drill Mode

Simulate emergency scenarios for safety training.

### Multi-Site Command Center

Monitor several mines/sites.

### Drone Integration

Use drone imagery for post-incident assessment.

### Emergency Communications

Integrate approved notification/radio systems.

------------------------------------------------------------------------

# 42. Blast Management Positioning

Blasting should NOT be the core hackathon demo.

It can be presented as a future capability:

``` text
Blast Zone
    ↓
Check Personnel
    ↓
Check Vehicles
    ↓
Check Restricted Zones
    ↓
Confirm Evacuation
    ↓
Human Authorization
```

Do not allow this feature to distract from dynamic emergency response.

------------------------------------------------------------------------

# 43. Important Differentiation From Existing Digital Twins

Do not claim:

> "We invented a mining digital twin."

Digital twins and IoT-based mining safety systems already exist.

The differentiation is:

> **The digital twin is the shared operational context for an adaptive
> multi-agent crisis command system.**

The key feature is not the 3D visualization.

It is:

> **Dynamic decision coordination under changing conditions and limited
> resources.**

------------------------------------------------------------------------

# 44. Personal / Human Story for Pitch

A team member mentioned that a friend's father owns a mining area and
that someone close to the team has experienced a serious mining
accident.

If this is used in the pitch: - use it only if it is true; - obtain
permission before identifying or describing the person; - do not
exaggerate; - do not claim the accident was caused by a failure of an
existing system unless that is known.

Safe framing:

> "This problem became personal for our team because someone close to us
> has experienced the consequences of a mining accident. That made us
> ask a simple question: when an incident occurs, can technology help
> people understand what is happening and coordinate the response
> faster?"

Then move immediately to the technical solution.

------------------------------------------------------------------------

# 45. Recommended Pitch Opening

> **"In a mine, an accident doesn't happen in isolation. A slope can
> become unstable, workers can be inside the danger zone, vehicles can
> be moving toward it, and emergency resources are limited."**

> **"The challenge isn't only detecting the first problem. It's
> continuously deciding what should happen next as the situation
> changes."**

> **"That's why we built minEngine --- an AI crisis-command engine for
> high-risk environments."**

Then demonstrate the scenario.

------------------------------------------------------------------------

# 46. Recommended Killer Line

> **"minEngine does not replace the safety officer --- it gives the
> safety officer a real-time AI command layer."**

This should appear in the pitch or final slide.

------------------------------------------------------------------------

# 47. Recommended Product Explanation

Short version:

> **minEngine creates a live operational digital twin of a high-risk
> site and uses specialised AI agents to understand incidents,
> coordinate limited emergency resources, and dynamically replan the
> response when conditions change --- while keeping humans in control of
> critical decisions.**

------------------------------------------------------------------------

# 48. Recommended Short Demo Explanation

> "First, minEngine detects accelerating slope movement. It identifies
> 17 potentially exposed workers and recommends evacuation. The safety
> officer approves the response. Then a truck accident occurs and the
> active ambulance becomes unavailable. minEngine invalidates the old
> plan, reassesses the available resources, calculates an alternative
> route, reallocates the remaining ambulance and generates a new
> response plan with an explanation."

------------------------------------------------------------------------

# 49. Recommended Final Pitch Structure

## Slide 1 --- Problem

Emergencies change faster than manual coordination.

## Slide 2 --- Real-world context

Mining safety, slope monitoring, vehicle incidents, limited resources.

## Slide 3 --- minEngine

AI crisis-command layer.

## Slide 4 --- Architecture

Sensors → Digital Twin → Agents → Command → Human.

## Slide 5 --- Live Demo

Slope movement → evacuation → second incident → replanning.

## Slide 6 --- Existing vs Proposed

Manual/distributed coordination vs integrated adaptive command.

## Slide 7 --- Technical Architecture

Simulation MVP → production edge/cloud architecture.

## Slide 8 --- Business / Expansion

Mining → construction → industrial → infrastructure.

## Slide 9 --- Future

Real IoT integrations, validated models, multi-site platform.

## Slide 10 --- Closing

> **Sense. Reason. Coordinate. Respond.**

------------------------------------------------------------------------

# 50. What Judges Should Remember

If the judge remembers only three things, they should be:

### 1.

**It's not just an alert dashboard.**

### 2.

**The response dynamically changes when the situation changes.**

### 3.

**AI assists the safety officer; it does not replace human control.**

------------------------------------------------------------------------

# 51. What the Team Must NOT Accidentally Claim

Never claim: - production certification; - real mine deployment; - real
accident prevention; - guaranteed prediction; - guaranteed response
times; - exact casualty prediction; - autonomous safety-critical
control; - regulatory approval.

Always distinguish:

**Prototype simulation** vs **production architecture**.

------------------------------------------------------------------------

# 52. Development Philosophy

The project should prioritize:

1.  Demo reliability
2.  Clear agent behavior
3.  Dynamic replanning
4.  Strong UX
5.  Explainability
6.  Token efficiency
7.  Technical credibility
8.  Visual polish
9.  Business viability
10. Future scalability

A smaller reliable system is better than a huge unstable system.

------------------------------------------------------------------------

# 53. Core Mental Model for Future Development

Whenever deciding whether to add a feature, ask:

> **Does this help minEngine sense, understand, decide, coordinate,
> verify, or replan during a crisis?**

If no: - defer it.

If yes: - determine whether it is essential for MVP or future
production.

------------------------------------------------------------------------

# 54. Current Locked Decisions

These decisions should be treated as the baseline unless the team
explicitly decides to change them:

-   Domain 4 is locked.
-   Problem statement is Crisis Command.
-   Product name is minEngine.
-   Initial vertical is mining/quarry safety.
-   Digital twin is the operational context, not the entire product.
-   Dynamic multi-agent replanning is the hero capability.
-   Human-in-the-loop is mandatory for critical actions.
-   Edge architecture is part of the production vision.
-   Prototype data can be simulated.
-   Agent behavior can be deterministic/simulated.
-   LLM calls should be selective.
-   Token usage must be controlled.
-   Guided Mission is part of the evaluator UX.
-   Demo scenario is slope instability → evacuation → truck accident →
    resource failure → dynamic replanning.
-   Final output includes an incident timeline/report.
-   Production expansion can cover other high-risk industries.

------------------------------------------------------------------------

# 55. One-Sentence Project Definition

> **minEngine is an AI crisis-command layer that uses a digital twin and
> specialised agents to turn real-time safety signals into coordinated,
> explainable and dynamically adaptive emergency response plans.**

------------------------------------------------------------------------

# 56. Three-Word Product Promise

# Sense.

# Reason.

# Respond.

Alternative full tagline:

# **Sense. Reason. Coordinate. Respond.**

------------------------------------------------------------------------

# 57. Instruction for Any Future AI Assistant Working on This Project

When helping with minEngine:

1.  Preserve the core product vision unless the team explicitly asks for
    a redesign.
2.  Prioritize the hackathon MVP over production complexity.
3.  Do not recommend unnecessary features during the 24-hour build.
4.  Favor deterministic simulation for reliability.
5.  Use LLMs selectively because of API tokens, latency and failure
    risk.
6.  Keep safety claims realistic and defensible.
7.  Never claim the prototype predicts or prevents real accidents.
8.  Distinguish simulated benchmark results from real-world performance.
9.  Keep human approval in the loop for critical actions.
10. Preserve the hero scenario: slope instability → evacuation → second
    incident → resource failure → replanning.
11. Ensure the deployed website is understandable to a first-time
    evaluator.
12. Prefer a guided mission over an unexplained dashboard.
13. If suggesting production architecture, include an edge layer for
    critical local safety functions.
14. Think like a senior software engineer, AI architect, product
    strategist and hackathon judge simultaneously.
15. Optimize for: **judge clarity + technical credibility + demo
    reliability + business potential.**

------------------------------------------------------------------------

# 58. Final Project Summary

## minEngine

**Domain:** Public Safety & Emergency Response

**Problem:** Emergency response at high-risk sites is difficult when
multiple incidents happen simultaneously, information is distributed,
resources are limited, and conditions change rapidly.

**Solution:** A digital-twin-based AI crisis-command system that
combines safety signals, identifies risk and exposed personnel,
coordinates emergency resources, and dynamically replans when incidents
or resource availability change.

**Hero Capability:** Dynamic multi-agent replanning.

**Initial Use Case:** Open-cast mining / quarry safety.

**Core Agents:** Risk, Vision, Resource, Evacuation, Command.

**Human Control:** Required for critical actions.

**MVP Data:** Simulated.

**MVP Agents:** Can be simulated/deterministic with optional LLM
explanations.

**Production Vision:** Real IoT/CCTV/GPS + edge gateway + cloud AI
coordination + human command center.

**Business Vision:** B2B emergency coordination infrastructure for
mining and other high-risk industries.

**Tagline:** Sense. Reason. Coordinate. Respond.

**Key message:** Earlier detection plus faster coordination can create
more time for evacuation and response.

**Key differentiator:** minEngine does not merely detect incidents. It
continuously re-evaluates the operational situation and adapts the
response plan when conditions change.
