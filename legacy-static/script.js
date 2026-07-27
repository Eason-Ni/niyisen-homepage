const year = document.querySelector("#year");
const languageButtons = document.querySelectorAll("[data-lang]");
const translatableNodes = document.querySelectorAll("[data-i18n]");
const descriptionMeta = document.querySelector("#meta-description");
const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
const ogTitleMeta = document.querySelector('meta[property="og:title"]');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const themeButtons = document.querySelectorAll("[data-theme-choice]");
const progressBar = document.querySelector(".progress");
const heroVisual = document.querySelector(".hero-visual");
const revealItems = document.querySelectorAll(".hero-copy, .hero-visual, .focus-item, .timeline li, .note-list span, .qr-block, .site-footer");
const motionSections = document.querySelectorAll(".section");
const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktopMotionQuery = window.matchMedia("(min-width: 901px)");
const THEME_STORAGE_KEY = "eason-homepage-theme";

document.documentElement.classList.add("js");
year.textContent = new Date().getFullYear();

let mouseFrame = null;
let heroX = 0;
let heroY = 0;

const translations = {
  en: {
    metaTitle: "Eason Ni | AI Search & Recommendation",
    metaDescription:
      "Eason Ni's personal homepage for AI search, recommendation systems, applied research, and reusable intelligent workflows.",
    nav: {
      about: "About",
      work: "Work",
      method: "Method",
      writing: "Notes",
      contact: "Contact",
    },
    theme: {
      system: "System",
      light: "Light",
      dark: "Dark",
    },
    hero: {
      eyebrow: "AI Search / Recommendation / Product Intelligence",
      lead:
        "I turn messy intent, product signals, and research questions into search and recommendation systems people can actually use.",
      tag1: "Query understanding",
      tag2: "Retrieval quality",
      tag3: "Ranking judgment",
      tag4: "Reusable workflows",
      primaryAction: "View Focus",
      secondaryAction: "Find Me",
    },
    visual: {
      caption: "AI systems, product judgment, reusable notes.",
      kicker: "Current Loop",
      step1: "Understand intent",
      step2: "Retrieve signals",
      step3: "Rank decisions",
      step4: "Distill notes",
      rail: "Intent -> Signal -> Decision -> Knowledge",
    },
    about: {
      label: "About",
      title: "A practical research home base for AI-powered discovery.",
      body:
        "My work sits between user understanding, item understanding, matching, ranking, and product judgment. I care about systems that improve real workflows, not isolated demos that look clever once.",
      proof1: {
        title: "Business questions first",
        body: "Start from the decision, then map data, model, evaluation, and UX.",
      },
      proof2: {
        title: "Evidence over slogans",
        body: "Keep source notes, bad cases, and reusable checklists close to the work.",
      },
    },
    work: {
      label: "Selected Work",
      title: "Three directions I keep building around.",
      body: "Each direction combines research, product analysis, and small runnable workflows.",
      item1: {
        title: "AI Search",
        body: "Query understanding, multimodal retrieval, ranking evaluation, and search-result quality loops.",
      },
      item2: {
        title: "Recommendation",
        body: "User intent, content and product signals, distribution mechanics, and recommendation product judgment.",
      },
      item3: {
        title: "Applied Research",
        body: "Turning research questions into structured notes, project plans, demos, and decision-ready summaries.",
      },
    },
    method: {
      label: "Method",
      title: "The operating loop",
      body: "A lightweight loop for moving from ambiguous product questions to reusable knowledge.",
      step1: {
        kicker: "Explore",
        title: "Clarify the intent",
        body: "Define the user need, product context, and evidence needed to judge quality.",
      },
      step2: {
        kicker: "Build",
        title: "Connect signals",
        body: "Map queries, items, content, models, and evaluation into a system view.",
      },
      step3: {
        kicker: "Distill",
        title: "Make it reusable",
        body: "Keep the output readable: notes, demos, checklists, and next-step decisions.",
      },
    },
    writing: {
      label: "Notes",
      title: "Notes that make the work easier to reopen.",
      body:
        "This site is a public index for research notes, project summaries, and small demos around AI search, recommendation, product intelligence, and agent workflows.",
      topic1: "AI search and retrieval quality",
      topic2: "Recommendation system product judgment",
      topic3: "Applied research workflows",
    },
    contact: {
      label: "Contact",
      title: "The fastest way to find me.",
      body:
        "Reach out if the topic is AI search, recommendation systems, product understanding, applied research, or practical knowledge workflows.",
      wechatName: "WeChat Official Account: 学习的一天天",
      qrCaption: "Scan to follow my WeChat official account.",
    },
    footer: {
      note: "Static homepage. Built for clarity and reuse.",
    },
  },
  zh: {
    metaTitle: "Eason Ni | AI 搜索与推荐",
    metaDescription: "Eason Ni 的个人主页，关注 AI 搜索、推荐系统、应用研究与可复用的智能工作流。",
    nav: {
      about: "关于",
      work: "方向",
      method: "方法",
      writing: "笔记",
      contact: "联系",
    },
    theme: {
      system: "跟随系统",
      light: "日间模式",
      dark: "夜间模式",
    },
    hero: {
      eyebrow: "AI 搜索 / 推荐系统 / 产品智能化",
      lead: "我把复杂的意图、商品信号和研究问题，整理成真正能被使用的搜索与推荐系统。",
      tag1: "查询理解",
      tag2: "召回质量",
      tag3: "排序判断",
      tag4: "可复用工作流",
      primaryAction: "查看方向",
      secondaryAction: "找到我",
    },
    visual: {
      caption: "AI 系统、产品判断、可复用笔记。",
      kicker: "当前闭环",
      step1: "理解意图",
      step2: "召回信号",
      step3: "排序决策",
      step4: "沉淀笔记",
      rail: "意图 -> 信号 -> 决策 -> 知识",
    },
    about: {
      label: "关于",
      title: "一个面向 AI 发现系统的应用研究入口。",
      body:
        "我的工作连接用户理解、商品/内容理解、匹配、排序和产品判断。我更在意系统能否改善真实业务流程，而不是只在单次演示里看起来聪明。",
      proof1: {
        title: "先看业务问题",
        body: "先定义要支持的决策，再映射数据、模型、评估和体验。",
      },
      proof2: {
        title: "证据比口号重要",
        body: "把来源笔记、坏案例和可复用检查清单保留在工作附近。",
      },
    },
    work: {
      label: "精选方向",
      title: "我持续围绕三个方向建设。",
      body: "每个方向都结合研究、产品分析和小型可运行工作流。",
      item1: {
        title: "AI 搜索",
        body: "查询理解、多模态召回、排序评估，以及真实搜索结果质量闭环。",
      },
      item2: {
        title: "推荐系统",
        body: "用户意图、内容与商品信号、分发机制，以及推荐产品判断。",
      },
      item3: {
        title: "应用研究",
        body: "把研究问题转成结构化笔记、项目计划、Demo 和可支持决策的摘要。",
      },
    },
    method: {
      label: "方法",
      title: "我的工作闭环",
      body: "一套轻量流程，用来把模糊产品问题推进成可复用知识。",
      step1: {
        kicker: "探索",
        title: "澄清意图",
        body: "定义用户需求、产品语境，以及判断质量所需的证据。",
      },
      step2: {
        kicker: "构建",
        title: "连接信号",
        body: "把查询、商品/内容、模型和评估放到同一个系统视角里。",
      },
      step3: {
        kicker: "沉淀",
        title: "变成可复用资产",
        body: "输出要能被重新打开：笔记、Demo、检查清单和下一步决策。",
      },
    },
    writing: {
      label: "笔记",
      title: "把做过的事沉淀成可以重新打开的笔记。",
      body: "这个主页会作为公开索引，整理 AI 搜索、推荐系统、产品智能化和 Agent 工作流相关的研究笔记、项目总结与小型 Demo。",
      topic1: "AI 搜索与召回质量",
      topic2: "推荐系统里的产品判断",
      topic3: "应用研究工作流",
    },
    contact: {
      label: "联系",
      title: "最快找到我的方式。",
      body: "如果主题是 AI 搜索、推荐系统、商品/内容理解、应用研究或实用知识工作流，可以直接联系我。",
      wechatName: "公众号：学习的一天天",
      qrCaption: "扫码关注我的公众号。",
    },
    footer: {
      note: "静态个人主页。为清晰和复用而建。",
    },
  },
};

