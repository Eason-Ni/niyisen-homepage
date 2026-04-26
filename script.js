const canvas = document.querySelector("#signalCanvas");
const context = canvas.getContext("2d");
const year = document.querySelector("#year");
const languageButtons = document.querySelectorAll("[data-lang]");
const translatableNodes = document.querySelectorAll("[data-i18n]");
const descriptionMeta = document.querySelector("#meta-description");
const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
const ogTitleMeta = document.querySelector('meta[property="og:title"]');
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

year.textContent = new Date().getFullYear();

const translations = {
  en: {
    metaTitle: "Eason Ni | AI Search & Recommendation",
    metaDescription:
      "Eason Ni's personal homepage, focused on AI search, recommendation systems, product understanding, and useful intelligent workflows.",
    nav: {
      about: "About",
      work: "Work",
      writing: "Writing",
      contact: "Contact",
    },
    hero: {
      eyebrow: "AI Search & Recommendation Systems",
      lead:
        "I study how AI systems understand intent, retrieve the right signals, and recommend what people actually need.",
      primaryAction: "View Focus",
    },
    signal: {
      intent: "Intent",
      retrieval: "Retrieval",
      ranking: "Ranking",
    },
    about: {
      label: "About",
      title: "I am Eason, focused on AI-powered search and recommendation.",
      body:
        "My work sits at the intersection of user understanding, item understanding, matching, ranking, and product judgment. I care about systems that are useful in real workflows, not just impressive in isolated demos.",
    },
    work: {
      label: "Selected Work",
      title: "Current directions",
      item1: {
        title: "AI Search",
        body: "Query understanding, retrieval quality, multimodal search, and evaluation loops.",
      },
      item2: {
        title: "Recommendation",
        body: "User intent, product signals, content distribution, and ranking mechanisms.",
      },
      item3: {
        title: "Applied Research",
        body: "Turning research questions into usable workflows, reports, and product decisions.",
      },
    },
    writing: {
      label: "Writing",
      title: "Notes to make the work reusable.",
      body:
        "I use this site as a public index for research notes, project summaries, and small demos around AI search, recommendation, product intelligence, and agent workflows.",
      topic1: "AI search and retrieval quality",
      topic2: "Recommendation system product judgment",
      topic3: "Applied research workflows",
    },
    contact: {
      label: "Contact",
      title: "Find me online",
      body: "I keep this page as a compact home base for research notes, projects, and public links.",
      wechatName: "WeChat Official Account: 学习的一天天",
      qrCaption: "Scan to follow my WeChat official account.",
    },
    footer: {
      note: "Built as a static personal homepage.",
    },
    canvasLabels: ["query", "visual", "intent", "items", "signals", "rank"],
    canvasCenter: "match",
  },
  zh: {
    metaTitle: "Eason Ni | AI 搜索与推荐",
    metaDescription: "Eason Ni 的个人主页，关注 AI 搜索、推荐系统、产品理解与可落地的智能工作流。",
    nav: {
      about: "关于",
      work: "方向",
      writing: "写作",
      contact: "联系",
    },
    hero: {
      eyebrow: "AI 搜索与推荐系统",
      lead: "我关注 AI 系统如何理解意图、找到真正有用的信号，并推荐人们实际需要的内容和商品。",
      primaryAction: "查看方向",
    },
    signal: {
      intent: "意图",
      retrieval: "召回",
      ranking: "排序",
    },
    about: {
      label: "关于",
      title: "我是 Eason，长期关注 AI 搜索、推荐系统和产品智能化。",
      body:
        "我的工作连接用户理解、商品/内容理解、匹配、排序和产品判断。我更在意系统能否在真实业务里帮人做出更好的选择，而不是只在演示里看起来很聪明。",
    },
    work: {
      label: "精选方向",
      title: "当前重点",
      item1: {
        title: "AI 搜索",
        body: "关注查询理解、召回质量、多模态搜索和持续评估闭环。",
      },
      item2: {
        title: "推荐系统",
        body: "关注用户意图、商品信号、内容分发和排序机制。",
      },
      item3: {
        title: "应用研究",
        body: "把研究问题转成可复用的流程、报告和产品决策依据。",
      },
    },
    writing: {
      label: "写作",
      title: "把做过的事沉淀成可复用的笔记。",
      body: "我会把这个主页作为公开索引，整理 AI 搜索、推荐系统、产品智能化和 Agent 工作流相关的研究笔记、项目总结与小型 Demo。",
      topic1: "AI 搜索与召回质量",
      topic2: "推荐系统里的产品判断",
      topic3: "应用研究工作流",
    },
    contact: {
      label: "联系",
      title: "在线找到我",
      body: "这个页面会作为我的公开入口，用来汇总研究笔记、项目、文章和常用链接。",
      wechatName: "公众号：学习的一天天",
      qrCaption: "扫码关注我的公众号。",
    },
    footer: {
      note: "一个静态个人主页。",
    },
    canvasLabels: ["查询", "视觉", "意图", "内容", "信号", "排序"],
    canvasCenter: "匹配",
  },
};

