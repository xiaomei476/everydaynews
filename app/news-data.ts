export type Confidence = '已确认' | '高可信' | '待验证' | '分析判断';
export type Channel =
  | '人工智能与算力'
  | '芯片设计与工具'
  | '芯片制造与器件'
  | '嵌入式与物联网'
  | '消费电子与显示'
  | '通信与数据中心'
  | '机器人与先进制造'
  | '汽车交通与航天'
  | '能源电网与电池'
  | '生物医药与医疗科技'
  | '农业食品与物流'
  | '宏观贸易与规则';
export type Region = '中国' | '美国' | '欧洲' | '日韩' | '全球';
export type NewsType = '技术发布' | '产业动作' | '政策规则' | '经济数据';

export type NewsItem = {
  id: string;
  date: string;
  eventDate?: string;
  region: Region;
  channel: Channel;
  subcategory: string;
  type: NewsType;
  importance: 1 | 2 | 3 | 4 | 5;
  confidence: Confidence;
  confidenceNote: string;
  status: '新增' | '更新' | '跟踪';
  title: string;
  fact: string;
  keyNumbers: string[];
  why: string;
  chain: string;
  maker: string;
  watch: string;
  maturity: string;
  sourceName: string;
  sourceDate: string;
  url: string;
  tags: string[];
  readMinutes: number;
  linkedTrackId?: string;
};

export type VerificationTrack = {
  id: string;
  question: string;
  linkedNewsIds: string[];
  industries: Channel[];
  factStatus: '已确认' | '部分确认' | '待确认';
  thesisStatus: '待验证' | '初步佐证' | '部分验证' | '已验证' | '证据冲突' | '已失效';
  currentJudgment: string;
  priority: 1 | 2 | 3;
  methods: {
    task: string;
    metric: string;
    sourceTypes: string[];
    completion: '未开始' | '进行中' | '已完成';
  }[];
  supportSignals: string[];
  refuteSignals: string[];
  updates: {
    date: string;
    summary: string;
    direction: '支持' | '反驳' | '中性';
    evidenceType: '官方文件' | '独立测试' | '市场数据' | '客户案例' | '实物产品';
    sourceName: string;
    url: string;
  }[];
  nextCheck: { date: string; task: string; trigger: string };
  lastChangedAt: string;
};

export const industryCatalog: Array<{ value: Channel; note: string }> = [
  { value: '人工智能与算力', note: '模型、智能体、算力与安全' },
  { value: '芯片设计与工具', note: '处理器、IP、EDA 与验证' },
  { value: '芯片制造与器件', note: '晶圆、封装、存储、模拟与功率器件' },
  { value: '嵌入式与物联网', note: 'MCU、边缘计算、传感与连接' },
  { value: '消费电子与显示', note: '终端、显示、接口与可穿戴设备' },
  { value: '通信与数据中心', note: '云、网络、光通信、服务器与散热' },
  { value: '机器人与先进制造', note: '自动化、机床、工业软件与材料' },
  { value: '汽车交通与航天', note: '智能汽车、物流、轨交与航空航天' },
  { value: '能源电网与电池', note: '电力、储能、新能源与基础设施' },
  { value: '生物医药与医疗科技', note: '医药、器械、诊断与生物制造' },
  { value: '农业食品与物流', note: '农业科技、食品、仓储与供应链' },
  { value: '宏观贸易与规则', note: '经济、就业、金融、贸易与监管' },
];

export const briefMeta = {
  dateDisplay: '2026.09.05',
  updatedAt: '北京时间 13:30',
  edition: '第 002 期',
  mainline: 'AI 投入正在变成芯片收入和设备交付；与此同时，关税、产品安全与电力规则开始重写真实部署成本。',
  summary: '过去 72 小时精选 12 条一手更新：不按地区凑数，只保留会改变订单、成本、技术路线或合规边界的信息。',
};

export const signals = [
  {
    label: '今天必须知道',
    value: 'AI 基建已经从预算承诺进入收入与设备交付',
    detail: 'Broadcom 单季 AI 半导体收入 167 亿美元；全球半导体设备销售连续第二季创纪录。',
    tone: 'cyan',
  },
  {
    label: '电子产业变量',
    value: '美国无人机及关键部件关税正式生效',
    detail: '不同产品税率可达 25% 或 100%，供应链、整机价格和零件选型需要重新核算。',
    tone: 'violet',
  },
  {
    label: '下一步验证',
    value: '盯住真实客户、实物测试、采购合同与执法结果',
    detail: '重点跟踪 AI 芯片交付、电网设备订单、Cybercab 审计及无人机关税清单执行。',
    tone: 'gold',
  },
] as const;

export const briefDates = [
  { value: 'all', label: '本期 · 72 小时', note: '12 条重点' },
  { value: '2026-09-05', label: '09.05', note: '0 条重点' },
  { value: '2026-09-04', label: '09.04', note: '9 条重点' },
  { value: '2026-09-03', label: '09.03', note: '3 条重点' },
] as const;

