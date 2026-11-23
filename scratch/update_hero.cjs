const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const heroRegex = /<section class="framer-wxbawq" data-framer-name="Hero">[\s\S]*?<\/section>/;

if (!heroRegex.test(html)) {
  console.error("Hero section not found!");
  process.exit(1);
}

const newHeroHtml = `<section class="framer-wxbawq" data-framer-name="Hero">
  <!-- Mindly Rotating Badge (Top Right) -->
  <div class="mindly-rotating-badge" title="AEV Studios - Growth OS">
    <svg class="mindly-badge-svg" viewBox="0 0 100 100">
      <path id="badgeCirclePath" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
      <text><textPath href="#badgeCirclePath">✦ AI GROWTH OS ✦ AEV STUDIOS ✦</textPath></text>
    </svg>
    <div class="mindly-badge-star">✦</div>
  </div>

  <div class="framer-1y8fc44" data-framer-name="Hero Container">
    <div class="framer-1c5oepp">
      <div class="framer-1vosrlv">
        <!-- Pre-Heading Pill Tag -->
        <div class="framer-1v59uda" data-framer-name="Pre-Heading">
          <p class="framer-text">Growth OS for Modern Businesses</p>
        </div>

        <!-- Mindly Editorial Headline -->
        <div class="framer-1bbd531">
          <h1 class="framer-text mindly-headline">
            A clearer mind <span class="mindly-italic">for faster growth.</span>
          </h1>
        </div>

        <!-- Subtitle -->
        <div class="framer-1vfufc7">
          <p class="framer-text mindly-subtitle">
            AEV Studios builds intelligent systems that eliminate operational chaos, organize workflows, and scale your business without the overhead.
          </p>
        </div>
      </div>

      <!-- Dual Action Buttons -->
      <div class="framer-y4qhgf mindly-cta-group">
        <a class="mindly-btn-primary" href="./book-a-call.html">
          <span>Get started free</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a class="mindly-btn-secondary" href="./use-cases.html">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <span>Watch systems</span>
        </a>
      </div>

      <!-- Mindly Centerpiece Stage with Connected Floating Cards -->
      <div class="mindly-stage" id="mindly-hero-stage">
        <!-- SVG Curved Connecting Lines -->
        <svg class="mindly-spline-svg" viewBox="0 0 1060 540" fill="none" preserveAspectRatio="none">
          <path id="spline-left" d="M 230 180 C 350 200, 390 320, 470 380" />
          <path id="spline-right" d="M 830 260 C 720 280, 680 340, 590 380" />
        </svg>

        <!-- Left Connected Callout Card -->
        <div class="mindly-card-callout left" id="mindly-card-left">
          <div class="mindly-callout-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5v14M7 9v6M22 10v4M2 10v4"/></svg>
          </div>
          <h4>Turn thoughts into progress.</h4>
          <p>Capture, organise and scale operations.</p>
        </div>

        <!-- Centerpiece Artwork Stage with 3D Orbiting Chips -->
        <div class="mindly-stage-subject" id="mindly-subject-box">
          <img src="assets/images/mindly_hero_centerpiece.jpg" alt="AEV Studios Mindly Core" class="mindly-subject-img" id="mindly-subject-img" loading="eager" />

          <!-- Orbiting Chip: Focus -->
          <div class="mindly-orbit-chip chip-focus">
            <span class="chip-dot" style="background:#10b981;"></span>
            <span class="chip-title">Focus</span>
            <span class="chip-sub">Deep work, bigger results.</span>
          </div>

          <!-- Orbiting Chip: Scale -->
          <div class="mindly-orbit-chip chip-plan">
            <span class="chip-dot" style="background:#f59e0b;"></span>
            <span class="chip-title">Plan</span>
            <span class="chip-sub">Turn ideas into action.</span>
          </div>
        </div>

        <!-- Right Connected Callout Card -->
        <div class="mindly-card-callout right" id="mindly-card-right">
          <div class="mindly-callout-avatars">
            <div class="mindly-avatar-mini" style="background:#6366f1;">A</div>
            <div class="mindly-avatar-mini" style="background:#8b5cf6;">E</div>
            <div class="mindly-avatar-mini" style="background:#ec4899;">V</div>
            <div class="mindly-avatar-mini plus">+</div>
          </div>
          <h4>Ideas, anytime, anywhere.</h4>
          <p>Sync operations across your whole team.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Mindly Social Proof (Bottom Left) -->
  <div class="mindly-social-proof">
    <div class="mindly-social-proof-text">Trusted by 50,000+ creators worldwide.</div>
    <div class="mindly-avatars-row">
      <div class="mindly-avatar-circle" style="background: linear-gradient(135deg, #4f46e5, #06b6d4);">S</div>
      <div class="mindly-avatar-circle" style="background: linear-gradient(135deg, #f59e0b, #ef4444);">M</div>
      <div class="mindly-avatar-circle" style="background: linear-gradient(135deg, #10b981, #3b82f6);">K</div>
      <div class="mindly-avatar-circle" style="background: linear-gradient(135deg, #ec4899, #8b5cf6);">J</div>
      <div class="mindly-avatar-plus">+</div>
    </div>
  </div>

  <!-- Mindly Hallmark (Bottom Right) -->
  <div class="mindly-hallmark">
    <div class="mindly-hallmark-line"></div>
    <div class="mindly-hallmark-text">
      <span>✦</span> Less chaos. More clarity.
    </div>
  </div>
</section>`;

html = html.replace(heroRegex, newHeroHtml);
fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully replaced Hero section with Mindly design!');
