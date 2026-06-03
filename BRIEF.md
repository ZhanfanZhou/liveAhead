# 鲜知 XianZhi · 前端 Demo 实施说明（BRIEF）

一个**纯前端、数据全模拟**的交互 Demo，用于给上层决策者直观感受产品功能、审核方案。
**不需要任何后端**。所有内容来自 `src/data/mockData.ts`（已提供于 `_seed/mockData.ts`，请移动到 `src/data/mockData.ts` 后从中 import，**不要改动其内容/文案**）。

产品背景：AI-native 本地生活「爆品先知」。核心是**在商品火之前预测并匹配给最该买的人**。
必须突出的两件事（评审重点）：
1. **个性化推荐流（雷达流）**：每张卡片有可解析的「为什么会火 / 为什么推给你」，并且**视觉上强区分**两类商品：
   - `kind: "hot"` —— 已上架 / 已经出现 / 已经热门（实时热度）
   - `kind: "prophecy"` —— 先知预测：会火爆、甚至**尚未发售 / 尚未上架 / 尚未官宣**
2. **对话式盯品**：自然语言 → AI 编译成结构化「盯品任务」（含三档授权 + 风控）。

---

## 技术栈与运行

- **Vite + React + TypeScript**。包管理用 npm。
- 入口能 `npm install && npm run dev` 直接跑；`npm run build` 出静态产物。
- 不引第三方 UI 组件库。动画优先用 CSS；如需 React 动画可用 `framer-motion`（可选，非必须）。
- 字体走 Google Fonts `<link>`（见下）。SVG 用内联，sparkline 自己用 SVG `<polyline>` 画，别引图表库。
- 写一个清晰的 `README.md`：一句话介绍 + 启动命令 + 截图说明四个页面。

---

## 设计方向：「Oracle Radar / 先知雷达」（深色 · 编辑感 · 微未来）

不要任何通用 AI 风（禁止 Inter/Roboto/Arial/system 字体、紫色渐变白底、千篇一律布局）。
整体气质：**深夜雷达 + 编辑杂志感 + 一点未来信号**。克制而精致，靠排版、留白、微动效取胜。

### 颜色（CSS 变量）
- 画布底：极深午夜墨蓝 `--bg: #0A0C12`；次级面 `--surface: #12161F`；浮起面 `--surface-2: #1A2030`。
- **金色 = 已热/价值**（hot 卡的主色）：`--gold: #E8B45C`，亮 `--gold-bright: #F4CC7A`。
- **电青 = 预测/雷达信号**（prophecy 卡的主色）：`--teal: #38E0C5`，亮 `--teal-bright: #6FF0DC`。
- 紧迫/抢：暖珊瑚 `--coral: #FF6B5C`。
- 文本：主 `--ink: #F3EFE6`（暖白）、次 `--ink-2: #9AA4B6`、弱 `--ink-3: #5A6478`。
- 描边 `--line: rgba(255,255,255,.08)`。
- 语义映射务必贯彻：**hot→金，prophecy→电青**。这是区分两类商品的核心视觉锚点。

### 字体（务必使用，不要换成常见字体）
- 展示/品牌/大标题（拉丁）：**Fraunces**（编辑感衬线，opsz）。
- 中文标题：**Noto Serif SC**。
- 正文（拉丁）：**Manrope**；中文正文：**Noto Sans SC**。
- 数字/分数/价格/数据标签：**Space Mono**（等宽，雷达数据感）。爆火分、价格、σ 等数字都用它。

### 氛围与细节
- 背景有**雷达扫描**意象：用 conic-gradient + 缓慢旋转做一个极淡的扫描光，叠加细噪点纹理（CSS radial 或 SVG feTurbulence），整体很暗很克制，不喧宾夺主。
- prophecy 卡：**虚线发光描边**（电青）+ 角标「预测」，营造"尚未落地、雷达探到"的感觉；可有极淡的扫描/脉冲微动。
- hot 卡：**实线、金色左缘**，踏实"已在售"的质感。
- 页面载入：卡片**错落淡入**（stagger，用 animation-delay）。
- 爆火分：**数字滚动 count-up**入场；旁边一个细环形进度（金/电青按类型着色）。
- 动效集中在高光时刻（载入、展开归因、编译盯品任务），别到处抖。

---

## 布局：桌面背景中央一台「手机」

桌面深色氛围背景，**左侧讲解栏 + 中央手机框**的非对称编辑式布局（评审在桌面看，左栏帮助他们理解在看什么）。

- **左栏（讲解，桌面可见，窄屏隐藏）**：品牌 `🦅 鲜知 / XianZhi`、slogan、`brand.oneLine`、`brand.highlights` 四条看点、以及**图例**：金色=已热/已上架、电青虚线=先知预测/未上架。气质像杂志刊头。
- **中央手机框**：圆角、深色、顶部状态栏（时间/信号/电量随便模拟）、底部 Tab 栏。手机内是真正的 App。
- 窄屏（手机访问）：手机框铺满，左栏折叠成顶部一小条品牌。

