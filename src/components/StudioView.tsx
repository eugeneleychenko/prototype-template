import { useState } from "react";
import type { LinkedInDraft, ExtractKind, ExtractedSnippet, TweetDraft, TitleOption } from "../types";
import { BlogEditor } from "./BlogEditor";
import { RichTextEditor } from "./RichTextEditor";
import { TitlePicker } from "./TitlePicker";
import { VersionList } from "./VersionList";
import { ExportBar } from "./ExportBar";
import { ExtractPanel } from "./ExtractPanel";
import { QuoteCard } from "./QuoteCard";
import { mockEpisode } from "../data/mockContent";

interface ContentSnapshot {
  blog: string;
  linkedIn: Record<string, string>;
  thread: Record<string, string>;
}

interface VersionEntry {
  id: string;
  savedAt: string;
  summary: string;
  snapshot: ContentSnapshot;
}

interface StudioViewProps {
  blogMarkdown: string;
  onBlogChange: (v: string) => void;
  blogTitleOptions: TitleOption[];
  blogTitleId: string;
  onBlogTitleSelect: (id: string) => void;
  linkedInPosts: LinkedInDraft[];
  linkedInHtml: Record<string, string>;
  onLinkedInHtml: (id: string, html: string) => void;
  linkedInTitleOptions: TitleOption[];
  linkedInTitleId: string;
  onLinkedInTitleSelect: (id: string) => void;
  thread: TweetDraft[];
  threadHtml: Record<string, string>;
  onThreadHtml: (id: string, html: string) => void;
  extracts: ExtractedSnippet[];
  versions: {
    blog: VersionEntry[];
    linkedIn: VersionEntry[];
    thread: VersionEntry[];
  };
  onSaveVersion: (surface: "blog" | "linkedIn" | "thread") => void;
  onRestoreVersion: (surface: "blog" | "linkedIn" | "thread", id: string) => void;
  exportToast: string | null;
  onExportMarkdown: () => void;
  onExportPdf: () => void;
  onCopyBlog: () => void;
  onScheduleLinkedIn: () => void;
  onScheduleTwitter: () => void;
}

