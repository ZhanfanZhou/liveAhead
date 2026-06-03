import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import {
  authModeMeta,
  brand,
  chatScript,
  chatSuggestions,
  feedFilters,
  radarCards,
  reviewCases,
  reviewSignalShare,
  reviewStats,
  watchTasks,
  type AuthMode,
  type CardKind,
  type ChatTurn,
  type HistoryCase,
  type RadarCard as RadarCardData,
  type WatchTask,
} from "./data/mockData";

type TabKey = "radar" | "watch" | "tasks" | "review";

const tabs: Array<{ key: TabKey; label: string; icon: string }> = [
  { key: "radar", label: "雷达", icon: "◖" },
  { key: "watch", label: "盯品", icon: "◎" },
  { key: "tasks", label: "任务", icon: "▤" },
  { key: "review", label: "复盘", icon: "✓" },
];

const tabKeys: TabKey[] = ["radar", "watch", "tasks", "review"];

function readTabFromHash(): TabKey {
  const hash = window.location.hash.replace("#", "") as TabKey;
  return tabKeys.includes(hash) ? hash : "radar";
}

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>(readTabFromHash);

  const changeTab = (tab: TabKey) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  return (
    <main className="desktop-shell">
      <div className="radar-beam" />
      <div className="noise" />
      <BrandRail />
      <section className="phone-stage" aria-label="鲜知演示手机">
        <div className="mobile-brand">
          {brand.mark} {brand.name} / {brand.pinyin}
        </div>
        <div className="phone-frame">
          <StatusBar />
          <div className="app-viewport">
            {activeTab === "radar" && <RadarScreen />}
            {activeTab === "watch" && <WatchChatScreen />}
            {activeTab === "tasks" && <WatchTasksScreen />}
            {activeTab === "review" && <ReviewScreen />}
          </div>
          <BottomTabs activeTab={activeTab} onChange={changeTab} />
        </div>
      </section>
    </main>
  );
}

function BrandRail() {
  return (
    <aside className="brand-rail">
      <div className="brand-kicker">Oracle Radar / 先知雷达</div>
      <h1>
        <span>{brand.mark}</span> {brand.name}
        <em>{brand.pinyin}</em>
      </h1>
      <p className="slogan">{brand.slogan}</p>
      <p className="one-line">{brand.oneLine}</p>
      <div className="highlight-stack">
        {brand.highlights.map((item) => (
          <article key={item.title}>
            <strong>{item.title}</strong>
            <span>{item.desc}</span>
          </article>
        ))}
      </div>
      <div className="legend">
        <div><i className="legend-hot" /> 金色实线 = 已热 / 已上架</div>
        <div><i className="legend-prophecy" /> 电青虚线 = 先知预测 / 未上架</div>
      </div>
    </aside>
  );
}

function StatusBar() {
  return (
    <div className="status-bar">
      <span>23:17</span>
      <span className="status-icons">5G ▰▰▰ ▱</span>
    </div>
  );
}

