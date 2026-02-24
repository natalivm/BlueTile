"use client";

import { NewsItem } from "@/lib/types";

interface NewsListProps {
  items: NewsItem[];
  onEdit: (item: NewsItem) => void;
  onDelete: (id: string) => void;
}

import { CATEGORY_COLORS } from "@/lib/categories";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function NewsList({ items, onEdit, onDelete }: NewsListProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted font-mono tracking-wide">
        {items.length} update{items.length !== 1 ? "s" : ""}
      </p>
      {items.map((item, i) => (
        <article
          key={item.id}
          className="card-base p-6 hover:border-accent/20 transition-all card-glow animate-slide-up"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Category + date */}
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded text-xs font-semibold tracking-wide uppercase font-mono ${
                    CATEGORY_COLORS[item.category] ?? CATEGORY_COLORS.General
                  }`}
                >
                  {item.category}
                </span>
                <span className="text-xs text-muted/70 font-mono">{formatDate(item.createdAt)}</span>
                {item.updatedAt !== item.createdAt && (
                  <span className="text-xs text-muted/50 italic font-mono">(edited)</span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-lg font-semibold text-white mb-2 leading-tight">{item.title}</h2>

              {/* Content */}
              <p className="text-sm text-white/70 whitespace-pre-wrap leading-relaxed font-light">
                {item.content}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => onEdit(item)}
                title="Edit"
                className="p-2 text-muted/60 hover:text-accent-light hover:bg-accent/10 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={() => onDelete(item.id)}
                title="Delete"
                className="p-2 text-muted/60 hover:text-bear hover:bg-bear/10 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
