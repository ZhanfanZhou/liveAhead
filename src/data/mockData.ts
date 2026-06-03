// 鲜知 XianZhi · Demo 模拟数据
// 所有数据均为演示用模拟内容，无真实后端。
// 设计意图见 BRIEF.md。内容（copywriting）由 Claude 撰写。

export type CardKind = "hot" | "prophecy";
// hot      = 已上架 / 已经出现 / 已经热门的商品（实时热度）
// prophecy = 先知预测：预测会火爆，甚至尚未发售 / 尚未上架 / 尚未官宣

export interface SignalBreakdown {
  /** 内容内生信号 0-100 */
  content: number;
  /** 类比历史信号 0-100 */
  analogy: number;
  /** 早期动量信号 0-100 */
  momentum: number;
}

export interface HistoryCase {
  name: string;
  /** 当初的真实结果 */
  outcome: string;
  /** 迷你爆发曲线采样点 0-1，用于 sparkline */
  curve: number[];
}

export interface RadarCard {
  id: string;
  kind: CardKind;
  /** 状态徽标，区分已热 / 预测：如 "已在售 · 第6天" / "预测 · 明日开售" */
  statusLabel: string;
  emoji: string;
  category: string;
  title: string;
  area: string;
  distance: string;
  /** 当前/预估价格主串 */
  priceLine: string;
  /** 折扣副串 */
  priceSub: string;
  /** 爆火潜力分 0-100 */
  score: number;
  /** 置信度 */
  confidence: "高" | "中高" | "中" | "中低";
  /** 紧迫度 0-100，用于排序与"抢"高亮 */
  urgency: number;
  /** 预计爆发 / 价格窗口 */
  window: string;
  /** 价格走向预测 */
  pricePrediction: string;
  /** 一句话理由（卡片默认显示，最强那条证据） */
  oneLineReason: string;
  signals: SignalBreakdown;
  /** 三路证据明细 */
  evidence: {
    content: string[];
    analogy: string[];
    momentum: string[];
  };
  /** 类比的历史先例（可点开核查） */
  historyCases: HistoryCase[];
  /** 为什么推给你（个性化解释） */
  personalReason: string;
  /** 标签 */
  tags: string[];
  /** 主行动按钮文案，prophecy 多为"抢先盯" */
  primaryAction: "⚡ 抢" | "🎯 抢先盯" | "📌 现在订";
}