let currentLanguage = "en";
let currentThemePreference = getStoredThemePreference();

function getNestedValue(source, path) {
  return path.split(".").reduce((value, key) => value?.[key], source);
}

function getStoredThemePreference() {
  const storedValue = window.localStorage.getItem(THEME_STORAGE_KEY);
  return ["system", "light", "dark"].includes(storedValue) ? storedValue : "system";
}

function getResolvedTheme(preference) {
  if (preference === "light" || preference === "dark") {
    return preference;
  }

  return systemThemeQuery.matches ? "dark" : "light";
}

function applyThemePreference(preference, options = { persist: true }) {
  currentThemePreference = ["system", "light", "dark"].includes(preference) ? preference : "system";
  const resolvedTheme = getResolvedTheme(currentThemePreference);

  document.documentElement.dataset.themePreference = currentThemePreference;
  document.documentElement.dataset.theme = resolvedTheme;
  themeColorMeta.setAttribute("content", resolvedTheme === "dark" ? "#0c0d0b" : "#f5f0e7");

  if (options.persist) {
    window.localStorage.setItem(THEME_STORAGE_KEY, currentThemePreference);
  }

  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeChoice === currentThemePreference;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function applyLanguage(language) {
  const dictionary = translations[language] || translations.en;
  currentLanguage = language;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.title = dictionary.metaTitle;
  descriptionMeta.setAttribute("content", dictionary.metaDescription);
  ogDescriptionMeta.setAttribute("content", dictionary.metaDescription);
  ogTitleMeta.setAttribute("content", dictionary.metaTitle);

  translatableNodes.forEach((node) => {
    const value = getNestedValue(dictionary, node.dataset.i18n);
    if (value) {
      node.textContent = value;
    }
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

applyThemePreference(currentThemePreference, { persist: false });
applyLanguage(currentLanguage);

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang);
  });
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyThemePreference(button.dataset.themeChoice);
  });
});

