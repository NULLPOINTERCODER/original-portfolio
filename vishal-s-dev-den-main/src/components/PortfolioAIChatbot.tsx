import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  Key,
  Check
} from "lucide-react";
import {
  ChatMessage,
  generateAIResponse,
  VoiceRecognition,
  TextToSpeechSynthesizer
} from "@/lib/chatbotService";

const quickPrompts = [
  "👋 Tell me about Vishal",
  "💻 What are your top skills?",
  "🚀 Show me your key projects",
  "🏆 LeetCode & Coding stats",
  "📜 Certifications & Hackathons",
  "📬 How to contact or hire Vishal?"
];

export const PortfolioAIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "👋 Hi there! I'm **Vishal's AI Assistant**. You can ask me anything about Vishal's projects, technical skills, education, competitive programming, or how to get in touch!\n\nYou can **type your question** or **tap the microphone 🎙️** to speak.",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem("vishal_ai_api_key") || "";
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [hasVoiceSupport, setHasVoiceSupport] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const voiceRecognitionRef = useRef<VoiceRecognition | null>(null);

  // Initialize Voice
  useEffect(() => {
    voiceRecognitionRef.current = new VoiceRecognition();
    setHasVoiceSupport(voiceRecognitionRef.current.isSupported);

    return () => {
      TextToSpeechSynthesizer.stop();
    };
  }, []);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Send message handler
  const handleSendMessage = async (textToSend?: string, isVoice = false) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date(),
      isVoiceInput: isVoice
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // If currently speaking, stop
    TextToSpeechSynthesizer.stop();
    setIsSpeaking(false);

    try {
      const responseText = await generateAIResponse(
        [...messages, userMessage],
        apiKey
      );

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: responseText,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMessage]);

      // Speak response if speech is enabled
      if (speechEnabled) {
        TextToSpeechSynthesizer.speak(
          responseText,
          () => setIsSpeaking(true),
          () => setIsSpeaking(false)
        );
      }
    } catch (err) {
      console.error("Error generating bot reply:", err);
      const errorMessage: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: "bot",
        text: "I'm having trouble retrieving that answer right now. Feel free to contact Vishal directly at vpatel914235@gmail.com!",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Toggle Voice Input
  const handleToggleListening = () => {
    if (!voiceRecognitionRef.current || !hasVoiceSupport) {
      alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    if (isListening) {
      voiceRecognitionRef.current.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      // Stop ongoing voice output
      TextToSpeechSynthesizer.stop();
      setIsSpeaking(false);

      voiceRecognitionRef.current.startListening(
        (transcript: string) => {
          setIsListening(false);
          if (transcript.trim()) {
            handleSendMessage(transcript, true);
          }
        },
        (error: any) => {
          console.warn("Speech recognition error:", error);
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );
    }
  };

  // Speak a specific message
  const handleSpeakMessage = (text: string) => {
    if (isSpeaking) {
      TextToSpeechSynthesizer.stop();
      setIsSpeaking(false);
    } else {
      TextToSpeechSynthesizer.speak(
        text,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  // Reset Chat
  const handleResetChat = () => {
    TextToSpeechSynthesizer.stop();
    setIsSpeaking(false);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        text: "Chat reset! How else can I help you learn about Vishal today?",
        timestamp: new Date()
      }
    ]);
  };

  // Save Gemini Key
  const handleSaveKey = () => {
    if (keyInput.trim()) {
      localStorage.setItem("vishal_ai_api_key", keyInput.trim());
      setApiKey(keyInput.trim());
    } else {
      localStorage.removeItem("vishal_ai_api_key");
      setApiKey("");
    }
    setShowKeyModal(false);
  };

  // Render text with clickable markdown links
  const renderMessageContent = (content: string) => {
    // Convert markdown bullet points and links
    const lines = content.split("\n");

    return lines.map((line, idx) => {
      // Check for link pattern [text](url)
      const parts = [];
      const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <a
            key={`link-${match.index}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-semibold inline-flex items-center gap-1 mx-1"
          >
            {match[1]}
            <ExternalLink size={12} className="inline" />
          </a>
        );
        lastIndex = regex.lastIndex;
      }

      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const formattedParts = parts.map((part, pIdx) => {
        if (typeof part === "string") {
          // Format bold **text**
          const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
          return boldParts.map((bPart, bIdx) => {
            if (bPart.startsWith("**") && bPart.endsWith("**")) {
              return (
                <strong key={`b-${bIdx}`} className="font-semibold text-foreground">
                  {bPart.slice(2, -2)}
                </strong>
              );
            }
            return bPart;
          });
        }
        return part;
      });

      return (
        <div key={idx} className={line.startsWith("•") || line.startsWith("-") ? "pl-2 py-0.5" : "py-0.5"}>
          {formattedParts}
        </div>
      );
    });
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-primary/40 shadow-lg text-xs font-medium text-foreground/90 backdrop-blur-md cursor-pointer hover:border-primary transition-all"
            onClick={() => setIsOpen(true)}
          >
            <Sparkles size={13} className="text-yellow-400 animate-spin-slow" />
            <span>Ask Vishal AI · Voice & Chat</span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(139,92,246,0.6)" }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              TextToSpeechSynthesizer.stop();
              setIsSpeaking(false);
            }
          }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all"
          style={{
            background: "linear-gradient(135deg, #8B5CF6, #D946EF)",
            boxShadow: "0 0 25px rgba(139, 92, 246, 0.45)"
          }}
          aria-label="Toggle AI Chat"
        >
          {/* Pulsing ring animation */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-secondary opacity-40 animate-ping pointer-events-none" />

          {isOpen ? (
            <X size={24} className="relative z-10" />
          ) : (
            <div className="relative z-10 flex items-center justify-center">
              <Bot size={28} />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-background rounded-full" />
            </div>
          )}
        </motion.button>
      </div>

      {/* Main Chat Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[410px] h-[580px] max-h-[82vh] rounded-2xl flex flex-col overflow-hidden glass-card border border-primary/30 shadow-2xl backdrop-blur-2xl"
            style={{
              background: "rgba(18, 14, 30, 0.88)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(139,92,246,0.25)"
            }}
          >
            {/* Header */}
            <div className="relative z-10 px-4 py-3.5 border-b border-border/50 bg-card/60 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/40 p-0.5 bg-primary/10">
                    <img
                      src="/hero_avatar.jpeg"
                      alt="Vishal AI"
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        // fallback if image not loaded
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-background rounded-full" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-foreground">Vishal's AI Assistant</h3>
                    <Sparkles size={13} className="text-yellow-400" />
                  </div>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    Online · Voice & Text
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                {/* Voice Mute Toggle */}
                <button
                  onClick={() => {
                    const nextState = !speechEnabled;
                    setSpeechEnabled(nextState);
                    if (!nextState) {
                      TextToSpeechSynthesizer.stop();
                      setIsSpeaking(false);
                    }
                  }}
                  title={speechEnabled ? "Mute Voice Readout" : "Enable Voice Readout"}
                  className={`p-2 rounded-lg transition-colors ${
                    speechEnabled
                      ? "text-primary hover:bg-primary/10"
                      : "text-muted-foreground hover:bg-muted/20"
                  }`}
                >
                  {speechEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
                </button>

                {/* API Key settings modal */}
                <button
                  onClick={() => setShowKeyModal(true)}
                  title="Configure Gemini API Key"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                >
                  <Key size={17} />
                </button>

                {/* Reset Chat */}
                <button
                  onClick={handleResetChat}
                  title="Clear Chat"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                >
                  <RotateCcw size={16} />
                </button>

                {/* Minimize */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                >
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>

            {/* Speaking Wave Banner */}
            <AnimatePresence>
              {isSpeaking && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-primary/15 border-b border-primary/20 px-4 py-1.5 flex items-center justify-between text-xs text-primary font-medium overflow-hidden"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex gap-1 items-end h-3">
                      <span className="w-1 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1 h-3.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                    <span>Speaking response...</span>
                  </div>
                  <button
                    onClick={() => {
                      TextToSpeechSynthesizer.stop();
                      setIsSpeaking(false);
                    }}
                    className="text-[11px] hover:underline font-semibold"
                  >
                    Stop Audio
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-primary/20">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary mt-1">
                      <Bot size={15} />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-primary to-purple-600 text-white rounded-tr-sm shadow-md"
                        : "glass-card border border-border/70 text-foreground/90 rounded-tl-sm shadow-sm"
                    }`}
                  >
                    {renderMessageContent(msg.text)}

                    {/* Bot Message controls (Read Aloud) */}
                    {msg.sender === "bot" && (
                      <div className="mt-2 pt-1.5 border-t border-border/30 flex items-center justify-between text-[10px] text-muted-foreground">
                        <span>{msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                        <button
                          onClick={() => handleSpeakMessage(msg.text)}
                          className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                        >
                          <Volume2 size={12} />
                          <span>Listen</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {msg.sender === "user" && (
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center text-secondary mt-1">
                      <User size={15} />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-muted-foreground text-xs pl-2"
                >
                  <Bot size={14} className="text-primary animate-pulse" />
                  <span className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                    <span>Thinking...</span>
                  </span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            {messages.length <= 3 && (
              <div className="px-4 py-2 border-t border-border/30 bg-card/20 overflow-x-auto scrollbar-none flex gap-1.5 flex-nowrap">
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(prompt)}
                    className="flex-shrink-0 px-2.5 py-1 text-[11px] rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 hover:border-primary/40 transition-all text-left whitespace-nowrap"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Listening Live Overlay */}
            <AnimatePresence>
              {isListening && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="px-4 py-2 bg-gradient-to-r from-red-500/20 via-pink-500/20 to-purple-500/20 border-t border-red-500/30 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-red-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span>Listening to your voice... Speak now</span>
                  </div>
                  <button
                    onClick={handleToggleListening}
                    className="text-[11px] text-white px-2 py-0.5 rounded bg-red-500/80 hover:bg-red-600 transition-colors"
                  >
                    Cancel
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Bar */}
            <div className="p-3 border-t border-border/50 bg-card/50 backdrop-blur-md">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                {/* Voice Input Button */}
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={handleToggleListening}
                  className={`p-2.5 rounded-xl border transition-all flex items-center justify-center ${
                    isListening
                      ? "bg-red-500 text-white border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse"
                      : "bg-card border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/10"
                  }`}
                  title={isListening ? "Stop listening" : "Talk with Voice"}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </motion.button>

                {/* Text Input */}
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={isListening ? "Listening..." : "Ask me anything about Vishal..."}
                  disabled={isTyping || isListening}
                  className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-card/80 border border-border rounded-xl focus:outline-none focus:border-primary/60 text-foreground placeholder:text-muted-foreground/60 transition-all"
                />

                {/* Send Button */}
                <motion.button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white disabled:opacity-40 disabled:hover:scale-100 shadow-md transition-all flex items-center justify-center"
                >
                  <Send size={16} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gemini API Key Configuration Modal */}
      <AnimatePresence>
        {showKeyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card border border-primary/30 max-w-md w-full p-6 rounded-2xl shadow-2xl relative"
            >
              <button
                onClick={() => setShowKeyModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-3 text-primary">
                <Key size={20} />
                <h3 className="text-lg font-bold text-foreground">AI Configuration (Optional)</h3>
              </div>

              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                By default, this chatbot uses a built-in zero-latency local engine with all of Vishal's portfolio details.
                You can optionally paste a free Google Gemini API key below to unlock advanced conversational generative responses.
              </p>

              <div className="space-y-3">
                <input
                  type="password"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder={apiKey ? "••••••••••••••••••••" : "Paste Gemini API Key (e.g. AIzaSy...)"}
                  className="w-full px-3.5 py-2.5 text-xs bg-card border border-border rounded-xl focus:outline-none focus:border-primary text-foreground"
                />

                <div className="flex items-center justify-between text-xs pt-2">
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <span>Get Free Gemini Key</span>
                    <ExternalLink size={12} />
                  </a>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowKeyModal(false)}
                      className="px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:bg-card text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveKey}
                      className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-1.5 shadow-md"
                    >
                      <Check size={14} />
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioAIChatbot;
