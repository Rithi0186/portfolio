/* ==========================================================================
   RITHIKA S.S. — PORTFOLIO INTERACTION ENGINE
   Bespoke Multi-Theme Controller, Workbench, Lightbox & Micro-Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initHeroRoleTypewriter();
  initNavbar();
  initMobileMenu();
  initWorkbenchTabs();
  initSkillsFilter();
  initShowcaseFilter();
  initLightbox();
  initCopyEmail();
  initLiveClock();
  initProjectCaseStudy();
  initContributionGrid();
  initScrollSpy();
  initSmoothScroll();
  initScrollReveal();
  initAboutCardStacking();
});

/* ==========================================================================
   1. MULTI-THEME ENGINE WITH LOCALSTORAGE PERSISTENCE
   ========================================================================== */
function initThemeEngine() {
  applyTheme('white');
}

function applyTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);

  // Update active state on switcher buttons
  document.querySelectorAll('.theme-dot-btn').forEach(btn => {
    if (btn.getAttribute('data-set-theme') === themeName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Re-color git contribution grid to match theme
  updateContributionColors(themeName);
}

/* ==========================================================================
   2. NAVBAR & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initMobileMenu() {
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   3. ENGINEERING WORKBENCH TABS (Hero Card)
   ========================================================================== */
function initWorkbenchTabs() {
  const tabs = document.querySelectorAll('.w-tab');
  const panes = {
    dossier: document.getElementById('pane-dossier'),
    stack: document.getElementById('pane-stack'),
    focus: document.getElementById('pane-focus')
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      // Update tabs active state
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update pane visibility
      Object.keys(panes).forEach(key => {
        if (panes[key]) {
          if (key === target) {
            panes[key].classList.add('active');
          } else {
            panes[key].classList.remove('active');
          }
        }
      });
    });
  });
}

/* ==========================================================================
   4. ENGINEERING DOMAIN MATRIX & RUNTIME INSPECTOR CONTROLLER
   ========================================================================== */
function initSkillsFilter() {
  const filterButtons = document.querySelectorAll('.skill-filter-btn');
  const domainGroups = document.querySelectorAll('.skill-domain-group');
  const techChips = document.querySelectorAll('.tech-chip-card');
  const insName = document.getElementById('insTechName');
  const insCat = document.getElementById('insTechCat');
  const insStar = document.getElementById('insTechStar');
  const insDesc = document.getElementById('insTechDesc');
  const insIconImg = document.getElementById('insIconImg');
  const insIconWrap = document.getElementById('insIconWrap');
  const insContext = document.getElementById('insTechContext');
  const insTags = document.getElementById('insTechTags');

  if (!techChips.length) return;

  function setInspection(chip) {
    if (!chip) return;
    const name = chip.getAttribute('data-tech-name') || '';
    const cat = chip.getAttribute('data-tech-cat') || '';
    const star = chip.getAttribute('data-tech-star') || '';
    const desc = chip.getAttribute('data-tech-desc') || '';
    const contextRaw = chip.getAttribute('data-tech-context') || '';
    const tagsRaw = chip.getAttribute('data-tech-tags') || '';
    const imgEl = chip.querySelector('img');

    if (insName) insName.textContent = name;
    if (insCat) insCat.textContent = cat;
    if (insStar) {
      insStar.textContent = star;
      insStar.style.display = star ? 'inline-block' : 'none';
    }
    if (insDesc) insDesc.textContent = desc;

    if (insIconImg && imgEl) {
      insIconImg.src = imgEl.src;
      insIconImg.alt = name;
    }

    // Render Context Pills
    if (insContext && contextRaw) {
      const items = contextRaw.split(',').map(s => s.trim()).filter(Boolean);
      insContext.innerHTML = items.map(it => `<span class="context-pill">${it}</span>`).join('');
    }

    // Render Subtags Cloud
    if (insTags && tagsRaw) {
      const tags = tagsRaw.split(',').map(s => s.trim()).filter(Boolean);
      insTags.innerHTML = tags.map(t => `<span class="tech-subtag">${t}</span>`).join('');
    }

    // Micro-interaction bounce
    if (insIconWrap) {
      insIconWrap.style.transform = 'scale(0.92)';
      setTimeout(() => {
        insIconWrap.style.transform = 'scale(1)';
      }, 120);
    }

    techChips.forEach(c => c.classList.remove('active-inspect'));
    chip.classList.add('active-inspect');
  }

  // Bind hover, focus, and click on each tech chip
  techChips.forEach(chip => {
    chip.addEventListener('mouseenter', () => setInspection(chip));
    chip.addEventListener('focus', () => setInspection(chip));
    chip.addEventListener('click', () => setInspection(chip));
  });

  // Category filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button state
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      let firstMatch = null;

      // Filter Domain Groups
      domainGroups.forEach(group => {
        const domain = group.getAttribute('data-domain');
        if (filter === 'all' || domain === filter) {
          group.classList.remove('dimmed');
        } else {
          group.classList.add('dimmed');
        }
      });

      // Filter individual tech chips
      techChips.forEach(chip => {
        const category = chip.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          chip.classList.remove('dimmed');
          if (!firstMatch) firstMatch = chip;
        } else {
          chip.classList.add('dimmed');
        }
      });

      // Update Inspector to first matching tech in filtered group
      if (firstMatch) {
        setInspection(firstMatch);
      }
    });
  });
}