systemThemeQuery.addEventListener("change", () => {
  if (currentThemePreference === "system") {
    applyThemePreference("system", { persist: false });
  }
});

function updateScrollProgress() {
  if (!progressBar) {
    return;
  }

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const percent = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, percent))}%`;

  if (heroVisual && desktopMotionQuery.matches && !reduceMotionQuery.matches) {
    heroVisual.style.setProperty("--portrait-shift", `${scrollTop * -0.025}px`);
  }
}

function applyHeroDrift() {
  mouseFrame = null;

  if (!heroVisual || !desktopMotionQuery.matches || reduceMotionQuery.matches) {
    return;
  }

  heroVisual.style.setProperty("--hero-x", `${heroX}px`);
  heroVisual.style.setProperty("--hero-y", `${heroY}px`);
}

function handlePointerMove(event) {
  if (!heroVisual || !desktopMotionQuery.matches || reduceMotionQuery.matches) {
    return;
  }

  const halfWidth = window.innerWidth / 2;
  const halfHeight = window.innerHeight / 2;
  heroX = ((event.clientX - halfWidth) / halfWidth) * 7;
  heroY = ((event.clientY - halfHeight) / halfHeight) * 9;

  if (!mouseFrame) {
    mouseFrame = window.requestAnimationFrame(applyHeroDrift);
  }
}

function resetHeroDrift() {
  heroX = 0;
  heroY = 0;
  applyHeroDrift();
}

revealItems.forEach((item) => item.classList.add("reveal"));
motionSections.forEach((section) => section.classList.add("motion-section"));

if ("IntersectionObserver" in window && !reduceMotionQuery.matches) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 38, 220)}ms`;
    revealObserver.observe(item);
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-in-view");
          sectionObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -12% 0px",
    },
  );

  motionSections.forEach((section) => sectionObserver.observe(section));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
  motionSections.forEach((section) => section.classList.add("section-in-view"));
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
window.addEventListener("pointermove", handlePointerMove, { passive: true });
window.addEventListener("pointerleave", resetHeroDrift);
updateScrollProgress();