export const radarCards: RadarCard[] = [
  {
    id: "c1",
    kind: "hot",
    statusLabel: "已在售 · 第 6 天",
    emoji: "🌶️",
    category: "川菜",
    title: "椒言椒语·麻辣鱼火锅（望京店）",
    area: "朝阳 · 望京",
    distance: "距你公司 800m",
    priceLine: "招牌套餐 ¥128",
    priceSub: "门市 ¥268 · 4.8 折",
    score: 79,
    confidence: "高",
    urgency: 72,
    window: "正在爆发 · 峰值预计 2–4 天后",
    pricePrediction: "预测 8 天后优惠券下架",
    oneLineReason:
      "3 位本地探店达人本周到访，24h 内高德导航到店搜索量涨 3.1 倍——典型爆发前夜。",
    signals: { content: 72, analogy: 70, momentum: 91 },
    evidence: {
      content: [
        "真 4.8 折：近 90 天门市价稳定，非先涨后降",
        "工作日不限、可叠加 88 元会员，门槛低于同类 80%",
      ],
      analogy: [
        "同商圈「蜀大侠」开业第 2 周排队破百桌",
        "「巴蜀印象」相近价位，3 周内登区域热销榜 Top3",
      ],
      momentum: [
        "收藏增速超同品类正常新品基线 4.2σ",
        "高德导航「到店」搜索 24h 陡增 3.1×",
        "本周 3 位探店达人到访（前导信号）",
      ],
    },
    historyCases: [
      { name: "蜀大侠 · 望京", outcome: "开业第 7 天排队破百桌", curve: [0.1, 0.2, 0.35, 0.6, 0.85, 1, 0.9] },
      { name: "巴蜀印象 · 大望路", outcome: "3 周登区域热销 Top3", curve: [0.15, 0.3, 0.5, 0.7, 0.9, 0.95, 0.8] },
    ],
    personalReason: "你近一月收藏过 2 家川菜，且这家在你公司直线 800m 内。",
    tags: ["实时热度 ↑", "真折扣", "可叠加会员"],
    primaryAction: "⚡ 抢",
  },
  {
    id: "c2",
    kind: "prophecy",
    statusLabel: "预测 · 明日开售 · 尚未上架",
    emoji: "🔮",
    category: "川菜 · 新店",
    title: "麻六记旗下新店「六味堂」开业券",
    area: "朝阳 · 三里屯",
    distance: "距你常去商圈 300m",
    priceLine: "预估开业券 ¥39",
    priceSub: "预估门市 ¥98 · 约 3.9 折",
    score: 87,
    confidence: "中高",
    urgency: 88,
    window: "预计爆发窗口 5–9 天后",
    pricePrediction: "预测 12 天后涨回原价",
    oneLineReason:
      "同集团 3 个月内新店首日券平均 7 分钟售罄；该商圈同价位川菜近期均 2 周内排到队。",
    signals: { content: 85, analogy: 89, momentum: 62 },
    evidence: {
      content: [
        "品牌势能强：母品牌区域复购率高、自带流量",
        "套餐结构含引流爆品（招牌酸菜鱼 1 元尝鲜）",
        "预估低门槛：参考同集团历史多为工作日不限",
      ],
      analogy: [
        "同集团「望京店」开业券 9 分钟售罄",
        "同集团「国贸店」首周排队均 90 分钟",
      ],
      momentum: [
        "官方账号已放出「即将开业」预热海报",
        "2 位头部探店达人已预约探店（前导信号）",
        "尚无实际销量——动量分偏低、以置信度区间表达",
      ],
    },
    historyCases: [
      { name: "麻六记 · 望京店", outcome: "开业券 9 分钟售罄", curve: [0.05, 0.4, 0.85, 1, 0.7, 0.4, 0.2] },
      { name: "麻六记 · 国贸店", outcome: "首周排队均 90 分钟", curve: [0.1, 0.5, 0.8, 1, 0.95, 0.85, 0.6] },
    ],
    personalReason: "你常活动于三里屯商圈，口味画像偏麻辣，预算敏感度低。",
    tags: ["🔮 预测", "尚未上架", "抢先一步"],
    primaryAction: "🎯 抢先盯",
  },
  {
    id: "c3",
    kind: "prophecy",
    statusLabel: "预测 · 刚开售 1h · 限量早鸟",
    emoji: "🎫",
    category: "演出 · 音乐节",
    title: "仲夏声浪音乐节 · 早鸟票",
    area: "通州 · 大运河公园",
    distance: "同城 · 地铁可达",
    priceLine: "早鸟 ¥380",
    priceSub: "正价 ¥680 · 省 44%",
    score: 88,
    confidence: "中高",
    urgency: 95,
    window: "预计 3 天内售罄",
    pricePrediction: "预测临期跳涨至正价",
    oneLineReason:
      "阵容含 2 位顶流，开售 1 小时社媒提及 + 导航搜索陡增；同体量音乐节早鸟普遍 3 天售罄。",
    signals: { content: 84, analogy: 86, momentum: 83 },
    evidence: {
      content: [
        "早鸟 vs 正价折扣力度大（省 44%）、明确限量",
        "阵容含 2 位顶流歌手 + 你关注的乐队",
      ],
      analogy: [
        "「草莓音乐节」早鸟 3 天售罄、临期跳涨",
        "「麦浪音乐节」同体量早鸟 2 天罄",
      ],
      momentum: [
        "开售 1h 社媒提及量 +540%",
        "举办地导航搜索陡增（强需求信号）",
      ],
    },
    historyCases: [
      { name: "草莓音乐节 · 早鸟", outcome: "3 天售罄、临期跳涨", curve: [0.2, 0.45, 0.7, 0.92, 1, 0.6, 0.3] },
      { name: "麦浪音乐节 · 早鸟", outcome: "2 天售罄", curve: [0.3, 0.6, 0.9, 1, 0.5, 0.3, 0.15] },
    ],
    personalReason: "你看过 2 场 livehouse，且收藏过阵容中的「回声玩具」乐队。",
    tags: ["🔮 预测 · 会涨", "限量早鸟", "省 44%"],
    primaryAction: "⚡ 抢",
  },
  {
    id: "c4",
    kind: "prophecy",
    statusLabel: "预测 · 价格周期 · 当前低位",
    emoji: "🏝️",
    category: "酒店 · 周期",
    title: "三亚亚特兰蒂斯 · 海景房",
    area: "三亚 · 海棠湾",
    distance: "异地 · 你 3 周前搜索过",
    priceLine: "当前 ¥1,280/晚",
    priceSub: "旺季均 ¥2,400 · 年内低点",
    score: 81,
    confidence: "中",
    urgency: 64,
    window: "价格触底窗口 现在–6 天",
    pricePrediction: "预测第 10 天起回涨约 18%",
    oneLineReason:
      "同地区淡季历史价格曲线显示此时段为年内低点；端午后预订量将回升、价格随之起涨。",
    signals: { content: 68, analogy: 88, momentum: 74 },
    evidence: {
      content: [
        "当前价为近 12 个月分位 8%（极低位）",
        "可免费取消，锁价无风险",
      ],
      analogy: [
        "去年同期该房型曲线：节后第 9 天起涨 16%",
        "同档「太阳湾柏悦」呈一致淡旺季周期",
      ],
      momentum: [
        "未来 14 天搜索量、机票预订量已现回升拐点",
        "端午假期临近，需求侧动量抬头",
      ],
    },
    historyCases: [
      { name: "亚特兰蒂斯 · 去年同期", outcome: "节后第 9 天起涨 16%", curve: [1, 0.7, 0.45, 0.3, 0.28, 0.5, 0.8] },
      { name: "太阳湾柏悦 · 周期", outcome: "淡旺季一致波动", curve: [0.9, 0.6, 0.4, 0.32, 0.35, 0.6, 0.85] },
    ],
    personalReason: "你 3 周前搜索过「三亚 亲子」，符合出行画像与预算区间。",
    tags: ["🔮 周期预测", "当前低位", "建议现在订"],
    primaryAction: "📌 现在订",
  },
  {
    id: "c5",
    kind: "hot",
    statusLabel: "已在售 · 热度回落",
    emoji: "🥐",
    category: "Brunch",
    title: "BLUE TANG 蓝堂 · 全日早午餐",
    area: "朝阳 · 国贸",
    distance: "距你公司 1.2km",
    priceLine: "工作日套餐 ¥99",
    priceSub: "门市 ¥168 · 5.9 折",
    score: 58,
    confidence: "高",
    urgency: 28,
    window: "已过峰值 · 热度回落中",
    pricePrediction: "预测价格平稳，无抢购必要",
    oneLineReason:
      "诚实提示：探店内容互动量连续 3 天下滑，排队时长回落——已过窗口，不建议追高。",
    signals: { content: 70, analogy: 55, momentum: 42 },
    evidence: {
      content: [
        "折扣本身真实，但已非稀缺",
        "门槛友好，可作日常选择，而非「抢」",
      ],
      analogy: [
        "同类 brunch 普遍在开业 5–6 周后回归常态",
      ],
      momentum: [
        "探店互动量 3 天连降（-37%）",
        "排队时长回落至 10 分钟内",
      ],
    },
    historyCases: [
      { name: "同品类历史均值", outcome: "5–6 周后回归常态", curve: [0.5, 0.8, 1, 0.9, 0.6, 0.4, 0.3] },
    ],
    personalReason: "与你口味相关，但当前时机一般——鲜知会说真话。",
    tags: ["已过峰值", "时机一般", "诚实降温"],
    primaryAction: "⚡ 抢",
  },
  {
    id: "c6",
    kind: "prophecy",
    statusLabel: "预测 · 前导信号 · 尚未官宣",
    emoji: "☕",
    category: "精品咖啡 · 新店",
    title: "光合作用 Photosynthesis（望京新店）",
    area: "朝阳 · 望京 SOHO",
    distance: "距你公司 600m",
    priceLine: "预估首杯 ¥1",
    priceSub: "预估第二杯半价 · 开业活动",
    score: 76,
    confidence: "中",
    urgency: 70,
    window: "预计开业窗口 3–7 天后",
    pricePrediction: "开业活动预计仅持续 3 天",
    oneLineReason:
      "工商新增食品经营许可 + 门店装修完成，达人探班照已出现，但官方尚未宣布——你比所有人早知道。",
    signals: { content: 72, analogy: 70, momentum: 78 },
    evidence: {
      content: [
        "选址优、品牌定位精品，预估客单价友好",
        "开业「1 元首杯」为高引流钩子（参考同类）",
      ],
      analogy: [
        "「Manner」望京新店开业 1 元活动 2 天排长队",
        "同商圈精品咖啡新店首周客流普遍翻倍",
      ],
      momentum: [
        "工商登记新增、装修完工（强前导信号）",
        "探店达人探班照已在小红书出现，官方未宣",
      ],
    },
    historyCases: [
      { name: "Manner · 望京新店", outcome: "开业活动 2 天排长队", curve: [0.1, 0.3, 0.7, 1, 0.85, 0.5, 0.3] },
      { name: "Seesaw · 同商圈", outcome: "首周客流翻倍", curve: [0.2, 0.45, 0.75, 1, 0.9, 0.7, 0.5] },
    ],
    personalReason: "你每周到访咖啡店均值 4 次，且这家在你公司 600m 半径内。",
    tags: ["🔮 前导信号", "尚未官宣", "抢先知道"],
    primaryAction: "🎯 抢先盯",
  },
];

