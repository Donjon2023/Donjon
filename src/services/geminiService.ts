import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getStoryInfo() {
  const prompt = `
    请提供关于《古剑奇谭网络版》列传“风叶寄远”的剧情概要，以及以下角色的简介：
    1. 辰溪长老
    2. 寄生相·隐
    3. 煌羽
    4. 崔远之
    5. 李令双
    
    请以 JSON 格式返回，包含 "story" (剧情概要) 和 "characters" (角色数组，每个角色包含 name, title, description)。
    用中文回答。
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error fetching story info:", error);
    // Fallback data if AI fails
    return {
      story: "《风叶寄远》讲述了在古剑奇谭网络版的世界中，关于天罡、斩风等门派与寄生相势力之间的恩怨纠葛。故事围绕着远古的秘密与当下的危机展开，展现了仙侠世界的宏大叙事。",
      characters: [
        { name: "辰溪长老", title: "妙法长老", description: "博学多才，深谙五行八卦，是门派中的智囊人物。" },
        { name: "寄生相·隐", title: "神秘反派", description: "寄生相势力的核心人物，行踪诡秘，拥有强大的暗影力量。" },
        { name: "煌羽", title: "大妖", description: "羽族强者，性格孤傲，与人类势力有着复杂的过往。" },
        { name: "崔远之", title: "天罡校尉", description: "正直勇敢，统领天罡将士，誓死守护世间和平。" },
        { name: "李令双", title: "镇国游仙公主", description: "皇室公主，天罡弟子，肩负着国家与门派的双重使命。" }
      ]
    };
  }
}
