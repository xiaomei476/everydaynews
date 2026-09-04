'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  briefDates,
  briefMeta,
  news,
  signals,
  verificationCalendar,
  type Channel,
  type NewsItem,
  type Region,
} from './news-data';

const channels: Array<'全部' | Channel> = ['全部', 'AI', '半导体', '电子', '政策数据'];
const regions: Array<'全部' | Region> = ['全部', '中国', '美国', '欧洲', '日韩', '全球'];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" />
    </svg>
  );
}

function BookmarkIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4.5 2.5h9v13l-4.5-3-4.5 3z" fill={active ? 'currentColor' : 'none'} />
    </svg>
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
}: {
  item: NewsItem;
  rank: number;
  saved: boolean;
  read: boolean;
  onSave: () => void;
  onRead: () => void;
}) {
  return (
    <article className={'story-card channel-' + item.channel + (read ? ' is-read' : '')}>
      <aside className="importance-rail" aria-hidden="true">
        <span>{String(rank).padStart(2, '0')}</span>
        <i />
      </aside>

      <div className="story-card-body">
        <div className="story-meta">
          <span className={'channel-chip channel-chip-' + item.channel}>{item.channel}</span>
          <span>{item.subcategory}</span>
          <span>{item.region}</span>
          <span>{item.type}</span>
          <span className={'status status-' + item.status}>{item.status}</span>
        </div>

        <div className="story-heading">
          <div>
            <p className="story-kicker">
              {item.date}
              {item.eventDate && <span> · 事件发生于 {item.eventDate}</span>}
              <span> · 约 {item.readMinutes} 分钟</span>
            </p>
            <h2>{item.title}</h2>
          </div>
          <div className="story-actions">
            <button
              className={'icon-button save-button' + (saved ? ' active' : '')}
              type="button"
              onClick={onSave}
              aria-label={saved ? '取消收藏' : '收藏'}
              title={saved ? '取消收藏' : '稍后读'}
            >
              <BookmarkIcon active={saved} />
            </button>
            <button className="read-button" type="button" onClick={onRead}>
              {read ? '设为未读' : '标记已读'}
            </button>
          </div>
        </div>

        <div className="verdict">
          <span>事实提要</span>
          <p>{item.fact}</p>
        </div>

        <div className="number-strip" aria-label="关键数字">
          {item.keyNumbers.map((number) => (
            <span key={number}>{number}</span>
          ))}
        </div>

        <details className="analysis-details" open={item.importance === 5}>
          <summary>
            <span>展开研判与行动信息</span>
            <span className="summary-hint">影响链 · 爱好者视角 · 后续验证</span>
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
              <span className="analysis-label">你可以怎么用</span>
              <p>{item.maker}</p>
            </section>
            <section>
              <span className="analysis-label">下一步验证</span>
              <p>{item.watch}</p>
            </section>
          </div>
        </details>

        <div className="evidence-row">
          <div>
            <span className={'confidence confidence-' + item.confidence}>{item.confidence}</span>
            <span className="maturity">{item.maturity}</span>
            <p>{item.confidenceNote}</p>
          </div>
          <a href={item.url} target="_blank" rel="noreferrer">
            <span>{item.sourceName}</span>
            <small>{item.sourceDate}</small>
            <ArrowIcon />
          </a>
        </div>

        <div className="tag-row">
          <Importance value={item.importance} />
          {item.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [date, setDate] = useState('all');
  const [channel, setChannel] = useState<'全部' | Channel>('全部');
  const [region, setRegion] = useState<'全部' | Region>('全部');
  const [query, setQuery] = useState('');
  const [focusOnly, setFocusOnly] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [read, setRead] = useState<Set<string>>(new Set());

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

  const filteredNews = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('zh-CN');
    return news
      .filter((item) => date === 'all' || item.date === date)
      .filter((item) => channel === '全部' || item.channel === channel)
      .filter((item) => region === '全部' || item.region === region)
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
          item.tags.join(' '),
          item.sourceName,
        ]
          .join(' ')
          .toLocaleLowerCase('zh-CN');
        return haystack.includes(needle);
      })
      .sort((a, b) => b.importance - a.importance || b.date.localeCompare(a.date));
  }, [channel, date, focusOnly, query, region, saved, savedOnly]);

  const totalMinutes = filteredNews.reduce((sum, item) => sum + item.readMinutes, 0);

  return (
    <main className="site-shell" id="top">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="焊点首页">
          <BrandMark />
          <span>
            <strong>焊点</strong>
            <small>SOLDER · DAILY</small>
          </span>
        </a>
        <div className="update-state">
          <span className="live-dot" />
          <span>{briefMeta.dateDisplay}</span>
          <span className="divider">/</span>
          <span>{briefMeta.updatedAt}</span>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span>DAILY PRODUCTIVE INTELLIGENCE</span>
            <span>{briefMeta.edition}</span>
          </p>
          <h1 id="hero-title">
            不追热搜，
            <br />
            只追踪<span>会改变生产的变量。</span>
          </h1>
          <p className="hero-mainline">{briefMeta.mainline}</p>
          <p className="hero-summary">{briefMeta.summary}</p>
        </div>
        <aside className="source-meter" aria-label="本期信息源质量">
          <div className="meter-head">
            <span>SOURCE QUALITY</span>
            <strong>{news.length} / {news.length}</strong>
          </div>
          <div className="meter-track">
            <i />
          </div>
          <p>本期条目均链接到政府、统计机构、标准组织或公司一手发布。</p>
          <div className="source-stats">
            <span>
              <strong>{news.length}</strong>
              精选条目
            </span>
            <span>
              <strong>{news.filter((item) => item.importance >= 4).length}</strong>
              高重要度
            </span>
            <span>
              <strong>{news.filter((item) => item.channel === 'AI' || item.channel === '半导体').length}</strong>
              AI / 芯片
            </span>
          </div>
        </aside>
      </section>

      <section className="signal-grid" aria-label="今日三个关键信号">
        {signals.map((signal, index) => (
          <article className={'signal signal-' + signal.tone} key={signal.label}>
            <span className="signal-index">0{index + 1}</span>
            <div>
              <p>{signal.label}</p>
              <h2>{signal.value}</h2>
              <small>{signal.detail}</small>
            </div>
          </article>
        ))}
      </section>

      <section className="filter-console" id="brief" aria-label="新闻筛选">
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

        <div className="filter-row">
          <div className="filter-block">
            <span className="filter-label">领域</span>
            <div className="segmented">
              {channels.map((item) => (
                <button
                  type="button"
                  className={channel === item ? 'active' : ''}
                  key={item}
                  onClick={() => setChannel(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-block">
            <span className="filter-label">地区</span>
            <div className="segmented">
              {regions.map((item) => (
                <button
                  type="button"
                  className={region === item ? 'active' : ''}
                  key={item}
                  onClick={() => setRegion(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <label className="search-box">
            <span className="sr-only">搜索条目</span>
            <svg viewBox="0 0 18 18" aria-hidden="true">
              <circle cx="7.5" cy="7.5" r="4.5" />
              <path d="m11 11 4 4" />
            </svg>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索技术、公司或变量"
            />
          </label>
        </div>

        <div className="quick-filters">
          <button
            className={focusOnly ? 'active' : ''}
            type="button"
            onClick={() => setFocusOnly((value) => !value)}
          >
            仅看重要度 4+
          </button>
          <button
            className={savedOnly ? 'active' : ''}
            type="button"
            onClick={() => setSavedOnly((value) => !value)}
          >
            我的收藏 {saved.size > 0 && <span>{saved.size}</span>}
          </button>
          <p>
            当前 {filteredNews.length} 条 · 预计 {totalMinutes} 分钟
          </p>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="news-feed">
          <div className="section-heading">
            <div>
              <span>CURATED SIGNALS</span>
              <h2>真正值得读的变化</h2>
            </div>
            <p>重要度表示影响范围；可信度表示证据强弱，两者分开判断。</p>
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
              />
            ))
          ) : (
            <div className="empty-state">
              <span>NO SIGNAL</span>
              <h2>没有符合当前条件的条目</h2>
              <p>试试取消“仅看重点”或清空搜索词。</p>
              <button
                type="button"
                onClick={() => {
                  setDate('all');
                  setChannel('全部');
                  setRegion('全部');
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
          <section className="rail-card">
            <div className="rail-title">
              <span>VERIFY NEXT</span>
              <h2>验证日历</h2>
            </div>
            <div className="calendar-list">
              {verificationCalendar.map((event) => (
                <div key={event.date + event.event}>
                  <time>{event.date}</time>
                  <p>{event.event}</p>
                  <small>{event.relates}</small>
                </div>
              ))}
            </div>
          </section>

          <section className="rail-card evidence-card">
            <div className="rail-title">
              <span>EVIDENCE KEY</span>
              <h2>证据怎么读</h2>
            </div>
            <dl>
              <div>
                <dt className="confidence confidence-已确认">已确认</dt>
                <dd>政府、统计机构或正式发布</dd>
              </div>
              <div>
                <dt className="confidence confidence-高可信">高可信</dt>
                <dd>一手材料，但部分结论仍是企业口径</dd>
              </div>
              <div>
                <dt className="confidence confidence-待验证">待验证</dt>
                <dd>需要独立测试或后续数据交叉验证</dd>
              </div>
            </dl>
          </section>

        </aside>
      </div>

      <footer>
        <a className="brand footer-brand" href="#top">
          <BrandMark />
          <span>
            <strong>焊点</strong>
            <small>SOLDER · DAILY</small>
          </span>
        </a>
        <p>为电子爱好者过滤噪音，保留会改变生产、技术与规则的信号。</p>
        <a href="#top">返回顶部 ↑</a>
      </footer>
    </main>
  );
}