export const news: NewsItem[] = [
  {
    id: 'broadcom-ai-q3', date: '2026-09-04', eventDate: '2026-08-02', region: '美国',
    channel: '人工智能与算力', subcategory: '定制加速器 / 数据中心网络', type: '经济数据', importance: 5,
    confidence: '高可信', status: '新增',
    confidenceNote: '季度实绩来自公司未经审计财报；下一季度数字是管理层指引，尚未实现。',
    title: 'Broadcom 单季 AI 半导体收入达 167 亿美元，算力投入开始大规模确认为芯片收入',
    fact: 'Broadcom 披露 2026 财年第三季度总营收 296 亿美元，其中定制 AI 加速器与网络相关半导体收入 167 亿美元；公司同时给出更高的第四季度指引。',
    keyNumbers: ['AI 半导体收入 167 亿美元，同比 +221%', '总营收 296 亿美元，同比 +86%', '第四季度 AI 收入指引 217 亿美元'],
    why: '这是云厂商 AI 资本开支从计划转化为实际芯片交付和收入的强证据，也表明瓶颈已延伸到交换、光互连、封装与存储。',
    chain: '云厂商扩建 AI 集群 → 定制加速器与交换芯片 → 晶圆、HBM、先进封装和光模块需求 → 数据中心供电与网络升级。',
    maker: '把它当作高速网络与 AI 芯片周期的领先信号；采购工作站、100GbE 设备或云算力时，关注供货周期而不只看参数。',
    watch: '核对 10-Q、客户集中度、第四季度实际交付，以及代工、HBM 和先进封装是否出现新的产能约束。',
    maturity: '商用量产，已形成季度收入；后续指引待兑现。',
    sourceName: 'Broadcom 投资者关系', sourceDate: '2026-09-02',
    url: 'https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial',
    tags: ['AI 加速器', 'ASIC', '网络芯片', 'HBM', '财报'], readMinutes: 5, linkedTrackId: 'ai-infra-conversion',
  },
  {
    id: 'semi-equipment-q2', date: '2026-09-04', eventDate: '2026-06-30', region: '全球',
    channel: '芯片制造与器件', subcategory: '半导体设备 / 资本开支', type: '经济数据', importance: 5,
    confidence: '高可信', status: '新增',
    confidenceNote: '销售总额来自 SEMI 与日本半导体制造装置协会会员汇总；细分地区和设备类别仍需完整数据集复核。',
    title: '全球半导体设备季度销售额升至 405.3 亿美元，连续第二季创纪录',
    fact: 'SEMI 公布 2026 年第二季度全球半导体设备销售额同比增长 23%、环比增长 11%，并将主要动力指向 AI 基础设施、先进逻辑与存储投资。',
    keyNumbers: ['季度销售额 405.3 亿美元', '同比 +23%', '环比 +11%'],
    why: '设备交付是未来晶圆、存储与封装产能的领先指标，说明扩产越过预算口号，但距离实际新增供给仍有建设、调试和良率爬坡时滞。',
    chain: 'AI 与存储需求 → 晶圆厂资本开支 → 光刻、沉积、刻蚀和检测设备交付 → 未来制程与存储供给变化。',
    maker: '可用来判断未来数季 GPU、内存和开发板供给环境；这不是眼下立即降价的信号。',
    watch: '查看地区与设备类别明细、积压订单、取消率，以及新增设备何时转为稳定晶圆产出。',
    maturity: '已发生的商业销售，新增产能仍在建设与爬坡。', sourceName: 'SEMI', sourceDate: '2026-09-03',
    url: 'https://www.semi.org/en/semi-press-release/global-semiconductor-equipment-billings-increased-23-percent-year-over-year-in-q2-2026-semi-reports',
    tags: ['半导体设备', '晶圆制造', '资本开支', '存储', '供应链'], readMinutes: 4, linkedTrackId: 'ai-infra-conversion',
  },
  {
    id: 'nvidia-pair', date: '2026-09-04', region: '美国', channel: '消费电子与显示',
    subcategory: '本地 AI / 异构推理', type: '技术发布', importance: 4, confidence: '高可信', status: '新增',
    confidenceNote: '公开测试版和支持设备由 NVIDIA 确认；吞吐提升来自厂商测试，尚缺独立复现。',
    title: 'NVIDIA PAIR 公测：局域网里的 RTX 与 M4 设备可以组成个人 AI 请求池',
    fact: 'NVIDIA 发布个人 AI 路由器 PAIR 公测版，可把多台 RTX、DGX Spark 和 Apple M4 设备用于分发彼此独立的本地推理请求，并接入 Ollama 或 LM Studio。',
    keyNumbers: ['免费开源公测', '支持 RTX 20 系列及以后与 Apple M4+', '厂商测试吞吐最高提升 1.9 倍'],
    why: '它把闲置个人设备转化为轻量级多智能体基础设施；但它不合并显存，不能让单个超大模型跨机器运行。',
    chain: '开源请求路由 → 复用局域网设备 → 多任务并行 → 降低部分云端调用与数据外发 → 提升大显存电脑和高速局域网价值。',
    maker: '可连接现有 RTX 或 M4 设备，用相同提示词比较单机与多节点并发、延迟、功耗和掉线恢复。',
    watch: '复核代码许可证、鉴权和加密、异构调度开销、故障处理，以及官方性能数字能否独立复现。',
    maturity: '软件公开测试；生产稳定性和性能泛化程度待验证。', sourceName: 'NVIDIA', sourceDate: '2026-09-03',
    url: 'https://blogs.nvidia.com/blog/local-ai-ifa-next-gen-agents-nv-pair-rtx-spark/',
    tags: ['本地 AI', 'RTX', '推理集群', 'Ollama', 'AI PC'], readMinutes: 5,
  },
  {
    id: 'china-power-safety-rule', date: '2026-09-04', eventDate: '2026-08-30', region: '中国',
    channel: '能源电网与电池', subcategory: '电力安全 / 储能并网', type: '政策规则', importance: 5,
    confidence: '已确认', status: '新增',
    confidenceNote: '国务院行政法规及主管部门解读已发布，生效日期明确；具体技术改造清单仍待配套标准和地方执行。',
    title: '新版电力安全事故条例将分布式新能源与新型储能纳入更明确的并网安全责任',
    fact: '修订后的《电力安全事故应急处置和调查处理条例》公布，扩大电力安全责任主体，要求并网主体遵守统一调度、技术标准、风险排查、应急演练和整改评价。',
    keyNumbers: ['2027 年 1 月 1 日施行', '共 38 条', '2026 年 8 月 30 日签署'],
    why: '分布式发电、储能和数据中心等并网项目的控制、保护、监测和应急要求将从项目建议变成可执法责任，直接影响设计、验收与运维成本。',
    chain: '行政法规生效 → 配套标准与检查 → 并网控制、保护和监测改造 → 储能变流器、继电保护、工业通信与测试需求。',
    maker: '做并网逆变器、储能或家庭能源实验时，应把故障隔离、日志、远程控制和应急策略纳入设计，而不只追求转换效率。',
    watch: '跟踪配套标准、地方检查细则、首批整改案例，以及设备采购是否出现明确的安全功能条款。',
    maturity: '法规已公布，尚未施行；配套技术要求和实际执法待观察。', sourceName: '国家能源局', sourceDate: '2026-09-04',
    url: 'https://www.nea.gov.cn/20260904/2165aeebb935486cb20e8b560414bed0/c.html',
    tags: ['电力安全', '新型储能', '分布式新能源', '并网', '应急'], readMinutes: 6, linkedTrackId: 'power-safety-compliance',
  },
  {
    id: 'nhtsa-cybercab-audit', date: '2026-09-04', region: '美国', channel: '汽车交通与航天',
    subcategory: '自动驾驶 / 整车认证', type: '政策规则', importance: 5, confidence: '已确认', status: '新增',
    confidenceNote: '审查由美国国家公路交通安全管理局正式启动；这不等于已经认定车辆违规。',
    title: '美国监管机构审查 Tesla Cybercab 自我认证，量产自动驾驶的安全证据进入强制核验',
    fact: 'Tesla 在奥斯汀启动无车内安全员的 Cybercab 商业服务后，美国国家公路交通安全管理局启动审计问询，核查车辆自我认证和联邦安全标准符合性。',
    keyNumbers: ['2026 年 9 月 4 日启动', '对象：Cybercab 自我认证', '当前未作违规结论'],
    why: '问题从算法能否行驶转向整车结构、控制冗余、软件更新和证据链能否通过监管审查，可能改变车辆设计与上市节奏。',
    chain: '监管审计 → 企业提交测试与认证证据 → 可能的整改或执法 → 传感器、制动转向冗余、日志和验证成本变化。',
    maker: '评估自动驾驶方案时，除感知准确率外，还应记录故障降级、时间同步、日志可追溯和安全关键执行器冗余。',
    watch: '等待审计材料、Tesla 正式答复、具体不符合项，以及车辆硬件或软件是否因此改变。',
    maturity: '商业部署已开始；合规结论和规模化路径待审查。', sourceName: '美国国家公路交通安全管理局', sourceDate: '2026-09-04',
    url: 'https://www.nhtsa.gov/press-releases/investigation-tesla-cybercab-self-certification',
    tags: ['Cybercab', '自动驾驶', '功能安全', '整车认证', '审计'], readMinutes: 5, linkedTrackId: 'cybercab-certification',
  },
  {
    id: 'usa-rare-earth-serra-verde', date: '2026-09-04', eventDate: '2026-09-03', region: '美国',
    channel: '机器人与先进制造', subcategory: '稀土 / 永磁材料', type: '产业动作', importance: 4,
    confidence: '高可信', status: '新增',
    confidenceNote: '并购完成由公司向美国证交会提交的文件确认；扩产规模和时间表属于公司前瞻目标。',
    title: 'USA Rare Earth 完成 Serra Verde 并购，稀土资源到永磁体的纵向链条进一步成形',
    fact: 'USA Rare Earth 完成对巴西 Serra Verde 的控制权交易，把在产稀土资源与其氧化物、合金和永磁体计划连接起来；Serra Verde 已于 2024 年开始生产。',
    keyNumbers: ['一期目标约 4,000 吨/年稀土氧化物', '二期目标平均 6,400 吨/年', '二期调试目标约 12 个月'],
    why: '重稀土与永磁材料影响电机、机器人、无人机和国防电子供应，实际控制资源的纵向整合比单纯采购意向更有约束力。',
    chain: '稀土矿产与分离 → 氧化物和合金 → 高性能永磁体 → 电机、机器人、无人机与汽车供应链。',
    maker: '关注小型高转矩电机和磁材的价格、交期与牌号替代；不要把公司产能目标视为已经兑现的供给。',
    watch: '验证实际产量、分离纯度、二期资本开支与投产进度，以及下游磁体工厂是否获得真实客户订单。',
    maturity: '并购已完成、矿山在产；扩产和完整下游链仍在建设。', sourceName: '美国证券交易委员会文件', sourceDate: '2026-09-04',
    url: 'https://www.sec.gov/Archives/edgar/data/1970622/000121390026097399/ea030400101ex99-1.htm',
    tags: ['稀土', '永磁体', '电机', '供应链', '并购'], readMinutes: 5,
  },
  {
    id: 'fda-etcamah-ctdna', date: '2026-09-04', region: '美国', channel: '生物医药与医疗科技',
    subcategory: '液体活检 / 精准用药', type: '政策规则', importance: 4, confidence: '已确认', status: '新增',
    confidenceNote: '药物与伴随诊断获 FDA 加速批准属已确认事实；长期临床获益仍须验证性试验支持。',
    title: 'FDA 首次批准以血液中的耐药突变先于影像进展来触发乳腺癌换药',
    fact: '美国食品药品监督管理局加速批准 Etcamah 联合 CDK4/6 抑制剂，并批准 Guardant360 CDx 用循环肿瘤 DNA 检测 ESR1 突变，在影像显示进展前调整治疗。',
    keyNumbers: ['无进展生存期 16.0 个月对 9.2 个月', 'ESR1 突变可由血液检测触发换药', '批准路径：加速批准'],
    why: '诊断开始实时控制治疗路径；这会拉动高灵敏度测序、样本前处理、算法验证和可审计实验室流程。',
    chain: '循环肿瘤 DNA 检测 → 早期识别耐药 → 更早换药 → 伴随诊断、测序平台和临床决策系统需求。',
    maker: '可关注微流控、低噪声扩增和生物信息学误差控制；该方案不能替代临床医生判断或普通消费检测。',
    watch: '等待验证性试验、总体生存数据、假阳性与检测下限，以及真实医疗场景能否稳定复制获益。',
    maturity: '监管加速批准并可临床使用，长期获益仍需确认。', sourceName: '美国食品药品监督管理局', sourceDate: '2026-09-04',
    url: 'https://www.fda.gov/news-events/press-announcements/fda-grants-accelerated-approval-new-breast-cancer-treatment',
    tags: ['液体活检', 'ctDNA', 'ESR1', '伴随诊断', '精准医疗'], readMinutes: 5,
  },
  {
    id: 'fao-food-price-aug', date: '2026-09-04', eventDate: '2026-08-31', region: '全球',
    channel: '农业食品与物流', subcategory: '大宗食品 / 供应链', type: '经济数据', importance: 4,
    confidence: '高可信', status: '新增',
    confidenceNote: '指数由联合国粮农组织按既定方法发布；部分基础价格和产量判断仍可能修订。',
    title: '全球食品价格指数 8 月环比上涨 1.9%，五大类别同步走高',
    fact: '联合国粮农组织食品价格指数升至 133.3 点，所有五个分项上涨；糖价单月涨幅最大，植物油指数达到 2022 年 6 月以来高位。',
    keyNumbers: ['总指数 133.3，环比 +1.9%', '同比 +2.5%', '糖价环比 +11.9%'],
    why: '多类别同时上涨会传导到食品加工、包装、冷链和零售成本；植物油与糖的急升比单一农产品波动更值得警惕。',
    chain: '农产品价格上涨 → 加工与库存成本 → 包装、运输和零售调价 → 消费与通胀压力。',
    maker: '做农业传感、温控或仓储项目时，可优先关注损耗监测和能耗优化；指数变化不是短线囤货依据。',
    watch: '核对下一月指数、主要产区天气、出口限制、库存与海运价格，判断上涨是短期冲击还是持续趋势。',
    maturity: '已发布的月度市场数据，后续月份可验证持续性。', sourceName: '联合国粮农组织', sourceDate: '2026-09-04',
    url: 'https://www.fao.org/worldfoodsituation/foodpricesindex/en/', tags: ['食品价格', '糖', '植物油', '物流', '通胀'], readMinutes: 4,
  },
  {
    id: 'us-jobs-aug', date: '2026-09-04', eventDate: '2026-08-31', region: '美国', channel: '宏观贸易与规则',
    subcategory: '就业 / 制造业', type: '经济数据', importance: 5, confidence: '已确认', status: '新增',
    confidenceNote: '数据由美国劳工统计局发布，属于初值；历史月份已出现修订，后续仍可能调整。',
    title: '美国 8 月新增就业 16.2 万，制造业增加而信息行业继续减少',
    fact: '美国 8 月非农就业增加 16.2 万，失业率为 4.1%；制造业增加 1.6 万，而信息行业减少 2.3 万，其中计算、数据处理与托管减少 8 千。',
    keyNumbers: ['非农 +16.2 万', '失业率 4.1%', '制造业 +1.6 万；信息业 -2.3 万'],
    why: '总量就业仍扩张，但制造与信息行业分化，提示 AI 数据中心投资没有简单等比例转化为信息服务岗位。',
    chain: '劳动力需求变化 → 工资与融资预期 → 制造扩产和企业软件支出 → 电子、设备和云服务订单。',
    maker: '把行业就业变化与公司订单、招聘岗位和本地项目结合观察，不要用单月总量直接判断电子行业景气。',
    watch: '关注后续修订、工时、制造业分项、数据中心投资与信息业就业是否持续背离。',
    maturity: '官方月度初值，后续会修订。', sourceName: '美国劳工统计局', sourceDate: '2026-09-04',
    url: 'https://www.bls.gov/news.release/archives/empsit_09042026.htm', tags: ['非农就业', '制造业', '信息业', '工资', '经济数据'], readMinutes: 4,
  },
  {
    id: 'astra-safety', date: '2026-09-03', region: '美国', channel: '人工智能与算力',
    subcategory: '智能体 / 网络安全', type: '技术发布', importance: 5, confidence: '高可信', status: '跟踪',
    confidenceNote: '能力评级和内部任务数据来自 OpenAI；真实世界攻击成功率和企业部署成本仍需独立验证。',
    title: 'GPT-6 Astra 达到网络安全“Critical”门槛，Agent 权限隔离成为部署成本核心',
    fact: 'OpenAI 发布 GPT-6 Astra，并将其列为首个达到 Preparedness Framework 网络安全 Critical 级别的广泛部署模型；官方同时披露内部任务和监测措施。',
    keyNumbers: ['54,000+ 项内部任务', '约一半触发高严重度告警', '网络安全评级：Critical'],
    why: '更强智能体扩大了可执行任务范围，也扩大凭据、权限、浏览器和终端的攻击面，企业安全成本可能随能力同步上升。',
    chain: '模型能力提升 → 可执行任务范围扩大 → 凭据和系统暴露增加 → 最小权限、隔离、审计与人工确认需求上升。',
    maker: '本地运行 Agent 时先使用沙箱、临时凭据和只读权限，并保存工具调用日志；不要让模型直接接触主账号密钥。',
    watch: '寻找独立红队复现、真实事故、企业权限架构与审计成本数据，而不是重复引用厂商评级。',
    maturity: '模型已部署，外部风险和治理成本仍在实证阶段。', sourceName: 'OpenAI', sourceDate: '2026-09-03',
    url: 'https://openai.com/index/safety-overview-gpt-6-astra/', tags: ['智能体', '网络安全', '最小权限', '审计', '模型安全'], readMinutes: 6, linkedTrackId: 'agent-security-cost',
  },
  {
    id: 'eu-customs-reform', date: '2026-09-03', region: '欧洲', channel: '宏观贸易与规则',
    subcategory: '电商进口 / 海关', type: '政策规则', importance: 5, confidence: '已确认', status: '新增',
    confidenceNote: '欧盟理事会一读立场已通过，但改革尚未完成全部立法程序；手续费金额仍未确定。',
    title: '欧盟海关改革推进到理事会一读，电商平台将承担进口人责任',
    fact: '欧盟理事会通过海关改革一读立场，拟让电商平台承担进口申报与合规责任，并引入统一数据枢纽、严重违法罚则和小包裹处理费。',
    keyNumbers: ['严重违法最高罚至上年进口额 6%', '电商数据枢纽拟 2028 年 7 月启用', '2025 年约 60 亿个电商包裹进入欧盟'],
    why: '低价电子模块、零件和跨境卖家的申报、认证、数据和物流成本会前移到平台，可能改变欧盟市场的商品可得性和售价。',
    chain: '立法完成 → 平台成为进口责任主体 → 数据、合规与处理费上升 → 卖家准入、SKU 数量、价格和物流方式调整。',
    maker: '向欧盟购买或销售开发板与零件时，提前保留商品编码、原产地、合规文件和材料信息，避免只依赖平台自动填报。',
    watch: '等待欧洲议会后续、最终法条、处理费金额，以及 2028 年前平台实际调整卖家规则。',
    maturity: '立法后期，尚非最终生效文本。', sourceName: '欧盟理事会', sourceDate: '2026-09-03',
    url: 'https://www.consilium.europa.eu/en/press/press-releases/2026/09/03/eu-customs-council-greenlights-landmark-reform/',
    tags: ['欧盟海关', '跨境电商', '进口责任', '合规', '电子零件'], readMinutes: 5,
  },
  {
    id: 'us-drone-tariffs', date: '2026-09-03', eventDate: '2026-09-03', region: '美国', channel: '汽车交通与航天',
    subcategory: '无人机 / 关键部件', type: '政策规则', importance: 5, confidence: '已确认', status: '新增',
    confidenceNote: '关税调整来自白宫公告与美国海关执行指引；具体税率取决于产品类别、原产地和附件编码。',
    title: '美国无人机与指定关键部件新关税生效，部分税率升至 100%',
    fact: '美国依据《贸易扩展法》第 232 条调整无人机系统及部件进口税率；美国海关发布执行指引，按重量、热成像能力、部件类别和贸易伙伴适用不同税率。',
    keyNumbers: ['2026 年 9 月 3 日 00:01（美国东部时间）生效', '部分产品税率 100%', '多数小型非热成像无人机通常为 25%'],
    why: '这是直接改变整机、电机、电调、飞控、图传和机库成本的硬约束，也会推动原产地重组和本地组装。',
    chain: '关税执行 → 进口成本与申报复杂度上升 → 渠道调价和供应商迁移 → 无人机整机及部件选型变化。',
    maker: '采购 FPV 或无人机部件时核对 HTS 编码、原产地和到岸税费；不要用单一“25%”概括全部零件。',
    watch: '检查首批清关案例、附件编码解释、渠道价格与库存，以及 2027 年新增部件税率是否按期执行。',
    maturity: '政策已生效并进入海关执行，市场传导仍待观察。', sourceName: '美国海关与边境保护局', sourceDate: '2026-09-02',
    url: 'https://content.govdelivery.com/accounts/USDHSCBP/bulletins/4281ea7', tags: ['无人机', 'FPV', '关税', '电机', '飞控'], readMinutes: 6, linkedTrackId: 'drone-tariff-impact',
  },
];

