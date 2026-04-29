import type {
  ExtractedSnippet,
  LinkedInDraft,
  TitleOption,
  TweetDraft,
} from "../types";

export const mockEpisode = {
  title: "The Compound Gains from Consistency",
  showName: "Signal & Static",
  durationMins: 54,
  inputSummary: "MP3 uploaded · Whisper large-v3 transcript",
};

export const mockBlogMarkdown = `## The invisible leverage of tiny wins

Most creators chase **viral spikes** when the real multiplier is *boring consistency*. In this episode, we unpack why small weekly publish rhythms beat heroic monthly bursts — especially for podcasters sitting on 30–90 minutes of raw insight per episode.

### Why your backlog is already an asset

Long-form audio forces you to think in complete arguments. Readers feel that depth when you repurpose honestly: keep the stories, keep the tension, keep the numbers that made you pause while recording.

#### A framework you can steal today

1. **One thesis** per blog post.
2. **Two supporting stories** from the recording.
3. **One stat or proof point** pulled verbatim when possible.

> "The audience doesn't reward effort — they reward clarity. Clarity comes from repetition."

### SEO without sounding like a robot

Search intent for topics like *creator consistency* and *podcast repurposing* is mixed. Lead with a human hook in the first 120 characters, then layer keywords where they'd naturally appear in conversation — never stocked.

---

### Key takeaways

- Ship smaller surfaces more often; let your long episode anchor the narrative.
- Extract quotes and stats at transcription time; they're your social proof.
- Tone adaptation (from your past posts) isn't vanity — it's *recognition*.

*Generated outline targets ~1,650 words in production; this preview is abbreviated for the prototype.*`;

export const mockBlogTitleOptions: TitleOption[] = [
  {
    id: "t1",
    label: "SEO-forward",
    text: "Consistency Beats Virality for Long-Form Creators (Here's the Data)",
  },
  {
    id: "t2",
    label: "Narrative",
    text: "The Long Game: Turning Every Episode Into a Content System",
  },
  {
    id: "t3",
    label: "Contrarian",
    text: "Stop Chasing Spikes — Your Podcast Already Has Compound Interest",
  },
];

export const mockLinkedInPosts: LinkedInDraft[] = [
  {
    id: "li1",
    type: "value",
    body: "Creators under-price consistency because it's not cinematic. But the teams winning on LinkedIn right now are publishing *predictably* — not perfectly. If you have one long podcast episode, you already have the spine for a week's worth of POV posts.",
  },
  {
    id: "li2",
    type: "quote",
    body: 'The line that landed hardest in the episode: "Clarity comes from repetition." That\'s not a slogan — it\'s why your best episodes feel effortless on the third listen.',
  },
  {
    id: "li3",
    type: "question",
    body: "Honest question for podcasters: Would you rather post one *perfect* carousel a month, or four 'good enough' posts that each point back to a single thesis from your show? I think the ladder ages better — curious what you're seeing.",
  },
  {
    id: "li4",
    type: "value",
    body: "Repurposing isn't about shortening — it's about *re-framing*. Blog for search intent, LinkedIn for professional conversation, X for hooks. Same insight, three front doors.",
  },
  {
    id: "li5",
    type: "quote",
    body: 'Another keeper: "Small weekly publish rhythms beat heroic monthly bursts." That maps to what we see in retention curves — especially for B2B podcasts.',
  },
];

export const mockLinkedInTitleOptions: TitleOption[] = [
  { id: "lt1", label: "Professional hook", text: "The leverage creators ignore: weekly rhythm" },
  { id: "lt2", label: "Curiosity", text: "One episode → a week of POV (without sounding robotic)" },
  { id: "lt3", label: "Direct", text: "Why your podcast is a content system, not a backlog" },
];

export const mockThread: TweetDraft[] = [
  { id: "tw1", index: 1, isHook: true, body: "Your podcast isn't a 'content problem.' It's a *distribution design* problem. One long episode should open three doors — not one." },
  { id: "tw2", index: 2, isHook: false, body: "Blog: search + narrative. LinkedIn: professional convo. X: hooks + receipts. Same thesis. Different front doors." },
  { id: "tw3", index: 3, isHook: false, body: "Most creators chase viral spikes. The compound gains come from boring consistency — especially when episodes are 30–90 mins of real argument." },
  { id: "tw4", index: 4, isHook: false, body: "Extraction matters: soundbites, stats, stories. If you don't surface them at transcription time, you lose them in the edit." },
  { id: "tw5", index: 5, isHook: false, body: "Voice training isn't vanity. Readers *feel* when cadence matches. 3–5 past posts/examples beat a generic 'professional' toggle." },
  { id: "tw6", index: 6, isHook: false, body: "Quote cards aren't decoration — they're proof of human texture. Start with templates; level up to custom visuals later." },
  { id: "tw7", index: 7, isHook: false, body: "MVP export checklist: Markdown/PDF for long-form, clipboard for speed, scheduling hooks for LinkedIn + X. Analytics can wait." },
  { id: "tw8", index: 8, isHook: false, body: "If your repurposed posts read like slop, the model wasn't the only issue — the *brief* was. Channel fit is a product feature, not an afterthought." },
  { id: "tw9", index: 9, isHook: false, body: "Hot take: 'good enough' weekly beats 'perfect' monthly because trust compounds in public. Your backlog is leverage if you use it." },
  { id: "tw10", index: 10, isHook: false, body: "Clay for Content idea: upload audio or link, optional transcript, pick your tone, learn from examples — then edit with versions before export. That's the loop." },
  { id: "tw11", index: 11, isHook: false, body: "Reply with your show length + niche — I'll tell you the *one* surface I'd master first if I were in your shoes." },
];

export const mockExtracts: ExtractedSnippet[] = [
  { id: "ex1", kind: "quote", text: "Clarity comes from repetition.", timestamp: "00:18:42" },
  { id: "ex2", kind: "stat", text: "Teams publishing on a weekly cadence saw ~2.1× higher returning listeners in our benchmark panel (n=120 indie shows).", timestamp: "00:31:05" },
  { id: "ex3", kind: "story", text: "The host describes shelving 40 hours of interviews until a single framework clicked — then the backlog became a book outline overnight.", timestamp: "00:44:17" },
  { id: "ex4", kind: "quote", text: "Small weekly publish rhythms beat heroic monthly bursts.", timestamp: "00:09:55" },
];
