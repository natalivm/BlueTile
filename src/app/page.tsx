"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-card-border bg-surface/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="group">
              <h1 className="font-display text-3xl tracking-wider text-white group-hover:text-accent-light transition-colors">
                NEWS UPDATES
              </h1>
            </Link>
            <nav className="hidden sm:flex items-center gap-4">
              <Link
                href="/"
                className="font-mono text-xs tracking-widest uppercase text-accent-light border-b border-accent-light pb-0.5"
              >
                Home
              </Link>
              <Link
                href="/nu-analysis"
                className="font-mono text-xs tracking-widest uppercase text-muted hover:text-accent-light transition-colors"
              >
                NU Analysis
              </Link>
              <Link
                href="/thm-review"
                className="font-mono text-xs tracking-widest uppercase text-muted hover:text-accent-light transition-colors"
              >
                THM Review
              </Link>
            </nav>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded tracking-wide uppercase hover:bg-accent-light transition-colors animate-glow-pulse"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Update
            </button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded px-3 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-light animate-pulse-dot" />
              <span className="font-mono text-xs tracking-widest text-accent-light uppercase">
                Live Updates
              </span>
            </div>
            <h2 className="font-display text-[clamp(48px,12vw,88px)] leading-[0.9] tracking-wide text-white mb-6">
              FINANCIAL<br />
              <span className="text-accent-light" style={{ WebkitTextStroke: "1px rgba(255,0,112,0.5)" }}>
                NEWS
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-white/70 font-light max-w-lg leading-relaxed">
              Manage and publish your latest financial news and stock analysis.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Analysis Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-4 mb-10">
        <Link href="/nu-analysis" className="block group">
          <div className="relative overflow-hidden bg-card border border-card-border rounded-lg p-6 sm:p-8 card-glow hover:border-accent/30 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs tracking-widest text-accent-light uppercase">
                  Featured Analysis
                </span>
                <h3 className="font-display text-[clamp(28px,6vw,44px)] leading-none text-white mt-2">
                  NU — IS IT <span className="text-accent-light">A BUY?</span>
                </h3>
                <p className="text-muted text-sm mt-2 font-mono">
                  NYSE: NU &middot; Forward P/E 27x &middot; ROE 31%
                </p>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-2 px-5 py-3 border border-accent/40 text-accent-light font-semibold text-sm rounded uppercase tracking-wide group-hover:bg-accent/10 transition-colors">
                  Read Analysis
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* THM Featured Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-10">
        <Link href="/thm-review" className="block group">
          <div className="relative overflow-hidden bg-card border border-card-border rounded-lg p-6 sm:p-8 card-glow hover:border-accent/30 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs tracking-widest text-accent-light uppercase">
                  New Review
                </span>
                <h3 className="font-display text-[clamp(28px,6vw,44px)] leading-none text-white mt-2">
                  THM — BUY IT <span className="text-accent-light">OR NOT?</span>
                </h3>
                <p className="text-muted text-sm mt-2 font-mono">
                  Int&apos;l Tower Hill Mines &middot; Gold $5,226 &middot; Mkt Cap ~$700M
                </p>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-2 px-5 py-3 border border-accent/40 text-accent-light font-semibold text-sm rounded uppercase tracking-wide group-hover:bg-accent/10 transition-colors">
                  Read Review
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Mobile nav */}
      <div className="sm:hidden max-w-5xl mx-auto px-4 mb-6 flex flex-col gap-2">
        <Link
          href="/nu-analysis"
          className="block text-center font-mono text-xs tracking-widest uppercase text-muted hover:text-accent-light border border-card-border rounded px-4 py-3 transition-colors"
        >
          NU Analysis &rarr;
        </Link>
        <Link
          href="/thm-review"
          className="block text-center font-mono text-xs tracking-widest uppercase text-muted hover:text-accent-light border border-card-border rounded px-4 py-3 transition-colors"
        >
          THM Review &rarr;
        </Link>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-card-border" />
          <span className="font-mono text-xs tracking-widest text-muted uppercase">
            Latest Updates
          </span>
          <div className="flex-1 h-px bg-card-border" />
        </div>

        {/* Add / Edit Form */}
        {showForm && (
          <div className="mb-8 animate-slide-up">
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