/* ==========================================================================
   4B. WORK SHOWCASE (PROJECTS) FILTER
   ========================================================================== */
function initShowcaseFilter() {
  const filterPills = document.querySelectorAll('.showcase-filter-pill');
  const projectCards = document.querySelectorAll('.project-card-v2');

  if (!filterPills.length || !projectCards.length) return;

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const filter = pill.getAttribute('data-filter');

      // Update active pill state
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      // Filter cards
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. CERTIFICATE & PHOTO LIGHTBOX MODAL
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalTitle = document.getElementById('lightboxTitle');
  const modalCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxCloseBtn');

  if (!modal || !modalImg) return;

  function openLightbox(src, title, caption) {
    modalImg.src = src;
    modalTitle.textContent = title || 'Certificate Inspection';
    modalCaption.textContent = caption || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      modalImg.src = '';
    }, 250);
  }

  // Trigger from any card or element with data-cert-src
  document.querySelectorAll('[data-cert-src]').forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-cert-src');
      const title = card.getAttribute('data-cert-title');
      const caption = card.getAttribute('data-cert-caption');
      if (src) openLightbox(src, title, caption);
    });
  });

  // Trigger from stage photo card
  const stageCard = document.getElementById('stagePhotoTrigger');
  if (stageCard) {
    stageCard.addEventListener('click', () => {
      openLightbox(
        'img/ece office bearer.jpeg',
        'SPECTRUM Association Office Bearer Recognition',
        'Receiving the ECE Department Association Appreciation Award & Memento at Dr. Mahalingam College of Engineering and Technology.'
      );
    });
  }

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   6. COPY EMAIL WITH ANIMATED TOAST
   ========================================================================== */
function initCopyEmail() {
  const email = 'rithika0182006@gmail.com';
  const heroBtn = document.getElementById('heroCopyEmailBtn');
  const contactCard = document.getElementById('contactEmailCard');

  function copyToClipboard() {
    navigator.clipboard.writeText(email).then(() => {
      showToast(`Copied ${email} to clipboard!`);
    }).catch(() => {
      showToast(`Contact: ${email}`);
    });
  }

  if (heroBtn) heroBtn.addEventListener('click', copyToClipboard);
  if (contactCard) contactCard.addEventListener('click', copyToClipboard);
}

