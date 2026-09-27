import { personalInfo } from "@/data/personalInfo";

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  isVoiceInput?: boolean;
}

// Build comprehensive system prompt from personalInfo
export const buildSystemPrompt = (): string => {
  return `You are the friendly, intelligent AI portfolio avatar representing Vishal Choudhary.
Your goal is to answer questions from recruiters, fellow developers, and visitors accurately, enthusiastically, and professionally based on Vishal's profile.

Here is Vishal's verified information:
- Name: ${personalInfo.name}
- Role: ${personalInfo.role}
- Education: ${personalInfo.education.degree} in ${personalInfo.education.field} at ${personalInfo.education.institution} (${personalInfo.education.semester}, CGPA: ${personalInfo.education.cgpa})
- Location: ${personalInfo.contact.location}
- Email: ${personalInfo.contact.email}
- WhatsApp/Phone: ${personalInfo.contact.phone}
- LinkedIn: ${personalInfo.contact.linkedin}
- GitHub: ${personalInfo.contact.github}
- Instagram: ${personalInfo.contact.instagram}
- Resume Link: ${personalInfo.contact.resumeUrl}
- Competitive Programming Stats: LeetCode Rating ${personalInfo.stats.leetcodeRating}, CodeChef Rating ${personalInfo.stats.codechefRating}, 450+ solved problems.
- Skills:
  * Languages: ${personalInfo.skills.languages.join(", ")}
  * Frameworks: ${personalInfo.skills.frameworks.join(", ")}
  * Databases: ${personalInfo.skills.databases.join(", ")}
  * Tools: ${personalInfo.skills.tools.join(", ")}
  * AI/ML: ${personalInfo.skills.ai_ml.join(", ")}
- Key Projects:
${personalInfo.projects.map((p, i) => `  ${i + 1}. ${p.title} (${p.date}): ${p.description} Tech Stack: ${p.techStack.join(", ")}. GitHub: ${p.github || "N/A"}`).join("\n")}
- Certifications:
${personalInfo.certifications.map((c) => `  * ${c.title} by ${c.issuer} (${c.date})`).join("\n")}
- Achievements:
${personalInfo.achievements.map((a) => `  * ${a.title} (${a.subtitle}) - ${a.description} [${a.date}]`).join("\n")}

Guidelines:
1. Speak in a helpful, warm, and concise tone as Vishal's portfolio assistant (or speaking in first person for Vishal when asked directly).
2. Format lists with markdown bullet points when helpful.
3. If someone asks how to hire or get in touch, provide his email (${personalInfo.contact.email}) or WhatsApp link.
4. Keep answers brief (2-4 sentences or clear bullet points) so they are easy to read and listen to.`;
};

