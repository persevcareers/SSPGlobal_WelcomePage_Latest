# Product Requirements Document (PRD): SSP Global Frontend Website

## 1. Introduction
**Product Name:** SSP Global Corporate Website
**Purpose:** To serve as the primary digital presence for SSP Global, an organization encompassing two main divisions: the Software Training Institute (STI) and Software Solutions (SS). The website aims to showcase the company's dual mission, present its leadership, highlight student success factors, and capture leads via a contact form.

## 2. Target Audience
*   **Students/Trainees:** Individuals looking for hands-on tech education and placement support.
*   **Businesses/Clients:** Organizations seeking software development and digital transformation solutions.

## 3. Key Features & Frontend Requirements

### 3.1. Header & Navigation
*   **Sticky Header:** Must remain visible on scroll. Contains the SSP Global logo, navigation links (Home, Training, Software Solution, Leadership), a "Contact Us" quick link, and a "Meet Our Team" CTA button.
*   **Responsive Menu:** A hamburger menu must be present for mobile devices to toggle the navigation links.

### 3.2. Interactive Hero Section
*   **Frame-by-Frame Canvas Animation:** A scroll-driven canvas animation must render image sequences as the user scrolls down the page.
*   **Scroll-Triggered Text Phases:** 
    *   *Phase 1:* Giant SSP title fade-in.
    *   *Phase 2:* "Empowering the future..." text block and "Explore SSP Global" CTA.
    *   *Phase 3:* "A software organization in Tirupati" text block.

### 3.3. S-Split Transition Section ("Welcome to SSP")
*   **Dual Cards Display:** Two interactive cards representing STI (Software Training Institute) and SS (Software Solutions).
*   **Hover Interactions:** Cards must feature background image scaling, color overlays, and expanding button elements on hover.

### 3.4. Leadership Section (Visionaries)
*   **Horizontal Layout:** A structured display of the leadership team (CEO, Director, Founder) including their photos, titles, and quotes.
*   **Visual Style:** Modern quote-card layout with distinct borders, shadow effects, and decorative quotation marks.

### 3.5. Features Section ("Why Choose SSP?")
*   **Grid Layout:** Display key selling points (e.g., Real-World Training, Career Guidance).
*   **Scroll Animations:** Elements should fade up sequentially as they enter the viewport.

### 3.6. Student Success Accordion
*   **Interactive Accordion:** A 3-item accordion (Individual Tracking, Standalone Mindset, Lifetime Support) showing one expanded item at a time.
*   **Behavior:** Clicking an accordion header toggles its active state and reveals the description text.

### 3.7. Lead Generation (Contact Form)
*   **Fields:** Name (Text), Phone Number (Tel).
*   **Action:** An "Enquire Now" submit button.
*   **Validation:** Basic HTML5 required field validation.

### 3.8. Footer
*   **Information Links:** Navigation columns for Divisions, Contact Info, and Social Media icons.
*   **Visuals:** Inverted/Dark mode logo and a copyright disclaimer.

## 4. Non-Functional Requirements
*   **Responsiveness:** The site must be fully responsive across mobile, tablet, and desktop viewports using CSS clamp, flexbox, and media queries.
*   **Performance:** Image assets (especially the hero canvas sequence) must be preloaded or optimized to prevent scroll jank.
*   **Animations:** Smooth GSAP-driven or CSS transitions (fade-ups, hover effects) should be performant (60fps).

## 5. Frontend Testing Scope (Important Test Scenarios)
1.  **Navigation & Routing:** Verify that header links scroll smoothly to the correct sections or open external links correctly. Mobile menu toggle should work seamlessly.
2.  **Hero Canvas Scroll Synchronization:** Verify the canvas animation updates correctly based on scroll position without visual glitching.
3.  **Accordion Interactivity:** Ensure that clicking an accordion item expands it and collapses any previously expanded item.
4.  **Form Validation:** Ensure the contact form cannot be submitted without filling out the Name and Phone Number fields.
5.  **Responsive Layout & Hover States:** Confirm that the S-Split cards and Leadership section stack correctly on smaller screens and that hover effects trigger properly on desktop.