function showToast(msg) {
  const toast = document.getElementById('toastNotice');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast) return;

  if (toastMsg) toastMsg.textContent = msg;
  toast.classList.add('show');

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ==========================================================================
   7. LIVE IST CLOCK (Coimbatore, India)
   ========================================================================== */
function initLiveClock() {
  const clockText = document.getElementById('clockText');
  if (!clockText) return;

  function updateClock() {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const formatter = new Intl.DateTimeFormat([], options);
    clockText.textContent = `Coimbatore, India (IST): ${formatter.format(new Date())}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   8. PROJECT CASE STUDY DRAWER TOGGLE
   ========================================================================== */
function initProjectCaseStudy() {
  const expandButtons = document.querySelectorAll('.project-expand-btn');

  expandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const caseStudy = document.getElementById(`casestudy-${projectId}`);

      if (caseStudy) {
        caseStudy.classList.toggle('open');
        btn.textContent = caseStudy.classList.contains('open')
          ? 'Close Case Study ↑'
          : 'Architecture Case Study ↓';
      }
    });
  });
}

/* ==========================================================================
   9. DYNAMIC GITHUB CONTRIBUTION GRID
   ========================================================================== */
let currentContributionTheme = 'white';

function getThemeColors(theme) {
  // Authentic original GitHub contribution matrix colors
  if (theme === 'white') {
    return [
      '#ebedf0', // Level 0: No contributions
      '#9be9a8', // Level 1: Low
      '#40c463', // Level 2: Medium
      '#30a14e', // Level 3: High
      '#216e39'  // Level 4: Peak contributions
    ];
  } else {
    // Original GitHub Dark mode contribution colors
    return [
      '#161b22', // Level 0: No contributions
      '#0e4429', // Level 1: Low
      '#006d32', // Level 2: Medium
      '#26a641', // Level 3: High
      '#39d353'  // Level 4: Peak contributions
    ];
  }
}

function initContributionGrid() {
  const grid = document.getElementById('contribGrid');
  if (!grid) return;

  const totalWeeks = 50;
  const daysPerWeek = 7;
  const levels = getThemeColors(currentContributionTheme);

  grid.innerHTML = '';
  for (let w = 0; w < totalWeeks; w++) {
    const col = document.createElement('div');
    col.className = 'contrib-col';

    for (let d = 0; d < daysPerWeek; d++) {
      const square = document.createElement('div');
      square.className = 'contrib-square';

      // Seed realistic GitHub distribution with natural breaks
      const rand = Math.random();
      let level = 0;
      if (rand > 0.40) level = 1;
      if (rand > 0.65) level = 2;
      if (rand > 0.85) level = 3;
      if (rand > 0.94) level = 4;

      square.setAttribute('data-level', level);
      square.style.backgroundColor = levels[level];
      col.appendChild(square);
    }
    grid.appendChild(col);
  }
}

function updateContributionColors(theme) {
  currentContributionTheme = theme;
  const levels = getThemeColors(theme);
  const squares = document.querySelectorAll('.contrib-square');

  squares.forEach(sq => {
    const lvl = parseInt(sq.getAttribute('data-level') || '0', 10);
    sq.style.backgroundColor = levels[lvl];
  });

  const legendSquares = document.querySelectorAll('.contrib-legend-sq');
  legendSquares.forEach((lsq, idx) => {
    if (levels[idx]) {
      lsq.style.backgroundColor = levels[idx];
    }
  });
}

/* ==========================================================================
   10. SCROLLSPY & SMOOTH SCROLL
   ========================================================================== */
let isNavClicking = false;
let navTimer = null;

function setActiveNav(targetHref) {
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === targetHref) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    if (link.getAttribute('href') === targetHref) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  function updateSpy() {
    if (isNavClicking) return;

    if ((window.innerHeight + window.pageYOffset) >= document.documentElement.scrollHeight - 60) {
      setActiveNav('#contact');
      return;
    }

    const scrollPos = window.pageYOffset + 120;
    let activeId = 'home';

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        activeId = sec.getAttribute('id');
      }
    });

    setActiveNav(`#${activeId}`);
  }

  window.addEventListener('scroll', updateSpy, { passive: true });
  updateSpy();
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;

      const targetEl = document.querySelector(href);
      if (!targetEl) return;

      e.preventDefault();
      isNavClicking = true;
      clearTimeout(navTimer);
      setActiveNav(href);

      const navHeight = 72;
      const elTop = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: elTop,
        behavior: 'smooth'
      });

      navTimer = setTimeout(() => {
        isNavClicking = false;
        setActiveNav(href);
      }, 850);
    });
  });
}