export const verificationTracks: VerificationTrack[] = [
  {
    id: 'grid-orders', question: '新型电网政策能否传导为功率电子与储能设备的真实订单？', linkedNewsIds: ['china-new-grid'],
    industries: ['能源电网与电池', '芯片制造与器件', '通信与数据中心'], factStatus: '已确认', thesisStatus: '待验证', priority: 3,
    currentJudgment: '政策方向和应用场景继续细化，但新材料仍是案例征集，并非量化采购或设备订单。',
    methods: [
      { task: '跟踪专项规划、项目清单和电网公司集中招标', metric: '投资额、项目数、变压器、变流器与储能系统招标量', sourceTypes: ['主管部门文件', '电网公司招标'], completion: '进行中' },
      { task: '核对设备和功率器件企业的合同与在手订单', metric: '新增合同、订单同比、交付周期与渠道价格', sourceTypes: ['公司公告', '财报与业绩会'], completion: '未开始' },
    ],
    supportSignals: ['出现量化投资计划或集中招标', '功率器件、储能控制和工业通信订单同步上升'],
    refuteSignals: ['长期停留在会议与案例征集', '项目延期且订单、交期与产能利用率没有改善'],
    updates: [
      { date: '2026-09-03', summary: '官方会议部署新型电网重大任务，并给出“十五五”用电需求年均约增长 5% 的判断。', direction: '支持', evidenceType: '官方文件', sourceName: '国家发展改革委 / 国家能源局', url: 'https://www.ndrc.gov.cn/fzggw/wld/wanghongzhi/zyhd/202609/t20260903_1407392.html' },
      { date: '2026-09-04', summary: '工信部征集工业绿色微电网、绿电算力协同等六类案例；场景更具体，但仍未形成投资额、采购量或中标结果。', direction: '中性', evidenceType: '官方文件', sourceName: '工业和信息化部', url: 'https://wap.miit.gov.cn/jgsj/jns/nyjy/art/2026/art_8037974bb73f470caaf1127337f0ece7.html' },
    ],
    nextCheck: { date: '2026-09-12', task: '检查专项规划、项目清单、集中招标和上市公司重大合同', trigger: '出现明确投资额、设备数量、中标结果或可核验合同后升级判断' },
    lastChangedAt: '2026-09-04',
  },
  {
    id: 'agent-security-cost', question: '更强的智能体能力是否会显著抬高企业部署的安全与权限成本？', linkedNewsIds: ['astra-safety'],
    industries: ['人工智能与算力', '通信与数据中心', '宏观贸易与规则'], factStatus: '已确认', thesisStatus: '待验证', priority: 3,
    currentJudgment: '能力评级和内部安全数据已经确认，真实攻击复现率与企业安全成本尚无独立新证据。',
    methods: [
      { task: '寻找独立红队对高危能力的复现结果', metric: '任务成功率、高危告警、绕过率与人工确认次数', sourceTypes: ['独立评测', '安全研究'], completion: '进行中' },
      { task: '收集真实企业部署的权限与审计成本', metric: '隔离层级、人工审核时长、事故数和运维费用', sourceTypes: ['客户案例', '事故报告', '审计报告'], completion: '未开始' },
    ],
    supportSignals: ['独立团队复现高危攻击任务', '企业增加隔离、凭据代理和人工审核后成本明显上升'],
    refuteSignals: ['外部复现显著低于厂商内部结果', '低成本最小权限方案可稳定阻断高危行为'],
    updates: [{ date: '2026-09-03', summary: 'OpenAI 将 Astra 评为网络安全 Critical，并披露 54,000 多项内部任务和高严重度告警情况。', direction: '支持', evidenceType: '官方文件', sourceName: 'OpenAI', url: 'https://openai.com/index/safety-overview-gpt-6-astra/' }],
    nextCheck: { date: '2026-09-11', task: '检索独立红队复现、漏洞披露和企业部署案例', trigger: '出现独立测试或真实事故时更新判断；否则记录未发现有效进展' },
    lastChangedAt: '2026-09-03',
  },
  {
    id: 'ai-infra-conversion', question: 'AI 资本开支是否已稳定转化为芯片收入、设备交付与更广泛的供应链订单？',
    linkedNewsIds: ['broadcom-ai-q3', 'semi-equipment-q2'], industries: ['人工智能与算力', '芯片制造与器件', '通信与数据中心'],
    factStatus: '已确认', thesisStatus: '初步佐证', priority: 3,
    currentJudgment: 'Broadcom 财务实绩与 SEMI 设备销售提供两层支持，但客户集中度、库存和新增产能利用率仍决定趋势能否持续。',
    methods: [
      { task: '交叉核对芯片收入、设备交付和云厂商资本开支', metric: 'AI 芯片收入、设备销售、订单积压、资本开支与预付款', sourceTypes: ['公司财报', '行业统计', '监管文件'], completion: '进行中' },
      { task: '验证上游扩产是否转成可用产能', metric: '产能利用率、良率、HBM 与封装交期、取消订单', sourceTypes: ['客户案例', '公司财报', '市场数据'], completion: '未开始' },
    ],
    supportSignals: ['多家供应商连续确认收入和订单增长', '设备交付后良率爬坡并带来实际新增供给'],
    refuteSignals: ['增长高度依赖单一客户且订单取消', '设备销售上升但利用率、出货或终端需求恶化'],
    updates: [{ date: '2026-09-04', summary: 'Broadcom 报告单季 AI 半导体收入 167 亿美元；SEMI 同时报告全球设备季度销售 405.3 亿美元并连续第二季创新高。', direction: '支持', evidenceType: '市场数据', sourceName: 'Broadcom / SEMI', url: 'https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial' }],
    nextCheck: { date: '2026-09-12', task: '核对 Broadcom 监管文件与主要代工、存储和设备企业的新订单信息', trigger: '出现客户集中度、交付取消、产能利用率或真实供给变化时调整判断' },
    lastChangedAt: '2026-09-04',
  },
  {
    id: 'drone-tariff-impact', question: '美国无人机新关税会多快传导到整机与关键部件的价格、库存和供应地？', linkedNewsIds: ['us-drone-tariffs'],
    industries: ['汽车交通与航天', '机器人与先进制造', '嵌入式与物联网'], factStatus: '已确认', thesisStatus: '待验证', priority: 3,
    currentJudgment: '税率和生效时间已经确认，但渠道库存可能延缓零售价变化，不同编码的实际执行仍需清关数据。',
    methods: [
      { task: '记录代表性整机与部件的美国到岸价和现货库存', metric: '同型号含税价、库存天数、缺货率和交付周期', sourceTypes: ['海关执行文件', '渠道价格', '进口数据'], completion: '进行中' },
      { task: '跟踪供应商原产地与组装地点变化', metric: '供应商迁移、美国本地组装、HTS 编码裁定', sourceTypes: ['公司公告', '海关裁定', '客户案例'], completion: '未开始' },
    ],
    supportSignals: ['代表性产品含税价和交期持续上升', '供应商迁移原产地或新增本地组装'],
    refuteSignals: ['豁免或编码解释大幅缩小适用范围', '库存和替代供应吸收关税且终端价格稳定'],
    updates: [{ date: '2026-09-03', summary: '美国海关开始执行无人机系统和指定部件的第 232 条关税，税率按产品和原产地分层。', direction: '支持', evidenceType: '官方文件', sourceName: '美国海关与边境保护局', url: 'https://content.govdelivery.com/accounts/USDHSCBP/bulletins/4281ea7' }],
    nextCheck: { date: '2026-09-12', task: '抽样核对 FPV、飞控、电机、电调和整机的含税价与库存', trigger: '首批清关数据或渠道连续调价出现时更新判断' },
    lastChangedAt: '2026-09-03',
  },
  {
    id: 'power-safety-compliance', question: '新版电力安全条例会形成哪些可执行的储能、分布式发电和并网设备改造要求？', linkedNewsIds: ['china-power-safety-rule'],
    industries: ['能源电网与电池', '芯片制造与器件', '嵌入式与物联网'], factStatus: '已确认', thesisStatus: '待验证', priority: 3,
    currentJudgment: '法规扩大责任范围已经确认，但尚不能据此推断具体设备增量；需要等待标准、检查清单和预算。',
    methods: [
      { task: '收集配套标准、地方实施细则和首批检查清单', metric: '新增功能要求、整改期限、抽查范围与处罚案例', sourceTypes: ['主管部门文件', '国家与行业标准', '执法通报'], completion: '进行中' },
      { task: '核对项目设计与设备采购是否新增安全条款', metric: '保护、监测、日志、通信和应急设备采购量', sourceTypes: ['招标文件', '客户案例', '公司订单'], completion: '未开始' },
    ],
    supportSignals: ['配套标准提出新增硬件或测试要求', '招标和整改预算明确增加相关设备'],
    refuteSignals: ['实施主要依靠既有流程且不新增设备', '地方检查长期没有具体整改或处罚'],
    updates: [{ date: '2026-09-04', summary: '新版条例公布并明确 2027 年 1 月 1 日施行，将更多并网主体纳入安全责任体系。', direction: '中性', evidenceType: '官方文件', sourceName: '国家能源局', url: 'https://www.nea.gov.cn/20260904/2165aeebb935486cb20e8b560414bed0/c.html' }],
    nextCheck: { date: '2026-09-19', task: '检查配套标准、地方执行通知和电网招标技术条款', trigger: '出现可量化整改要求、检查结果或设备采购时更新判断' },
    lastChangedAt: '2026-09-04',
  },
  {
    id: 'cybercab-certification', question: 'Cybercab 审计是否会发现实质性不符合项，并迫使车辆或认证流程发生变化？', linkedNewsIds: ['nhtsa-cybercab-audit'],
    industries: ['汽车交通与航天', '人工智能与算力', '芯片设计与工具'], factStatus: '已确认', thesisStatus: '待验证', priority: 3,
    currentJudgment: '监管审计已经启动，但审计本身不证明违规；需要等待正式材料、企业答复和执法结论。',
    methods: [
      { task: '跟踪审计卷宗、Tesla 答复和监管决定', metric: '具体不符合项、补充材料、整改、罚款或召回', sourceTypes: ['监管卷宗', '公司文件', '执法公告'], completion: '进行中' },
      { task: '对照实际车辆和软件版本寻找设计变化', metric: '传感器、控制冗余、座舱结构、日志与软件版本变化', sourceTypes: ['实物产品', '独立测试', '认证文件'], completion: '未开始' },
    ],
    supportSignals: ['监管列出具体不符合项或要求整改', '量产车硬件、软件或认证流程因审计发生变化'],
    refuteSignals: ['审计结束且未发现实质问题', '证据完整并证明现有设计符合适用标准'],
    updates: [{ date: '2026-09-04', summary: 'NHTSA 在 Cybercab 无车内安全员商业部署后启动自我认证审计，尚未作出违规结论。', direction: '中性', evidenceType: '官方文件', sourceName: '美国国家公路交通安全管理局', url: 'https://www.nhtsa.gov/press-releases/investigation-tesla-cybercab-self-certification' }],
    nextCheck: { date: '2026-09-19', task: '检查监管卷宗、Tesla 正式答复及车辆版本变化', trigger: '出现具体不符合项、整改要求、执法决定或实物变化时更新判断' },
    lastChangedAt: '2026-09-04',
  },
];