/* ────────────────── 雷达流过滤器 ────────────────── */
export const feedFilters = [
  { id: "all", label: "全部" },
  { id: "prophecy", label: "🔮 仅看预测" },
  { id: "hot", label: "🔥 仅看已热" },
  { id: "food", label: "餐饮" },
  { id: "show", label: "演出票" },
  { id: "hotel", label: "酒店机票" },
  { id: "near", label: "1km 内" },
  { id: "highscore", label: "爆火分 ≥ 80" },
];

/* ────────────────── 对话式盯品脚本 ────────────────── */
export type ChatRole = "user" | "ai";

export interface CompiledTaskPreview {
  scope: string;
  condition: string;
  action: string;
  authMode: string;
  hits: string;
  guardrail?: string;
}

export interface ChatTurn {
  role: ChatRole;
  text: string;
  /** AI 把自然语言「编译」成的结构化盯品任务卡片 */
  compiled?: CompiledTaskPreview;
  /** 需要用户确认的动作 */
  confirm?: string;
}

export const chatScript: ChatTurn[] = [
  {
    role: "user",
    text: "帮我盯朝阳区新开火锅店的开业券，5 折以下、预测会火的，提前一天提醒我。",
  },
  {
    role: "ai",
    text: "好，我把你这句话编译成了一个长期为你工作的盯品任务 🎯",
    compiled: {
      scope: "朝阳区 · 新开（≤30 天）· 火锅",
      condition: "折扣 ≤ 5 折 且 爆火分 ≥ 75",
      action: "预测爆发前 1 天提醒",
      authMode: "🔔 仅提醒",
      hits: "当前命中 2 家，未来新店会自动纳入",
    },
  },
  {
    role: "ai",
    text: "要不要只看连锁品牌？连锁的开业券通常更稳、更易抢。",
  },
  {
    role: "user",
    text: "只要连锁的，预算调到 200。",
  },
  {
    role: "ai",
    text: "已更新 ✅ 仅连锁品牌、单券 ≤ ¥200。命中收窄为 1 家。",
    compiled: {
      scope: "朝阳区 · 新开 · 火锅 · 仅连锁品牌",
      condition: "折扣 ≤ 5 折 · 爆火分 ≥ 75 · 单券 ≤ ¥200",
      action: "预测爆发前 1 天提醒",
      authMode: "🔔 仅提醒",
      hits: "当前命中 1 家",
    },
  },
  {
    role: "user",
    text: "如果爆火分超过 90，就直接帮我抢。",
  },
  {
    role: "ai",
    text: "明白，这一步把任务从「提醒」升级为「授权抢购」。我已配好风控，开启前请你确认：",
    compiled: {
      scope: "朝阳区 · 新开 · 火锅 · 仅连锁品牌",
      condition: "爆火分 > 90 且 单券 ≤ ¥200",
      action: "命中即自动下单",
      authMode: "🤖 条件全自动",
      hits: "当前命中 1 家",
      guardrail: "单笔 ≤ ¥200 · 单日 ≤ ¥600 · 可撤销 15 分钟 · 仅火锅白名单 · 异常自动熔断",
    },
    confirm: "确认开启「条件全自动」抢购",
  },
];

