"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from "react";

type Language = "en" | "zh";
type ThemeChoice = "system" | "light" | "dark";

const content = {
  en: {
    nav: ["About", "Work", "Loop", "Notes", "Contact"],
    theme: { system: "System", light: "Light", dark: "Dark" },
    heroEyebrow: "AI Search / Recommendation / Applied Research",
    heroLead:
      "I build practical loops for understanding intent, retrieving signals, judging ranking quality, and turning research into reusable decisions.",
    primary: "View Work",
    secondary: "Contact",
    focus: ["Query understanding", "Retrieval quality", "Product judgment", "Knowledge workflows"],
    stats: [
      ["Focus", "AI discovery systems"],
      ["Mode", "Research to product"],
      ["Output", "Notes, demos, decisions"],
    ],
    aboutTitle: "A personal home base for AI-powered discovery and product intelligence.",
    aboutBody:
      "My work sits between user intent, item understanding, search and recommendation quality, and the product decisions that make those systems useful. I care about evidence, bad cases, and small workflows that can be reopened later.",
    principles: [
      ["Start from the decision", "Define the user question before choosing data, model, metric, or interface."],
      ["Keep evidence close", "Preserve source notes, examples, gaps, and evaluation checks near the final answer."],
      ["Ship reusable loops", "Turn one-off analysis into prompts, demos, checklists, and operating habits."],
    ],
    workTitle: "The directions I keep building around.",
    workBody: "A compact map of the work I want this site to represent.",
    work: [
      {
        title: "AI Search",
        text: "Query understanding, multimodal retrieval, result quality review, no-result diagnosis, and ranking feedback loops.",
      },
      {
        title: "Recommendation Systems",
        text: "User intent, content and product signals, distribution mechanics, evaluation samples, and product-side judgment.",
      },
      {
        title: "Applied Research",
        text: "Turning papers, market questions, and product problems into structured notes, experiments, and decision briefs.",
      },
      {
        title: "Agent Workflows",
        text: "Reusable local workflows for coding, writing, research, data checks, and knowledge-base operations.",
      },
    ],
    loopTitle: "Operating loop",
    loopBody: "The same pattern shows up in search, recommendation, research, and agent work.",
    loop: [
      ["Frame", "Clarify the decision, audience, constraint, and evidence standard."],
      ["Retrieve", "Collect signals from data, sources, examples, and real product behavior."],
      ["Judge", "Compare against bad cases, edge cases, and the user-visible outcome."],
      ["Distill", "Leave a note, checklist, demo, or next action that makes the work reusable."],
    ],
    notesTitle: "Notes I want to keep public and easy to reopen.",
    notesBody:
      "This site can grow into a clean index for research notes, project summaries, search and recommendation experiments, and practical AI workflow write-ups.",
    topics: ["AI search quality", "Recommendation product judgment", "Applied research workflows", "Agentic workbench notes"],
    contactTitle: "Find me",
    contactBody:
      "Reach out for AI search, recommendation systems, applied research, product intelligence, or practical knowledge workflows.",
    wechat: "WeChat Official Account: 学习的一天天",
    qr: "Scan to follow my WeChat official account.",
    footer: "Built as a focused personal site for Eason Ni.",
  },
  zh: {
    nav: ["关于", "方向", "闭环", "笔记", "联系"],
    theme: { system: "系统", light: "日间", dark: "夜间" },
    heroEyebrow: "AI 搜索 / 推荐系统 / 应用研究",
    heroLead:
      "我构建实用的工作闭环：理解意图、召回信号、判断排序质量，并把研究沉淀成可以复用的决策资产。",
    primary: "查看方向",
    secondary: "联系我",
    focus: ["查询理解", "召回质量", "产品判断", "知识工作流"],
    stats: [
      ["关注", "AI 发现系统"],
      ["方式", "从研究到产品"],
      ["输出", "笔记、Demo、决策"],
    ],
    aboutTitle: "一个围绕 AI 发现系统和产品智能化的个人主页。",
    aboutBody:
      "我的工作连接用户意图、商品/内容理解、搜索与推荐质量，以及让系统真正有用的产品决策。我重视证据、坏案例，以及之后还能重新打开的小型工作流。",
    principles: [
      ["先定义决策", "先明确用户问题，再选择数据、模型、指标和界面。"],
      ["证据贴近结论", "把来源笔记、样例、缺口和评估检查放在最终判断附近。"],
      ["沉淀可复用闭环", "把一次性分析变成 prompt、Demo、检查清单和操作习惯。"],
    ],
    workTitle: "我持续建设的几个方向。",
    workBody: "这是这个个人网站需要表达的核心工作地图。",
    work: [
      {
        title: "AI 搜索",
        text: "查询理解、多模态召回、结果质量审查、无结果诊断，以及排序反馈闭环。",
      },
      {
        title: "推荐系统",
        text: "用户意图、内容和商品信号、分发机制、评估样本，以及产品侧判断。",
      },
      {
        title: "应用研究",
        text: "把论文、市场问题和产品问题转成结构化笔记、实验和可决策简报。",
      },
      {
        title: "Agent 工作流",
        text: "面向 coding、写作、研究、数据检查和知识库操作的本地可复用工作流。",
      },
    ],
    loopTitle: "工作闭环",
    loopBody: "同一个模式会反复出现在搜索、推荐、研究和 Agent 工作里。",
    loop: [
      ["定义", "澄清决策、受众、约束和证据标准。"],
      ["召回", "从数据、来源、样例和真实产品行为里收集信号。"],
      ["判断", "对照坏案例、边界情况和用户可见结果。"],
      ["沉淀", "留下笔记、清单、Demo 或下一步动作，让工作可以复用。"],
    ],
    notesTitle: "把值得公开的笔记整理成容易重新打开的入口。",
    notesBody:
      "这个站点可以继续扩展成研究笔记、项目总结、搜索推荐实验和实用 AI 工作流文章的清爽索引。",
    topics: ["AI 搜索质量", "推荐系统产品判断", "应用研究工作流", "Agentic 工作台笔记"],
    contactTitle: "找到我",
    contactBody: "如果主题是 AI 搜索、推荐系统、应用研究、产品智能化或实用知识工作流，可以直接联系我。",
    wechat: "公众号：学习的一天天",
    qr: "扫码关注我的公众号。",
    footer: "为 Eason Ni 构建的聚焦型个人网站。",
  },
} as const;