// Client-side intelligent response engine (instant, zero-latency, works offline/without API key)
export const getLocalIntelligentResponse = (userInput: string): string => {
  const query = userInput.toLowerCase().trim();

  // 1. Check exact or high-similarity matches from FAQs
  for (const faq of personalInfo.faqs) {
    for (const q of faq.questions) {
      if (query.includes(q) || q.includes(query)) {
        return faq.answer;
      }
    }
  }

  // 2. Specific Intent Analysis

  // Greetings
  if (/^(hi|hello|hey|greetings|hola|namaste|good morning|good evening|sup)\b/i.test(query)) {
    return "Hello! 👋 I'm Vishal's AI Assistant. How can I help you today? You can ask me about Vishal's projects, skills, education, certifications, or how to contact him!";
  }

  // Who is / About
  if (query.includes("who") || query.includes("about") || query.includes("introduce") || query.includes("background")) {
    return `Vishal Choudhary is a Full Stack Developer & ML Engineer pursuing B.Tech CSE at Parul Institute of Technology (CGPA: 8.45, 5th Sem). He has built full-stack applications with React, Node.js, and Django, and solved 450+ DSA problems (1720 LeetCode rating).`;
  }

  // Projects
  if (query.includes("project") || query.includes("built") || query.includes("portfolio") || query.includes("app") || query.includes("work")) {
    if (query.includes("crop") || query.includes("agriculture")) {
      const p = personalInfo.projects[0];
      return `🌾 **${p.title}** (${p.date})\n${p.description}\n**Tech Stack:** ${p.techStack.join(", ")}\n[GitHub Repository](${p.github})`;
    }
    if (query.includes("movie") || query.includes("recommender")) {
      const p = personalInfo.projects[1];
      return `🎬 **${p.title}** (${p.date})\n${p.description}\n**Tech Stack:** ${p.techStack.join(", ")}\n[GitHub Repository](${p.github})`;
    }
    if (query.includes("wanderlust") || query.includes("airbnb") || query.includes("hotel")) {
      const p = personalInfo.projects[2];
      return `🏡 **${p.title}** (${p.date})\n${p.description}\n**Tech Stack:** ${p.techStack.join(", ")}\n[Live Demo](${p.live}) | [GitHub](${p.github})`;
    }
    if (query.includes("fraud") || query.includes("credit card")) {
      const p = personalInfo.projects[4];
      return `🛡️ **${p.title}** (${p.date})\n${p.description}\n**Tech Stack:** ${p.techStack.join(", ")}\n[GitHub](${p.github})`;
    }
    if (query.includes("contract") || query.includes("labour") || query.includes("job")) {
      const p = personalInfo.projects[3];
      return `🔨 **${p.title}** (${p.date})\n${p.description}\n**Tech Stack:** ${p.techStack.join(", ")}\n[GitHub](${p.github})`;
    }
    if (query.includes("spam") || query.includes("mail")) {
      const p = personalInfo.projects[5];
      return `📧 **${p.title}** (${p.date})\n${p.description}\n**Tech Stack:** ${p.techStack.join(", ")}\n[Live Demo](${p.live})`;
    }

    return `Vishal has developed several top-tier projects:\n• 🌾 **AI Crop Yield Prediction** (Django & ML)\n• 🎬 **Movie Recommender System** (Streamlit & TMDB API)\n• 🏡 **Wanderlust Airbnb Clone** (Full Stack MERN/EJS)\n• 🔨 **ContractConnect** (Hackathon location-based job portal)\n• 🛡️ **Credit Card Fraud Detection** (99.96% accuracy with SMOTE)\n• 📧 **Mail Spam Classifier** (NLP & TF-IDF)\n\nAsk me about any specific project for details!`;
  }

  // Skills
  if (query.includes("skill") || query.includes("stack") || query.includes("language") || query.includes("tech") || query.includes("know") || query.includes("expert")) {
    return `Here is a summary of Vishal's technical skillset:\n• **Languages:** ${personalInfo.skills.languages.join(", ")}\n• **Frameworks & Libs:** ${personalInfo.skills.frameworks.join(", ")}\n• **Databases:** ${personalInfo.skills.databases.join(", ")}\n• **AI/ML:** ${personalInfo.skills.ai_ml.join(", ")}\n• **Tools:** ${personalInfo.skills.tools.join(", ")}`;
  }

  // Education / College / CGPA
  if (query.includes("education") || query.includes("college") || query.includes("university") || query.includes("cgpa") || query.includes("study") || query.includes("degree")) {
    return `🎓 Vishal is currently studying **${personalInfo.education.degree} in ${personalInfo.education.field}** at **${personalInfo.education.institution}** (Currently in ${personalInfo.education.semester}) with an impressive **${personalInfo.education.cgpa} CGPA**.`;
  }

  // Contact / Hire / Phone / Email
  if (query.includes("contact") || query.includes("email") || query.includes("phone") || query.includes("whatsapp") || query.includes("hire") || query.includes("reach") || query.includes("message")) {
    return `📬 You can connect with Vishal directly:\n• **Email:** [${personalInfo.contact.email}](mailto:${personalInfo.contact.email})\n• **WhatsApp:** [Message on WhatsApp](https://wa.me/919142359287)\n• **LinkedIn:** [Vishal Choudhary](${personalInfo.contact.linkedin})\n• **Location:** ${personalInfo.contact.location}`;
  }

  // LeetCode / Coding / DSA
  if (query.includes("leetcode") || query.includes("codechef") || query.includes("dsa") || query.includes("problem") || query.includes("rank") || query.includes("rating")) {
    return `🏆 **Competitive Programming Highlights:**\n• **LeetCode Rating:** ${personalInfo.stats.leetcodeRating}\n• **CodeChef Rating:** ${personalInfo.stats.codechefRating}\n• **Total Problems Solved:** ${personalInfo.stats.problemsSolved} in Java & C++\n• Certified **Smart Coder (Silver)** by Smart Interviews.`;
  }

  // Certifications
  if (query.includes("certif") || query.includes("course") || query.includes("aws") || query.includes("ibm") || query.includes("udemy")) {
    return `📜 **Key Certifications:**\n${personalInfo.certifications.map(c => `• **${c.title}** — *${c.issuer}* (${c.date})`).join("\n")}`;
  }

  // Achievements
  if (query.includes("achieve") || query.includes("hackathon") || query.includes("award") || query.includes("win") || query.includes("prize")) {
    return `🏅 **Major Achievements & Hackathons:**\n${personalInfo.achievements.map(a => `• **${a.title}** (${a.subtitle}) — ${a.description}`).join("\n")}`;
  }

  // Resume / CV
  if (query.includes("resume") || query.includes("cv") || query.includes("download")) {
    return `📄 You can view and download Vishal's updated resume here: [Download Resume](${personalInfo.contact.resumeUrl})`;
  }

  // Location
  if (query.includes("location") || query.includes("where") || query.includes("city") || query.includes("live") || query.includes("based")) {
    return `📍 Vishal is based in **${personalInfo.contact.location}**. He is open to remote roles as well as relocation opportunities!`;
  }

  // Fallback smart response
  return `Vishal Choudhary is a Full Stack Developer & ML Engineer with experience in React, Node.js, Django, Machine Learning, and strong DSA fundamentals (450+ solved problems, 1720 LeetCode rating).\n\nFeel free to ask about his **projects**, **skills**, **certifications**, **hackathons**, or how to **contact** him!`;
};

