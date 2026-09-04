'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  briefDates,
  briefMeta,
  industryCatalog,
  news,
  signals,
  verificationTracks,
  type Channel,
  type NewsItem,
  type NewsType,
  type Region,
  type VerificationTrack,
} from './news-data';

const regions: Array<'全部' | Region> = ['全部', '中国', '美国', '欧洲', '日韩', '全球'];
const newsTypes: Array<'全部' | NewsType> = ['全部', '技术发布', '产业动作', '政策规则', '经济数据'];

const sectorTone: Record<Channel, string> = {
  人工智能与算力: 'tone-ai',
  芯片设计与工具: 'tone-chip-design',
  芯片制造与器件: 'tone-chip-fab',
  嵌入式与物联网: 'tone-embedded',
  消费电子与显示: 'tone-consumer',
  通信与数据中心: 'tone-cloud',
  机器人与先进制造: 'tone-industry',
  汽车交通与航天: 'tone-mobility',
  能源电网与电池: 'tone-energy',
  生物医药与医疗科技: 'tone-health',
  农业食品与物流: 'tone-agri',
  宏观贸易与规则: 'tone-macro',
};

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function Importance({ value }: { value: number }) {
  return (
    <span className="importance" aria-label={'重要度 ' + value + ' / 5'}>
      {Array.from({ length: 5 }, (_, index) => (
        <i className={index < value ? 'active' : ''} key={index} />
      ))}
    </span>
  );
}