const sectionIds = ["about", "work", "loop", "notes", "contact"];

function resolveTheme(choice: ThemeChoice) {
  if (choice !== "system") {
    return choice;
  }

  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [themeChoice, setThemeChoice] = useState<ThemeChoice>(() => {
    if (typeof window === "undefined") {
      return "system";
    }

    const storedTheme = window.localStorage.getItem("eason-site-theme");
    return storedTheme === "system" || storedTheme === "light" || storedTheme === "dark" ? storedTheme : "system";
  });
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [progress, setProgress] = useState(0);
  const t = content[language];

  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const updateTheme = () => {
      const next = resolveTheme(themeChoice);
      setResolvedTheme(next);
      document.documentElement.dataset.theme = next;
      document.documentElement.dataset.themePreference = themeChoice;
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#11120f" : "#f7f3ea");
    };

    updateTheme();
    window.localStorage.setItem("eason-site-theme", themeChoice);

    const query = window.matchMedia("(prefers-color-scheme: light)");
    query.addEventListener("change", updateTheme);
    return () => query.removeEventListener("change", updateTheme);
  }, [themeChoice]);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100)) : 0);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <>
      <div className="progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Eason Ni home">
          <span className="brand-mark">EN</span>
          <span className="brand-name">Eason Ni</span>
        </a>
        <nav className="nav" aria-label="Primary navigation">
          {t.nav.map((item, index) => (
            <a key={item} href={`#${sectionIds[index]}`}>
              {item}
            </a>
          ))}
        </nav>
        <div className="controls" aria-label="Display controls">
          <div className="segmented" aria-label="Language">
            {(["en", "zh"] as const).map((option) => (
              <button
                key={option}
                type="button"
                className={language === option ? "is-active" : ""}
                onClick={() => setLanguage(option)}
                aria-pressed={language === option}
              >
                {option === "en" ? "EN" : "中文"}
              </button>
            ))}
          </div>
          <div className="segmented theme-controls" aria-label="Theme">
            {(["system", "light", "dark"] as const).map((option) => (
              <button
                key={option}
                type="button"
                className={themeChoice === option ? "is-active" : ""}
                onClick={() => setThemeChoice(option)}
                aria-pressed={themeChoice === option}
              >
                {t.theme[option]}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">{t.heroEyebrow}</p>
            <h1 id="hero-title">Eason Ni</h1>
            <p className="hero-lead">{t.heroLead}</p>
            <div className="hero-tags" aria-label="Focus areas">
              {t.focus.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                {t.primary}
              </a>
              <a className="button secondary" href="#contact">
                {t.secondary}
              </a>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Profile summary">
            <div className="portrait-wrap">
              <img src="https://github.com/Eason-Ni.png?size=480" alt="Eason Ni GitHub profile avatar" />
            </div>
            <div className="signal-stack">
              {t.stats.map(([label, value]) => (
                <div className="signal" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <div className="theme-note" aria-live="polite">
              {resolvedTheme === "dark" ? "Dark canvas" : "Light canvas"}
            </div>
          </aside>
        </section>

        <section id="about" className="section intro-section" aria-labelledby="about-title">
          <p className="section-label">About</p>
          <div className="section-body two-column">
            <div>
              <h2 id="about-title">{t.aboutTitle}</h2>
              <p>{t.aboutBody}</p>
            </div>
            <div className="principle-list">
              {t.principles.map(([title, text], index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="section work-section" aria-labelledby="work-title">
          <p className="section-label">Work</p>
          <div className="section-body">
            <div className="section-heading">
              <h2 id="work-title">{t.workTitle}</h2>
              <p>{t.workBody}</p>
            </div>
            <div className="work-grid">
              {t.work.map((item, index) => (
                <article className="work-card" key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="loop" className="section loop-section" aria-labelledby="loop-title">
          <p className="section-label">Loop</p>
          <div className="section-body">
            <div className="section-heading compact">
              <h2 id="loop-title">{t.loopTitle}</h2>
              <p>{t.loopBody}</p>
            </div>
            <ol className="loop-list">
              {t.loop.map(([title, text]) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="notes" className="section notes-section" aria-labelledby="notes-title">
          <p className="section-label">Notes</p>
          <div className="section-body two-column">
            <div>
              <h2 id="notes-title">{t.notesTitle}</h2>
              <p>{t.notesBody}</p>
            </div>
            <div className="topic-list">
              {t.topics.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section" aria-labelledby="contact-title">
          <p className="section-label">Contact</p>
          <div className="section-body contact-body">
            <div>
              <h2 id="contact-title">{t.contactTitle}</h2>
              <p>{t.contactBody}</p>
              <div className="contact-links">
                <a href="https://github.com/Eason-Ni" target="_blank" rel="noreferrer">
                  GitHub: Eason-Ni
                </a>
                <span>{t.wechat}</span>
              </div>
            </div>
            <figure className="qr-card">
              <img src="/wechat-official-account-qr.jpeg" alt="WeChat official account QR code" />
              <figcaption>{t.qr}</figcaption>
            </figure>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>© {year} Eason Ni</span>
        <span>{t.footer}</span>
      </footer>
    </>
  );
}
