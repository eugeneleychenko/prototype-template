export type LinkedInPostType = "value" | "quote" | "question";

export type ExtractKind = "quote" | "stat" | "story";

export type TonePreset = "thought-leadership" | "witty" | "casual";

export type NavView = "intake" | "studio" | "plans";

export interface ExtractedSnippet {
  id: string;
  kind: ExtractKind;
  text: string;
  timestamp?: string;
}

export interface LinkedInDraft {
  id: string;
  type: LinkedInPostType;
  body: string;
}

export interface TweetDraft {
  id: string;
  index: number;
  isHook: boolean;
  body: string;
}

export interface TitleOption {
  id: string;
  label: string;
  text: string;
}

export interface ContentVersion<T> {
  id: string;
  savedAt: string;
  label: string;
  data: T;
}