// Generative API integration (Gemini) with automatic local fallback
export const generateAIResponse = async (
  messages: ChatMessage[],
  customApiKey?: string
): Promise<string> => {
  const lastMessage = messages[messages.length - 1]?.text || "";
  const apiKey = customApiKey || (import.meta as any).env?.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    // Return smart instant local matcher
    return getLocalIntelligentResponse(lastMessage);
  }

  try {
    const formattedContents = [
      {
        role: "user",
        parts: [{ text: `${buildSystemPrompt()}\n\nPlease answer the user's latest query: "${lastMessage}"` }]
      }
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: formattedContents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300
          }
        })
      }
    );

    if (!response.ok) {
      console.warn("Gemini API request failed, falling back to local engine.");
      return getLocalIntelligentResponse(lastMessage);
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (candidateText && candidateText.trim().length > 0) {
      return candidateText.trim();
    }

    return getLocalIntelligentResponse(lastMessage);
  } catch (error) {
    console.warn("Error calling Gemini API:", error);
    return getLocalIntelligentResponse(lastMessage);
  }
};

// Voice Speech-to-Text Recognition Helper
export class VoiceRecognition {
  private recognition: any = null;
  public isSupported: boolean = false;

  constructor() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.isSupported = true;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = "en-US";
    }
  }

  public startListening(
    onResult: (transcript: string) => void,
    onError?: (err: any) => void,
    onEnd?: () => void
  ) {
    if (!this.isSupported || !this.recognition) {
      if (onError) onError(new Error("Speech recognition is not supported in this browser."));
      return;
    }

    this.recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      onResult(transcript);
    };

    this.recognition.onerror = (event: any) => {
      if (onError) onError(event);
    };

    this.recognition.onend = () => {
      if (onEnd) onEnd();
    };

    try {
      this.recognition.start();
    } catch (e) {
      console.warn("Voice recognition error starting:", e);
    }
  }

  public stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.warn("Voice recognition stop error:", e);
      }
    }
  }
}

// Text-to-Speech Voice Synthesizer
export class TextToSpeechSynthesizer {
  public static isSupported(): boolean {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  public static speak(
    text: string,
    onStart?: () => void,
    onEnd?: () => void
  ) {
    if (!this.isSupported()) return;

    // Clean markdown characters for pleasant speech
    const cleanText = text
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // link markdown
      .replace(/[\*\_#`~]/g, "") // markdown symbols
      .replace(/https?:\/\/\S+/g, ""); // URLs

    window.speechSynthesis.cancel(); // cancel any active speech

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = "en-US";

    if (onStart) utterance.onstart = onStart;
    if (onEnd) utterance.onend = onEnd;
    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  public static stop() {
    if (this.isSupported()) {
      window.speechSynthesis.cancel();
    }
  }
}
