import { useCallback, useMemo, useState } from "react";
import { AppShell } from "./components/AppShell";
import { IntakeView, type IntakeFormState } from "./components/IntakeView";
import { StudioView } from "./components/StudioView";
import { StudioPlaceholder } from "./components/StudioPlaceholder";
import { PlansView } from "./components/PlansView";
import type { NavView } from "./types";
import {
  mockBlogMarkdown,
  mockBlogTitleOptions,
  mockExtracts,
  mockLinkedInPosts,
  mockLinkedInTitleOptions,
  mockThread,
} from "./data/mockContent";
import { plainTextToEditableHtml } from "./utils/html";

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

function nowLabel(): string {
  return new Date().toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    day: "numeric",
  });
}

function buildLiSnapshot(html: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const id of Object.keys(html)) out[id] = html[id];
  return { ...out };
}

export default function App() {
  const [view, setView] = useState<NavView>("intake");
  const [tier, setTier] = useState<"free" | "pro">("free");
  const [episodesUsed, setEpisodesUsed] = useState(0);
  const [packReady, setPackReady] = useState(false);
  const [intakeFeedback, setIntakeFeedback] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const [intakeForm, setIntakeForm] = useState<IntakeFormState>({
    source: "upload",
    audioUrl: "https://cdn.signalstatic.fm/episodes/e42-consistency.mp3",
    transcript: "",
    useTranscript: false,
    tone: "thought-leadership",
    styleSamples:
      "We don't chase virality—we build trust in public. Here's the framework we use after every 60-minute interview…",
  });

  const [blogMarkdown, setBlogMarkdown] = useState(mockBlogMarkdown);
  const [blogTitleId, setBlogTitleId] = useState(mockBlogTitleOptions[0]!.id);
  const [linkedInTitleId, setLinkedInTitleId] = useState(mockLinkedInTitleOptions[0]!.id);

  const initialLinkedInHtml = useMemo(() => {
    const m: Record<string, string> = {};
    for (const p of mockLinkedInPosts) m[p.id] = plainTextToEditableHtml(p.body);
    return m;
  }, []);

  const initialThreadHtml = useMemo(() => {
    const m: Record<string, string> = {};
    for (const t of mockThread) m[t.id] = plainTextToEditableHtml(t.body);
    return m;
  }, []);

  const [linkedInHtml, setLinkedInHtml] = useState(initialLinkedInHtml);
  const [threadHtml, setThreadHtml] = useState(initialThreadHtml);

  const [versions, setVersions] = useState<{
    blog: VersionEntry[];
    linkedIn: VersionEntry[];
    thread: VersionEntry[];
  }>({ blog: [], linkedIn: [], thread: [] });

  const [exportToast, setExportToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setExportToast(msg);
    window.setTimeout(() => setExportToast(null), 2800);
  }, []);

  const snapshotNow = useCallback((): ContentSnapshot => {
    return {
      blog: blogMarkdown,
      linkedIn: buildLiSnapshot(linkedInHtml),
      thread: buildLiSnapshot(threadHtml),
    };
  }, [blogMarkdown, linkedInHtml, threadHtml]);

  const handleSaveVersion = (surface: "blog" | "linkedIn" | "thread") => {
    const snap = snapshotNow();
    const id = `${surface}-${Date.now()}`;
    const entry: VersionEntry = {
      id,
      savedAt: nowLabel(),
      summary:
        surface === "blog"
          ? `Blog · ${blogMarkdown.replace(/\s+/g, " ").trim().slice(0, 42)}…`
          : surface === "linkedIn"
            ? `LinkedIn set (${mockLinkedInPosts.length} posts)`
            : `Thread (${mockThread.length} tweets)`,
      snapshot:
        surface === "blog"
          ? { blog: snap.blog, linkedIn: { ...linkedInHtml }, thread: { ...threadHtml } }
          : surface === "linkedIn"
            ? { blog: blogMarkdown, linkedIn: { ...snap.linkedIn }, thread: { ...threadHtml } }
            : { blog: blogMarkdown, linkedIn: { ...linkedInHtml }, thread: { ...snap.thread } },
    };
    setVersions((v) => ({ ...v, [surface]: [entry, ...v[surface]] }));
    showToast("Version saved");
  };

  const handleRestoreVersion = (surface: "blog" | "linkedIn" | "thread", versionId: string) => {
    const list = versions[surface];
    const found = list.find((x) => x.id === versionId);
    if (!found) return;
    setBlogMarkdown(found.snapshot.blog);
    setLinkedInHtml({ ...found.snapshot.linkedIn });
    setThreadHtml({ ...found.snapshot.thread });
    showToast("Restored version");
  };

  const handleGenerate = () => {
    if (tier === "free" && episodesUsed >= 1) return;
    setGenerating(true);
    setIntakeFeedback(null);
    window.setTimeout(() => {
      setGenerating(false);
      setPackReady(true);
      if (tier === "free") setEpisodesUsed(1);
      setBlogMarkdown(mockBlogMarkdown);
      setLinkedInHtml({ ...initialLinkedInHtml });
      setThreadHtml({ ...initialThreadHtml });
      setBlogTitleId(mockBlogTitleOptions[0]!.id);
      setLinkedInTitleId(mockLinkedInTitleOptions[0]!.id);
      setIntakeFeedback("Pack ready — blog, LinkedIn, X thread, and extracts queued for the studio.");
      setView("studio");
      window.setTimeout(() => setIntakeFeedback(null), 3200);
    }, 900);
  };

  const handleExportMarkdown = () => {
    const title = mockBlogTitleOptions.find((t) => t.id === blogTitleId)?.text ?? "Blog export";
    const front = `---\ntitle: "${title.replace(/"/g, '\\"')}"\n---\n\n`;
    const blob = new Blob([front + blogMarkdown], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "clay-blog-export.md";
    a.click();
    URL.revokeObjectURL(a.href);
    showToast("Markdown downloaded");
  };

  const handleExportPdf = () => {
    const text = blogMarkdown.replace(/\r\n/g, "\n");
    const w = window.open("", "_blank");
    if (w) {
      const safe = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      w.document.write(
        `<!DOCTYPE html><html><head><title>Export</title></head><body><pre style="font-family:ui-monospace,monospace;padding:24px;white-space:pre-wrap">${safe}</pre></body></html>`
      );
      w.document.close();
      w.print();
    }
    showToast("Print dialog opened (PDF via browser)");
  };

  const handleCopyBlog = async () => {
    try {
      await navigator.clipboard.writeText(blogMarkdown);
      showToast("Blog Markdown copied");
    } catch {
      showToast("Copy blocked — select text manually");
    }
  };

  const handleScheduleLinkedIn = () => {
    showToast("LinkedIn scheduler connected (mock) — draft handoff queued");
  };

  const handleScheduleTwitter = () => {
    showToast("X composer deep link prepared (mock)");
  };

  return (
    <AppShell active={view} onNavigate={setView}>
      {view === "intake" && (
        <IntakeView
          form={intakeForm}
          onChange={(patch) => setIntakeForm((f) => ({ ...f, ...patch }))}
          onGenerate={handleGenerate}
          feedback={intakeFeedback}
          isGenerating={generating}
          episodesUsedThisMonth={episodesUsed}
          tier={tier}
        />
      )}
      {view === "studio" &&
        (packReady ? (
          <StudioView
            blogMarkdown={blogMarkdown}
            onBlogChange={setBlogMarkdown}
            blogTitleOptions={mockBlogTitleOptions}
            blogTitleId={blogTitleId}
            onBlogTitleSelect={setBlogTitleId}
            linkedInPosts={mockLinkedInPosts}
            linkedInHtml={linkedInHtml}
            onLinkedInHtml={(id, html) => setLinkedInHtml((h) => ({ ...h, [id]: html }))}
            linkedInTitleOptions={mockLinkedInTitleOptions}
            linkedInTitleId={linkedInTitleId}
            onLinkedInTitleSelect={setLinkedInTitleId}
            thread={mockThread}
            threadHtml={threadHtml}
            onThreadHtml={(id, html) => setThreadHtml((h) => ({ ...h, [id]: html }))}
            extracts={mockExtracts}
            versions={versions}
            onSaveVersion={handleSaveVersion}
            onRestoreVersion={handleRestoreVersion}
            exportToast={exportToast}
            onExportMarkdown={handleExportMarkdown}
            onExportPdf={handleExportPdf}
            onCopyBlog={handleCopyBlog}
            onScheduleLinkedIn={handleScheduleLinkedIn}
            onScheduleTwitter={handleScheduleTwitter}
          />
        ) : (
          <StudioPlaceholder onGoIntake={() => setView("intake")} />
        ))}
      {view === "plans" && (
        <PlansView
          tier={tier}
          onSelectTier={(t) => {
            setTier(t);
            if (t === "pro") setEpisodesUsed(0);
            showToast(t === "pro" ? "Pro enabled for this demo" : "Free tier selected");
          }}
          episodesUsedThisMonth={episodesUsed}
          onNavigateStudio={() => setView("studio")}
        />
      )}
    </AppShell>
  );
}
