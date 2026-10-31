import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  Clock,
  Layers,
  CheckCircle2,
  AlertCircle,
  Copy,
  RotateCcw,
  BookOpen,
  Code2,
  FileJson,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface HeaderItem {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

interface ParamItem {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

interface ApiPreset {
  name: string;
  category: 'Gmail Architecture' | 'Real Public API' | 'System Design Failure Cases';
  method: HttpMethod;
  url: string;
  description: string;
  headers: Array<{ key: string; value: string }>;
  body?: string;
  systemDesignInsight: string;
}

const PRESETS: ApiPreset[] = [
  {
    name: 'Gmail Inbox Ingestion (200 OK)',
    category: 'Gmail Architecture',
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts?_limit=5',
    description: 'Fetch active mailbox threads with cached metadata headers.',
    headers: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: 'Bearer google_oauth2_mock_token' },
      { key: 'X-Client-Version', value: 'v2026.10-spa' },
    ],
    systemDesignInsight:
      'Tier 2 GFE Load Balancer terminates TLS and routes to Mailbox Ingestion Service. Metadata is read from Redis cache-aside (P99 < 15ms); cache misses fall back to Google Cloud Spanner.',
  },
  {
    name: 'Gmail Send Email with 30s Delay Queue (202 Accepted)',
    category: 'Gmail Architecture',
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/posts',
    description: 'Dispatch an email message into the 30-second Undo Send task queue.',
    headers: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Authorization', value: 'Bearer google_oauth2_mock_token' },
      { key: 'Idempotency-Key', value: 'idemp-gmail-7b84f3e2-8091' },
    ],
    body: JSON.stringify(
      {
        recipient: 'interviewer@faang.com',
        subject: 'System Design Presentation Follow-up',
        body: 'Here is the detailed Gmail architecture case study.',
        undoDelaySeconds: 30,
        attachments: [{ fileId: 'blob-sha256-a9b1c2', name: 'Architecture_HLD.pdf', sizeBytes: 4194304 }],
      },
      null,
      2
    ),
    systemDesignInsight:
      'Returns HTTP 202 Accepted immediately. Message is NOT sent via SMTP yet. It is held in a Redis ZSET delay queue for 30s, allowing the client to issue an Undo Send cancellation.',
  },
  {
    name: 'Gmail "Undo Send" Cancellation (200 OK)',
    category: 'Gmail Architecture',
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/posts',
    description: 'Cancel a pending email before the 30-second delay queue pops.',
    headers: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'X-Cancellation-Target', value: 'msg-job-queue-789' },
    ],
    body: JSON.stringify(
      {
        action: 'CANCEL_DELIVERY',
        messageJobId: 'job-9843-delayed',
        clientTimestamp: new Date().toISOString(),
      },
      null,
      2
    ),
    systemDesignInsight:
      'Atomic state transition in DB: changes status from PENDING_DELAY to DRAFT. The delay queue worker detects the status update and aborts SMTP transmission.',
  },
  {
    name: 'Twitter/X Scraping Spike Rate-Limit (429 Too Many Requests)',
    category: 'System Design Failure Cases',
    method: 'GET',
    url: 'https://api.simulation.internal/v1/tweets/timeline?user=elonmusk',
    description: 'Simulates rate limit exhaustion from automated scraping.',
    headers: [
      { key: 'Accept', value: 'application/json' },
      { key: 'X-Forwarded-For', value: '198.51.100.42' },
    ],
    systemDesignInsight:
      'Envoy/Kong API Gateway enforces distributed Redis Token Bucket limits. Once user exceeds 60 requests/min, gateway responds with 429 Too Many Requests and Retry-After: 60.',
  },
  {
    name: 'Conditional GET with ETag Matching (304 Not Modified)',
    category: 'System Design Failure Cases',
    method: 'GET',
    url: 'https://api.simulation.internal/v1/assets/manifest.json',
    description: 'Simulates browser HTTP cache validation saving egress bandwidth.',
    headers: [
      { key: 'If-None-Match', value: '"w/e78103-99ab4"' },
      { key: 'Cache-Control', value: 'max-age=3600' },
    ],
    systemDesignInsight:
      'HTTP 304 Not Modified sends ZERO response body bytes! The client browser renders its local disk cache copy, saving petabytes of cloud egress costs at scale.',
  },
  {
    name: 'Upstream Database Lock Timeout (504 Gateway Timeout)',
    category: 'System Design Failure Cases',
    method: 'GET',
    url: 'https://api.simulation.internal/v1/reports/heavy-sql-aggregate',
    description: 'Simulates an unindexed database query exceeding proxy timeout.',
    headers: [
      { key: 'X-Query-Complexity', value: 'EXTREME_UNINDEXED_SCAN' },
    ],
    systemDesignInsight:
      'The reverse proxy (NGINX/ALB) waited 30,000ms for the upstream microservice. Because the database query was blocked on row locks, the proxy terminated with 504 Gateway Timeout.',
  },
  {
    name: 'Real Public API: Real User Fetch (JSONPlaceholder)',
    category: 'Real Public API',
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/users/1',
    description: 'Make a real live HTTP GET call to a public REST endpoint.',
    headers: [{ key: 'Accept', value: 'application/json' }],
    systemDesignInsight:
      'Live round-trip network request executed from your browser to public infrastructure. Notice DNS resolution, TLS 1.3 handshake, and JSON payload deserialization in real-time.',
  },
  {
    name: 'Real Public API: Create Real Resource (POST)',
    category: 'Real Public API',
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/posts',
    description: 'Live HTTP POST creating a new resource on public mock server.',
    headers: [{ key: 'Content-Type', value: 'application/json; charset=UTF-8' }],
    body: JSON.stringify(
      {
        title: 'System Design Masterclass by Mentor Kapil',
        body: 'Distributed computing, CAP theorem, and Gmail architecture.',
        userId: 1,
      },
      null,
      2
    ),
    systemDesignInsight:
      'Non-idempotent HTTP POST returning 201 Created with a generated resource ID (id: 101). Calling this multiple times creates independent unique resources.',
  },
];