### 底部 Tab（手机内，4 个）
`雷达` · `盯品` · `任务` · `复盘`，对应下面四屏。当前 Tab 高亮（电青）。

---

## 四个页面

### 1) 雷达流（默认，import `radarCards`, `feedFilters`）
- 顶部：标题「雷达流」+ 一句副标「按 爆火潜力 × 紧迫度 × 个人相关性 排序」。
- **过滤 chips**（`feedFilters`）横向可滚动，可点选高亮；点选后对卡片做前端过滤（prophecy/hot/餐饮/演出/酒店/1km内/分≥80——按 card 字段合理映射即可，纯前端）。
- **RadarCard**（核心组件，按 `kind` 切换两套视觉）：
  - 顶部行：`emoji + category` 徽标、右上 `statusLabel` 角标（hot 金底/prophecy 电青虚框）、右侧**爆火分环 + count-up 数字**与 `confidence` 置信度。
  - 标题 `title`、`area · distance`。
  - 价格行：`priceLine`（大、Space Mono）+ `priceSub`。
  - `window`（预计爆发/价格窗口）、`pricePrediction` 各一行，带 📈/⏱ 等小图标。
  - **一句话理由** `oneLineReason`：标注「💡 为什么会火（AI 生成）」，默认显示。
  - **展开归因面板**（点「展开归因」）：
    - 三路信号条形图：内容 `signals.content` / 类比 `signals.analogy` / 动量 `signals.momentum`，每路一条动画进度条（hot 金 / prophecy 电青），右侧数字。
    - 三路**证据明细** `evidence.content/analogy/momentum`（列表）。
    - **历史先例** `historyCases`：每个画一个迷你 **sparkline（SVG polyline，用 `curve` 数组）** + `name` + `outcome`，做成"可点开核查"的卡片感。
  - 底部：`personalReason`（📍 为什么推给你）、`tags`（小胶囊）、行动按钮：`❤️ 盯`、主按钮 `primaryAction`（prophecy 多为「🎯 抢先盯」，hot 多为「⚡ 抢」；珊瑚色高亮高紧迫）。
- prophecy 卡要让人一眼看出"这商品**还没上架**，是雷达预测出来的"，hot 卡一眼看出"已经在卖、正在热"。

### 2) 对话式盯品（import `chatScript`, `chatSuggestions`）
- 聊天界面：用户右气泡、AI 左气泡，逐条**按脚本播放**（进入页面后带打字/逐条淡入节奏即可，不需真模型）。
- 当某条 AI 消息带 `compiled` 字段，渲染一张**「盯品任务编译卡」**：把自然语言"编译"成结构化字段（范围/条件/动作/授权档/命中数/风控），用电青强调，呈现"AI 把人话翻成监控任务"的关键时刻。带 `guardrail` 时展示风控行；带 `confirm` 时显示一个确认按钮（点了给个 toast「已开启」即可）。
- 底部输入框 + `chatSuggestions` 建议 chips（点击把文案填入输入框；发送后可循环播放脚本或追加一条 AI 兜底回复——不接真模型）。
- 顶部一句话点题：「像跟一个懂行的本地生活私人买手对话」。

### 3) 盯品任务（import `watchTasks`, `authModeMeta`）
- 列表展示用户的持久化盯品订阅（standing subscription）。
- 每个 **WatchTask 卡**：emoji+title、scope、condition、`status` 角标、`lastTrigger`、**hits 命中数**。
- **三档授权切换**（`authModeMeta`：remind/cart/auto）：用一个三段 segmented 控件，当前 `authMode` 高亮；切到 `auto`（条件全自动）时，展开显示风控行（单笔/单日额度、可撤销、白名单、熔断）——呼应方案的风控框架。切换是纯前端 state。
- 顶部一句：「盯品 = 注册在爆款池上的长期过滤条件，命中才触发」。

### 4) 复盘 · 命中率（import `reviewStats`, `reviewCases`, `reviewSignalShare`）
- 三个**统计 tile**（`reviewStats`）：命中率/平均提前量/已验证案例，数字用 Space Mono、count-up。
- **已验证案例列表**（`reviewCases`）：每条 ✓（电青/金）或 ✗（弱化灰）+ title + predicted → actual + lead；❌ 的那条体现"错了认错、已校准"，是信任点。
- **三路信号平均贡献**（`reviewSignalShare`）：一个小的占比条（内容/类比/动量）。
- 顶部一句：「我们说会火、结果如何——公开命中率，长期建立信任」。

---

## 验收标准
- 四屏可正常切换，雷达流过滤可用，对话脚本能播放并出现"编译卡"，任务页三档授权可切换，复盘页统计正常。
- prophecy 与 hot 两类卡**视觉一眼可分**（电青虚线 vs 金色实线）。
- 设计达到 frontend-design 水准：字体/配色/动效/氛围都到位，不是通用 AI 风。
- 控制台无报错，`npm run build` 通过。
- 全程不要修改 `src/data/mockData.ts` 的文案与数据结构。