let currentLanguage = "en";
let labels = translations[currentLanguage].canvasLabels;
let animationFrame;

function getNestedValue(source, path) {
  return path.split(".").reduce((value, key) => value?.[key], source);
}

function applyLanguage(language) {
  const dictionary = translations[language] || translations.en;
  currentLanguage = language;
  labels = dictionary.canvasLabels;
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

  draw(0, { staticFrame: reduceMotion.matches });
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * scale));
  canvas.height = Math.max(1, Math.floor(rect.height * scale));
  context.setTransform(scale, 0, 0, scale, 0, 0);
}

function draw(time, options = {}) {
  cancelAnimationFrame(animationFrame);
  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.29;

  context.clearRect(0, 0, width, height);
  context.lineWidth = 1;

  const nodes = labels.map((label, index) => {
    const angle = (Math.PI * 2 * index) / labels.length + time * 0.00016;
    const pulse = Math.sin(time * 0.0012 + index) * 10;
    return {
      label,
      x: centerX + Math.cos(angle) * (radius + pulse),
      y: centerY + Math.sin(angle) * (radius * 0.78 + pulse),
    };
  });

  context.strokeStyle = "rgba(31, 37, 35, 0.16)";
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      if ((i + j) % 2 === 0 || Math.abs(i - j) === 1) {
        context.beginPath();
        context.moveTo(nodes[i].x, nodes[i].y);
        context.lineTo(nodes[j].x, nodes[j].y);
        context.stroke();
      }
    }
  }

  const sweep = (time * 0.0004) % (Math.PI * 2);
  context.beginPath();
  context.arc(centerX, centerY, radius * 1.12, sweep, sweep + Math.PI * 0.8);
  context.strokeStyle = "rgba(179, 106, 46, 0.42)";
  context.lineWidth = 3;
  context.stroke();

  nodes.forEach((node, index) => {
    const isPrimary = index === Math.floor((time * 0.001) % nodes.length);
    context.beginPath();
    context.arc(node.x, node.y, isPrimary ? 14 : 10, 0, Math.PI * 2);
    context.fillStyle = isPrimary ? "#255f4b" : "#fffdf8";
    context.strokeStyle = isPrimary ? "#255f4b" : "rgba(31, 37, 35, 0.32)";
    context.lineWidth = 1.5;
    context.fill();
    context.stroke();

    context.font = "700 12px Avenir Next, Helvetica, sans-serif";
    context.fillStyle = isPrimary ? "#255f4b" : "#66706c";
    context.textAlign = "center";
    context.fillText(node.label, node.x, node.y + 31);
  });

  context.beginPath();
  context.arc(centerX, centerY, 45, 0, Math.PI * 2);
  context.fillStyle = "#1f2523";
  context.fill();
  context.font = "700 13px Avenir Next, Helvetica, sans-serif";
  context.fillStyle = "#fffdf8";
  context.textAlign = "center";
  context.fillText(translations[currentLanguage].canvasCenter, centerX, centerY + 5);

  if (!options.staticFrame && !reduceMotion.matches) {
    animationFrame = requestAnimationFrame(draw);
  }
}

resizeCanvas();
applyLanguage(currentLanguage);

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang);
  });
});

window.addEventListener("resize", () => {
  resizeCanvas();
  draw(0, { staticFrame: reduceMotion.matches });
});

reduceMotion.addEventListener("change", () => {
  draw(0, { staticFrame: reduceMotion.matches });
});
