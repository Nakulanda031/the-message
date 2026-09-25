/* =========================================================
   N & M — CONFIGURATION
   Edit everything in this section with your real details.
   ========================================================= */
const CONFIG = {
  creatorName: "Nakulan",
  personName: "Monika",

  // Put your real number in international format, no + or spaces, e.g. "919876543210"
  whatsappNumber: "YOUR_NUMBER_HERE",

  whatsappMessage: "Hey Nakulan, I saw the website. I want to talk about it ❤️",

  finalSignature: "— Nakulan"
};

/* =========================================================
   CUSTOMIZE YOUR REAL CHAT MOMENTS HERE
   Replace these with real lines from your actual conversations.
   sender must be exactly "Nakulan" or "Monika".
   ========================================================= */
const chatMessages = [
  { sender: "Nakulan", text: "Hey 😂" },
  { sender: "Monika", text: "Heyy" },
  { sender: "Nakulan", text: "What are you doing?" },
  { sender: "Monika", text: "Nothing much…" },
  { sender: "Nakulan", text: "Same here." }
];

/* =========================================================
   CUSTOMIZE YOUR OBSERVATIONS HERE
   Replace with real, specific things you've noticed.
   ========================================================= */
const observations = [
  "Your way of texting",
  "Your sense of humour",
  "The little things you say",
  "The way our conversations somehow continue",
  "Something I can't quite explain"
];

/* =========================================================
   CUSTOMIZE QUIZ QUESTIONS HERE
   correctIndex is 0-based.
   ========================================================= */
const quizQuestions = [
  {
    q: "What do I probably do when I'm bored?",
    options: ["Sleep", "Code something random", "Scroll endlessly", "All of the above 😂"],
    correctIndex: 3
  },
  {
    q: "How do I usually reply when you text late at night?",
    options: ["Instantly", "After a while", "Depends on the day", "All of the above"],
    correctIndex: 3
  },
  {
    q: "What's the most likely reason I'm quiet for a bit?",
    options: ["Busy with something", "Thinking too much", "Both, honestly", "I fell asleep"],
    correctIndex: 2
  }
];

/* =========================================================
   CUSTOMIZE FINAL MESSAGE HERE
   ========================================================= */
const finalLines = [
  "Some stories begin with a meeting.",
  "Some begin with a message.",
  "Maybe ours began with a conversation.",
  `<span class="brand">${CONFIG.creatorName} &times; ${CONFIG.personName}</span>`,
  "Whatever happens next…",
  "…I'm glad we had the conversation.",
  `<span class="tiny">Built with code &amp; a little courage.</span>`,
  `<span class="tiny">${CONFIG.finalSignature}</span>`
];

