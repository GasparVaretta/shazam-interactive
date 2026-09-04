# AGENTS.md
# SHAZAM — INTERACTIVE 3D WEB INFOGRAPHIC
# MASTER PROJECT SPECIFICATION

---

# 1. PROJECT OVERVIEW

This project is an **interactive web-based 3D infographic** about Shazam, its evolution and how its technology/functionality works.

This is a **WEB APPLICATION**, not a standalone Three.js experiment.

The final experience will run inside a web browser and will combine:

- Three.js 3D graphics
- procedural lightning
- cinematic camera movement
- HTML
- CSS
- JavaScript
- interactive infographic content

The visual concept is inspired by:

- Skyrim's constellation / perk-tree presentation
- supernatural lightning
- cinematic videogame interfaces
- dark cosmic environments
- elegant high-end interactive infographics

The experience should NOT feel like a conventional website.

It should feel like an **interactive visual artifact / videogame interface presented as a website**.

The project must prioritize:

- visual quality
- spatial composition
- cinematic camera movement
- smooth interaction
- clarity
- strong visual hierarchy
- precise geometry
- performance
- clean implementation
- responsive web behavior

The final experience must work as a browser-based interactive page.

---

# 2. WEB APPLICATION ARCHITECTURE

The project must be structured as a web application.

Three.js is responsible for the 3D visual world.

HTML/CSS will eventually be responsible for:

- text
- information panels
- labels
- diagrams
- charts
- interface elements
- typography
- informational overlays

JavaScript controls:

- application logic
- Three.js scene
- camera
- interaction
- animation
- synchronization between 3D elements and HTML/CSS

The architecture must keep the 3D scene and the future HTML/CSS layer conceptually separate.

The 3D world must not depend on hardcoded HTML pixel coordinates.

Future HTML elements must be able to reference stable 3D world-space anchors.

---

# 3. CURRENT DEVELOPMENT PHASE

The current development phase is ONLY the 3D visual foundation.

The immediate objective is to build:

1. The Shazam S lightning structure
2. The canonical S geometry
3. The procedural lightning system
4. The four infographic node positions
5. The spatial environment
6. The polygonal metallic frame
7. The camera system
8. The camera transitions
9. Stable world-space coordinates
10. Anchors for future HTML/CSS content

DO NOT currently implement the final information content.

DO NOT currently implement:

- final infographic text
- charts
- pie charts
- technical diagrams
- final HTML content
- final CSS layout
- navigation menus
- external navigation
- registration
- authentication
- unrelated website functionality

The current goal is to create the **complete interactive 3D stage on which the future web infographic will be placed**.

---

# 4. TECHNOLOGY

The project must use:

- JavaScript
- Three.js
- Vite
- HTML
- CSS

Recommended supporting technologies:

- GSAP for cinematic camera and interface animation
- Three.js postprocessing
- UnrealBloomPass or an equivalent lightweight bloom solution

Do NOT use:

- Unity
- Blender
- Meshy
- external 3D models

The lightning must be generated procedurally using Three.js.

The project must remain browser-based.

Do not introduce unnecessary frameworks or libraries.

Prefer the simplest technology that solves the problem correctly.

---

# 5. AUTHORITATIVE VISUAL REFERENCE

The project contains the following exact reference file:

`shazam_s_reference.jpg`

This file is the PRIMARY and AUTHORITATIVE visual reference for the project.

The reference is not merely an inspiration.

It defines the intended:

- S silhouette
- proportions
- composition
- lightning arrangement
- visual density
- node placement
- spatial relationships
- atmosphere
- visual hierarchy
- frame relationship
- future graphic placement

Whenever there is uncertainty about the visual direction, consult:

`shazam_s_reference.jpg`

Do not replace its visual language with a generic interpretation.

Do not redesign the S from memory.

Do not create a generic letter S.

Do not assume a standard typography-based S is sufficient.

The project must visually derive its main structure from the reference.

---

# 6. CORE CONCEPT

The entire interactive experience is organized around a gigantic supernatural lightning formation shaped like the Shazam S.

The S is the primary spatial structure.

The S is NOT simply a decorative object.

It is the navigation structure of the infographic.

The four historical/informational points are represented by nodes positioned along the S.

The user initially sees the complete structure.

The initial camera must communicate the complete composition.

Then the camera can travel toward individual nodes.

Each node becomes the visual focus of the scene.

The surrounding lightning must remain sufficiently visible to preserve spatial context.

The experience should feel like navigating a three-dimensional constellation or knowledge tree.

---

# 7. CANONICAL S GEOMETRY — ABSOLUTE PRIORITY

The S geometry is the most important technical requirement.

The project must have a SINGLE canonical representation of the S.

The canonical S path is the SINGLE SOURCE OF TRUTH.

All of the following must derive from this structure:

- main lightning
- secondary lightning
- particles
- node positions
- camera targets
- camera positions
- future infographic anchors
- spatial composition

Correct architecture:

REFERENCE IMAGE
        ↓
CANONICAL S GEOMETRY
        ↓
MAIN LIGHTNING
        ↓
SECONDARY LIGHTNING
        ↓
PARTICLES
        ↓
NODE POSITIONS
        ↓
CAMERA TARGETS
        ↓
FUTURE HTML/CSS ANCHORS

Do NOT manually position unrelated systems independently.

Changing the canonical S geometry should update dependent systems.

The designer must be able to locate and edit the canonical S easily.

Recommended location:

`src/scene/shazamPath.js`

or another clearly named equivalent.

---

# 8. TOP-DOWN SILHOUETTE

The S must FIRST be solved as a 2D composition.

The most important verification view is a perfectly top-down camera.

When viewed directly from above:

THE COMPLETE LIGHTNING STRUCTURE MUST CLEARLY READ AS THE SHAZAM S FROM:

`shazam_s_reference.jpg`

The top-down silhouette has higher priority than:

- depth
- particles
- bloom
- lighting
- atmosphere
- secondary effects

3D effects must never destroy the S silhouette.

Depth, noise, particles and secondary branches must remain subordinate to the canonical S.

The development process must therefore begin with:

1. canonical 2D S path
2. top-down validation
3. main lightning
4. secondary lightning
5. 3D depth
6. visual effects

---

# 9. CANONICAL COORDINATE SYSTEM

Use a clear world-space coordinate system.

Recommended:

- X = horizontal
- Y = vertical
- Z = depth

The canonical S path should primarily exist on the XY plane.

Z should be used for controlled 3D depth.

The canonical S coordinates must be clearly identifiable in the code.

Do not hide the S geometry inside complicated procedural systems.

The coordinates must be easy for a designer to modify.

---

# 10. LIGHTNING SYSTEM

The lightning must look like supernatural electrical energy.

It must NOT look like:

- a simple glowing line
- a neon tube
- a generic spline
- a laser
- a smooth electric cable

The lightning should contain:

- a dominant main electrical path
- irregular angular segments
- smaller branching bolts
- controlled randomness
- varying thickness
- varying brightness
- concentrated energy around important areas
- subtle animated electrical instability

The main lightning must preserve the canonical S silhouette.

Randomness must be controllable and preferably deterministic.

Important visual parameters must be exposed clearly.

Example:

```js
const LIGHTNING_CONFIG = {
    thickness: ...,
    branchDensity: ...,
    branchLength: ...,
    jitter: ...,
    glowIntensity: ...,
    animationSpeed: ...,
    segmentCount: ...,
    particleDensity: ...
};