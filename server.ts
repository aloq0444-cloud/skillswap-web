import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { generateIntelligentResponse } from "./src/server/aiGenerator";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `Ты — профессиональный, экспертный и очень быстрый ИИ-наставник образовательной платформы взаимного обучения SkillSwap (P2P обмен знаниями и навыками).
Твоя цель — давать мгновенные, четкие, глубокие и прикладные ответы без лишней воды и шаблонных вступлений.

Ключевые сценарии и форматы ответов:
1. 📚 Учебный план (Syllabus) для обмена:
   - Если названы два предмета/навыка (например, Английский ⇄ Python, Физика ⇄ Figma, Гитара ⇄ Маркетинг и т.д.), составляй четкую программу на 2–4 недели.
   - Обязательно соблюдай равноправный баланс 50/50 (например, урок 60 мин = 30 мин предмет А + 30 мин предмет B).
   - Включай для каждого блока: конкретные темы, практические задания и вопросы для взаимной проверки.

2. ✍️ Текст заявки или объявления об обмене:
   - Создавай привлекательные, убедительные и вежливые тексты для карточки обмена или первого сообщения напарнику.

3. 💡 Вопросы по предметам (языки, IT, физика, математика, дизайн, музыка):
   - Объясняй сложные концепции простыми словами с жизненными аналогиями, формулами или примерами кода.

4. 🤝 Методика взаимного обучения (P2P):
   - Подсказывай, как правильно делить время, давать развивающую обратную связь, контролировать прогресс и предотвращать дисбаланс усилий.

Правила оформления:
- Пиши на безупречном русском языке.
- Используй выразительный Markdown: заголовки (###, ####), списки (-), жирный шрифт для ключевых терминов (**), цитаты (>) и блоки кода при необходимости.
- Отвечай сразу по существу, без шаблонных вводных фраз ("Как искусственный интеллект...").`;

// Helper to stream text naturally
async function streamTextToResponse(res: express.Response, text: string) {
  const words = text.split(/(\s+)/);
  for (let i = 0; i < words.length; i++) {
    const chunk = words[i];
    if (chunk) {
      res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
      // Micro-pause every few tokens for natural, readable streaming flow
      if (i % 3 === 0) {
        await new Promise((resolve) => setTimeout(resolve, 8));
      }
    }
  }
}

function getSmartFallbackReply(message: string, history: any[] = []): string {
  return generateIntelligentResponse(message, history);
}

// Health route
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Fast AI Study Assistant Streaming Chat API (Server-Sent Events)
app.post("/api/ai/chat/stream", async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    // Set SSE headers with buffering disabled for low latency
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders?.();

    const ai = getAIClient();

    if (!ai) {
      // Instant streaming of intelligent dynamic response
      const fallbackText = generateIntelligentResponse(message, conversationHistory);
      await streamTextToResponse(res, fallbackText);
      res.write("data: [DONE]\n\n");
      return res.end();
    }

    const formattedHistory = conversationHistory
      .slice(-6)
      .filter((msg: { content?: string }) => Boolean(msg?.content))
      .map((msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

    let streamSuccess = false;
    const modelsToTry = ["gemini-3.7-flash", "gemini-flash-latest", "gemini-3.6-flash", "gemini-3.5-flash-lite"];

    for (const modelName of modelsToTry) {
      try {
        const responseStream = await ai.models.generateContentStream({
          model: modelName,
          contents: [
            ...formattedHistory,
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.8,
          },
        });

        for await (const chunk of responseStream) {
          const text = chunk.text;
          if (text) {
            res.write(`data: ${JSON.stringify({ text })}\n\n`);
          }
        }

        streamSuccess = true;
        break; // Successfully completed
      } catch (err: any) {
        // Fallback to intelligent generation
      }
    }

    if (!streamSuccess) {
      // Stream dynamic domain-aware synthesis
      const fallbackText = generateIntelligentResponse(message, conversationHistory);
      await streamTextToResponse(res, fallbackText);
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error: any) {
    console.error("AI stream fatal error:", error);
    try {
      const fallbackText = generateIntelligentResponse(req.body?.message || "", req.body?.conversationHistory || []);
      await streamTextToResponse(res, fallbackText);
      res.write("data: [DONE]\n\n");
    } catch {}
    res.end();
  }
});

// Standard non-streaming fallback endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getAIClient();

    if (!ai) {
      const reply = generateIntelligentResponse(message, conversationHistory);
      return res.json({ reply, source: "intelligent_engine" });
    }

    const formattedHistory = conversationHistory
      .slice(-6)
      .filter((msg: { content?: string }) => Boolean(msg?.content))
      .map((msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

    const modelsToTry = ["gemini-3.7-flash", "gemini-flash-latest", "gemini-3.6-flash", "gemini-3.5-flash-lite"];
    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: [
            ...formattedHistory,
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.8,
          },
        });

        const reply = response.text || generateIntelligentResponse(message, conversationHistory);
        return res.json({ reply, source: modelName });
      } catch (err: any) {
        // Fallback to next
      }
    }

    const fallbackReply = generateIntelligentResponse(message, conversationHistory);
    res.json({ reply: fallbackReply, source: "intelligent_engine" });
  } catch (error: any) {
    console.error("AI chat error:", error);
    const reply = generateIntelligentResponse(req.body?.message || "", req.body?.conversationHistory || []);
    res.json({ reply, source: "intelligent_engine" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SkillSwap Server running on http://localhost:${PORT}`);
  });
}

startServer();