export const chatSuggestions = [
  "盯三里屯新开日料的早鸟券",
  "三亚亲子酒店什么时候订最便宜？",
  "帮我盯周杰伦演唱会的回流票",
  "国贸 1km 内、本周会火的咖啡店",
];

/* ────────────────── 盯品任务（持久订阅） ────────────────── */
export type AuthMode = "remind" | "cart" | "auto";

export interface WatchTask {
  id: string;
  emoji: string;
  title: string;
  scope: string;
  condition: string;
  authMode: AuthMode;
  hits: number;
  lastTrigger: string;
  status: "运行中" | "命中待办" | "监控中";
}

export const authModeMeta: Record<AuthMode, { label: string; desc: string; icon: string }> = {
  remind: { label: "仅提醒", icon: "🔔", desc: "到点推送，你手动操作" },
  cart: { label: "加购待确认", icon: "🛒", desc: "自动锁单/加购，发确认请求" },
  auto: { label: "条件全自动", icon: "🤖", desc: "满足预设规则直接下单" },
};

export const watchTasks: WatchTask[] = [
  {
    id: "w1",
    emoji: "🌶️",
    title: "朝阳 · 连锁火锅开业券",
    scope: "朝阳 · 新开 ≤30 天 · 仅连锁火锅",
    condition: "爆火分 > 90 · 单券 ≤ ¥200",
    authMode: "auto",
    hits: 1,
    lastTrigger: "2 小时前 · 命中「六味堂」预测开业券",
    status: "命中待办",
  },
  {
    id: "w2",
    emoji: "🍣",
    title: "三里屯 · 新开日料早鸟",
    scope: "三里屯 · 新开 ≤14 天 · 日料/居酒屋",
    condition: "折扣 ≤ 4 折 · 爆火分 ≥ 80",
    authMode: "cart",
    hits: 3,
    lastTrigger: "昨天 · 已为你锁单 1 张待确认",
    status: "命中待办",
  },
  {
    id: "w3",
    emoji: "🎤",
    title: "周杰伦演唱会 · 回流票",
    scope: "本城 · 周杰伦巡演 · 看台/内场",
    condition: "出现回流票 且 ≤ 原价",
    authMode: "remind",
    hits: 0,
    lastTrigger: "持续监控中，暂无回流",
    status: "监控中",
  },
];

