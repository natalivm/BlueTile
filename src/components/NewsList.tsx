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
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">📭</div>
        <h3 className="text-lg font-medium text-gray-700 mb-1">No news updates yet</h3>
        <p className="text-sm text-gray-500">Click &quot;Add Update&quot; to publish your first news item.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">{items.length} update{items.length !== 1 ? "s" : ""}</p>
      {items.map((item) => (
        <article
          key={item.id}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Category + date */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                    CATEGORY_COLORS[item.category] ?? CATEGORY_COLORS.General
                  }`}
                >
                  {item.category}
                </span>
                <span className="text-xs text-gray-400">{formatDate(item.createdAt)}</span>
                {item.updatedAt !== item.createdAt && (
                  <span className="text-xs text-gray-400 italic">(edited)</span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h2>

              {/* Content */}
              <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{item.content}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => onEdit(item)}
                title="Edit"
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