/* =========================================================
   ENGINE — no need to edit below unless customizing behavior
   ========================================================= */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const screens = ["intro", "chat", "analysis", "notice", "quiz", "secret", "confession", "choice", "final"];
  let currentIndex = 0;

  function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const el = document.getElementById("screen-" + id);
    if (el) el.classList.add("active");
    currentIndex = screens.indexOf(id);
    updateProgress();
    if (id === "chat") startChat();
    if (id === "analysis") startAnalysis();
    if (id === "notice") buildNoticeCards();
    if (id === "quiz") buildQuiz();
    if (id === "confession") startConfession();
    if (id === "final") startFinal();
    el && el.setAttribute("tabindex", "-1");
    el && el.focus({ preventScroll: true });
  }

  function updateProgress() {
    const pct = (currentIndex / (screens.length - 1)) * 100;
    document.getElementById("progressFill").style.width = pct + "%";
  }

  // delegate all [data-next] buttons
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-next]");
    if (btn) showScreen(btn.getAttribute("data-next"));
  });

  /* ---------- INTRO SEQUENCE ---------- */
  function runIntro() {
    const lines = document.querySelectorAll("#screen-intro [data-line]");
    const delay = reduceMotion ? 60 : 900;
    lines.forEach((el, i) => {
      setTimeout(() => el.classList.add("show"), reduceMotion ? 0 : i * delay);
    });
  }
  runIntro();

  /* ---------- CHAT ---------- */
  let chatStarted = false;
  function startChat() {
    if (chatStarted) return;
    chatStarted = true;
    const window_ = document.getElementById("chatWindow");
    const whisper = document.getElementById("chatWhisper");
    const continueBtn = document.getElementById("chatContinue");
    let i = 0;

    function nextMessage() {
      if (i >= chatMessages.length) {
        setTimeout(() => {
          whisper.textContent = "Funny how some conversations start with nothing…";
          whisper.classList.add("show");
          setTimeout(() => {
            whisper.textContent = "…and somehow become the part of your day you look forward to.";
          }, 2200);
          setTimeout(() => continueBtn.hidden = false, 3600);
        }, 400);
        return;
      }
      const msg = chatMessages[i];
      const typing = document.createElement("div");
      typing.className = "typing-dots";
      typing.innerHTML = "<span></span><span></span><span></span>";
      window_.appendChild(typing);
      window_.scrollTop = window_.scrollHeight;

      setTimeout(() => {
        typing.remove();
        const bubble = document.createElement("div");
        bubble.className = "bubble " + (msg.sender === "Nakulan" ? "nakulan" : "monika");
        bubble.textContent = msg.text;
        window_.appendChild(bubble);
        window_.scrollTop = window_.scrollHeight;
        i++;
        setTimeout(nextMessage, reduceMotion ? 50 : 700);
      }, reduceMotion ? 50 : 850);
    }
    nextMessage();
  }

  /* ---------- ANALYSIS ---------- */
  let analysisStarted = false;
  function startAnalysis() {
    if (analysisStarted) return;
    analysisStarted = true;
    const steps = ["Messages", "Random jokes", "Late conversations", "Small moments", "One unexpected result"];
    const list = document.getElementById("scanList");
    steps.forEach((s, idx) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="num">0${idx + 1}</span> ${s}`;
      list.appendChild(li);
    });
    let i = 0;
    const items = list.querySelectorAll("li");
    function revealNext() {
      if (i >= items.length) {
        setTimeout(() => document.getElementById("resultCard").hidden = false, 400);
        return;
      }
      items[i].classList.add("show");
      i++;
      setTimeout(revealNext, reduceMotion ? 40 : 500);
    }
    revealNext();
  }

  /* ---------- NOTICE CARDS ---------- */
  let noticeBuilt = false;
  function buildNoticeCards() {
    if (noticeBuilt) return;
    noticeBuilt = true;
    const grid = document.getElementById("noticeGrid");
    observations.forEach((text, idx) => {
      const card = document.createElement("div");
      card.className = "notice-card";
      card.innerHTML = `<span class="num">0${idx + 1}</span><p>${text}</p>`;
      grid.appendChild(card);
    });
  }

  /* ---------- QUIZ ---------- */
  let quizBuilt = false;
  let quizIndex = 0;
  let quizScore = 0;
  function buildQuiz() {
    if (quizBuilt) return;
    quizBuilt = true;
    renderQuizQuestion();
  }
  function renderQuizQuestion() {
    const area = document.getElementById("quizArea");
    area.innerHTML = "";
    if (quizIndex >= quizQuestions.length) {
      area.innerHTML = `
        <p class="quiz-q">Okay…</p>
        <p class="whisper show">You actually know me pretty well.</p>
        <p class="whisper show">But there is one question…</p>
        <button class="btn btn-primary" data-next="secret">Continue <span aria-hidden="true">&rarr;</span></button>`;
      return;
    }
    const q = quizQuestions[quizIndex];
    const wrap = document.createElement("div");
    wrap.style.display = "flex";
    wrap.style.flexDirection = "column";
    wrap.style.gap = "1rem";
    wrap.style.width = "100%";
    wrap.style.alignItems = "center";

    const qEl = document.createElement("p");
    qEl.className = "quiz-q";
    qEl.textContent = q.q;
    wrap.appendChild(qEl);

    const optWrap = document.createElement("div");
    optWrap.className = "quiz-options";
    q.options.forEach((opt, idx) => {
      const b = document.createElement("button");
      b.className = "btn btn-ghost quiz-opt";
      b.textContent = opt;
      b.addEventListener("click", () => handleQuizAnswer(idx, q, optWrap, feedback));
      optWrap.appendChild(b);
    });
    wrap.appendChild(optWrap);

    const feedback = document.createElement("p");
    feedback.className = "quiz-feedback";
    wrap.appendChild(feedback);

    area.appendChild(wrap);
  }
  function handleQuizAnswer(idx, q, optWrap, feedbackEl) {
    const buttons = optWrap.querySelectorAll("button");
    buttons.forEach(b => b.disabled = true);
    buttons[q.correctIndex].classList.add("correct");
    if (idx === q.correctIndex) quizScore++;
    feedbackEl.textContent = idx === q.correctIndex ? "Yep, exactly that." : "Close — but not quite.";
    setTimeout(() => {
      quizIndex++;
      renderQuizQuestion();
    }, 1100);
  }

  /* ---------- SECRET QUESTION ---------- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".secret-btn");
    if (!btn) return;
    const answer = btn.getAttribute("data-answer");
    document.getElementById("secretChoices").querySelectorAll("button").forEach(b => b.disabled = true);
    const reply = document.getElementById("secretReply");
    if (answer === "more") {
      reply.textContent = "Let me show you.";
      reply.hidden = false;
      setTimeout(() => showScreen("confession"), 1400);
    } else {
      reply.textContent = "Maybe. But there's also something else I've been meaning to say.";
      reply.hidden = false;
      setTimeout(() => showScreen("confession"), 1600);
    }
  });

  /* ---------- CONFESSION ---------- */
  let confessionStarted = false;
  function startConfession() {
    if (confessionStarted) return;
    confessionStarted = true;
    const container = document.getElementById("confessionLines");
    const lines = [
      "Somewhere between the random messages…",
      "…the jokes…",
      "…the conversations…",
      "…and all those little moments…",
      "…I started seeing you differently.",
      "You were already someone important to me.",
      "But somewhere along the way…",
      "…you became someone I started liking as more than a friend.",
      "So, Monika…",
      { text: "I like you. ❤️", cls: "big" },
      { text: "I didn't make this to pressure you.", cls: "small" },
      { text: "I just wanted to be honest about how I feel.", cls: "small" }
    ];
    let i = 0;
    function next() {
      if (i >= lines.length) {
        setTimeout(() => showScreen("choice"), reduceMotion ? 200 : 1800);
        return;
      }
      const item = lines[i];
      const p = document.createElement("p");
      if (typeof item === "string") {
        p.textContent = item;
      } else {
        p.textContent = item.text;
        p.classList.add(item.cls);
      }
      container.appendChild(p);
      requestAnimationFrame(() => p.classList.add("show"));
      i++;
      setTimeout(next, reduceMotion ? 80 : 1500);
    }
    next();
  }

  /* ---------- HER CHOICE ---------- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-choice");
    if (!btn) return;
    const choice = btn.getAttribute("data-choice");
    document.getElementById("choiceGrid").querySelectorAll("button").forEach(b => b.disabled = true);
    const resp = document.getElementById("choiceResponse");
    resp.hidden = false;
    resp.innerHTML = "";

    let lines = [];
    if (choice === "same") {
      lines = [
        "Okay…",
        "Now I'm officially smiling at my screen. 😂❤️",
        "Maybe this conversation deserves a new chapter."
      ];
    } else if (choice === "time") {
      lines = [
        "Take your time.",
        "No pressure. Really.",
        "I'm glad I could tell you."
      ];
    } else {
      lines = [
        "Then let's talk.",
        "That's probably better than any website I could build anyway. 😂"
      ];
    }
    lines.forEach(t => {
      const p = document.createElement("p");
      p.textContent = t;
      resp.appendChild(p);
    });

    if (choice === "talk") {
      const url = buildWhatsAppUrl();
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "btn wa-btn";
      a.textContent = "Continue the conversation →";
      resp.appendChild(a);
    }

    const goFinal = document.createElement("button");
    goFinal.className = "btn btn-ghost";
    goFinal.style.marginTop = "1rem";
    goFinal.textContent = "Continue →";
    goFinal.addEventListener("click", () => showScreen("final"));
    resp.appendChild(goFinal);
  });

  function buildWhatsAppUrl() {
    const number = CONFIG.whatsappNumber.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(CONFIG.whatsappMessage);
    return `https://wa.me/${number}?text=${text}`;
  }

  /* ---------- FINAL ---------- */
  let finalStarted = false;
  function startFinal() {
    if (finalStarted) return;
    finalStarted = true;
    const container = document.getElementById("finalLines");
    let i = 0;
    function next() {
      if (i >= finalLines.length) return;
      const p = document.createElement("p");
      p.innerHTML = finalLines[i];
      container.appendChild(p);
      requestAnimationFrame(() => p.classList.add("show"));
      i++;
      setTimeout(next, reduceMotion ? 80 : 900);
    }
    next();
  }

  document.getElementById("replayBtn").addEventListener("click", () => {
    location.reload();
  });

  /* ---------- MUSIC TOGGLE ---------- */
  const musicBtn = document.getElementById("musicToggle");
  const music = document.getElementById("bgMusic");
  let musicOn = false;
  musicBtn.addEventListener("click", () => {
    musicOn = !musicOn;
    if (musicOn) {
      music.play().catch(() => { /* file may not exist yet — fail silently */ });
      musicBtn.textContent = "♫ Music On";
    } else {
      music.pause();
      musicBtn.textContent = "♫ Music";
    }
    musicBtn.setAttribute("aria-pressed", String(musicOn));
  });

  /* ---------- STARFIELD ---------- */
  function initStars() {
    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");
    let w, h, stars;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.floor((w * h) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.2,
        s: Math.random() * 0.4 + 0.05,
        o: Math.random() * 0.6 + 0.2
      }));
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#fff";
      stars.forEach(st => {
        ctx.globalAlpha = st.o;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
        st.y += st.s;
        if (st.y > h) { st.y = 0; st.x = Math.random() * w; }
      });
      ctx.globalAlpha = 1;
      if (!reduceMotion) requestAnimationFrame(draw);
    }
    draw();
  }
  initStars();

})();