function BottomTabs({ activeTab, onChange }: { activeTab: TabKey; onChange: (tab: TabKey) => void }) {
  return (
    <nav className="bottom-tabs">
      {tabs.map((tab) => (
        <button className={activeTab === tab.key ? "active" : ""} key={tab.key} onClick={() => onChange(tab.key)}>
          <span>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

function ScreenHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="screen-header">
      <p>AI-native local life</p>
      <h2>{title}</h2>
      <span>{subtitle}</span>
    </header>
  );
}

function RadarScreen() {
  const [filter, setFilter] = useState("all");
  const filteredCards = useMemo(() => radarCards.filter((card) => matchesFilter(card, filter)), [filter]);

  return (
    <section className="screen scroll-screen">
      <ScreenHeader title="雷达流" subtitle="按 爆火潜力 × 紧迫度 × 个人相关性 排序" />
      <div className="filter-row">
        {feedFilters.map((item) => (
          <button key={item.id} className={filter === item.id ? "chip active" : "chip"} onClick={() => setFilter(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="card-list">
        {filteredCards.map((card, index) => (
          <RadarCard card={card} index={index} key={card.id} />
        ))}
      </div>
    </section>
  );
}

function matchesFilter(card: RadarCardData, filter: string) {
  if (filter === "all") return true;
  if (filter === "prophecy" || filter === "hot") return card.kind === filter;
  if (filter === "food") return /菜|火锅|咖啡|Brunch/.test(card.category);
  if (filter === "show") return /演出|音乐节|票/.test(card.category + card.title);
  if (filter === "hotel") return /酒店|机票|三亚/.test(card.category + card.title);
  if (filter === "near") return /(\d+(\.\d+)?)km|800m|600m|300m/.test(card.distance) && !/1\.2km/.test(card.distance);
  if (filter === "highscore") return card.score >= 80;
  return true;
}

function RadarCard({ card, index }: { card: RadarCardData; index: number }) {
  const [open, setOpen] = useState(false);
  const tone = card.kind;

  return (
    <article className={`radar-card ${tone}`} style={{ animationDelay: `${index * 90}ms` }}>
      <div className="scanline" />
      <div className="card-top">
        <div className="category-pill">
          <span>{card.emoji}</span>
          {card.category}
        </div>
        <KindBadge kind={card.kind} label={card.statusLabel} />
      </div>
      <div className="title-score-row">
        <div>
          <h3>{card.title}</h3>
          <p className="place">{card.area} · {card.distance}</p>
        </div>
        <ScoreRing score={card.score} kind={card.kind} confidence={card.confidence} />
      </div>
      <div className="price-row">
        <strong>{card.priceLine}</strong>
        <span>{card.priceSub}</span>
      </div>
      <div className="prediction-grid">
        <span>⏱ {card.window}</span>
        <span>📈 {card.pricePrediction}</span>
      </div>
      <div className="reason">
        <label>💡 为什么会火（AI 生成）</label>
        <p>{card.oneLineReason}</p>
      </div>
      <button className="expand-button" onClick={() => setOpen((value) => !value)}>
        {open ? "收起归因" : "展开归因"} <span>{open ? "⌃" : "⌄"}</span>
      </button>
      {open && <AttributionPanel card={card} />}
      <footer className="card-footer">
        <p>📍 {card.personalReason}</p>
        <div className="tag-row">
          {card.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="action-row">
          <button className="watch-button">❤️ 盯</button>
          <button className={card.urgency > 85 ? "primary-action urgent" : "primary-action"}>{card.primaryAction}</button>
        </div>
      </footer>
    </article>
  );
}

function KindBadge({ kind, label }: { kind: CardKind; label: string }) {
  return <div className={`kind-badge ${kind}`}>{kind === "prophecy" ? "预测/未上架" : "已在售"} · {label}</div>;
}

function ScoreRing({ score, kind, confidence }: { score: number; kind: CardKind; confidence: string }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const id = window.setTimeout(() => setValue(score), 120);
    return () => window.clearTimeout(id);
  }, [score]);
  return (
    <div className="score-block">
      <div className="score-ring" style={{ "--score": value, "--ring": kind === "hot" ? "var(--gold)" : "var(--teal)" } as CSSProperties}>
        <span>{value}</span>
      </div>
      <small>置信度 {confidence}</small>
    </div>
  );
}

function AttributionPanel({ card }: { card: RadarCardData }) {
  const signalRows = [
    ["内容", card.signals.content, card.evidence.content],
    ["类比", card.signals.analogy, card.evidence.analogy],
    ["动量", card.signals.momentum, card.evidence.momentum],
  ] as const;

  return (
    <div className="attribution">
      <div className="signal-bars">
        {signalRows.map(([label, value]) => (
          <div className="signal-row" key={label}>
            <span>{label}</span>
            <div><i style={{ width: `${value}%` }} /></div>
            <b>{value}</b>
          </div>
        ))}
      </div>
      <div className="evidence-grid">
        {signalRows.map(([label, , evidence]) => (
          <section key={label}>
            <h4>{label}证据</h4>
            {evidence.map((item) => <p key={item}>{item}</p>)}
          </section>
        ))}
      </div>
      <div className="history-row">
        {card.historyCases.map((item) => <HistorySparkline item={item} key={item.name} kind={card.kind} />)}
      </div>
    </div>
  );
}

function HistorySparkline({ item, kind }: { item: HistoryCase; kind: CardKind }) {
  const width = 118;
  const height = 42;
  const points = item.curve.map((v, i) => {
    const x = (i / (item.curve.length - 1)) * width;
    const y = height - v * (height - 6) - 3;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  return (
    <button className="history-card">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${item.name} 爆发曲线`}>
        <polyline points={points} fill="none" stroke={kind === "hot" ? "var(--gold-bright)" : "var(--teal-bright)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <strong>{item.name}</strong>
      <span>{item.outcome}</span>
    </button>
  );
}

function WatchChatScreen() {
  const [visibleCount, setVisibleCount] = useState(1);
  const [input, setInput] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    setVisibleCount(1);
    const timers = chatScript.slice(1).map((_, index) =>
      window.setTimeout(() => setVisibleCount(index + 2), 900 + index * 1050),
    );
    return () => timers.forEach(window.clearTimeout);
  }, []);

  function sendMessage() {
    if (!input.trim()) return;
    setToast("已记录，鲜知会按相同逻辑继续编译。");
    setInput("");
    window.setTimeout(() => setToast(""), 2200);
  }

  return (
    <section className="screen chat-screen">
      <ScreenHeader title="对话式盯品" subtitle="像跟一个懂行的本地生活私人买手对话" />
      <div className="chat-thread">
        {chatScript.slice(0, visibleCount).map((turn, index) => (
          <ChatBubble turn={turn} key={`${turn.role}-${index}`} onConfirm={() => {
            setToast("已开启");
            window.setTimeout(() => setToast(""), 1800);
          }} />
        ))}
      </div>
      <div className="suggestions">
        {chatSuggestions.map((item) => <button key={item} onClick={() => setInput(item)}>{item}</button>)}
      </div>
      <div className="chat-input">
        <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="输入一句盯品需求..." />
        <button onClick={sendMessage}>发送</button>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </section>
  );
}

function ChatBubble({ turn, onConfirm }: { turn: ChatTurn; onConfirm: () => void }) {
  return (
    <div className={`chat-bubble ${turn.role}`}>
      <p>{turn.text}</p>
      {turn.compiled && <CompiledTaskCard turn={turn} onConfirm={onConfirm} />}
    </div>
  );
}

function CompiledTaskCard({ turn, onConfirm }: { turn: ChatTurn; onConfirm: () => void }) {
  const task = turn.compiled!;
  return (
    <div className="compiled-card">
      <div className="compiled-head">
        <span>AI 编译完成</span>
        <b>WATCH_TASK</b>
      </div>
      <dl>
        <div><dt>范围</dt><dd>{task.scope}</dd></div>
        <div><dt>条件</dt><dd>{task.condition}</dd></div>
        <div><dt>动作</dt><dd>{task.action}</dd></div>
        <div><dt>授权</dt><dd>{task.authMode}</dd></div>
        <div><dt>命中</dt><dd>{task.hits}</dd></div>
      </dl>
      {task.guardrail && <div className="guardrail">风控 · {task.guardrail}</div>}
      {turn.confirm && <button className="confirm-button" onClick={onConfirm}>{turn.confirm}</button>}
    </div>
  );
}

function WatchTasksScreen() {
  const [modes, setModes] = useState<Record<string, AuthMode>>(() =>
    Object.fromEntries(watchTasks.map((task) => [task.id, task.authMode])),
  );

  return (
    <section className="screen scroll-screen">
      <ScreenHeader title="盯品任务" subtitle="盯品 = 注册在爆款池上的长期过滤条件，命中才触发" />
      <div className="task-list">
        {watchTasks.map((task) => (
          <WatchTaskCard
            key={task.id}
            task={task}
            mode={modes[task.id]}
            onModeChange={(mode) => setModes((current) => ({ ...current, [task.id]: mode }))}
          />
        ))}
      </div>
    </section>
  );
}

function WatchTaskCard({ task, mode, onModeChange }: { task: WatchTask; mode: AuthMode; onModeChange: (mode: AuthMode) => void }) {
  return (
    <article className="task-card">
      <div className="task-head">
        <div>
          <h3>{task.emoji} {task.title}</h3>
          <span>{task.scope}</span>
        </div>
        <b>{task.status}</b>
      </div>
      <p className="task-condition">{task.condition}</p>
      <div className="task-metrics">
        <span>命中 <strong>{task.hits}</strong></span>
        <span>{task.lastTrigger}</span>
      </div>
      <div className="segmented">
        {(Object.keys(authModeMeta) as AuthMode[]).map((key) => (
          <button className={mode === key ? "active" : ""} key={key} onClick={() => onModeChange(key)}>
            <span>{authModeMeta[key].icon}</span>
            {authModeMeta[key].label}
          </button>
        ))}
      </div>
      <p className="auth-desc">{authModeMeta[mode].desc}</p>
      {mode === "auto" && (
        <div className="guardrail task-guardrail">
          单笔 ≤ ¥200 · 单日 ≤ ¥600 · 可撤销 15 分钟 · 白名单 · 异常自动熔断
        </div>
      )}
    </article>
  );
}

function ReviewScreen() {
  return (
    <section className="screen scroll-screen">
      <ScreenHeader title="复盘 · 命中率" subtitle="我们说会火、结果如何——公开命中率，长期建立信任" />
      <div className="stat-grid">
        {reviewStats.map((stat) => <StatTile stat={stat} key={stat.label} />)}
      </div>
      <div className="review-list">
        {reviewCases.map((item) => (
          <article className={item.hit ? "review-case hit" : "review-case miss"} key={item.title}>
            <b>{item.hit ? "✓" : "✗"}</b>
            <div>
              <h3>{item.title}</h3>
              <p>{item.predicted} → {item.actual}</p>
              <span>{item.lead}</span>
            </div>
          </article>
        ))}
      </div>
      <section className="signal-share">
        <h3>三路信号平均贡献</h3>
        <div className="share-bar">
          {reviewSignalShare.map((item, index) => (
            <i key={item.label} style={{ width: `${item.value}%`, "--share-index": index } as CSSProperties} />
          ))}
        </div>
        <div className="share-labels">
          {reviewSignalShare.map((item) => <span key={item.label}>{item.label} {item.value}%</span>)}
        </div>
      </section>
    </section>
  );
}

function StatTile({ stat }: { stat: { label: string; value: string; sub: string } }) {
  return (
    <article className="stat-tile">
      <span>{stat.label}</span>
      <strong>{stat.value}</strong>
      <p>{stat.sub}</p>
    </article>
  );
}

export default App;
