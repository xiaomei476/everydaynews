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

export type LearningAnalysis = {
  core: string[];
  logic: {
    evidence: string;
    actor: string;
    position: '上游' | '中游' | '下游' | '规则端';
    mechanism: string;
    direction: string;
  }[];
  background: {
    term: string;
    explanation: string;
    relevance: string;
  }[];
  watch: {
    item: string;
    signal: string;
    meaning: string;
  }[];
};

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
  analysis: LearningAnalysis;
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
  updatedAt: '北京时间 21:00 更新',
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
  { value: 'all', label: '本期 · 72 小时', count: 12 },
  { value: '2026-09-05', label: '09.05', count: 0 },
  { value: '2026-09-04', label: '09.04', count: 9 },
  { value: '2026-09-03', label: '09.03', count: 3 },
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
    analysis: {
      core: [
        'Broadcom 已经把一部分云厂商的 AI 建设预算转化为本季度确认的芯片收入，167 亿美元是已交付并计入财报的结果。',
        '收入来自定制 AI 加速器和数据中心网络芯片，不只是通用 GPU。',
        '第四季度 217 亿美元仍是管理层预测，不能与本季度实绩放在同一证据等级。',
      ],
      logic: [
        { evidence: 'AI 半导体收入同比增长 221%', actor: 'Broadcom、代工厂、HBM 与封装供应商', position: '中游', mechanism: '云厂商订单已进入芯片交付，芯片公司会向晶圆、存储和封装环节追加采购。', direction: '已确认的订单传导增强，上述供应商短期受益。' },
        { evidence: 'AI 收入已占总营收的一半以上', actor: 'Broadcom 与主要云客户', position: '下游', mechanism: '收入更依赖少数大型客户后，客户推迟项目或改变自研路线会更快影响供应商。', direction: '增长更强，但客户集中风险同步上升。' },
        { evidence: '下一季度指引继续上调', actor: '晶圆、HBM、先进封装与高速网络厂商', position: '上游', mechanism: '若指引兑现，新增需求会继续占用有限的先进制程、堆叠存储和封装产能。', direction: '可能继续拉长交期；目前仍是待验证判断。' },
      ],
      background: [
        { term: 'ASIC', explanation: '为特定任务定制的芯片。这里指云厂商针对 AI 训练或推理设计、由 Broadcom 协助实现的加速器。', relevance: '它说明 AI 算力市场不只有通用 GPU，一部分需求正在转向客户自研芯片。' },
        { term: 'HBM', explanation: '高带宽存储器，把多层存储芯片堆叠在一起，为 AI 芯片持续提供大量数据。', relevance: '算力芯片增加时，HBM 容量、良率和封装常会成为共同瓶颈。' },
        { term: '先进封装', explanation: '把计算芯片、HBM 等多个裸片高密度连接在同一封装中的制造环节。', relevance: '芯片设计完成不等于可以出货，封装产能不足仍会限制交付量。' },
        { term: '业绩指引', explanation: '公司对下一季度收入或利润的预测，不是已经发生的收入。', relevance: '判断趋势时要把财报实绩与管理层预测分开。' },
      ],
      watch: [
        { item: '第四季度实际 AI 收入', signal: '是否达到 217 亿美元指引', meaning: '达到说明订单继续转成出货；明显低于指引则要检查延期或客户集中风险。' },
        { item: '客户集中度', signal: '前几大客户收入占比与单一项目变化', meaning: '集中度继续升高会让增长对少数云厂商资本开支更敏感。' },
        { item: 'HBM 与先进封装交期', signal: '交期、利用率、扩产和取消订单', meaning: '交期仍长且取消率低，才能支持供应链需求持续偏紧的判断。' },
      ],
    },
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
    analysis: {
      core: [
        '晶圆厂在 2026 年第二季度实际接收并付款的半导体设备达到 405.3 亿美元，销售额连续第二季创新高。',
        '设备先于新增芯片产能投入生产，因此它是未来供给变化的领先信号。',
        '设备到厂后还要安装、调试并提高良率，纪录销售并不等于芯片会立刻增产或降价。',
      ],
      logic: [
        { evidence: '设备销售同比增长 23%、环比增长 11%', actor: '光刻、沉积、刻蚀、检测设备商', position: '上游', mechanism: '晶圆厂扩产先采购生产设备，设备商比芯片终端更早确认收入。', direction: '设备订单与交付处于扩张阶段。' },
        { evidence: '动力集中在先进逻辑与存储投资', actor: '先进制程晶圆厂、存储厂与封装厂', position: '中游', mechanism: 'AI 芯片需要先进逻辑、HBM 和复杂封装，资本开支向这些瓶颈集中。', direction: '高端产能扩张快于成熟制程，但不同品类不能一概而论。' },
        { evidence: '销售额只记录设备交付', actor: 'GPU、存储与开发板买家', position: '下游', mechanism: '设备需要经过厂房配套、工艺验证和良率爬坡，才能变成可出售的芯片。', direction: '对终端供给是中期改善信号，不是即时降价信号。' },
      ],
      background: [
        { term: '资本开支', explanation: '企业购买厂房、设备等长期资产的支出。晶圆厂买设备属于资本开支，不是日常材料费用。', relevance: '它显示企业愿意为未来产能投入真金白银，但不能保证最终需求一定存在。' },
        { term: '良率爬坡', explanation: '新生产线从大量次品逐步调整到稳定产出合格芯片的过程。', relevance: '设备安装完成后，良率决定新增产能能否形成可卖产品。' },
        { term: '领先指标', explanation: '通常早于目标结果发生、可用于观察未来方向的数据。', relevance: '设备销售领先于晶圆产出，但领先时间和传导强度需要继续验证。' },
      ],
      watch: [
        { item: '设备订单积压与取消率', signal: '积压订单继续增长且取消较少', meaning: '说明扩产计划仍在执行；取消增加可能表示需求预期转弱。' },
        { item: '新增产线利用率与良率', signal: '投产后的稼动率、良率和合格晶圆数', meaning: '这些指标改善后，设备交付才真正转为芯片供给。' },
        { item: '设备类别与地区明细', signal: '先进逻辑、存储、成熟制程各自增速', meaning: '可判断扩产集中在哪条产业链，避免用总额推断所有芯片都景气。' },
      ],
    },
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
    analysis: {
      core: [
        'PAIR 可以把局域网内多台 RTX、DGX Spark 或 Apple M4 设备登记为多个本地推理节点。',
        '它把彼此独立的请求分发给空闲节点，提高多任务并发量。',
        '它不会把多台机器的显存合并，所以单个装不下的模型仍然不能因此运行。',
      ],
      logic: [
        { evidence: '软件免费开源并兼容 Ollama、LM Studio', actor: '个人开发者与小团队', position: '下游', mechanism: '已有设备可被统一调度，减少重新购买服务器或为部分任务调用云接口。', direction: '本地多任务实验门槛下降。' },
        { evidence: '厂商测试吞吐最高提升 1.9 倍', actor: '局域网、节点调度与设备厂商', position: '中游', mechanism: '多个独立请求并行处理时，空闲 GPU 被更充分利用；网络和调度开销会抵消部分收益。', direction: '并发吞吐可能提高，单次请求延迟未必降低。' },
        { evidence: '不支持显存合并', actor: '需要运行大模型的用户', position: '下游', mechanism: '每个请求仍必须完整装入某一台机器的内存或显存。', direction: '适合请求池，不是分布式大模型训练或张量并行方案。' },
      ],
      background: [
        { term: '推理', explanation: '把已经训练好的模型加载到设备上，根据输入生成结果的运行过程。', relevance: 'PAIR 调度的是推理请求，不负责训练模型。' },
        { term: '吞吐量', explanation: '单位时间内完成的请求数量。', relevance: '多台机器可提高同时处理任务的总量，但单个任务不一定更快。' },
        { term: '显存', explanation: 'GPU 自带的高速内存，用来存放模型参数和运行时数据。', relevance: 'PAIR 不合并显存，因此最大模型大小仍受单台设备限制。' },
        { term: '异构调度', explanation: '在性能和架构不同的设备之间分配任务。', relevance: 'RTX 与 M4 速度、内存和软件栈不同，调度策略决定实际利用率。' },
      ],
      watch: [
        { item: '独立性能测试', signal: '同一批提示词下的吞吐、延迟、功耗', meaning: '只有同时记录三项，才能判断多节点是否比单机或云端更划算。' },
        { item: '故障恢复', signal: '节点掉线、请求重试和结果重复率', meaning: '故障时能否稳定恢复决定它是否可用于长期服务。' },
        { item: '鉴权与加密', signal: '节点身份校验、传输加密和访问日志', meaning: '局域网中的其他设备能否伪装节点或读取请求，是实际部署的安全边界。' },
      ],
    },
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
    analysis: {
      core: [
        '新版行政法规把更多分布式发电、储能和其他并网主体纳入电力安全责任体系。',
        '责任包括服从调度、执行技术标准、排查风险、进行应急演练和完成整改评价。',
        '法规将在 2027 年 1 月 1 日施行，但具体需要增加哪些硬件仍要看配套标准和执法文件。',
      ],
      logic: [
        { evidence: '安全责任覆盖范围扩大', actor: '储能站、分布式电源与数据中心等并网主体', position: '下游', mechanism: '安全要求由项目建议变为可追责义务，项目方需要留下设计、运行和整改证据。', direction: '合规与运维工作量上升。' },
        { evidence: '要求统一调度、风险排查和应急处置', actor: '保护控制、监测、通信与测试设备商', position: '中游', mechanism: '如果配套标准新增测量、隔离、日志或远程控制要求，项目方需要采购或改造设备。', direction: '可能增加设备需求，但目前还不能从法规直接推导订单。' },
        { evidence: '生效日期明确但技术细则未齐', actor: '电网公司、监管部门与项目业主', position: '规则端', mechanism: '标准、检查表、招标条款和处罚案例会把原则性法规转成可执行要求。', direction: '真正的产业影响取决于后续执行强度。' },
      ],
      background: [
        { term: '并网主体', explanation: '把发电、储能或用电设施接入公共电网并与其交换电能的单位。', relevance: '接入电网后，设备故障可能影响更大范围，因此要承担统一的安全义务。' },
        { term: '继电保护', explanation: '检测短路、过流等异常并快速切断故障部分的保护系统。', relevance: '若新标准提高故障检测和隔离要求，保护装置、传感器和测试需求会变化。' },
        { term: '统一调度', explanation: '由电网调度机构统一下发运行指令，以维持频率、电压和供需平衡。', relevance: '储能控制器不能只按本地策略工作，还要满足通信和调度接口要求。' },
      ],
      watch: [
        { item: '配套技术标准', signal: '是否新增采样精度、保护动作、日志或通信要求', meaning: '出现明确功能参数后，才能判断哪些器件和设备产生增量需求。' },
        { item: '招标与整改清单', signal: '新增设备数量、预算与交付时间', meaning: '它能把政策影响从原则判断升级为真实订单。' },
        { item: '首批执法案例', signal: '被认定的问题、整改期限和处罚依据', meaning: '可确认地方执行是否严格，以及项目方最先补哪一类能力。' },
      ],
    },
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
    analysis: {
      core: [
        'Cybercab 开始无车内安全员的商业服务后，美国监管机构启动了车辆自我认证审计。',
        '审计要求 Tesla 证明整车符合适用的联邦安全标准，并提供可追溯的测试与认证材料。',
        '启动审计只表示进入强制核验，不表示监管机构已经认定违规。',
      ],
      logic: [
        { evidence: '审查对象是整车自我认证', actor: 'Tesla 与自动驾驶整车厂', position: '中游', mechanism: '企业不仅要证明算法能行驶，还要证明转向、制动、座舱、软件更新等整车系统符合规则。', direction: '上市所需证据和验证成本上升。' },
        { evidence: '车辆没有车内安全员', actor: '制动、转向、传感器与车载计算供应商', position: '上游', mechanism: '人工接管路径减少后，单点故障需要由冗余硬件、故障降级和日志证据覆盖。', direction: '安全关键部件和验证工具的重要性提高。' },
        { evidence: '当前没有违规结论', actor: '监管部门、运营商与乘客', position: '规则端', mechanism: '只有具体不符合项、整改或执法决定才会改变车辆配置或部署节奏。', direction: '现阶段应标记为监管风险，而不是确定性利空。' },
      ],
      background: [
        { term: '自我认证', explanation: '车企自行确认车辆符合联邦安全标准，并对提交结果负责；监管机构可事后抽查和执法。', relevance: '审计核查的是企业证据是否足以支撑这项声明。' },
        { term: '功能安全', explanation: '当电子电气系统发生故障时，系统仍能避免不可接受风险的一套设计与验证方法。', relevance: '自动驾驶的传感、计算和执行器失效都需要预先定义安全响应。' },
        { term: '冗余', explanation: '为关键功能准备独立的备用路径，例如双路供电、传感或制动控制。', relevance: '没有安全员时，备用路径是否真正独立会成为审查重点。' },
      ],
      watch: [
        { item: '监管卷宗与企业答复', signal: '是否列出具体不符合项或补充材料要求', meaning: '具体问题出现后，才能定位受影响的硬件、软件和测试环节。' },
        { item: '量产车版本变化', signal: '传感器、制动转向、座舱与软件版本变更', meaning: '实物或软件变化可证明审计开始传导到产品设计。' },
        { item: '最终执法结果', signal: '整改、罚款、召回或审计结束', meaning: '它决定影响是短期材料补充还是长期认证门槛变化。' },
      ],
    },
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
    analysis: {
      core: [
        'USA Rare Earth 已完成对巴西 Serra Verde 的控制权交易，获得一处已开始生产的稀土资源。',
        '公司计划把矿山、稀土氧化物、合金和永磁体连接成一条受其控制的供应链。',
        '并购已经完成，但二期产能、分离纯度和下游磁体订单仍是未来目标。',
      ],
      logic: [
        { evidence: '获得在产矿山控制权', actor: '稀土开采与分离企业', position: '上游', mechanism: '控制资源可降低原料依赖，但矿石仍要经过分离、提纯才能用于磁体。', direction: '原料保障增强，不等于高性能磁材立即增产。' },
        { evidence: '计划延伸到合金和永磁体', actor: '磁体、电机与机器人厂商', position: '中游', mechanism: '纵向整合减少跨公司采购环节，并可能提高原料去向的可控性。', direction: '若产能和质量兑现，供应来源会增加；现阶段仍需验证。' },
        { evidence: '二期目标仍在调试计划中', actor: '无人机、汽车与工业设备客户', position: '下游', mechanism: '产量、纯度、良率和客户认证任何一项延迟，都会推迟磁体实际供给。', direction: '不能把规划吨数直接计入可用供应。' },
      ],
      background: [
        { term: '稀土氧化物', explanation: '稀土矿经过选矿、分离和提纯后形成的中间原料，之后还需制成金属、合金和磁体。', relevance: '新闻中的吨数不是电机可直接使用的永磁体吨数。' },
        { term: '永磁体', explanation: '无需持续供电就能保持磁性的材料，高性能电机常使用钕铁硼磁体。', relevance: '它直接影响电机的体积、转矩、效率和耐温能力。' },
        { term: '纵向整合', explanation: '同一家公司控制从上游原料到下游产品的多个生产环节。', relevance: '它可能提高供应稳定性，也会增加建设资金和运营复杂度。' },
      ],
      watch: [
        { item: '实际产量与纯度', signal: '季度产量、回收率和可销售产品规格', meaning: '达到稳定规格才表示矿山产能能进入下游制造。' },
        { item: '二期资本开支与调试', signal: '设备安装、预算变化和投产日期', meaning: '延迟或超支会削弱规划产能的可信度。' },
        { item: '磁体客户订单', signal: '具名客户、认证完成和可核验合同', meaning: '真实订单可证明材料质量和价格已经被下游接受。' },
      ],
    },
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
    analysis: {
      core: [
        'FDA 同时批准了一种乳腺癌用药方案和与之配套的血液检测方法。',
        '检测在血液中发现 ESR1 耐药突变后，可在影像确认肿瘤进展之前触发换药决策。',
        '本次采用加速批准路径，长期临床获益还要由验证性试验确认。',
      ],
      logic: [
        { evidence: '血液突变结果可以触发换药', actor: '测序平台、检测试剂与临床实验室', position: '中游', mechanism: '诊断结果从辅助信息变为治疗入口，需要稳定的样本处理、测序和算法判读。', direction: '伴随诊断的检测量和质量要求提高。' },
        { evidence: '无进展生存期为 16.0 个月对 9.2 个月', actor: '患者、医生与药企', position: '下游', mechanism: '若检测能更早发现耐药，医生可以提前切换药物并延长疾病未恶化时间。', direction: '支持临床采用，但不能直接等同于总体寿命延长。' },
        { evidence: '采用加速批准', actor: '药企、检测公司与监管机构', position: '规则端', mechanism: '监管允许基于中间终点先上市，同时要求后续试验确认真实获益。', direction: '商业化已经开始，结论仍可能被后续证据调整。' },
      ],
      background: [
        { term: 'ctDNA', explanation: '肿瘤细胞释放到血液中的短 DNA 片段，可以通过抽血检测其中的突变。', relevance: '它让医生有机会在影像变化之前发现耐药信号。' },
        { term: '伴随诊断', explanation: '用来判断患者是否适合某种特定药物的获批检测。', relevance: '检测结果会直接影响能否使用本条新闻中的治疗方案。' },
        { term: '无进展生存期', explanation: '从治疗开始到疾病恶化或死亡的时间，不等于患者总体寿命。', relevance: '它是本次批准的关键疗效指标，但仍需观察总体生存获益。' },
        { term: '加速批准', explanation: '监管基于可较早获得的指标允许药物先上市，同时要求完成验证性试验。', relevance: '批准是事实，长期获益仍有撤回或修正的可能。' },
      ],
      watch: [
        { item: '验证性试验', signal: '总体生存期和长期不良反应', meaning: '确认获益后判断才能升级；失败可能导致适应证调整。' },
        { item: '检测性能', signal: '检测下限、灵敏度、特异度和假阳性率', meaning: '性能不稳定会导致错误换药，限制真实临床使用。' },
        { item: '真实采用与支付', signal: '医院检测量、医保或商业保险覆盖', meaning: '只有医生实际开检且费用可支付，技术价值才会转成稳定需求。' },
      ],
    },
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
    analysis: {
      core: [
        '联合国粮农组织的全球食品价格指数在 8 月升至 133.3 点，环比上涨 1.9%。',
        '五个主要食品类别同时上涨，其中糖的月度涨幅最大。',
        '这是全球大宗食品原料价格的加权指数，不是任何一个国家超市零售价的直接涨幅。',
      ],
      logic: [
        { evidence: '五个分项同步上涨', actor: '农产品贸易商与食品加工企业', position: '上游', mechanism: '多类原料同时变贵，会提高采购和库存占用成本。', direction: '成本压力比单一品种上涨更广，但持续性仍需观察。' },
        { evidence: '糖价环比上涨 11.9%', actor: '饮料、烘焙和加工食品企业', position: '中游', mechanism: '高用量企业先消耗低价库存，再按新价格补库，成本传导存在时间差。', direction: '相关品类利润可能先受压，随后才可能调价。' },
        { evidence: '指数与零售价不是同一口径', actor: '零售商与消费者', position: '下游', mechanism: '加工、包装、运输、汇率和当地竞争共同决定终端售价。', direction: '不能用 1.9% 直接推算消费者通胀。' },
      ],
      background: [
        { term: '价格指数', explanation: '把多种商品价格按固定权重合成的相对数值，用于观察总体方向。', relevance: '133.3 点本身不是价格，重要的是与上月、上年和各分项比较。' },
        { term: '成本传导', explanation: '上游原料涨价经过加工、库存、运输和零售后影响终端价格的过程。', relevance: '传导可能被库存和企业利润吸收，也可能延迟数月。' },
        { term: '库存周期', explanation: '企业先使用已有库存，再按当前价格补货的经营节奏。', relevance: '它决定本月原料涨价何时进入企业成本和商品售价。' },
      ],
      watch: [
        { item: '连续三个月分项走势', signal: '糖、植物油、谷物是否持续同向上涨', meaning: '连续上涨比单月波动更能支持广泛成本压力的判断。' },
        { item: '产区供给与库存', signal: '天气、库存消费比和出口限制', meaning: '供给恢复会削弱上涨，库存下降和出口收紧则可能延长行情。' },
        { item: '海运与本地零售数据', signal: '运价、加工企业毛利和食品零售价', meaning: '可确认全球原料变化是否已经传导到具体市场。' },
      ],
    },
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
    analysis: {
      core: [
        '美国 8 月非农就业初值增加 16.2 万，失业率为 4.1%。',
        '制造业就业增加 1.6 万，信息行业减少 2.3 万，两个分项方向相反。',
        '这是单月初值并会修订，只能说明当前岗位结构分化，不能单独证明 AI 替代就业或电子行业景气。',
      ],
      logic: [
        { evidence: '制造业就业增加 1.6 万', actor: '制造企业与劳动力市场', position: '中游', mechanism: '企业在订单、产能和人员需求改善时可能增加招聘，但就业通常晚于订单变化。', direction: '对制造活动是弱支持信号，需要订单和工时交叉验证。' },
        { evidence: '信息行业就业减少 2.3 万', actor: '软件、数据处理与托管企业', position: '下游', mechanism: '岗位减少可能来自效率提升、企业重组或需求变化，行业统计不能区分具体原因。', direction: '说明就业承压，但不能直接归因于 AI。' },
        { evidence: '总量仍增加且数据可修订', actor: '企业融资与资本开支决策', position: '规则端', mechanism: '就业和工资会影响利率预期与企业成本，随后才可能间接影响设备和软件预算。', direction: '宏观数据到电子订单的传导较弱，不能作为单独买卖或行业结论。' },
      ],
      background: [
        { term: '非农就业', explanation: '美国除农业等少数行业外的受薪岗位变化，是月度劳动力市场指标。', relevance: '它覆盖面广，但不能直接代表某个电子细分行业。' },
        { term: '初值与修订', explanation: '首次公布的数据基于不完整样本，之后会随着更多企业回报而调整。', relevance: '判断趋势时应看修订结果和三个月平均，而非只看一个 headline 数字。' },
        { term: '平均工时', explanation: '员工每周工作时长，企业常先调整工时，再决定增加或减少人员。', relevance: '它可能比就业人数更早显示制造订单强弱。' },
      ],
      watch: [
        { item: '后续两次修订', signal: '16.2 万是否被持续上调或下调', meaning: '大幅下修会改变对就业韧性的判断。' },
        { item: '制造业工时与新订单', signal: '加班、采购经理新订单和职位空缺', meaning: '三者同步改善时，制造招聘才更可能对应真实需求。' },
        { item: '企业资本开支', signal: '设备、软件和数据中心预算', meaning: '资本开支比岗位数量更直接连接电子设备与芯片订单。' },
      ],
    },
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
    analysis: {
      core: [
        'OpenAI 把 GPT-6 Astra 的网络安全能力评为 Preparedness Framework 的 Critical 级别。',
        '公司披露了 54,000 多项内部任务和相应的监测、权限控制措施。',
        '评级与任务结果来自模型提供方，尚不能等同于独立团队已复现真实攻击或企业部署成本已经上升。',
      ],
      logic: [
        { evidence: '模型可以完成更多高风险网络任务', actor: '部署智能体的企业与开发团队', position: '下游', mechanism: '智能体能调用浏览器、终端和代码工具后，可接触的凭据与系统数量增加。', direction: '潜在攻击面扩大。' },
        { evidence: '约一半内部任务触发高严重度告警', actor: '身份权限、沙箱与审计工具供应商', position: '中游', mechanism: '企业需要限制工具权限、隔离执行环境、记录操作并设置人工确认。', direction: '安全控制可能从附加功能变为部署前提。' },
        { evidence: '数据主要来自厂商内部评估', actor: '安全研究者与采购方', position: '规则端', mechanism: '外部复现率、误报率和实际运维工时决定额外成本是否显著。', direction: '能力风险已被厂商确认，成本结论仍待独立证据。' },
      ],
      background: [
        { term: '智能体', explanation: '能规划步骤并调用文件、浏览器、终端或外部服务完成任务的模型系统。', relevance: '风险来自模型能执行操作，而不只是生成文本。' },
        { term: '最小权限', explanation: '只给程序完成当前任务所必需的最少访问范围和最短有效时间。', relevance: '即使智能体判断错误，可造成的影响也会被权限边界限制。' },
        { term: '沙箱', explanation: '与主系统隔离的运行环境，用来限制程序可访问的文件、网络和设备。', relevance: '它降低恶意命令或误操作影响真实账号和主机的概率。' },
        { term: '红队测试', explanation: '由安全人员主动设计攻击任务，寻找系统可被滥用或绕过的路径。', relevance: '独立红队结果能检验厂商内部评级是否可复现。' },
      ],
      watch: [
        { item: '独立红队复现', signal: '任务成功率、绕过率与严重告警', meaning: '外部团队可重复得到相近结果时，风险判断更可靠。' },
        { item: '企业控制成本', signal: '人工审批次数、隔离层级和运维工时', meaning: '它能确认更强模型是否真的提高部署总成本。' },
        { item: '真实事故与漏洞披露', signal: '工具调用日志、受影响系统和根因', meaning: '真实事件比厂商评级更能确定最需要补强的权限边界。' },
      ],
    },
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
    analysis: {
      core: [
        '欧盟理事会通过了海关改革的一读立场，拟让电商平台承担进口申报和合规责任。',
        '方案还包括统一数据枢纽、严重违法罚则和小包裹处理费。',
        '这仍不是最终生效法律，欧洲议会、最终文本和具体费用尚待确定。',
      ],
      logic: [
        { evidence: '平台拟成为进口责任主体', actor: '跨境电商平台', position: '中游', mechanism: '平台需要收集商品编码、原产地和合规文件，并承担错误申报风险。', direction: '平台的数据与审核成本上升。' },
        { evidence: '严重违法罚则与处理费被纳入方案', actor: '电子零件卖家', position: '上游', mechanism: '平台可能提高入驻要求、减少缺少材料的商品或把费用转给卖家。', direction: '低价、小批量和文件不完整的 SKU 更容易退出欧盟市场。' },
        { evidence: '改革尚未完成立法', actor: '欧盟买家与电子爱好者', position: '下游', mechanism: '最终费用、范围和平台执行方式决定零件价格与可得性。', direction: '目前可提前整理资料，但不应把拟议规则当成已经实施。' },
      ],
      background: [
        { term: '进口责任主体', explanation: '在海关记录中对申报、税费和商品合规承担法律责任的一方。', relevance: '责任转给平台后，平台会更严格要求卖家提交可核验数据。' },
        { term: '商品编码', explanation: '海关用来识别产品类别并确定税率和监管要求的分类编号。', relevance: '同一块开发板上的模块、整机和零件可能适用不同编码。' },
        { term: '一读立场', explanation: '立法机构在首轮程序中形成的文本立场，后续仍可能协商和修改。', relevance: '新闻确认的是立法进展，不是最终生效内容。' },
        { term: '合规文件', explanation: '证明产品满足安全、环保、材料和标识要求的数据与声明。', relevance: '电子产品常涉及 CE、RoHS、说明书和可追溯信息。' },
      ],
      watch: [
        { item: '最终立法文本', signal: '欧洲议会结果、生效时间与适用范围', meaning: '决定哪些平台、卖家和商品真正受约束。' },
        { item: '小包裹处理费', signal: '金额、计费单位和豁免条件', meaning: '可直接估算低价元器件订单的成本变化。' },
        { item: '平台卖家规则', signal: '新增资料字段、审核周期和下架比例', meaning: '平台规则变化是法规向商品可得性传导的早期证据。' },
      ],
    },
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
    analysis: {
      core: [
        '美国海关已开始按第 232 条措施对无人机系统和指定关键部件征收新关税。',
        '税率取决于产品类别、功能、重量、原产地和海关编码，部分项目为 100%，多数小型非热成像无人机通常为 25%。',
        '政策已经生效，但现有渠道库存可能让零售价晚于清关成本变化。',
      ],
      logic: [
        { evidence: '关税在进口清关时直接计入', actor: '进口商与渠道商', position: '中游', mechanism: '到岸成本提高后，渠道可选择涨价、压缩利润、消耗旧库存或更换供应地。', direction: '短期价格变化取决于库存，长期成本压力更明确。' },
        { evidence: '税率按编码和功能分层', actor: '整机、电机、电调、飞控和图传供应商', position: '上游', mechanism: '不同部件可能落入不同编码，企业需要逐项重新分类和核算。', direction: '产品组合和申报复杂度上升，不能用单一税率概括全部零件。' },
        { evidence: '部分税率高达 100%', actor: '美国本地组装商与替代供应商', position: '下游', mechanism: '高税率削弱特定进口产品的价格优势，促使采购转向其他来源或本地组装。', direction: '替代供应可能受益，但要看产能、性能和认证能否满足需求。' },
      ],
      background: [
        { term: '第 232 条', explanation: '美国以国家安全为理由调整特定进口产品的贸易措施。', relevance: '它是本次无人机及部件关税的法律依据。' },
        { term: 'HTS 编码', explanation: '美国海关用于商品分类和确定税率的编码体系。', relevance: '飞控、电机、整机与带热成像功能的设备可能对应不同税率。' },
        { term: '原产地规则', explanation: '判断商品在贸易上属于哪个国家或地区的规则，不一定等同于最后发货地。', relevance: '仅改变转运地点通常不能改变关税待遇。' },
        { term: '到岸成本', explanation: '商品采购价加运输、保险、关税和清关等费用后的实际进口成本。', relevance: '渠道是否涨价取决于到岸成本和现有库存，而不只看出厂价。' },
      ],
      watch: [
        { item: '首批清关记录与海关裁定', signal: '实际采用的编码、税率与争议处理', meaning: '可确认政策文本在具体产品上怎样执行。' },
        { item: '同型号价格与库存', signal: '含税价、缺货率和交期连续变化', meaning: '库存消耗后仍持续涨价，才说明关税已传导到终端。' },
        { item: '供应地与组装地变化', signal: '新供应商、本地组装和长期采购合同', meaning: '这些变化能确认企业是否在重构供应链，而非暂时吸收成本。' },
      ],
    },
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