export function StudioView({
  blogMarkdown,
  onBlogChange,
  blogTitleOptions,
  blogTitleId,
  onBlogTitleSelect,
  linkedInPosts,
  linkedInHtml,
  onLinkedInHtml,
  linkedInTitleOptions,
  linkedInTitleId,
  onLinkedInTitleSelect,
  thread,
  threadHtml,
  onThreadHtml,
  extracts,
  versions,
  onSaveVersion,
  onRestoreVersion,
  exportToast,
  onExportMarkdown,
  onExportPdf,
  onCopyBlog,
  onScheduleLinkedIn,
  onScheduleTwitter,
}: StudioViewProps) {
  const selectedBlogTitle = blogTitleOptions.find((t) => t.id === blogTitleId)?.text ?? "";
  const selectedLiTitle = linkedInTitleOptions.find((t) => t.id === linkedInTitleId)?.text ?? "";

  const [extractFilter, setExtractFilter] = useState<ExtractKind | "all">("all");
  const [showTimestamps, setShowTimestamps] = useState(true);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-amber-400/90 font-semibold">Episode pack</p>
            <h1 className="mt-2 text-2xl font-semibold text-white tracking-tight">{mockEpisode.title}</h1>
            <p className="mt-1 text-sm text-slate-500">
              {mockEpisode.showName} · {mockEpisode.durationMins} min · {mockEpisode.inputSummary}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <QuoteCard
              quote="Clarity comes from repetition."
              attribution={`${mockEpisode.showName} · Quote card`}
              variant="linkedin"
              accent="sky"
            />
            <QuoteCard
              quote="Your podcast isn't a content problem — it's a distribution design problem."
              attribution="Hook → X thread card"
              variant="twitter"
              accent="amber"
            />
          </div>
        </div>
      </section>

      <ExportBar
        toast={exportToast}
        onExportMarkdown={onExportMarkdown}
        onExportPdf={onExportPdf}
        onCopyBlog={onCopyBlog}
        onScheduleLinkedIn={onScheduleLinkedIn}
        onScheduleTwitter={onScheduleTwitter}
      />

      <ExtractPanel
        items={extracts}
        filter={extractFilter}
        onFilter={setExtractFilter}
        showTimestamps={showTimestamps}
        onToggleTimestamps={() => setShowTimestamps((s) => !s)}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">Long-form blog · Markdown</h2>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onSaveVersion("blog")}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 text-white hover:bg-white/15 border border-white/10"
              >
                Save blog version
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Target <span className="text-slate-400">1,500–1,800 words</span> in production · Selected headline:{" "}
            <span className="text-amber-200/90">{selectedBlogTitle}</span>
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <TitlePicker titles={blogTitleOptions} selectedId={blogTitleId} onSelect={onBlogTitleSelect} />
            </div>
            <div className="md:col-span-3">
              <BlogEditor markdown={blogMarkdown} onChange={onBlogChange} />
            </div>
          </div>
          <VersionList
            label="Blog versions"
            versions={versions.blog.map((v) => ({
              id: v.id,
              savedAt: v.savedAt,
              summary: v.summary,
            }))}
            onRestore={(id) => onRestoreVersion("blog", id)}
          />
        </section>

        <aside className="space-y-4">
          <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Channel checklist</h3>
          <ul className="text-sm text-slate-400 space-y-2 leading-relaxed">
            <li>Blog: narrative + SEO, H2s, internal pull quotes</li>
            <li>LinkedIn: 4–6 posts, value / quote / question mix</li>
            <li>X: 10–12 tweets, hook-led, proof in the tail</li>
          </ul>
        </aside>
      </div>

      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">LinkedIn · Rich text</h2>
          <button
            type="button"
            onClick={() => onSaveVersion("linkedIn")}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 text-white hover:bg-white/15 border border-white/10 w-fit"
          >
            Save LinkedIn set version
          </button>
        </div>
        <p className="text-xs text-slate-500">
          Optional carousel titles: <span className="text-slate-400">{selectedLiTitle}</span>
        </p>
        <div className="grid md:grid-cols-5 gap-4">
          <div className="md:col-span-1">
            <TitlePicker titles={linkedInTitleOptions} selectedId={linkedInTitleId} onSelect={onLinkedInTitleSelect} />
          </div>
          <div className="md:col-span-4 grid sm:grid-cols-2 gap-4">
            {linkedInPosts.map((post) => (
              <div key={post.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wide px-2 py-0.5 rounded-md ring-1 ${
                      post.type === "value"
                        ? "bg-emerald-500/15 text-emerald-200 ring-emerald-400/30"
                        : post.type === "quote"
                          ? "bg-sky-500/15 text-sky-200 ring-sky-400/30"
                          : "bg-violet-500/15 text-violet-200 ring-violet-400/30"
                    }`}
                  >
                    {post.type}
                  </span>
                </div>
                <RichTextEditor
                  valueHtml={linkedInHtml[post.id] ?? ""}
                  onChangeHtml={(html) => onLinkedInHtml(post.id, html)}
                  minHeightClass="min-h-[100px]"
                />
              </div>
            ))}
          </div>
        </div>
        <VersionList
          label="LinkedIn versions (full set)"
          versions={versions.linkedIn.map((v) => ({
            id: v.id,
            savedAt: v.savedAt,
            summary: v.summary,
          }))}
          onRestore={(id) => onRestoreVersion("linkedIn", id)}
        />
      </section>

      <section className="space-y-4 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">X thread · Rich text (10–12)</h2>
          <button
            type="button"
            onClick={() => onSaveVersion("thread")}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 text-white hover:bg-white/15 border border-white/10 w-fit"
          >
            Save thread version
          </button>
        </div>
        <div className="space-y-3">
          {thread.map((t) => (
            <div
              key={t.id}
              className={`rounded-2xl border p-4 ${
                t.isHook ? "border-amber-400/40 bg-amber-500/5" : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-slate-500">/{t.index}</span>
                {t.isHook && (
                  <span className="text-[10px] uppercase font-bold text-amber-200 tracking-wide">Hook</span>
                )}
              </div>
              <RichTextEditor
                valueHtml={threadHtml[t.id] ?? ""}
                onChangeHtml={(html) => onThreadHtml(t.id, html)}
                minHeightClass="min-h-[72px]"
              />
            </div>
          ))}
        </div>
        <VersionList
          label="Thread versions"
          versions={versions.thread.map((v) => ({
            id: v.id,
            savedAt: v.savedAt,
            summary: v.summary,
          }))}
          onRestore={(id) => onRestoreVersion("thread", id)}
        />
      </section>
    </div>
  );
}
