
import { Phrase } from './types';

export const PHRASES: Phrase[] = [
  // Daily Interaction
  { id: 1, english: "How long have you been living here?", chinese: "你在这里住了多久了？", category: "日常交流" },
  { id: 2, english: "Do you have any special plans for the weekend?", chinese: "你周末有什么特别的计划吗？", category: "日常交流" },
  { id: 3, english: "Would you mind taking a picture of us?", chinese: "你介意帮我们拍张照片吗？", category: "日常交流" },
  { id: 4, english: "Can you speak a little slower, please?", chinese: "你能说慢一点吗？", category: "日常交流" },
  { id: 5, english: "Could you tell me what this word means?", chinese: "你能告诉我这个词是什么意思吗？", category: "日常交流" },
  { id: 11, english: "Something's come up.", chinese: "发生了一些事。", category: "日常交流" },
  { id: 12, english: "Long time no see.", chinese: "好久不见。", category: "日常交流" },
  { id: 22, english: "Kill two birds with one stone.", chinese: "一举两得。", category: "日常交流" },
  { id: 38, english: "I'm on a diet.", chinese: "我正在节食。", category: "日常交流" },
  { id: 69, english: "I'm broke.", chinese: "我身无分文。", category: "日常交流" },
  { id: 74, english: "It's a piece of cake.", chinese: "这很容易。", category: "日常交流" },

  // Dining
  { id: 247, english: "Could you recommend a good place to eat around here?", chinese: "你能推荐一个附近好吃的地方吗？", category: "餐饮场景" },
  { id: 248, english: "I'd like to make a reservation for two at 7 pm.", chinese: "我想预订两个人的座位，晚上七点。", category: "餐饮场景" },
  { id: 252, english: "Can I have the check, please?", chinese: "我可以结账了吗？", category: "餐饮场景" },
  { id: 254, english: "For here or to go?", chinese: "在这儿吃还是带走？", category: "餐饮场景" },

  // Transport
  { id: 256, english: "What time does the bus arrive?", chinese: "公交车几点到？", category: "交通出行" },
  { id: 259, english: "How long does it take to get to the city center from here?", chinese: "从这里到市中心要多长时间？", category: "交通出行" },

  // Shopping
  { id: 265, english: "Can I pay with a credit card, or is it cash only?", chinese: "我可以用信用卡付款吗，还是只能用现金？", category: "购物服务" },
  { id: 267, english: "Could I try this on, please?", chinese: "我可以试穿一下这个吗？", category: "购物服务" },

  // Travel
  { id: 272, english: "Excuse me, where is the nearest supermarket?", chinese: "请问最近的超市在哪里？", category: "旅行与住宿" },
  { id: 306, english: "Where can I check in?", chinese: "在哪儿办理登记手续？", category: "旅行与住宿" },

  // More samples to fill out the experience
  { id: 77, english: "It's incredible.", chinese: "令人难以置信。", category: "日常交流" },
  { id: 81, english: "I've had enough.", chinese: "我已经吃饱了/我受够了。", category: "日常交流" },
  { id: 92, english: "I've changed my mind.", chinese: "我已经改变主意。", category: "日常交流" },
  { id: 111, english: "What a coincidence!", chinese: "真是太巧了！", category: "日常交流" }
];

export const CATEGORIES = Array.from(new Set(PHRASES.map(p => p.category)));

export const CATEGORY_ICONS: Record<string, string> = {
  "日常交流": "💬",
  "餐饮场景": "🍴",
  "交通出行": "🚗",
  "购物服务": "🛍️",
  "旅行与住宿": "🏨",
  "实用信息": "ℹ️",
  "其他服务": "🛠️"
};