/* ────────────────── 复盘 · 命中率仪表盘 ────────────────── */
export interface ReviewStat {
  label: string;
  value: string;
  sub: string;
}

export const reviewStats: ReviewStat[] = [
  { label: "近 30 天预测命中率", value: "73%", sub: "「说会火 → 真火」" },
  { label: "平均提前量", value: "6.2 天", sub: "比大众早知道" },
  { label: "已验证案例", value: "41 例", sub: "公开可核查" },
];

export interface ReviewCase {
  hit: boolean;
  title: string;
  predicted: string;
  actual: string;
  lead: string;
}

export const reviewCases: ReviewCase[] = [
  {
    hit: true,
    title: "望京 · 蜀大侠开业券",
    predicted: "预测会火 · 爆火分 86",
    actual: "第 7 天排队破百桌",
    lead: "提前 6 天命中",
  },
  {
    hit: true,
    title: "仲夏声浪音乐节 · 早鸟票",
    predicted: "预测 3 天售罄",
    actual: "实际 2 天 9 小时售罄",
    lead: "窗口命中",
  },
  {
    hit: false,
    title: "国贸 · 某 Brunch 新店",
    predicted: "预测会火 · 爆火分 78",
    actual: "第 5 天未起量，预测偏高",
    lead: "认错并已校准模型",
  },
  {
    hit: true,
    title: "三亚 · 亚特兰蒂斯机票",
    predicted: "预测价格触底",
    actual: "第 10 天起涨 15%",
    lead: "周期命中",
  },
];

export const reviewSignalShare = [
  { label: "内容内生", value: 38 },
  { label: "类比历史", value: 34 },
  { label: "早期动量", value: 28 },
];

/* ────────────────── 品牌 / 文案 ────────────────── */
export const brand = {
  name: "鲜知",
  pinyin: "XianZhi",
  mark: "🦅",
  slogan: "在它火之前，先一步到你手里。",
  oneLine: "在一件商品/服务火之前，就把它和最该买它的人匹配起来。",
  highlights: [
    { title: "可解释推荐", desc: "每张卡片都给出 LLM 实时生成的「为什么会火」，而非黑箱分数。" },
    { title: "已热 vs 预测", desc: "明确区分「已上架的实时热度」与「尚未上架/发售的先知预测」。" },
    { title: "对话式盯品", desc: "用一句话下指令，AI 编译成长期为你工作的监控 Agent。" },
    { title: "授权抢购", desc: "仅提醒 / 加购待确认 / 条件全自动，三档授权 + 全程风控。" },
  ],
};
