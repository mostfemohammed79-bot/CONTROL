import { useState } from 'react';
import type { CommentItem, ReplyRule } from '@/types';
import { comments as initialComments, replyRules as initialRules } from '@/data/sampleData';
import { Check, X, Edit3, Plus, Trash2, AlertTriangle, Bot, Save } from 'lucide-react';

type Tab = 'queue' | 'rules';

export function Comments() {
  const [tab, setTab] = useState<Tab>('queue');
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [rules, setRules] = useState<ReplyRule[]>(initialRules);
  const [editingRule, setEditingRule] = useState<string | null>(null);

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'queue', label: 'Comment Queue', count: comments.filter((c) => c.replyStatus === 'pending').length },
    { id: 'rules', label: 'Reply Rules' },
  ];

  const pendingCount = comments.filter((c) => c.replyStatus === 'pending').length;

  const approveComment = (id: string) => {
    setComments(comments.map((c) => (c.id === id ? { ...c, replyStatus: 'approved' } : c)));
  };
  const rejectComment = (id: string) => {
    setComments(comments.map((c) => (c.id === id ? { ...c, replyStatus: 'rejected' } : c)));
  };

  const toggleRule = (id: string) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  };
  const deleteRule = (id: string) => {
    setRules(rules.filter((r) => r.id !== id));
  };
  const addRule = () => {
    const newRule: ReplyRule = {
      id: `r${Date.now()}`,
      keywords: [],
      reply: '',
      active: true,
    };
    setRules([...rules, newRule]);
    setEditingRule(newRule.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-1 bg-white/[0.03] border border-white/5 rounded-lg p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              tab === t.id ? 'bg-cyan-500/15 text-cyan-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {t.label}
            {t.count !== undefined && t.count > 0 && (
              <span className="bg-red-500/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === 'queue' && <CommentQueue comments={comments} onApprove={approveComment} onReject={rejectComment} />}
      {tab === 'rules' && (
        <RulesPanel
          rules={rules}
          editingRule={editingRule}
          setEditingRule={setEditingRule}
          onToggle={toggleRule}
          onDelete={deleteRule}
          onAdd={addRule}
          onUpdate={(id, field, value) =>
            setRules(rules.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
          }
        />
      )}
      {pendingCount > 0 && tab === 'queue' && (
        <p className="text-xs text-gray-600 text-center">Prototype only — comments shown are sample data, not from a live TikTok account.</p>
      )}
    </div>
  );
}

function sentimentBadge(sentiment: CommentItem['sentiment']) {
  const styles = {
    positive: 'bg-green-500/10 text-green-400',
    neutral: 'bg-gray-500/10 text-gray-400',
    sensitive: 'bg-red-500/10 text-red-400',
  };
  const labels = { positive: 'Positive', neutral: 'Neutral', sensitive: 'Sensitive' };
  return { style: styles[sentiment], label: labels[sentiment] };
}

function replyStatusBadge(status: CommentItem['replyStatus']) {
  const styles = {
    'auto-replied': 'bg-cyan-500/10 text-cyan-400',
    pending: 'bg-amber-500/10 text-amber-400',
    approved: 'bg-green-500/10 text-green-400',
    rejected: 'bg-red-500/10 text-red-400',
  };
  const labels = {
    'auto-replied': 'Auto-replied',
    pending: 'Needs Review',
    approved: 'Approved',
    rejected: 'Rejected',
  };
  return { style: styles[status], label: labels[status] };
}

function CommentQueue({
  comments,
  onApprove,
  onReject,
}: {
  comments: CommentItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'auto-replied' | 'approved'>('all');

  const filtered = comments.filter((c) => (filter === 'all' ? true : c.replyStatus === filter));

  const filters: { id: typeof filter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Needs Review' },
    { id: 'auto-replied', label: 'Auto-replied' },
    { id: 'approved', label: 'Approved' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filter === f.id ? 'bg-cyan-500/15 text-cyan-400' : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((c) => {
          const sBadge = sentimentBadge(c.sentiment);
          const rBadge = replyStatusBadge(c.replyStatus);
          return (
            <div
              key={c.id}
              className="bg-white/[0.03] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full ${c.avatarColor} flex items-center justify-center text-white font-semibold text-sm shrink-0`}>
                  {c.author[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-sm font-medium text-white">{c.author}</span>
                    <span className="text-xs text-gray-600">{c.timestamp}</span>
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs text-gray-500 truncate">{c.videoTitle}</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">{c.text}</p>

                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${sBadge.style}`}>{sBadge.label}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${rBadge.style}`}>{rBadge.label}</span>
                    {c.sentiment === 'sensitive' && (
                      <span className="flex items-center gap-1 text-xs text-red-400/80">
                        <AlertTriangle className="w-3 h-3" />
                        Flagged by keyword filter
                      </span>
                    )}
                  </div>

                  {c.replyText && (
                    <div className="bg-cyan-500/[0.06] border border-cyan-500/15 rounded-lg p-3 flex items-start gap-2.5">
                      <Bot className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-cyan-400 font-medium mb-0.5">Auto-reply</p>
                        <p className="text-sm text-gray-300">{c.replyText}</p>
                      </div>
                    </div>
                  )}

                  {c.replyStatus === 'pending' && (
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => onApprove(c.id)}
                        className="flex items-center gap-1.5 bg-green-500/15 hover:bg-green-500/25 text-green-400 text-sm font-medium px-3.5 py-2 rounded-lg transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        Approve & Reply
                      </button>
                      <button
                        onClick={() => onReject(c.id)}
                        className="flex items-center gap-1.5 bg-red-500/15 hover:bg-red-500/25 text-red-400 text-sm font-medium px-3.5 py-2 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-sm">No comments in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function RulesPanel({
  rules,
  editingRule,
  setEditingRule,
  onToggle,
  onDelete,
  onAdd,
  onUpdate,
}: {
  rules: ReplyRule[];
  editingRule: string | null;
  setEditingRule: (id: string | null) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onUpdate: (id: string, field: 'keywords' | 'reply', value: string[] | string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white">How Auto-Reply Works</h3>
            <p className="text-sm text-gray-500 mt-1">
              When a comment contains any of your keywords, CONTROL sends the matching reply automatically.
              Comments flagged as sensitive (spam, promotions, links) are held for manual approval before any reply is sent.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">Keyword Rules ({rules.length})</h3>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-400 text-sm font-medium px-3.5 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Rule
        </button>
      </div>

      <div className="space-y-3">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`bg-white/[0.03] border rounded-xl p-5 transition-colors ${
              rule.active ? 'border-white/5' : 'border-white/5 opacity-60'
            }`}
          >
            {editingRule === rule.id ? (
              <RuleEditor
                rule={rule}
                onSave={() => setEditingRule(null)}
                onUpdate={(field, value) => onUpdate(rule.id, field, value)}
              />
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {rule.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-xs font-medium bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-md"
                      >
                        {kw}
                      </span>
                    ))}
                    {rule.keywords.length === 0 && (
                      <span className="text-xs text-gray-600">No keywords set</span>
                    )}
                  </div>
                  <div className="bg-cyan-500/[0.06] border border-cyan-500/15 rounded-lg p-3">
                    <p className="text-xs text-cyan-400 font-medium mb-0.5">Reply</p>
                    <p className="text-sm text-gray-300">{rule.reply || 'No reply set'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onToggle(rule.id)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${rule.active ? 'bg-cyan-500' : 'bg-white/10'}`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
                        rule.active ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => setEditingRule(rule.id)}
                    className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(rule.id)}
                    className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RuleEditor({
  rule,
  onSave,
  onUpdate,
}: {
  rule: ReplyRule;
  onSave: () => void;
  onUpdate: (field: 'keywords' | 'reply', value: string[] | string) => void;
}) {
  const [keywordInput, setKeywordInput] = useState(rule.keywords.join(', '));
  const [replyInput, setReplyInput] = useState(rule.reply);

  const handleSave = () => {
    onUpdate('keywords', keywordInput.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean));
    onUpdate('reply', replyInput);
    onSave();
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">Keywords (comma-separated)</label>
        <input
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          placeholder="thanks, helpful, love this"
          className="w-full bg-white/[0.04] border border-white/10 text-white text-sm rounded-lg px-3.5 py-2.5 outline-none focus:border-cyan-500/50 transition-colors placeholder-gray-600"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">Reply Message</label>
        <textarea
          value={replyInput}
          onChange={(e) => setReplyInput(e.target.value)}
          rows={2}
          placeholder="Auto-reply text shown when a comment matches"
          className="w-full bg-white/[0.04] border border-white/10 text-white text-sm rounded-lg px-3.5 py-2.5 outline-none focus:border-cyan-500/50 transition-colors placeholder-gray-600 resize-none"
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-400 text-sm font-medium px-3.5 py-2 rounded-lg transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Rule
        </button>
      </div>
    </div>
  );
}
