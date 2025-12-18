export interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: number;
}

export interface ProcessingState {
  status: 'idle' | 'processing' | 'success' | 'error';
  message?: string;
}

export const STICKER_PRESET_PROMPT = "将图片中的人物变形并设计12种line贴纸。姿势和文字排版要富有创意变化丰富设计独特结合动漫动画中的剧情对话，应为简体文。";
