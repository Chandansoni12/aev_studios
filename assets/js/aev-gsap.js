// ==========================================================================
// AEV Studios — Master GSAP Scroll Animation Engine v3.2
// Production Implementation: Preloader Curtain · Cinematic Hero ·
// Section Stagger · Chaos→Clarity Duel · 3D Dashboard · Bidirectional Steps ·
// Benefits Grid · Pricing · Cursor Tracker · Responsive MatchMedia
// ==========================================================================

(function () {
  'use strict';

  let animationsInitialized = false;

  function waitForGSAP(callback) {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      callback();
    } else {
      setTimeout(() => waitForGSAP(callback), 50);
    }
  }

  function init() {
    waitForGSAP(() => {
      // 1. Core global helpers that don't depend on preloader
      initNavbarScroll();
      initAmbientCursor();
      initSmoothAnchors();

      // 2. Start high-fashion preloader
      initEditorialLoader(startAllScrollStorytelling);

      // Fallback safeguard: if preloader somehow doesn't trigger within 2.8s
      setTimeout(() => {
        if (!animationsInitialized) {
          startAllScrollStorytelling();
        }
      }, 2800);
    });
  }

  /* ──────────────────────────────────────────────────────────────────────────
     ORCHESTRATOR: Start scroll storytelling once preloader lifts
  ────────────────────────────────────────────────────────────────────────── */
  function startAllScrollStorytelling() {
    if (animationsInitialized) return;
    animationsInitialized = true;

    // Trigger hero entrance immediately as the curtain rises
    initHeroEntrance();

    // Initialize all scroll-driven sections
    initServiceStagger();
    initChaosClarity();
    initDashboardSection();
    initBenefitsGrid();
    initProcessStepsEngine();
    initDeliveredProjects();
    initPricingTiers();
    initFooterCTA();

    // Recalculate ScrollTrigger markers
    ScrollTrigger.refresh();
    setTimeout(() => ScrollTrigger.refresh(), 500);
    setTimeout(() => ScrollTrigger.refresh(), 1500);
  }

  /* ══════════════════════════════════════════════════════════════════════════
     1. EDITORIAL PRELOADER (000 → 100 Counter + Playfair Italic + Curtain Exit)
  ══════════════════════════════════════════════════════════════════════════ */
  function initEditorialLoader(onCurtainLift) {
    const loader    = document.getElementById('aev-loader');
    const counterEl = document.getElementById('aev-loader-counter');
    if (!loader || !counterEl) {
      if (onCurtainLift) onCurtainLift();
      return;
    }

    let isDone = false;
    const duration  = 1650; // counter duration in ms
    const startTime = performance.now();

    function dismissLoader() {
      if (isDone) return;
      isDone = true;
      counterEl.textContent = '100';

      // Fire hero animation right as curtain starts lifting for cinematic seamlessness
      if (typeof onCurtainLift === 'function') {
        onCurtainLift();
      }

      gsap.to(loader, {
        yPercent: -100,
        duration: 0.95,
        ease: 'power4.inOut',
        onComplete: () => {
          try {
            loader.remove();
          } catch (e) {
            loader.style.display = 'none';
          }
        }
      });
    }

    function tick(now) {
      if (isDone) return;
      const elapsed  = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // High-end cubic ease out
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.floor(eased * 100);
      counterEl.textContent = String(current).padStart(3, '0');

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        counterEl.textContent = '100';
        setTimeout(dismissLoader, 140);
      }
    }

    requestAnimationFrame(tick);

    // Click/touch to skip preloader immediately
    loader.addEventListener('click', dismissLoader);
  }

  /* ══════════════════════════════════════════════════════════════════════════
     2. HERO CINEMATIC ENTRANCE & MINDLY INTERACTIVE SUITE
  ══════════════════════════════════════════════════════════════════════════ */
  function initHeroEntrance() {
    const hero = document.querySelector('.framer-wxbawq');
    if (!hero) return;

    const nav           = document.querySelector('.framer-p5dxpc-container');
    const preHeading    = hero.querySelector('.framer-1v59uda');
    const headline      = hero.querySelector('.mindly-headline');
    const subtitle      = hero.querySelector('.mindly-subtitle');
    const ctaGroup      = hero.querySelector('.mindly-cta-group');
    const rotatingBadge = hero.querySelector('.mindly-rotating-badge');
    const socialProof   = hero.querySelector('.mindly-social-proof');
    const hallmark      = hero.querySelector('.mindly-hallmark');
    const stageSubject  = hero.querySelector('.mindly-stage-subject');
    const cardLeft      = hero.querySelector('.mindly-card-callout.left');
    const cardRight     = hero.querySelector('.mindly-card-callout.right');
    const orbitRing     = hero.querySelector('#mindly-orbit-ring');
    const orbitTiles    = hero.querySelectorAll('.orbit-tile, .mindly-orbit-chip');
    const splineSvg     = hero.querySelector('.mindly-spline-svg');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Navigation fades down softly
    if (nav) {
      gsap.set(nav, { y: -25, opacity: 0 });
      tl.to(nav, { y: 0, opacity: 1, duration: 0.8 }, 0.05);
    }

    // 2. Pre-heading tag
    if (preHeading) {
      gsap.set(preHeading, { y: 18, opacity: 0 });
      tl.to(preHeading, { y: 0, opacity: 1, duration: 0.6 }, 0.2);
    }

    // 3. Main Mindly Headline upward reveal
    if (headline) {
      gsap.set(headline, { y: 35, opacity: 0, filter: 'blur(6px)' });
      tl.to(headline, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.85,
        ease: 'power3.out'
      }, 0.35);
    }

    // 4. Subtitle upward fade
    if (subtitle) {
      gsap.set(subtitle, { y: 22, opacity: 0 });
      tl.to(subtitle, { y: 0, opacity: 1, duration: 0.65 }, 0.65);
    }

    // 5. Dual Action Buttons
    if (ctaGroup) {
      gsap.set(ctaGroup, { y: 20, opacity: 0 });
      tl.to(ctaGroup, { y: 0, opacity: 1, duration: 0.55 }, 0.8);
    }

    // 6. Corner Accents: Rotating Badge, Social Proof, Hallmark
    if (rotatingBadge) {
      gsap.set(rotatingBadge, { scale: 0.7, opacity: 0 });
      tl.to(rotatingBadge, { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.6)' }, 0.9);
    }
    if (socialProof) {
      gsap.set(socialProof, { x: -25, opacity: 0 });
      tl.to(socialProof, { x: 0, opacity: 1, duration: 0.7 }, 1.0);
    }
    if (hallmark) {
      gsap.set(hallmark, { x: 25, opacity: 0 });
      tl.to(hallmark, { x: 0, opacity: 1, duration: 0.7 }, 1.0);
    }

    // 7. Centerpiece Stage & Orbiting Callout Cards
    if (stageSubject) {
      gsap.set(stageSubject, { y: 40, opacity: 0, scale: 0.96 });
      tl.to(stageSubject, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.95,
        ease: 'power3.out'
      }, 0.85);
    }

    if (cardLeft) {
      gsap.set(cardLeft, { x: -45, y: 15, opacity: 0, scale: 0.9 });
      tl.to(cardLeft, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.85,
        ease: 'back.out(1.6)'
      }, 1.1);
    }

    if (cardRight) {
      gsap.set(cardRight, { x: 45, y: 15, opacity: 0, scale: 0.9 });
      tl.to(cardRight, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.85,
        ease: 'back.out(1.6)'
      }, 1.15);
    }

    if (orbitTiles.length) {
      gsap.set(orbitTiles, { scale: 0.2, opacity: 0 });
      tl.to(orbitTiles, {
        scale: 1,
        opacity: 1,
        duration: 0.75,
        stagger: 0.08,
        ease: 'back.out(2)'
      }, 1.15);
    }

    if (splineSvg) {
      gsap.set(splineSvg, { opacity: 0 });
      tl.to(splineSvg, { opacity: 1, duration: 0.9 }, 1.35);
    }

    // 8. Interactive Extrafazant-Style 3D Mouse Parallax
    if (stageSubject && !window.matchMedia('(pointer: coarse)').matches) {
      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const tiltX = (e.clientY - centerY) / (rect.height / 2) * -6;
        const tiltY = (e.clientX - centerX) / (rect.width / 2) * 6;

        gsap.to(stageSubject, {
          rotationX: tiltX,
          rotationY: tiltY,
          duration: 0.65,
          ease: 'power2.out',
          overwrite: 'auto'
        });

        if (orbitRing) {
          gsap.to(orbitRing, {
            rotationY: tiltY * 1.6,
            rotationX: tiltX * 1.2,
            duration: 0.7,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }

        orbitTiles.forEach((tile, idx) => {
          const depthMultiplier = 1 + (idx % 2 === 0 ? 0.7 : -0.3);
          gsap.to(tile, {
            x: tiltY * depthMultiplier * 1.6,
            y: tiltX * depthMultiplier * 1.2,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        });

        if (cardLeft) {
          gsap.to(cardLeft, {
            x: tiltY * 1.8,
            y: tiltX * 1.5,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
        if (cardRight) {
          gsap.to(cardRight, {
            x: tiltY * -1.8,
            y: tiltX * 1.5,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });

      hero.addEventListener('mouseleave', () => {
        gsap.to(stageSubject, { rotationX: 0, rotationY: 0, duration: 0.8, ease: 'power2.out' });
        if (orbitRing) gsap.to(orbitRing, { rotationX: 0, rotationY: 0, duration: 0.8, ease: 'power2.out' });
        orbitTiles.forEach((tile) => {
          gsap.to(tile, { x: 0, y: 0, duration: 0.8, ease: 'power2.out' });
        });
        if (cardLeft) gsap.to(cardLeft, { x: 0, y: 0, duration: 0.8, ease: 'power2.out' });
        if (cardRight) gsap.to(cardRight, { x: 0, y: 0, duration: 0.8, ease: 'power2.out' });
      });
    }

    // 9. Extrafazant Scroll-Linked Flow (Cards & Tiles glide outward into Services)
    ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        if (stageSubject) gsap.set(stageSubject, { scale: 1 - p * 0.08, y: p * 45 });
        if (orbitRing) gsap.set(orbitRing, { scale: 1 + p * 0.22, opacity: Math.max(0, 1 - p * 1.6) });
        if (cardLeft) gsap.set(cardLeft, { x: p * -110, y: p * 75, opacity: Math.max(0, 1 - p * 1.3) });
        if (cardRight) gsap.set(cardRight, { x: p * 110, y: p * 75, opacity: Math.max(0, 1 - p * 1.3) });
        if (splineSvg) gsap.set(splineSvg, { opacity: Math.max(0, 1 - p * 2.2) });
        if (rotatingBadge) gsap.set(rotatingBadge, { y: p * 40, opacity: Math.max(0, 1 - p * 1.4) });
      }
    });
  }

  /* ══════════════════════════════════════════════════════════════════════════
     3. SERVICES — STAGGERED BATCH REVEALS & HOVERS
  ══════════════════════════════════════════════════════════════════════════ */
  function initServiceStagger() {
    const section = document.querySelector('.framer-1eow00d');
    if (!section) return;

    // Heading reveal
    const heading = section.querySelector('.framer-1p4hkt7');
    if (heading) {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 35,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
      });
    }

    // 5 Horizontal Service Cards
    const cards = Array.from(section.querySelectorAll('.framer-1u81pw4'));
    if (cards.length) {
      gsap.set(cards, { y: 35, opacity: 0 });

      ScrollTrigger.batch(cards, {
        start: 'top 88%',
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            y: 35,
            opacity: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: 'power2.in',
            overwrite: 'auto'
          });
        }
      });

      // Icon pop scale
      cards.forEach((card) => {
        const icon = card.querySelector('.framer-6tj1lb');
        if (icon) {
          gsap.from(icon, {
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse'
            },
            scale: 0.7,
            duration: 0.55,
            ease: 'back.out(2)'
          });
        }
      });
    }
  }

  /* ══════════════════════════════════════════════════════════════════════════
     4. FROM CHAOS TO CLARITY (Sequential Duel & Purple Ambient Glow)
  ══════════════════════════════════════════════════════════════════════════ */
  function initChaosClarity() {
    const section = document.querySelector('.framer-15nqooq');
    if (!section) return;

    // Heading
    const heading = section.querySelector('.framer-wjqf3e');
    if (heading) {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 35,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
      });
    }

    // Left Card: Operational Chaos / Struggle
    const leftCard = section.querySelector('.framer-k8pnwk');
    if (leftCard) {
      gsap.from(leftCard, {
        scrollTrigger: {
          trigger: leftCard,
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        },
        x: -45,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      const struggleItems = leftCard.querySelectorAll('.framer-NqQRl');
      if (struggleItems.length) {
        gsap.from(struggleItems, {
          scrollTrigger: {
            trigger: leftCard,
            start: 'top 78%',
            toggleActions: 'play none none reverse'
          },
          x: -18,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.15
        });
      }
    }

    // Right Card: Intelligent Operating System / Solution
    const rightCard = section.querySelector('.framer-1x5fw9h');
    if (rightCard) {
      gsap.from(rightCard, {
        scrollTrigger: {
          trigger: rightCard,
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        },
        x: 45,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      });

      const solutionItems = rightCard.querySelectorAll('.framer-GkWEd');
      if (solutionItems.length) {
        gsap.from(solutionItems, {
          scrollTrigger: {
            trigger: rightCard,
            start: 'top 78%',
            toggleActions: 'play none none reverse'
          },
          x: 18,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.35
        });
      }

      // Purple Glow illumination when solution is reached
      const gradientBox = rightCard.querySelector('.framer-ijadl9');
      if (gradientBox) {
        ScrollTrigger.create({
          trigger: rightCard,
          start: 'top 65%',
          onEnter: () => {
            gsap.to(gradientBox, {
              boxShadow: '0 12px 60px 10px rgba(81, 71, 230, 0.32)',
              duration: 1,
              ease: 'power2.out'
            });
          },
          onLeaveBack: () => {
            gsap.to(gradientBox, {
              boxShadow: 'none',
              duration: 0.6
            });
          }
        });
      }
    }
  }

  /* ══════════════════════════════════════════════════════════════════════════
     5. DASHBOARD / OPERATING SYSTEM SHOWCASE (3D Perspective Entrance + Scrub)
  ══════════════════════════════════════════════════════════════════════════ */
  function initDashboardSection() {
    const section = document.querySelector('.framer-xvygey');
    if (!section) return;

    // 3D mockup entry
    const dashImg = section.querySelector('.framer-13hr7v5');
    if (dashImg) {
      gsap.from(dashImg, {
        scrollTrigger: {
          trigger: dashImg,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 65,
        rotationX: 9,
        transformPerspective: 900,
        opacity: 0,
        duration: 1.05,
        ease: 'power3.out'
      });

      // Depth scrub
      gsap.to(dashImg, {
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        },
        y: -45,
        ease: 'none'
      });
    }

    // Right side content
    const textBlocks = section.querySelectorAll('.framer-1o5vfy4 .framer-19b6mak, .framer-1xa3u6m-container');
    if (textBlocks.length) {
      gsap.from(textBlocks, {
        scrollTrigger: {
          trigger: textBlocks[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }
  }

  /* ══════════════════════════════════════════════════════════════════════════
     6. WHY BUSINESSES CHOOSE US (6 Benefit Cards + Icon Rotation)
  ══════════════════════════════════════════════════════════════════════════ */
  function initBenefitsGrid() {
    const section = document.querySelector('.framer-n5w8o2');
    if (!section) return;

    const heading = section.querySelector('.framer-17vgbdu');
    if (heading) {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out'
      });
    }

    const cards = Array.from(section.querySelectorAll('.framer-Ghy21'));
    if (cards.length) {
      gsap.set(cards, { y: 35, opacity: 0, scale: 0.96 });

      ScrollTrigger.batch(cards, {
        start: 'top 88%',
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: 'back.out(1.4)',
            overwrite: 'auto'
          });
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            y: 35,
            opacity: 0,
            scale: 0.96,
            duration: 0.4,
            ease: 'power2.in',
            overwrite: 'auto'
          });
        }
      });

      // Synchronized icon pop
      cards.forEach((card) => {
        const icon = card.querySelector('.framer-1knb5i4');
        if (icon) {
          gsap.from(icon, {
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse'
            },
            scale: 0,
            rotation: -18,
            duration: 0.5,
            ease: 'back.out(2)',
            delay: 0.12
          });
        }
      });
    }
  }

  /* ══════════════════════════════════════════════════════════════════════════
     7. PROCESS: 4-STEP BIDIRECTIONAL STORYTELLING ENGINE
        Restores full original color & dark typography when scrolling down OR up
  ══════════════════════════════════════════════════════════════════════════ */
  function initProcessStepsEngine() {
    const stepClasses = ['.framer-1jbyioj', '.framer-1oaqa6t', '.framer-1kygmvr', '.framer-15hogr4'];
    const steps = stepClasses.map((cls) => document.querySelector(cls)).filter(Boolean);
    if (!steps.length) return;

    // Entrance fade-up for each step
    steps.forEach((step, idx) => {
      gsap.from(step, {
        scrollTrigger: {
          trigger: step,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.75,
        delay: idx * 0.06,
        ease: 'power3.out'
      });
    });

    let currentActiveIdx = 0;

    function evaluateActiveStep() {
      const vh = window.innerHeight;
      const focalLine = vh * 0.44;

      const firstRect = steps[0].getBoundingClientRect();
      const lastRect  = steps[steps.length - 1].getBoundingClientRect();

      // Top boundary: if user is at or above step 1, Step 1 MUST be in 100% full original color
      if (firstRect.top >= 0 || firstRect.top > focalLine - 100) {
        currentActiveIdx = 0;
      } else if (lastRect.bottom <= vh * 0.6) {
        currentActiveIdx = steps.length - 1;
      } else {
        let bestDistance = Infinity;
        let candidateIdx = currentActiveIdx;

        steps.forEach((step, idx) => {
          const rect = step.getBoundingClientRect();
          const focal = rect.top + Math.min(rect.height * 0.35, 200);
          const dist = Math.abs(focal - focalLine);

          if (rect.bottom > vh * 0.15 && rect.top < vh * 0.85) {
            if (dist < bestDistance) {
              bestDistance = dist;
              candidateIdx = idx;
            }
          }
        });
        currentActiveIdx = candidateIdx;
      }

      // Apply bidirectional styles
      steps.forEach((step, idx) => {
        if (idx === currentActiveIdx) {
          step.style.setProperty('opacity', '1', 'important');
          step.classList.add('step-colored-active');
          step.classList.remove('step-dimmed');

          // Highlight progress line if present
          const progressLine = step.querySelector('[data-framer-name="Progress Line"]');
          if (progressLine) {
            progressLine.style.setProperty('transform', 'none', 'important');
            progressLine.style.setProperty('opacity', '1', 'important');
          }
        } else {
          step.style.setProperty('opacity', '0.22', 'important');
          step.classList.remove('step-colored-active');
          step.classList.add('step-dimmed');
        }
      });
    }

    window.addEventListener('scroll', evaluateActiveStep, { passive: true });
    window.addEventListener('resize', evaluateActiveStep, { passive: true });

    // Multi-pass execution as assets and Framer finish mounting
    [0, 150, 400, 800, 1500, 2500].forEach((ms) => setTimeout(evaluateActiveStep, ms));

    // MutationObserver guarding against Framer SSR engine overriding step 01/active opacity
    steps.forEach((step) => {
      new MutationObserver(() => {
        if (step.classList.contains('step-colored-active')) {
          if (step.style.opacity !== '1') {
            step.style.setProperty('opacity', '1', 'important');
          }
        }
      }).observe(step, { attributes: true, attributeFilter: ['style'] });
    });
  }

  /* ══════════════════════════════════════════════════════════════════════════
     8. DELIVERED PROJECTS / USE CASES
  ══════════════════════════════════════════════════════════════════════════ */
  function initDeliveredProjects() {
    const section = document.querySelector('.framer-5qh2r4');
    if (!section) return;

    const heading = section.querySelector('.framer-11fnh2e');
    if (heading) {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out'
      });
    }

    const cards = Array.from(section.querySelectorAll('.framer-Qe53u'));
    if (cards.length) {
      gsap.set(cards, { y: 40, opacity: 0 });
      ScrollTrigger.batch(cards, {
        start: 'top 88%',
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.14,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            y: 40,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
            overwrite: 'auto'
          });
        }
      });
    }
  }

  /* ══════════════════════════════════════════════════════════════════════════
     9. TRANSPARENT PRICING TIERS
  ══════════════════════════════════════════════════════════════════════════ */
  function initPricingTiers() {
    const section = document.querySelector('.framer-1wqhfbs');
    if (!section) return;

    const heading = section.querySelector('.framer-17pdn06');
    if (heading) {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out'
      });
    }

    const pricingCards = Array.from(section.querySelectorAll('.framer-o1tpb, .framer-1ymqync, .framer-r6cwc3'));
    if (pricingCards.length) {
      gsap.set(pricingCards, { y: 45, opacity: 0 });
      ScrollTrigger.batch(pricingCards, {
        start: 'top 88%',
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.15,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            y: 45,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
            overwrite: 'auto'
          });
        }
      });
    }
  }

  /* ══════════════════════════════════════════════════════════════════════════
     10. FOOTER CTA REVEAL
  ══════════════════════════════════════════════════════════════════════════ */
  function initFooterCTA() {
    const cta = document.querySelector('.framer-1yrcifd');
    if (!cta) return;

    gsap.from(cta, {
      scrollTrigger: {
        trigger: cta,
        start: 'top 88%',
        toggleActions: 'play none none reverse'
      },
      y: 45,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out'
    });
  }

  /* ══════════════════════════════════════════════════════════════════════════
     11. AMBIENT CURSOR GLOW (DESKTOP)
  ══════════════════════════════════════════════════════════════════════════ */
  function initAmbientCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (document.getElementById('aev-cursor-glow')) return;

    const glow = document.createElement('div');
    glow.id = 'aev-cursor-glow';
    glow.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 380px;
      height: 380px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.035) 40%, transparent 70%);
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 999999;
      opacity: 0;
      transition: opacity 0.35s ease;
    `;
    document.body.appendChild(glow);

    window.addEventListener('mousemove', (e) => {
      glow.style.opacity = '1';
      gsap.to(glow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });
  }

  /* ══════════════════════════════════════════════════════════════════════════
     12. STICKY NAVBAR GLASSMORPHISM & ADAPTIVE CONTRAST (WHITE IN BLACK & BLACK IN WHITE)
  ══════════════════════════════════════════════════════════════════════════ */
  function initNavbarScroll() {
    const containers = document.querySelectorAll('.framer-p5dxpc-container');
    if (!containers.length) return;

    function getEffectiveBgColor(el) {
      while (el && el !== document.documentElement && el !== document.body) {
        const style = window.getComputedStyle(el);
        const bg = style.backgroundColor;
        if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
          return bg;
        }
        el = el.parentElement;
      }
      return window.getComputedStyle(document.body).backgroundColor || 'rgb(10, 11, 16)';
    }

    function isColorDark(rgbStr) {
      if (!rgbStr) return true;
      const match = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return true;
      const r = parseInt(match[1], 10);
      const g = parseInt(match[2], 10);
      const b = parseInt(match[3], 10);
      // Relative luminance
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      return lum < 150;
    }

    function updateNavState() {
      const isScrolled = window.scrollY > 20;

      // Probe background behind the navbar at Y = 50px
      containers.forEach((c) => (c.style.pointerEvents = 'none'));
      const probeEl = document.elementFromPoint(Math.floor(window.innerWidth / 2), 50);
      containers.forEach((c) => (c.style.pointerEvents = 'auto'));

      const bg = getEffectiveBgColor(probeEl);
      const darkBg = isColorDark(bg);

      containers.forEach((c) => {
        const nav = c.querySelector('nav');
        if (nav) {
          nav.classList.toggle('nav-scrolled', isScrolled);
        }
        if (darkBg) {
          c.classList.add('nav-theme-dark');
          c.classList.remove('nav-theme-light');
        } else {
          c.classList.add('nav-theme-light');
          c.classList.remove('nav-theme-dark');
        }
      });
    }

    window.addEventListener('scroll', updateNavState, { passive: true });
    window.addEventListener('resize', updateNavState, { passive: true });
    updateNavState();
    setTimeout(updateNavState, 200);
    setTimeout(updateNavState, 800);
  }

  /* ══════════════════════════════════════════════════════════════════════════
     13. SMOOTH ANCHOR NAVIGATION
  ══════════════════════════════════════════════════════════════════════════ */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  /* ─── BOOTSTRAP ────────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