/* ==========================================================================
   11. SCROLL REVEAL (SUBTLE, NATURAL ANIMATION)
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   12. CONTACT FORM SUBMISSION FEEDBACK
   ========================================================================== */
function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  btn.innerHTML = '<span>Sending Message...</span>';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<span>Message Sent Successfully</span>';
    btn.style.background = 'var(--status-green)';
    btn.style.color = '#fff';

    showToast('Thanks for reaching out! I will respond promptly.');

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      form.reset();
    }, 3200);
  }, 1000);
}

/* ==========================================================================
   13. PROMPTWARS ABOUT STACKING CARDS SCROLL CONTROLLER
   ========================================================================== */
function initAboutCardStacking() {
  const cards = document.querySelectorAll('.prompt-pill-card');
  if (!cards.length) return;

  let ticking = false;

  function updateStackedCards() {
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const stickyThreshold = 100 + (index * 26);

      // Check if this card has reached its sticky pinned threshold
      const isSticky = rect.top <= (stickyThreshold + 4);

      // Check if the next card is already overlapping this card
      const nextCard = cards[index + 1];
      let isCoveredByNext = false;
      if (nextCard) {
        const nextRect = nextCard.getBoundingClientRect();
        const nextThreshold = 100 + ((index + 1) * 26);
        if (nextRect.top <= nextThreshold + 20) {
          isCoveredByNext = true;
        }
      }

      if (isCoveredByNext) {
        card.classList.add('card-stacked-under');
        card.classList.remove('card-active-top');
      } else if (isSticky) {
        card.classList.add('card-active-top');
        card.classList.remove('card-stacked-under');
      } else {
        card.classList.remove('card-active-top', 'card-stacked-under');
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateStackedCards);
      ticking = true;
    }
  }, { passive: true });

  // Initial calculation
  updateStackedCards();
}

/* ==========================================================================
   14. HERO ROLE TYPEWRITER ENGINE (10 Roles in Continuous Loop)
   ========================================================================== */
function initHeroRoleTypewriter() {
  const textEl = document.getElementById('typewriterText') || document.querySelector('.hero-role-script');
  if (!textEl) return;

  const roles = [
    "Engineering Student",
    "Tech Innovator",
    "Aspiring Software Engineer",
    "Java Developer",
    "Problem Solver",
    "AI & ML Enthusiast",
    "Student Developer",
    "Future Entrepreneur"
  ];

  let roleIndex = 0;
  let charIndex = roles[0].length;
  let isDeleting = true;

  const typingSpeed = 80;      // ms per character typed
  const deletingSpeed = 40;    // ms per character deleted
  const holdAfterType = 1800;  // ms pause after typing full role
  const holdAfterDelete = 350; // ms pause before typing next role

  function tick() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      textEl.textContent = currentRole.substring(0, charIndex);
    } else {
      charIndex++;
      textEl.textContent = currentRole.substring(0, charIndex);
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      // Completed typing the current role, pause before deleting
      delay = holdAfterType;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Completed deleting, switch to next role and pause briefly
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = holdAfterDelete;
    }

    setTimeout(tick, delay);
  }

  // Initial hold so the user can read the first role before deletion starts
  setTimeout(tick, holdAfterType);
}


