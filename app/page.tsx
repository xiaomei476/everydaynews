'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  briefMeta,
  news,
  signals,
  verificationTracks,
  type Channel,
  type NewsItem,
  type VerificationTrack,
} from './news-data';

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
      <i /><i /><i />
    </span>
  );
}

function InlineVerification({ track }: { track?: VerificationTrack }) {
  if (!track) {
    return (
      <section className="verification-inline verification-empty" aria-labelledby="verification-title">
        <div className="section-number">05</div>
        <div>
          <p className="section-kicker">持续验证</p>
          <h2 id="verification-title">本条新闻暂未进入持续追踪</h2>
          <p>上面的观察指标仍可用于后续判断；出现可反复核验的产业命题时再建立长期记录。</p>
        </div>
      </section>
    );
  }

  const latestUpdate = track.updates.at(-1);
  return (
    <section className="verification-inline" aria-labelledby="verification-title">
      <div className="analysis-section-heading">
        <span className="section-number">05</span>
        <div>
          <p className="section-kicker">持续验证 · 已并入本条新闻</p>
          <h2 id="verification-title">{track.question}</h2>
        </div>
      </div>

      <div className="verification-judgment">
        <span>{track.thesisStatus}</span>
        <div><strong>当前判断</strong><p>{track.currentJudgment}</p></div>
      </div>

      <div className="verification-methods">
        <h3>怎样验证</h3>
        {track.methods.map((method, index) => (
          <article key={method.task}>
            <span className={'method-state method-' + method.completion}>{method.completion}</span>
            <div>
              <h4>{index + 1}. {method.task}</h4>
              <p><strong>判定指标：</strong>{method.metric}</p>
              <p><strong>优先来源：</strong>{method.sourceTypes.join('、')}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="evidence-pair">
        <section><h3>支持当前判断的信号</h3><ul>{track.supportSignals.map((signal) => <li key={signal}>{signal}</li>)}</ul></section>
        <section><h3>可能推翻判断的信号</h3><ul>{track.refuteSignals.map((signal) => <li key={signal}>{signal}</li>)}</ul></section>
      </div>

      {latestUpdate && (
        <div className="latest-evidence">
          <div><span>最近证据 · {latestUpdate.direction}</span><time>{latestUpdate.date}</time></div>
          <p>{latestUpdate.summary}</p>
          <a href={latestUpdate.url} target="_blank" rel="noreferrer">{latestUpdate.evidenceType} · {latestUpdate.sourceName} · 查看证据 ↗</a>
        </div>
      )}

      <div className="next-check">
        <span>下一次检查</span>
        <div><h3>{track.nextCheck.date} · {track.nextCheck.task}</h3><p><strong>触发条件：</strong>{track.nextCheck.trigger}</p></div>
      </div>
    </section>
  );
}

function HeadlineItem({ item, rank, selected, saved, read, onSelect, onSave }: {
  item: NewsItem;
  rank: number;
  selected: boolean;
  saved: boolean;
  read: boolean;
  onSelect: () => void;
  onSave: () => void;
}) {
  const tone = sectorTone[item.channel];
  return (
    <article className={'headline-item ' + tone + (selected ? ' is-selected' : '') + (read ? ' is-read' : '')}>
      <button className="headline-select" type="button" onClick={onSelect} aria-current={selected ? 'true' : undefined} aria-label={`阅读第 ${rank} 条：${item.title}`}>
        <span className="headline-index">{String(rank).padStart(2, '0')}</span>
        <span className="headline-copy">
          <span className="headline-category"><i />{item.channel}</span>
          <strong>{item.title}</strong>
        </span>
        <span className="headline-arrow" aria-hidden="true">›</span>
      </button>
      <button className={'headline-save' + (saved ? ' is-saved' : '')} type="button" onClick={onSave} aria-pressed={saved} aria-label={saved ? '取消收藏这条新闻' : '收藏这条新闻'} title={saved ? '取消收藏' : '收藏'}>
        {saved ? '★' : '☆'}
      </button>
    </article>
  );
}

function AnalysisReader({ item, track, saved, read, foundationMode, activeTerm, onBack, onSave, onRead, onFoundation, onTerm }: {
  item: NewsItem;
  track?: VerificationTrack;
  saved: boolean;
  read: boolean;
  foundationMode: boolean;
  activeTerm: string;
  onBack: () => void;
  onSave: () => void;
  onRead: () => void;
  onFoundation: () => void;
  onTerm: (term: string) => void;
}) {
  const selectedBackground = item.analysis.background.find((entry) => entry.term === activeTerm) ?? item.analysis.background[0];
  const tone = sectorTone[item.channel];

  return (
    <article className={'analysis-reader ' + tone} id={'news-' + item.id} tabIndex={-1}>
      <button className="mobile-back" type="button" onClick={onBack}>← 返回标题列表</button>
      <header className="reader-header">
        <div className="reader-meta">
          <span className="reader-category"><i />{item.channel}</span><span>{item.type}</span><span>{item.sourceName}</span>
        </div>
        <h1>{item.title}</h1>
        <div className="reader-actions">
          <button type="button" className={foundationMode ? 'primary-action is-active' : 'primary-action'} onClick={onFoundation} aria-pressed={foundationMode}>{foundationMode ? '收起基础讲解' : '我没看懂，展开基础'}</button>
          <button type="button" onClick={onSave} aria-pressed={saved}>{saved ? '★ 已收藏' : '☆ 收藏'}</button>
          <button type="button" onClick={onRead} aria-pressed={read}>{read ? '↶ 设为未读' : '✓ 标记已读'}</button>
        </div>
        <p className="reader-level-note">解释基线：已掌握 C 与 STM32 裸机外设；不预设你学过 RTOS、Linux 驱动、DSP、模型部署或行业分析。</p>
      </header>

      {foundationMode && (
        <section className="foundation-guide" aria-live="polite">
          <div><span>阅读顺序</span><h2>先确认事实，再补概念，最后检查推导</h2></div>
          <ol>
            <li><strong>先看已发生的动作：</strong>{item.analysis.core[0]}</li>
            <li><strong>先掌握这些词：</strong>{item.analysis.background.map((entry) => entry.term).join('、')}。</li>
            <li><strong>再看判断边界：</strong>每一步都从新闻中的证据出发；“可能”“如果”后的内容不是已确认事实。</li>
          </ol>
        </section>
      )}

      <div className="reader-columns">
      <div className="source-column">
      <section className="source-brief" aria-labelledby="source-title">
        <div className="source-heading">
          <div><p className="section-kicker">原始信息摘要</p><h2 id="source-title">先看来源到底说了什么</h2></div>
          <a href={item.url} target="_blank" rel="noreferrer">查看原文 ↗</a>
        </div>
        <p>{item.fact}</p>
        <div className="source-facts">
          <span>信息日期 {item.sourceDate}</span>{item.eventDate && <span>事件日期 {item.eventDate}</span>}<span>{item.maturity}</span>
        </div>
        <div className="key-number-row">{item.keyNumbers.map((number) => <mark key={number}>{number}</mark>)}</div>
      </section>
      </div>

      <div className="analysis-column">

      <section className="analysis-block core-block" aria-labelledby="core-title">
        <div className="analysis-section-heading"><span className="section-number">01</span><div><p className="section-kicker">事件核心</p><h2 id="core-title">三句话内确认物理事实</h2></div></div>
        <ol className="core-list">{item.analysis.core.map((fact, index) => <li key={fact}><span>{index + 1}</span><p>{fact}</p></li>)}</ol>
      </section>

      <section className="analysis-block logic-block" aria-labelledby="logic-title">
        <div className="analysis-section-heading"><span className="section-number">02</span><div><p className="section-kicker">产业逻辑拆解</p><h2 id="logic-title">从新闻证据一步步推到行业判断</h2></div></div>
        <div className="logic-list">
          {item.analysis.logic.map((step, index) => (
            <article key={step.evidence}>
              <div className="logic-index">{index + 1}</div>
              <div className="logic-evidence"><span>新闻中的信号</span><strong>{step.evidence}</strong></div>
              <div className="logic-flow" aria-hidden="true">↓</div>
              <div className="logic-mechanism"><div><span>{step.position}</span><strong>{step.actor}</strong></div><p>{step.mechanism}</p></div>
              <div className="logic-result"><span>当前能得到的判断</span><p>{step.direction}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="analysis-block background-block" aria-labelledby="background-title">
        <div className="analysis-section-heading"><span className="section-number">03</span><div><p className="section-kicker">需补充的背景知识</p><h2 id="background-title">点击术语，在本条新闻里理解它</h2></div></div>
        {foundationMode ? (
          <div className="background-all">{item.analysis.background.map((entry) => <article key={entry.term}><h3>{entry.term}</h3><p>{entry.explanation}</p><div><strong>为什么与这条新闻有关：</strong>{entry.relevance}</div></article>)}</div>
        ) : (
          <>
            <div className="term-tabs" role="tablist" aria-label="背景知识术语">
              {item.analysis.background.map((entry) => <button key={entry.term} type="button" role="tab" aria-selected={selectedBackground.term === entry.term} className={selectedBackground.term === entry.term ? 'is-active' : ''} onClick={() => onTerm(entry.term)}>{entry.term}<span aria-hidden="true">＋</span></button>)}
            </div>
            <article className="term-explanation" role="tabpanel" aria-live="polite"><span>概念解释</span><h3>{selectedBackground.term}</h3><p>{selectedBackground.explanation}</p><div><strong>在本条新闻中的作用：</strong>{selectedBackground.relevance}</div></article>
          </>
        )}
      </section>

      <section className="analysis-block watch-block" aria-labelledby="watch-title">
        <div className="analysis-section-heading"><span className="section-number">04</span><div><p className="section-kicker">可进一步关注的方向</p><h2 id="watch-title">用下一批证据验证，而不是凭感觉下结论</h2></div></div>
        <div className="watch-list">{item.analysis.watch.map((watch, index) => <article key={watch.item}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{watch.item}</h3><p><strong>观察什么：</strong>{watch.signal}</p><p><strong>怎样解释：</strong>{watch.meaning}</p></div></article>)}</div>
      </section>

      <InlineVerification track={track} />
      </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [channel, setChannel] = useState<'全部' | Channel>('全部');
  const [savedOnly, setSavedOnly] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [read, setRead] = useState<Set<string>>(new Set());
  const [selectedNewsId, setSelectedNewsId] = useState(news[0]?.id ?? '');
  const [activeTerm, setActiveTerm] = useState(news[0]?.analysis.background[0]?.term ?? '');
  const [foundationMode, setFoundationMode] = useState(false);
  const [readerOpen, setReaderOpen] = useState(false);
  const readerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectFromHash = () => {
      const id = window.location.hash.replace(/^#news-/, '');
      const matched = news.find((item) => item.id === id);
      if (matched) {
        setSelectedNewsId(matched.id);
        setActiveTerm(matched.analysis.background[0]?.term ?? '');
        setReaderOpen(true);
      } else if (!window.location.hash) {
        setReaderOpen(false);
      }
    };
    const frame = window.requestAnimationFrame(() => {
      try {
        setSaved(new Set(JSON.parse(localStorage.getItem('solder-saved') || '[]')));
        setRead(new Set(JSON.parse(localStorage.getItem('solder-read') || '[]')));
      } catch {
        setSaved(new Set());
        setRead(new Set());
      }
      selectFromHash();
    });
    window.addEventListener('popstate', selectFromHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('popstate', selectFromHash);
    };
  }, []);

  const persistSet = (key: string, current: Set<string>, id: string) => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id); else next.add(id);
    try { localStorage.setItem(key, JSON.stringify(Array.from(next))); } catch { /* visible state still works */ }
    return next;
  };

  const activeChannels = useMemo(() => Array.from(new Set(news.map((item) => item.channel))), []);
  const filteredNews = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('zh-CN');
    return news
      .filter((item) => channel === '全部' || item.channel === channel)
      .filter((item) => !savedOnly || saved.has(item.id))
      .filter((item) => {
        if (!needle) return true;
        const analysisText = [
          ...item.analysis.core,
          ...item.analysis.logic.flatMap((step) => [step.evidence, step.actor, step.mechanism, step.direction]),
          ...item.analysis.background.flatMap((entry) => [entry.term, entry.explanation, entry.relevance]),
          ...item.analysis.watch.flatMap((entry) => [entry.item, entry.signal, entry.meaning]),
        ].join(' ');
        return [item.title, item.fact, item.channel, item.subcategory, item.tags.join(' '), item.sourceName, analysisText].join(' ').toLocaleLowerCase('zh-CN').includes(needle);
      })
      .sort((a, b) => b.importance - a.importance || b.date.localeCompare(a.date));
  }, [channel, query, saved, savedOnly]);

  const activeNews = filteredNews.find((item) => item.id === selectedNewsId) ?? filteredNews[0];
  const activeTrack = activeNews ? verificationTracks.find((track) => track.id === activeNews.linkedTrackId || track.linkedNewsIds.includes(activeNews.id)) : undefined;
  const totalMinutes = filteredNews.reduce((sum, item) => sum + item.readMinutes, 0);

  const selectNews = (item: NewsItem) => {
    setSelectedNewsId(item.id);
    setActiveTerm(item.analysis.background[0]?.term ?? '');
    setFoundationMode(false);
    setReaderOpen(true);
    window.history.pushState({ newsId: item.id }, '', '#news-' + item.id);
    if (window.matchMedia('(max-width: 860px)').matches) window.requestAnimationFrame(() => readerRef.current?.scrollIntoView({ block: 'start' }));
  };

  const moveSelection = (direction: 1 | -1) => {
    if (!activeNews || filteredNews.length < 2) return;
    const currentIndex = filteredNews.findIndex((item) => item.id === activeNews.id);
    const nextIndex = Math.min(filteredNews.length - 1, Math.max(0, currentIndex + direction));
    if (nextIndex !== currentIndex) selectNews(filteredNews[nextIndex]);
  };

  return (
    <main className={'site-shell' + (readerOpen ? ' is-reader-open' : '')} id="top">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="焊点首页"><BrandMark /><span><strong>焊点</strong><small>生产性新闻阅读器</small></span></a>
        <div className="window-note"><strong>近 72 小时</strong><span>每天 21:00 更新</span></div>
        <div className="update-state"><span className="live-dot" />{briefMeta.dateDisplay} · {briefMeta.updatedAt}</div>
      </header>

      <section className="brief-intro" aria-labelledby="brief-title">
        <div><p>{briefMeta.edition} · 今晚读这些</p><h1 id="brief-title">从新闻事实，推到产业判断。</h1><span>{briefMeta.summary}</span></div>
        <ol className="signal-list">{signals.map((signal, index) => <li key={signal.label}><span>{index + 1}</span><p><strong>{signal.value}</strong><small>{signal.detail}</small></p></li>)}</ol>
      </section>

      <section className="reader-toolbar" aria-label="新闻工具栏">
        <div><strong>近 72 小时新闻</strong><span>{filteredNews.length} 条 · 约 {totalMinutes} 分钟</span></div>
        <label className="search-field"><span>搜索</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="技术、公司或术语" /></label>
        <label className="channel-field"><span>领域</span><select value={channel} onChange={(event) => setChannel(event.target.value as '全部' | Channel)}><option value="全部">全部领域</option>{activeChannels.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
        <button className={savedOnly ? 'saved-filter is-active' : 'saved-filter'} type="button" onClick={() => setSavedOnly((value) => !value)} aria-pressed={savedOnly}>{savedOnly ? '★ 正在看收藏' : '☆ 只看收藏'}</button>
      </section>

      <div className="reading-workspace" ref={readerRef}>
        <aside className="headline-pane" aria-label="新闻标题列表">
          <div className="headline-pane-title"><div><span>标题流</span><strong>点开感兴趣的新闻</strong></div><small>默认不展开正文</small></div>
          {filteredNews.length > 0 ? (
            <div className="headline-list" onKeyDown={(event) => { if (event.key === 'ArrowDown') { event.preventDefault(); moveSelection(1); } if (event.key === 'ArrowUp') { event.preventDefault(); moveSelection(-1); } }}>
              {filteredNews.map((item, index) => <HeadlineItem item={item} rank={index + 1} selected={activeNews?.id === item.id} saved={saved.has(item.id)} read={read.has(item.id)} onSelect={() => selectNews(item)} onSave={() => setSaved((current) => persistSet('solder-saved', current, item.id))} key={item.id} />)}
            </div>
          ) : (
            <div className="empty-state"><span>没有匹配结果</span><h2>换一个关键词试试</h2><button type="button" onClick={() => { setQuery(''); setChannel('全部'); setSavedOnly(false); }}>清除筛选</button></div>
          )}
        </aside>

        {activeNews ? (
          <AnalysisReader item={activeNews} track={activeTrack} saved={saved.has(activeNews.id)} read={read.has(activeNews.id)} foundationMode={foundationMode} activeTerm={activeTerm}
            onBack={() => { setReaderOpen(false); window.history.pushState({}, '', window.location.pathname + window.location.search); }}
            onSave={() => setSaved((current) => persistSet('solder-saved', current, activeNews.id))}
            onRead={() => setRead((current) => persistSet('solder-read', current, activeNews.id))}
            onFoundation={() => setFoundationMode((value) => !value)} onTerm={setActiveTerm} />
        ) : <section className="analysis-reader reader-empty"><h2>选择一条新闻开始阅读</h2></section>}
      </div>

      <footer><a className="brand" href="#top"><BrandMark /><span><strong>焊点</strong><small>生产性新闻阅读器</small></span></a><p>先分清事实与判断，再用下一批证据修正结论。</p><a href="#top">返回顶部 ↑</a></footer>
    </main>
  );
}

