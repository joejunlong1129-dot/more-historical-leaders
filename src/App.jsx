import { ArrowSquareOut, ChatText, SteamLogo } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import { copy, fallbackComments, leaders, steamUrl } from "./content.js";

function formatDate(value, lang) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function AbilityBlock({ icon, label, ability }) {
  return (
    <section className="ability-block">
      <h2>{label}</h2>
      <div className="ability-row">
        <img src={icon} alt="" className="ability-icon" />
        <div>
          <h3>{ability.name}</h3>
          <p>{ability.description}</p>
        </div>
      </div>
    </section>
  );
}

function UniqueItem({ label, item }) {
  return (
    <section className="unique-item">
      <span>{label}</span>
      <div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
    </section>
  );
}

function Comments({ labels }) {
  const [comments, setComments] = useState(fallbackComments);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    let alive = true;
    fetch("/api/comments")
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("comments unavailable"))))
      .then((data) => {
        if (alive && Array.isArray(data.comments) && data.comments.length > 0) {
          setComments(data.comments);
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) {
      setStatus(labels.code === "中文" ? "请填写名称和留言。" : "Please enter both name and message.");
      return;
    }

    const optimisticComment = {
      id: `local-${Date.now()}`,
      name: trimmedName,
      message: trimmedMessage,
      created_at: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: trimmedName, message: trimmedMessage }),
      });
      if (!response.ok) {
        throw new Error("comment rejected");
      }
      const data = await response.json();
      setComments((current) => [data.comment, ...current]);
      setStatus(labels.code === "中文" ? "留言已提交。" : "Comment submitted.");
    } catch {
      setComments((current) => [optimisticComment, ...current]);
      setStatus(labels.code === "中文" ? "本地预览已添加留言。" : "Added in local preview.");
    }

    setName("");
    setMessage("");
  }

  return (
    <section className="comments" aria-labelledby="comments-title">
      <div className="section-title">
        <ChatText size={27} weight="regular" aria-hidden="true" />
        <h2 id="comments-title">{labels.comments}</h2>
      </div>
      <form className="comment-form" onSubmit={handleSubmit}>
        <label>
          <span>{labels.name}</span>
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder={labels.namePlaceholder} />
        </label>
        <label>
          <span>{labels.message}</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={labels.messagePlaceholder}
            rows="3"
          />
        </label>
        <button type="submit">{labels.submit}</button>
      </form>
      <p className="form-status" aria-live="polite">
        {status}
      </p>
      <div className="comment-list">
        {comments.map((comment) => (
          <article className="comment" key={comment.id}>
            <div className="comment-seal" aria-hidden="true">
              {comment.name.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <header>
                <strong>{comment.name}</strong>
                <time dateTime={comment.created_at}>{formatDate(comment.created_at, labels.code === "中文" ? "zh" : "en")}</time>
              </header>
              <p>{comment.message}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function App() {
  const [language, setLanguage] = useState("en");
  const [selectedLeaderId, setSelectedLeaderId] = useState("chiang");
  const labels = copy[language];
  const selectedLeader = useMemo(
    () => leaders.find((leader) => leader.id === selectedLeaderId) ?? leaders[0],
    [selectedLeaderId],
  );
  const leaderText = selectedLeader[language];

  return (
    <main className={`site-shell theme-${selectedLeader.accent}`}>
      <header className="topbar">
        <div>
          <p>{labels.subtitle}</p>
          <strong>{labels.headerTitle}</strong>
        </div>
        <nav className="header-actions" aria-label="Site actions">
          <div className="language-toggle" aria-label="Language">
            {["en", "zh"].map((lang) => (
              <button
                type="button"
                key={lang}
                className={language === lang ? "active" : ""}
                onClick={() => setLanguage(lang)}
                aria-pressed={language === lang}
              >
                {copy[lang].code}
              </button>
            ))}
          </div>
          <a href={steamUrl} className="steam-link" target="_blank" rel="noreferrer">
            <SteamLogo size={25} weight="fill" aria-hidden="true" />
            <span>{labels.workshop}</span>
            <ArrowSquareOut size={18} aria-hidden="true" />
          </a>
        </nav>
      </header>

      <div className="paper">
        <section className="intro">
          <h1>{labels.title}</h1>
          <p>{labels.intro}</p>
        </section>

        <section className="dossier" aria-label="Leader dossier">
          <aside className="leader-rail" aria-label={labels.leaders}>
            <h2>{labels.leaders}</h2>
            {leaders.map((leader) => {
              const item = leader[language];
              const isActive = selectedLeaderId === leader.id;
              return (
                <button
                  type="button"
                  key={leader.id}
                  className={`leader-tab ${isActive ? "active" : ""}`}
                  onClick={() => setSelectedLeaderId(leader.id)}
                  aria-pressed={isActive}
                >
                  <img src={leader.portrait} alt="" />
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.civilization}</small>
                  </span>
                </button>
              );
            })}
            <div className="rail-watermark" aria-hidden="true" />
          </aside>

          <article className="leader-content" data-testid="leader-dossier">
            <div className="leader-heading">
              <img src={selectedLeader.emblem} alt="" className="civ-emblem" />
              <div>
                <h2>{leaderText.name}</h2>
                <p>{leaderText.civilization}</p>
              </div>
            </div>
            <blockquote>{leaderText.quote}</blockquote>

            <AbilityBlock icon="/assets/icon-leader-ability.png" label={labels.leaderAbility} ability={leaderText.leaderAbility} />
            <AbilityBlock
              icon="/assets/icon-civ-ability.png"
              label={labels.civilizationAbility}
              ability={leaderText.civilizationAbility}
            />

            <div className="unique-grid">
              <UniqueItem label={labels.uniqueUnit} item={leaderText.uniqueUnit} />
              <UniqueItem label={labels.uniqueBuilding} item={leaderText.uniqueBuilding} />
            </div>
          </article>
        </section>

        <Comments labels={labels} />
      </div>
    </main>
  );
}