export const PostmanSimulator: React.FC = () => {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState<string>('https://jsonplaceholder.typicode.com/posts/1');
  const [activeTab, setActiveTab] = useState<'params' | 'headers' | 'body'>('headers');
  const [activeRespTab, setActiveRespTab] = useState<'body' | 'headers' | 'insight'>('body');

  const [params, setParams] = useState<ParamItem[]>([
    { id: '1', key: 'userId', value: '1', enabled: true },
    { id: '2', key: 'format', value: 'json', enabled: true },
  ]);

  const [headers, setHeaders] = useState<HeaderItem[]>([
    { id: '1', key: 'Accept', value: 'application/json', enabled: true },
    { id: '2', key: 'Authorization', value: 'Bearer demo_jwt_token', enabled: true },
    { id: '3', key: 'X-Request-Id', value: 'req-' + Math.floor(Math.random() * 1000000), enabled: true },
  ]);

  const [bodyText, setBodyText] = useState<string>(
    JSON.stringify(
      {
        title: 'System Design Masterclass',
        author: 'Kapil',
        architecture: 'Microservices with Redis & Kafka',
      },
      null,
      2
    )
  );

  // Response state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(200);
  const [responseStatusText, setResponseStatusText] = useState<string>('OK');
  const [responseDurationMs, setResponseDurationMs] = useState<number | null>(48);
  const [responseSizeBytes, setResponseSizeBytes] = useState<number | null>(292);
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({
    'content-type': 'application/json; charset=utf-8',
    'x-powered-by': 'Express / NGINX L7 Reverse Proxy',
    'cache-control': 'public, max-age=14400',
    'etag': 'W/"124-x98bc91"',
    'x-rate-limit-remaining': '994',
  });
  const [responseBody, setResponseBody] = useState<string>(
    JSON.stringify(
      {
        userId: 1,
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
      },
      null,
      2
    )
  );
  const [currentInsight, setCurrentInsight] = useState<string>(
    'Tier 2 GFE Load Balancer terminates TLS and routes to Mailbox Ingestion Service. Metadata is read from Redis cache-aside (P99 < 15ms); cache misses fall back to Google Cloud Spanner.'
  );

  // Method color helper
  const getMethodBadgeColor = (m: HttpMethod) => {
    switch (m) {
      case 'GET':
        return 'bg-emerald-600 text-white';
      case 'POST':
        return 'bg-amber-600 text-white';
      case 'PUT':
        return 'bg-blue-600 text-white';
      case 'PATCH':
        return 'bg-purple-600 text-white';
      case 'DELETE':
        return 'bg-rose-600 text-white';
    }
  };

  const getStatusColor = (code: number) => {
    if (code >= 200 && code < 300) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (code >= 300 && code < 400) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (code >= 400 && code < 500) return 'bg-amber-100 text-amber-900 border-amber-300';
    return 'bg-rose-100 text-rose-900 border-rose-300';
  };

  // Load a preset
  const handleSelectPreset = (preset: ApiPreset) => {
    setMethod(preset.method);
    setUrl(preset.url);
    setHeaders(
      preset.headers.map((h, i) => ({
        id: String(i + 1),
        key: h.key,
        value: h.value,
        enabled: true,
      }))
    );
    if (preset.body) {
      setBodyText(preset.body);
    }
    setCurrentInsight(preset.systemDesignInsight);
  };

  // Send request (either real fetch or smart architectural simulation)
  const handleSend = async () => {
    setIsLoading(true);
    const startTime = performance.now();

    // Check if simulation endpoint
    if (url.includes('api.simulation.internal')) {
      await new Promise((r) => setTimeout(r, 450));
      const duration = Math.round(performance.now() - startTime);
      setResponseDurationMs(duration);

      if (url.includes('timeline')) {
        // Rate limit 429
        setResponseStatus(429);
        setResponseStatusText('Too Many Requests');
        setResponseHeaders({
          'content-type': 'application/json',
          'retry-after': '60',
          'x-ratelimit-limit': '100',
          'x-ratelimit-remaining': '0',
          'x-ratelimit-reset': String(Math.floor(Date.now() / 1000) + 60),
        });
        const simulatedBody = {
          error: 'Rate limit exceeded',
          message: 'You have sent too many requests in 60 seconds. Please back off.',
          retryAfterSeconds: 60,
          algorithm: 'Distributed Token Bucket (Redis Cluster)',
          statusCode: 429,
        };
        setResponseBody(JSON.stringify(simulatedBody, null, 2));
        setResponseSizeBytes(JSON.stringify(simulatedBody).length);
      } else if (url.includes('manifest.json')) {
        // 304 Not Modified
        setResponseStatus(304);
        setResponseStatusText('Not Modified');
        setResponseHeaders({
          'etag': '"w/e78103-99ab4"',
          'cache-control': 'public, max-age=3600',
          'age': '240',
        });
        setResponseBody('/* HTTP 304 Not Modified: Body is empty. Client uses local disk cache. */');
        setResponseSizeBytes(0);
      } else if (url.includes('heavy-sql')) {
        // 504 Gateway Timeout
        setResponseStatus(504);
        setResponseStatusText('Gateway Timeout');
        setResponseHeaders({
          'content-type': 'application/json',
          'x-proxy': 'Envoy L7 Mesh Router',
          'x-envoy-upstream-service-time': '30002',
        });
        const simulatedBody = {
          error: 'Gateway Timeout',
          message: 'Upstream reporting database failed to respond within 30000ms threshold.',
          incidentId: 'inc-spanner-lock-8712',
          statusCode: 504,
        };
        setResponseBody(JSON.stringify(simulatedBody, null, 2));
        setResponseSizeBytes(JSON.stringify(simulatedBody).length);
      }
      setIsLoading(false);
      return;
    }

    // Real HTTP Fetch
    try {
      const activeHeaders: Record<string, string> = {};
      headers.filter((h) => h.enabled && h.key.trim()).forEach((h) => {
        activeHeaders[h.key] = h.value;
      });

      const options: RequestInit = {
        method,
        headers: activeHeaders,
      };

      if (['POST', 'PUT', 'PATCH'].includes(method) && bodyText.trim()) {
        options.body = bodyText;
      }

      const res = await fetch(url, options);
      const duration = Math.round(performance.now() - startTime);

      setResponseStatus(res.status);
      setResponseStatusText(res.statusText || (res.status === 200 ? 'OK' : 'Completed'));
      setResponseDurationMs(duration);

      const resHeadersObj: Record<string, string> = {};
      res.headers.forEach((val, key) => {
        resHeadersObj[key] = val;
      });
      setResponseHeaders(resHeadersObj);

      const text = await res.text();
      setResponseSizeBytes(new Blob([text]).size);

      try {
        const json = JSON.parse(text);
        setResponseBody(JSON.stringify(json, null, 2));
      } catch {
        setResponseBody(text || '/* Empty Response Body */');
      }
    } catch (err: unknown) {
      const duration = Math.round(performance.now() - startTime);
      setResponseStatus(500);
      setResponseStatusText('Network / CORS Error');
      setResponseDurationMs(duration);
      setResponseHeaders({ 'content-type': 'application/json' });
      setResponseBody(
        JSON.stringify(
          {
            error: 'Client Network Exception',
            details: (err as Error)?.message || 'Failed to fetch',
            note: 'The requested external server may have blocked CORS preflight headers or the endpoint was unreachable. Try a Preset simulation!',
          },
          null,
          2
        )
      );
      setResponseSizeBytes(140);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0A192F] text-white rounded-3xl border-2 border-[#1E3A8A] shadow-2xl overflow-hidden flex flex-col my-4">
      {/* Top Banner */}
      <div className="bg-[#081426] px-6 py-4 border-b border-[#1E3A8A] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-[#0A192F] font-black text-xl flex items-center justify-center shadow-lg">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-400 text-[#0A192F]">
                SPECIAL EDITION LAB
              </span>
              <span className="text-xs font-mono text-[#93C5FD]">Postman IDE Simulator</span>
            </div>
            <h2 className="text-lg font-black text-white">
              Real API Testing & Distributed System Architecture Lab
            </h2>
          </div>
        </div>

        <div className="text-right text-xs">
          <span className="text-slate-400">Mentorship By</span>{' '}
          <strong className="text-white font-mono">Kapil • SPSU Udaipur</strong>
        </div>
      </div>

      {/* Quick Architectural Presets Carousel */}
      <div className="p-4 bg-[#0D2140] border-b border-[#1E3A8A]">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-mono text-[#BFDBFE] font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Quick Presets (Gmail, Outages & Real Public APIs):
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Click any scenario to auto-populate headers & architecture notes
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {PRESETS.slice(0, 4).map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(p)}
              className="p-2.5 rounded-xl bg-[#081426] hover:bg-[#11284E] border border-[#1E3A8A] text-left transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className={`text-[9px] font-mono font-black px-1.5 py-0.2 rounded ${getMethodBadgeColor(
                      p.method
                    )}`}
                  >
                    {p.method}
                  </span>
                  <span className="text-[11px] font-bold text-white group-hover:text-amber-300 truncate">
                    {p.name.split(' (')[0]}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 line-clamp-1">{p.description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
          {PRESETS.slice(4).map((p, idx) => (
            <button
              key={idx + 4}
              type="button"
              onClick={() => handleSelectPreset(p)}
              className="p-2.5 rounded-xl bg-[#081426] hover:bg-[#11284E] border border-[#1E3A8A] text-left transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className={`text-[9px] font-mono font-black px-1.5 py-0.2 rounded ${getMethodBadgeColor(
                      p.method
                    )}`}
                  >
                    {p.method}
                  </span>
                  <span className="text-[11px] font-bold text-white group-hover:text-amber-300 truncate">
                    {p.name.split(' (')[0]}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 line-clamp-1">{p.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Request Builder Bar */}
      <div className="p-4 bg-[#0A192F] space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Method Selector */}
          <div className="relative shrink-0">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as HttpMethod)}
              className={`h-11 px-3.5 rounded-xl font-mono font-black text-xs border border-[#1E3A8A] appearance-none cursor-pointer focus:outline-none ${getMethodBadgeColor(
                method
              )}`}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          {/* URL Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://jsonplaceholder.typicode.com/posts/1"
              className="w-full h-11 px-4 bg-[#081426] border border-[#1E3A8A] rounded-xl text-white font-mono text-xs focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={isLoading}
            className="h-11 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#0A192F] font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50 shrink-0"
          >
            {isLoading ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send</span>
              </>
            )}
          </button>
        </div>

        {/* Request Tabs: Params, Headers, Body */}
        <div className="border border-[#1E3A8A] rounded-2xl bg-[#081426] overflow-hidden">
          <div className="flex items-center gap-2 px-3 pt-2 border-b border-[#1E3A8A] bg-[#0A192F]">
            <button
              type="button"
              onClick={() => setActiveTab('headers')}
              className={`px-3 py-2 text-xs font-bold font-mono rounded-t-lg transition-colors cursor-pointer ${
                activeTab === 'headers'
                  ? 'bg-[#081426] text-amber-300 border-t-2 border-amber-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Headers ({headers.filter((h) => h.enabled).length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('body')}
              className={`px-3 py-2 text-xs font-bold font-mono rounded-t-lg transition-colors cursor-pointer ${
                activeTab === 'body'
                  ? 'bg-[#081426] text-amber-300 border-t-2 border-amber-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Body (raw JSON)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('params')}
              className={`px-3 py-2 text-xs font-bold font-mono rounded-t-lg transition-colors cursor-pointer ${
                activeTab === 'params'
                  ? 'bg-[#081426] text-amber-300 border-t-2 border-amber-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Params ({params.filter((p) => p.enabled).length})
            </button>
          </div>

          <div className="p-4">
            {activeTab === 'headers' && (
              <div className="space-y-2">
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Key-Value Request Headers sent to Load Balancer & API Gateway:</span>
                  <button
                    type="button"
                    onClick={() =>
                      setHeaders((prev) => [
                        ...prev,
                        { id: String(Date.now()), key: '', value: '', enabled: true },
                      ])
                    }
                    className="text-amber-400 hover:text-amber-300 font-bold cursor-pointer"
                  >
                    + Add Header
                  </button>
                </div>
                {headers.map((h, i) => (
                  <div key={h.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={h.enabled}
                      onChange={(e) => {
                        const updated = [...headers];
                        updated[i].enabled = e.target.checked;
                        setHeaders(updated);
                      }}
                      className="rounded accent-amber-400 cursor-pointer"
                    />
                    <input
                      type="text"
                      placeholder="Header Key (e.g. Content-Type)"
                      value={h.key}
                      onChange={(e) => {
                        const updated = [...headers];
                        updated[i].key = e.target.value;
                        setHeaders(updated);
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#0A192F] border border-[#1E3A8A] text-white font-mono text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Header Value"
                      value={h.value}
                      onChange={(e) => {
                        const updated = [...headers];
                        updated[i].value = e.target.value;
                        setHeaders(updated);
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#0A192F] border border-[#1E3A8A] text-white font-mono text-xs focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'body' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>JSON Payload (Used for POST, PUT, PATCH):</span>
                  <button
                    type="button"
                    onClick={() => {
                      try {
                        setBodyText(JSON.stringify(JSON.parse(bodyText), null, 2));
                      } catch {
                        // ignore format error
                      }
                    }}
                    className="text-amber-400 hover:text-amber-300 font-bold cursor-pointer"
                  >
                    Prettify JSON
                  </button>
                </div>
                <textarea
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  rows={6}
                  className="w-full p-3 bg-[#0A192F] border border-[#1E3A8A] rounded-xl text-[#93C5FD] font-mono text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            )}

            {activeTab === 'params' && (
              <div className="space-y-2">
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Query String Parameters:</span>
                  <button
                    type="button"
                    onClick={() =>
                      setParams((prev) => [
                        ...prev,
                        { id: String(Date.now()), key: '', value: '', enabled: true },
                      ])
                    }
                    className="text-amber-400 hover:text-amber-300 font-bold cursor-pointer"
                  >
                    + Add Parameter
                  </button>
                </div>
                {params.map((p, i) => (
                  <div key={p.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={p.enabled}
                      onChange={(e) => {
                        const updated = [...params];
                        updated[i].enabled = e.target.checked;
                        setParams(updated);
                      }}
                      className="rounded accent-amber-400 cursor-pointer"
                    />
                    <input
                      type="text"
                      placeholder="Key"
                      value={p.key}
                      onChange={(e) => {
                        const updated = [...params];
                        updated[i].key = e.target.value;
                        setParams(updated);
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#0A192F] border border-[#1E3A8A] text-white font-mono text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={p.value}
                      onChange={(e) => {
                        const updated = [...params];
                        updated[i].value = e.target.value;
                        setParams(updated);
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#0A192F] border border-[#1E3A8A] text-white font-mono text-xs focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Response Panel */}
      <div className="bg-[#081426] border-t-2 border-[#1E3A8A] p-4 flex-1">
        {/* Status bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#1E3A8A]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-300">Response:</span>
            {responseStatus !== null && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-black border ${getStatusColor(
                  responseStatus
                )}`}
              >
                {responseStatus} {responseStatusText}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
            {responseDurationMs !== null && (
              <span className="flex items-center gap-1 text-emerald-400">
                <Clock className="w-3.5 h-3.5" />
                <strong>{responseDurationMs} ms</strong>
              </span>
            )}
            {responseSizeBytes !== null && (
              <span className="flex items-center gap-1 text-[#93C5FD]">
                <FileJson className="w-3.5 h-3.5" />
                <strong>{responseSizeBytes} B</strong>
              </span>
            )}
          </div>
        </div>

        {/* Response Tabs */}
        <div className="flex items-center gap-2 mt-3 mb-2">
          <button
            type="button"
            onClick={() => setActiveRespTab('body')}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
              activeRespTab === 'body'
                ? 'bg-white text-[#0A192F] font-black'
                : 'bg-[#112240] text-slate-300 hover:text-white'
            }`}
          >
            Response Body
          </button>
          <button
            type="button"
            onClick={() => setActiveRespTab('headers')}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
              activeRespTab === 'headers'
                ? 'bg-white text-[#0A192F] font-black'
                : 'bg-[#112240] text-slate-300 hover:text-white'
            }`}
          >
            Response Headers ({Object.keys(responseHeaders).length})
          </button>
          <button
            type="button"
            onClick={() => setActiveRespTab('insight')}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
              activeRespTab === 'insight'
                ? 'bg-amber-400 text-[#0A192F] font-black'
                : 'bg-[#112240] text-amber-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>System Design Explainer</span>
          </button>
        </div>

        {/* Response Body Content */}
        {activeRespTab === 'body' && (
          <div className="relative">
            <pre className="p-4 rounded-xl bg-[#030B17] border border-[#1E3A8A] text-emerald-400 font-mono text-xs overflow-x-auto max-h-80 select-text">
              {responseBody}
            </pre>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(responseBody)}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-[#112240] hover:bg-[#1E3A8A] text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Copy JSON Response"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Response Headers Content */}
        {activeRespTab === 'headers' && (
          <div className="p-4 rounded-xl bg-[#030B17] border border-[#1E3A8A] max-h-80 overflow-y-auto space-y-1.5">
            {Object.entries(responseHeaders).map(([k, v]) => (
              <div key={k} className="flex items-start text-xs font-mono">
                <span className="text-[#BFDBFE] font-bold w-48 shrink-0">{k}:</span>
                <span className="text-emerald-400 break-all">{v}</span>
              </div>
            ))}
          </div>
        )}

        {/* System Design Architectural Explainer Card */}
        {activeRespTab === 'insight' && (
          <div className="p-4 rounded-2xl bg-[#0A192F] border-2 border-amber-400/40 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Architectural Flow Analysis (FAANG Placement Perspective)</span>
            </div>
            <p className="text-xs text-[#E2E8F0] leading-relaxed font-sans">{currentInsight}</p>
            <div className="p-3 rounded-xl bg-[#081426] border border-[#1E3A8A] text-[11px] text-[#93C5FD] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Postman Production Tip:</strong> When testing APIs for Gmail or Stripe, always verify that the <code className="text-amber-300 font-mono">Idempotency-Key</code> header produces the identical response when fired sequentially, and that <code className="text-amber-300 font-mono">Retry-After</code> headers accompany 429 status codes.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
