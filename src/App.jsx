import { ArrowSquareOut, ChatText, SteamLogo } from "@phosphor-icons/react";
import { useEffect, useId, useMemo, useState } from "react";
import { copy, fallbackComments, leaders, steamUrl } from "./content.js";
import { createCssVariables, defaultSiteConfig, mergeSiteConfig, serializeSiteConfig } from "./siteConfig.js";

const configStorageKey = "more-historical-leaders-site-config";

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

function readStoredConfig() {
  try {
    const raw = localStorage.getItem(configStorageKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storeConfig(config) {
  localStorage.setItem(configStorageKey, serializeSiteConfig(config));
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function NumberControl({ label, value, min, max, step = 1, onChange }) {
  const id = useId();
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  function handleTypedValue(nextValue) {
    setDraft(nextValue);
    const number = Number(nextValue);
    if (Number.isFinite(number) && number >= min && number <= max) {
      onChange(number);
    }
  }

  function handleSliderValue(nextValue) {
    setDraft(nextValue);
    onChange(Number(nextValue));
  }

  return (
    <div className="editor-control">
      <label htmlFor={id}>{label}</label>
      <div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={`${label} slider`}
          onChange={(event) => handleSliderValue(event.target.value)}
        />
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          step={step}
          value={draft}
          onChange={(event) => handleTypedValue(event.target.value)}
        />
      </div>
    </div>
  );
}

function ColorControl({ label, value, onChange }) {
  return (
    <label className="editor-color">
      <span>{label}</span>
      <input type="color" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function FileControl({ label, onChange }) {
  return (
    <label className="editor-file">
      <span>{label}</span>
      <input
        type="file"
        accept="image/*"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (!file) {
            return;
          }
          onChange(await fileToDataUrl(file));
        }}
      />
    </label>
  );
}

function VisualEditor({ config, selectedLeaderId, onConfigChange }) {
  const [exported, setExported] = useState("");
  const selectedAssets = config.assets.leaders[selectedLeaderId];

  function updateLayout(key, value) {
    onConfigChange({
      ...config,
      layout: {
        ...config.layout,
        [key]: value,
      },
    });
  }

  function updateColor(key, value) {
    onConfigChange({
      ...config,
      colors: {
        ...config.colors,
        [key]: value,
      },
    });
  }

  function updateAsset(key, value) {
    onConfigChange({
      ...config,
      assets: {
        ...config.assets,
        [key]: value,
      },
    });
  }

  function updateLeaderAsset(key, value) {
    onConfigChange({
      ...config,
      assets: {
        ...config.assets,
        leaders: {
          ...config.assets.leaders,
          [selectedLeaderId]: {
            ...selectedAssets,
            [key]: value,
          },
        },
      },
    });
  }

  function resetConfig() {
    onConfigChange(defaultSiteConfig);
    setExported("");
  }

  function exportConfig() {
    setExported(serializeSiteConfig(config));
  }

  function importConfig(value) {
    try {
      const parsed = JSON.parse(value);
      onConfigChange(parsed);
      setExported(serializeSiteConfig(parsed));
    } catch {
      setExported(value);
    }
  }

  return (
    <aside className="visual-editor" aria-label="Visual editor">
      <header>
        <strong>Visual editor</strong>
        <p>Local preview only. Export JSON when the layout is ready.</p>
      </header>

      <section>
        <h2>Images</h2>
        <FileControl label="Background image" onChange={(value) => updateAsset("background", value)} />
        <FileControl label="Selected leader portrait" onChange={(value) => updateLeaderAsset("portrait", value)} />
        <FileControl label="Selected leader emblem" onChange={(value) => updateLeaderAsset("emblem", value)} />
        <FileControl label="Leader ability icon" onChange={(value) => updateAsset("leaderAbilityIcon", value)} />
        <FileControl label="Civilization ability icon" onChange={(value) => updateAsset("civilizationAbilityIcon", value)} />
      </section>

      <section>
        <h2>Layout</h2>
        <NumberControl label="Page width" min={900} max={1600} value={config.layout.paperWidth} onChange={(value) => updateLayout("paperWidth", value)} />
        <NumberControl label="Leader rail width" min={260} max={520} value={config.layout.railWidth} onChange={(value) => updateLayout("railWidth", value)} />
        <NumberControl label="Dossier height" min={560} max={1200} value={config.layout.dossierMinHeight} onChange={(value) => updateLayout("dossierMinHeight", value)} />
        <NumberControl label="Avatar size" min={56} max={180} value={config.layout.avatarSize} onChange={(value) => updateLayout("avatarSize", value)} />
        <NumberControl label="Emblem size" min={56} max={180} value={config.layout.emblemSize} onChange={(value) => updateLayout("emblemSize", value)} />
        <NumberControl label="Ability icon size" min={44} max={140} value={config.layout.abilityIconSize} onChange={(value) => updateLayout("abilityIconSize", value)} />
        <NumberControl label="Heading scale" min={70} max={140} value={config.layout.headingScale} onChange={(value) => updateLayout("headingScale", value)} />
        <NumberControl label="Body scale" min={80} max={125} value={config.layout.bodyScale} onChange={(value) => updateLayout("bodyScale", value)} />
        <NumberControl label="Content padding" min={20} max={100} value={config.layout.contentPadding} onChange={(value) => updateLayout("contentPadding", value)} />
        <NumberControl label="Section gap" min={18} max={90} value={config.layout.sectionGap} onChange={(value) => updateLayout("sectionGap", value)} />
      </section>

      <section>
        <h2>Background</h2>
        <NumberControl label="Background size" min={60} max={220} value={config.layout.backgroundSize} onChange={(value) => updateLayout("backgroundSize", value)} />
        <NumberControl label="Background opacity" min={0} max={100} value={config.layout.backgroundOpacity} onChange={(value) => updateLayout("backgroundOpacity", value)} />
        <NumberControl label="Background X" min={0} max={100} value={config.layout.backgroundX} onChange={(value) => updateLayout("backgroundX", value)} />
        <NumberControl label="Background Y" min={-200} max={200} value={config.layout.backgroundY} onChange={(value) => updateLayout("backgroundY", value)} />
        <NumberControl label="Image radius" min={0} max={100} value={config.layout.imageRadius} onChange={(value) => updateLayout("imageRadius", value)} />
        <NumberControl label="Image grayscale" min={0} max={100} value={config.layout.imageGray} onChange={(value) => updateLayout("imageGray", value)} />
        <NumberControl label="Image sepia" min={0} max={100} value={config.layout.imageSepia} onChange={(value) => updateLayout("imageSepia", value)} />
      </section>

      <section>
        <h2>Colors</h2>
        <ColorControl label="Paper" value={config.colors.paper} onChange={(value) => updateColor("paper", value)} />
        <ColorControl label="Ink" value={config.colors.ink} onChange={(value) => updateColor("ink", value)} />
        <ColorControl label="Gold" value={config.colors.gold} onChange={(value) => updateColor("gold", value)} />
        <ColorControl label="Green accent" value={config.colors.green} onChange={(value) => updateColor("green", value)} />
        <ColorControl label="Burgundy accent" value={config.colors.burgundy} onChange={(value) => updateColor("burgundy", value)} />
        <ColorControl label="Top bar" value={config.colors.topbar} onChange={(value) => updateColor("topbar", value)} />
      </section>

      <section>
        <h2>Config</h2>
        <div className="editor-actions">
          <button type="button" onClick={exportConfig}>
            Export config
          </button>
          <button type="button" onClick={resetConfig}>
            Reset
          </button>
        </div>
        <label className="editor-export">
          <span>Exported site-config.json</span>
          <textarea
            value={exported}
            onChange={(event) => importConfig(event.target.value)}
            placeholder="Export or paste a site-config.json here"
            rows="8"
          />
        </label>
      </section>
    </aside>
  );
}

export function App() {
  const [language, setLanguage] = useState("en");
  const [selectedLeaderId, setSelectedLeaderId] = useState("chiang");
  const [isEditMode] = useState(() => new URLSearchParams(window.location.search).has("edit"));
  const [siteConfig, setSiteConfig] = useState(() =>
    mergeSiteConfig(isEditMode ? (readStoredConfig() ?? defaultSiteConfig) : defaultSiteConfig),
  );
  const labels = copy[language];
  const selectedLeader = useMemo(
    () => leaders.find((leader) => leader.id === selectedLeaderId) ?? leaders[0],
    [selectedLeaderId],
  );
  const leaderText = selectedLeader[language];
  const selectedLeaderAssets = siteConfig.assets.leaders[selectedLeader.id];

  useEffect(() => {
    let alive = true;
    if (isEditMode && readStoredConfig()) {
      return () => {
        alive = false;
      };
    }

    fetch("/site-config.json", { cache: "no-cache" })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("site config unavailable"))))
      .then((data) => {
        if (alive) {
          setSiteConfig(mergeSiteConfig(data));
        }
      })
      .catch(() => {});

    return () => {
      alive = false;
    };
  }, [isEditMode]);

  useEffect(() => {
    const variables = createCssVariables(siteConfig);
    for (const [name, value] of Object.entries(variables)) {
      document.documentElement.style.setProperty(name, value);
    }
    if (isEditMode) {
      storeConfig(siteConfig);
    }
  }, [isEditMode, siteConfig]);

  return (
    <main className={`site-shell theme-${selectedLeader.accent} ${isEditMode ? "edit-mode" : ""}`}>
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
                  <img src={siteConfig.assets.leaders[leader.id].portrait} alt="" />
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
              <img src={selectedLeaderAssets.emblem} alt="" className="civ-emblem" />
              <div>
                <h2>{leaderText.name}</h2>
                <p>{leaderText.civilization}</p>
              </div>
            </div>
            <blockquote>{leaderText.quote}</blockquote>

            <AbilityBlock icon={siteConfig.assets.leaderAbilityIcon} label={labels.leaderAbility} ability={leaderText.leaderAbility} />
            <AbilityBlock
              icon={siteConfig.assets.civilizationAbilityIcon}
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
      {isEditMode ? (
        <VisualEditor config={siteConfig} selectedLeaderId={selectedLeader.id} onConfigChange={(value) => setSiteConfig(mergeSiteConfig(value))} />
      ) : null}
    </main>
  );
}
