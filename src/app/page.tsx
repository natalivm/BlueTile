"use client";

import { useState, useEffect } from "react";
import { NewsItem } from "@/lib/types";
import NewsForm from "@/components/NewsForm";
import NewsList from "@/components/NewsList";

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("news-items");
      if (stored) {
        setNews(JSON.parse(stored));
      }
    } catch {
      // Ignore corrupted storage data
    }
  }, []);

  const saveToStorage = (items: NewsItem[]) => {
    localStorage.setItem("news-items", JSON.stringify(items));
    setNews(items);
  };

  const handleAdd = (item: Omit<NewsItem, "id" | "createdAt" | "updatedAt">) => {
    const newItem: NewsItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveToStorage([newItem, ...news]);
    setShowForm(false);
  };

  const handleEdit = (item: Omit<NewsItem, "id" | "createdAt" | "updatedAt">) => {
    if (!editingItem) return;
    const updated = news.map((n) =>
      n.id === editingItem.id
        ? { ...n, ...item, updatedAt: new Date().toISOString() }
        : n
    );
    saveToStorage(updated);
    setEditingItem(null);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;
    saveToStorage(news.filter((n) => n.id !== id));
  };

  const handleStartEdit = (item: NewsItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">📰 News Updates</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage and publish your latest news</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Update
            </button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Add / Edit Form */}
        {showForm && (
          <div className="mb-8">
            <NewsForm
              initialValues={editingItem ?? undefined}
              onSubmit={editingItem ? handleEdit : handleAdd}
              onCancel={handleCancel}
            />
          </div>
        )}

        {/* News list */}
        <NewsList
          items={news}
          onEdit={handleStartEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}