function StoryCard({
  item,
  rank,
  saved,
  read,
  onSave,
  onRead,
  onTrack,
}: {
  item: NewsItem;
  rank: number;
  saved: boolean;
  read: boolean;
  onSave: () => void;
  onRead: () => void;
  onTrack: () => void;
}) {
  const tone = sectorTone[item.channel];

  return (
    <article
      className={'story-card ' + tone + (read ? ' is-read' : '')}
      id={'news-' + item.id}
    >
      <div className="story-card-body">
        <div className="story-topline">
          <span className="story-rank">{String(rank).padStart(2, '0')}</span>
          <span className={'sector-chip ' + tone}>{item.channel}</span>
          <span className={'status status-' + item.status}>{item.status}</span>
          <span className="story-date">{item.date}</span>
          <span className="region-meta">来源地区：{item.region}</span>
        </div>

        <div className="keyword-row" aria-label="关键词">
          {item.tags.slice(0, 4).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="story-heading">
          <div>
            <p className="story-kicker">
              {item.subcategory} · {item.type}
              {item.eventDate && <span> · 事件发生于 {item.eventDate}</span>}
            </p>
            <h2>{item.title}</h2>
          </div>
          <div className="story-actions">
            <button
              className={saved ? 'text-button active' : 'text-button'}
              type="button"
              onClick={onSave}
              aria-pressed={saved}
            >
              {saved ? '★ 已收藏' : '☆ 收藏'}
            </button>
            <button
              className={read ? 'text-button is-read-toggle' : 'text-button'}
              type="button"
              onClick={onRead}
              aria-pressed={read}
            >
              {read ? '↶ 设为未读' : '✓ 标记已读'}
            </button>
          </div>
        </div>

        <div className="verdict">
          <span>发生了什么</span>
          <p>{item.fact}</p>
        </div>

        <div className="number-strip" aria-label="关键数字">
          {item.keyNumbers.map((number) => (
            <mark key={number}>{number}</mark>
          ))}
        </div>

        <details className="analysis-details" open={item.importance === 5}>
          <summary>
            <span className="summary-main">
              <i aria-hidden="true" />
              <span>
                <strong>展开详细分析</strong>
                <small>重要性、影响链、爱好者视角与后续验证</small>
              </span>
            </span>
            <span className="summary-cta" aria-hidden="true" />
          </summary>
          <div className="analysis-grid">
            <section>
              <span className="analysis-label">为什么重要</span>
              <p>{item.why}</p>
            </section>
            <section className="impact-chain">
              <span className="analysis-label">影响链</span>
              <p>{item.chain}</p>
            </section>
            <section>
              <span className="analysis-label">电子爱好者可以怎么用</span>
              <p>{item.maker}</p>
            </section>
            <section>
              <span className="analysis-label">下一步验证</span>
              <p>{item.watch}</p>
            </section>
          </div>
        </details>

        <div className="story-footer">
          <div className="evidence-summary">
            <span className={'confidence confidence-' + item.confidence}>{item.confidence}</span>
            <span className="maturity">{item.maturity}</span>
            <Importance value={item.importance} />
            <p>{item.confidenceNote}</p>
          </div>
          <div className="story-links">
            {item.linkedTrackId && (
              <a
                className="track-link"
                href={'#track-' + item.linkedTrackId}
                onClick={onTrack}
              >
                查看对应验证 →
              </a>
            )}
            <a className="source-link" href={item.url} target="_blank" rel="noreferrer">
              <span>{item.sourceName}</span>
              <small>{item.sourceDate} · 查看原文 ↗</small>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function VerificationCard({
  track,
  index,
}: {
  track: VerificationTrack;
  index: number;
}) {
  const finished = track.methods.filter((method) => method.completion === '已完成').length;
  const active = track.methods.filter((method) => method.completion === '进行中').length;
  const tone = sectorTone[track.industries[0]];

  return (
    <details
      className={'verification-card ' + tone}
      id={'track-' + track.id}
      open={index === 0}
    >
      <summary>
        <span className="track-index">{String(index + 1).padStart(2, '0')}</span>
        <div className="track-summary-main">
          <div className="track-labels">
            <span className={'sector-chip ' + tone}>{track.industries[0]}</span>
            <span className={'thesis-status thesis-' + track.thesisStatus}>{track.thesisStatus}</span>
            <span>{track.factStatus}事实</span>
          </div>
          <h3>{track.question}</h3>
          <p>{track.currentJudgment}</p>
        </div>
        <div className="track-next">
          <span>下次检查</span>
          <strong>{track.nextCheck.date}</strong>
          <small>{finished} 项完成 · {active} 项进行中</small>
        </div>
      </summary>

      <div className="verification-content">
        <section className="method-section">
          <div className="subsection-title">
            <span>一</span>
            <div>
              <h4>验证方法</h4>
              <p>明确看什么、用什么指标、去哪里找证据。</p>
            </div>
          </div>
          <div className="method-list">
            {track.methods.map((method, methodIndex) => (
              <article key={method.task}>
                <span className={'method-state method-' + method.completion}>{method.completion}</span>
                <div>
                  <h5>{methodIndex + 1}. {method.task}</h5>
                  <p><strong>判断指标：</strong>{method.metric}</p>
                  <p><strong>优先来源：</strong>{method.sourceTypes.join('、')}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="signal-columns">
          <div className="support-box">
            <h4>什么证据支持判断</h4>
            <ul>
              {track.supportSignals.map((signal) => <li key={signal}>{signal}</li>)}
            </ul>
          </div>
          <div className="refute-box">
            <h4>什么证据会推翻判断</h4>
            <ul>
              {track.refuteSignals.map((signal) => <li key={signal}>{signal}</li>)}
            </ul>
          </div>
        </section>

        <section className="update-section">
          <div className="subsection-title">
            <span>二</span>
            <div>
              <h4>进展记录</h4>
              <p>只有出现新证据时才更新，不用重复报道制造进展。</p>
            </div>
          </div>
          <div className="update-list">
            {track.updates.map((update) => (
              <article key={update.date + update.summary}>
                <time>{update.date}</time>
                <span className={'evidence-direction direction-' + update.direction}>{update.direction}</span>
                <div>
                  <p>{update.summary}</p>
                  <a href={update.url} target="_blank" rel="noreferrer">
                    {update.evidenceType} · {update.sourceName} ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="next-check-box">
          <span>下一次怎么查</span>
          <div>
            <h4>{track.nextCheck.date} · {track.nextCheck.task}</h4>
            <p>{track.nextCheck.trigger}</p>
          </div>
        </section>

        <div className="linked-news">
          <span>关联新闻</span>
          {track.linkedNewsIds.map((id) => {
            const item = news.find((candidate) => candidate.id === id);
            return item ? <a href={'#news-' + id} key={id}>{item.title} ↑</a> : null;
          })}
        </div>
      </div>
    </details>
  );
}

export default function Home() {
  const [date, setDate] = useState('all');
  const [channel, setChannel] = useState<'全部' | Channel>('全部');
  const [region, setRegion] = useState<'全部' | Region>('全部');
  const [newsType, setNewsType] = useState<'全部' | NewsType>('全部');
  const [query, setQuery] = useState('');
  const [focusOnly, setFocusOnly] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [read, setRead] = useState<Set<string>>(new Set());
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        setSaved(new Set(JSON.parse(localStorage.getItem('solder-saved') || '[]')));
        setRead(new Set(JSON.parse(localStorage.getItem('solder-read') || '[]')));
      } catch {
        setSaved(new Set());
        setRead(new Set());
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const persistSet = (key: string, current: Set<string>, id: string) => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    localStorage.setItem(key, JSON.stringify(Array.from(next)));
    return next;
  };

  const selectIndustry = (value: '全部' | Channel) => {
    setChannel(value);
    setSelectedTrackId(null);
  };

  const activeIndustries = useMemo(
    () => industryCatalog.filter((industry) => news.some((item) => item.channel === industry.value)),
    [],
  );

  const filteredNews = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('zh-CN');
    return news
      .filter((item) => date === 'all' || item.date === date)
      .filter((item) => channel === '全部' || item.channel === channel)
      .filter((item) => region === '全部' || item.region === region)
      .filter((item) => newsType === '全部' || item.type === newsType)
      .filter((item) => !focusOnly || item.importance >= 4)
      .filter((item) => !savedOnly || saved.has(item.id))
      .filter((item) => {
        if (!needle) return true;
        const haystack = [
          item.title,
          item.fact,
          item.why,
          item.maker,
          item.watch,
          item.channel,
          item.tags.join(' '),
          item.sourceName,
        ]
          .join(' ')
          .toLocaleLowerCase('zh-CN');
        return haystack.includes(needle);
      })
      .sort((a, b) => b.importance - a.importance || b.date.localeCompare(a.date));
  }, [channel, date, focusOnly, newsType, query, region, saved, savedOnly]);

  const visibleTracks = useMemo(() => {
    if (selectedTrackId) {
      return verificationTracks.filter((track) => track.id === selectedTrackId);
    }
    if (channel !== '全部') {
      return verificationTracks.filter((track) => track.industries.includes(channel));
    }
    return verificationTracks;
  }, [channel, selectedTrackId]);

  const selectedNews = selectedTrackId
    ? news.find((item) => item.linkedTrackId === selectedTrackId)
    : null;
  const totalMinutes = filteredNews.reduce((sum, item) => sum + item.readMinutes, 0);
  const evidenceCount = visibleTracks.reduce((sum, track) => sum + track.updates.length, 0);

  return (
    <main className="site-shell" id="top">
      <div className="paper-wash paper-wash-one" />
      <div className="paper-wash paper-wash-two" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="焊点首页">
          <BrandMark />
          <span>
            <strong>焊点</strong>
            <small>每日生产情报</small>
          </span>
        </a>
        <nav className="top-nav" aria-label="页内导航">
          <a href="#brief">今日新闻</a>
          <a href="#verification">验证追踪</a>
        </nav>
        <div className="update-state">
          <span className="live-dot" />
          <span>{briefMeta.dateDisplay}</span>
          <span className="divider">·</span>
          <span>{briefMeta.updatedAt}</span>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span>每日生产性情报</span>
            <span>{briefMeta.edition}</span>
          </p>
          <h1 id="hero-title">
            读懂产业变化，
            <br />
            <em>只留下有用的信号。</em>
          </h1>
          <p className="hero-mainline">{briefMeta.mainline}</p>
          <p className="hero-summary">{briefMeta.summary}</p>
        </div>
        <aside className="source-panel" aria-label="本期来源概况">
          <p className="panel-kicker">本期来源</p>
          <div className="source-score">
            <strong>{news.length}</strong>
            <span>条一手信息<br />均可追溯原文</span>
          </div>
          <p>优先采用政府、统计机构、标准组织、公司公告与财报。</p>
          <div className="source-stats">
            <span><strong>{news.filter((item) => item.importance >= 4).length}</strong>重点新闻</span>
            <span><strong>{activeIndustries.length}</strong>本期行业</span>
            <span><strong>{industryCatalog.length}</strong>长期领域</span>
          </div>
        </aside>
      </section>

      <section className="signal-section" aria-labelledby="signals-title">
        <div className="section-label">
          <span>今日必读</span>
          <h2 id="signals-title">三条主线，先建立全局判断</h2>
        </div>
        <div className="signal-grid">
          {signals.map((signal, index) => (
            <article className={'signal signal-' + signal.tone} key={signal.label}>
              <span className="signal-index">{index + 1}</span>
              <div>
                <p>{signal.label}</p>
                <h3>{signal.value}</h3>
                <small>{signal.detail}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="filter-console" id="brief" aria-label="新闻筛选">
        <div className="filter-heading">
          <div>
            <span>按行业阅读</span>
            <h2>今天的生产性新闻</h2>
          </div>
          <p>行业优先，地区只作为辅助筛选。</p>
        </div>

        <div className="industry-filter">
          <button
            className={channel === '全部' ? 'industry-button active' : 'industry-button'}
            type="button"
            onClick={() => selectIndustry('全部')}
          >
            <span>全部行业</span>
            <small>{news.length}</small>
          </button>
          {activeIndustries.map((industry) => (
            <button
              className={'industry-button ' + sectorTone[industry.value] + (channel === industry.value ? ' active' : '')}
              type="button"
              key={industry.value}
              onClick={() => selectIndustry(industry.value)}
              title={industry.note}
            >
              <span>{industry.value}</span>
              <small>{news.filter((item) => item.channel === industry.value).length}</small>
            </button>
          ))}
        </div>

        <div className="filter-tools">
          <div className="date-tabs">
            {briefDates.map((item) => (
              <button
                className={date === item.value ? 'active' : ''}
                type="button"
                key={item.value}
                onClick={() => setDate(item.value)}
              >
                <span>{item.label}</span>
                <small>{item.count} 条重点</small>
              </button>
            ))}
          </div>

          <div className="type-filter" aria-label="新闻类型">
            {newsTypes.map((item) => (
              <button
                type="button"
                className={newsType === item ? 'active' : ''}
                key={item}
                onClick={() => setNewsType(item)}
              >
                {item === '全部' ? '全部类型' : item}
              </button>
            ))}
          </div>

          <div className="search-row">
            <label className="search-box">
              <span>搜索</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="技术、公司、器件或关键词"
              />
            </label>
            <details className="more-filter">
              <summary>更多筛选</summary>
              <label>
                来源地区
                <select value={region} onChange={(event) => setRegion(event.target.value as '全部' | Region)}>
                  {regions.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
            </details>
            <button
              className={focusOnly ? 'quick-button active' : 'quick-button'}
              type="button"
              onClick={() => setFocusOnly((value) => !value)}
            >
              仅看重点
            </button>
            <button
              className={savedOnly ? 'quick-button active' : 'quick-button'}
              type="button"
              onClick={() => setSavedOnly((value) => !value)}
            >
              我的收藏 {saved.size > 0 && <span>{saved.size}</span>}
            </button>
            <p>当前 {filteredNews.length} 条 · 预计 {totalMinutes} 分钟</p>
          </div>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="news-feed">
          <div className="section-heading">
            <div>
              <span>新闻提炼</span>
              <h2>真正值得读的变化</h2>
            </div>
            <p>重要度表示影响范围，可信度表示证据强弱。</p>
          </div>

          {filteredNews.length > 0 ? (
            filteredNews.map((item, index) => (
              <StoryCard
                item={item}
                rank={index + 1}
                key={item.id}
                saved={saved.has(item.id)}
                read={read.has(item.id)}
                onSave={() => setSaved((current) => persistSet('solder-saved', current, item.id))}
                onRead={() => setRead((current) => persistSet('solder-read', current, item.id))}
                onTrack={() => setSelectedTrackId(item.linkedTrackId || null)}
              />
            ))
          ) : (
            <div className="empty-state">
              <span>没有匹配结果</span>
              <h2>当前筛选条件下没有新闻</h2>
              <p>可以取消“仅看重点”、清空搜索词或切换行业。</p>
              <button
                type="button"
                onClick={() => {
                  setDate('all');
                  selectIndustry('全部');
                  setRegion('全部');
                  setNewsType('全部');
                  setQuery('');
                  setFocusOnly(false);
                  setSavedOnly(false);
                }}
              >
                重置筛选
              </button>
            </div>
          )}
        </section>

        <aside className="intel-rail">
          <section className="rail-card coverage-card">
            <div className="rail-title">
              <span>本期覆盖</span>
              <h2>行业分布</h2>
            </div>
            <div className="coverage-list">
              {activeIndustries.map((industry) => (
                <button
                  className={sectorTone[industry.value]}
                  type="button"
                  key={industry.value}
                  onClick={() => {
                    selectIndustry(industry.value);
                    document.getElementById('brief')?.scrollIntoView();
                  }}
                >
                  <i />
                  <span>{industry.value}</span>
                  <strong>{news.filter((item) => item.channel === industry.value).length}</strong>
                </button>
              ))}
            </div>
            <p className="coverage-note">
              长期监测 {industryCatalog.length} 个领域；当天没有实质变化的行业不会凑数。
            </p>
          </section>

          <section className="rail-card evidence-card">
            <div className="rail-title">
              <span>证据说明</span>
              <h2>可信度怎么读</h2>
            </div>
            <dl>
              <div>
                <dt className="confidence confidence-已确认">已确认</dt>
                <dd>政府、统计机构、标准组织或正式公告。</dd>
              </div>
              <div>
                <dt className="confidence confidence-高可信">高可信</dt>
                <dd>一手材料明确，但部分结论仍是企业口径。</dd>
              </div>
              <div>
                <dt className="confidence confidence-待验证">待验证</dt>
                <dd>还需要独立测试、订单或市场数据验证。</dd>
              </div>
            </dl>
          </section>
        </aside>
      </div>

      <section className="verification-board" id="verification">
        <div className="verification-heading">
          <div>
            <span>持续验证</span>
            <h2>新闻之后，承诺有没有真正兑现？</h2>
            <p>把发布会、政策和公司主张拆成可检查的命题，持续记录支持与反驳证据。</p>
            {(selectedTrackId || channel !== '全部') && (
              <div className="verification-scope">
                <span>
                  当前仅显示：
                  {selectedNews ? '《' + selectedNews.title + '》的验证' : channel}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTrackId(null);
                    setChannel('全部');
                  }}
                >
                  查看全部验证
                </button>
              </div>
            )}
          </div>
          <div className="verification-stats">
            <span><strong>{visibleTracks.length}</strong>个追踪命题</span>
            <span><strong>{evidenceCount}</strong>条证据记录</span>
            <span><strong>{visibleTracks.filter((track) => track.methods.some((method) => method.completion === '进行中')).length}</strong>项正在验证</span>
          </div>
        </div>

        <div className="verification-list">
          {visibleTracks.length > 0 ? (
            visibleTracks.map((track, index) => (
              <VerificationCard track={track} index={index} key={track.id} />
            ))
          ) : (
            <div className="verification-empty">
              <h3>这个行业暂时没有进入验证追踪的命题</h3>
              <p>新闻仍会正常显示；出现可持续验证的承诺、指标或产业判断后再加入。</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedTrackId(null);
                  setChannel('全部');
                }}
              >
                查看全部验证
              </button>
            </div>
          )}
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <BrandMark />
          <span>
            <strong>焊点</strong>
            <small>每日生产情报</small>
          </span>
        </a>
        <p>过滤噪音，追踪技术、产业与规则如何真实改变生产。</p>
        <a href="#top">返回顶部 ↑</a>
      </footer>
    </main>
  );
}
