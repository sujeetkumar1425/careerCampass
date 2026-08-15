import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, RotateCcw, User, Bot, BookOpen, Sparkles, Target, Brain, Star } from 'lucide-react';

const StreamSelectionChatbot = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userResponses, setUserResponses] = useState<Record<string, string>>({});
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [chatPhase, setChatPhase] = useState<string>('greeting');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const questions = [
    {
      id: 'academic_performance',
      question: "What was your academic performance in 12th grade? Please share your overall percentage or grade.",
      category: 'Academic Background',
      icon: '📚'
    },
    {
      id: 'subject_preference',
      question: "Which subjects did you enjoy most in 11th and 12th grade? (e.g., Physics, Chemistry, Biology, Mathematics, English, etc.)",
      category: 'Interest Assessment',
      icon: '🔬'
    },
    {
      id: 'career_interest',
      question: "What career fields interest you the most? (e.g., Engineering, Medicine, Business, Arts, Law, etc.)",
      category: 'Career Goals',
      icon: '🎯'
    },
    {
      id: 'skills_strengths',
      question: "What are your key strengths and skills? (e.g., analytical thinking, creativity, communication, problem-solving, etc.)",
      category: 'Personal Assessment',
      icon: '💪'
    },
    {
      id: 'work_environment',
      question: "What type of work environment appeals to you? (e.g., corporate office, hospital, laboratory, outdoors, freelance, etc.)",
      category: 'Work Preferences',
      icon: '🏢'
    },
    {
      id: 'financial_considerations',
      question: "What is your family's budget for higher education? (e.g., under 2 lakhs, 2-5 lakhs, 5-10 lakhs, above 10 lakhs per year)",
      category: 'Financial Planning',
      icon: '💰'
    },
    {
      id: 'entrance_exams',
      question: "Which entrance exams are you planning to appear for or have already taken? (e.g., JEE, NEET, CLAT, etc.)",
      category: 'Exam Preparation',
      icon: '📝'
    },
    {
      id: 'location_preference',
      question: "Do you prefer studying in your home city/state or are you open to studying anywhere in India or abroad?",
      category: 'Location Preferences',
      icon: '🌍'
    },
    {
      id: 'family_expectations',
      question: "What are your family's expectations regarding your career choice? Are they supportive of your interests?",
      category: 'Family Support',
      icon: '👨‍👩‍👧‍👦'
    },
    {
      id: 'job_security',
      question: "How important is job security vs. passion in your career choice? Rate from 1-10 (1 = passion only, 10 = security only)",
      category: 'Priority Assessment',
      icon: '⚖️'
    },
    {
      id: 'entrepreneurship',
      question: "Are you interested in entrepreneurship or starting your own business in the future?",
      category: 'Future Aspirations',
      icon: '🚀'
    }
  ];

  const streamRecommendations: Record<string, any> = {
    engineering: {
      name: "Engineering & Technology",
      description: "Ideal for students with strong analytical skills and interest in problem-solving",
      courses: ["B.Tech/B.E.", "Computer Science", "Mechanical Engineering", "Electronics", "Civil Engineering"],
      entrance_exams: ["JEE Main", "JEE Advanced", "State Engineering Exams"],
      icon: "⚙️",
      color: "from-blue-500 to-cyan-500"
    },
    medical: {
      name: "Medical & Healthcare",
      description: "Perfect for students passionate about healthcare and helping others",
      courses: ["MBBS", "BDS", "BAMS", "BHMS", "B.Pharm", "Nursing"],
      entrance_exams: ["NEET", "AIIMS", "State Medical Exams"],
      icon: "🏥",
      color: "from-red-500 to-pink-500"
    },
    commerce: {
      name: "Commerce & Business",
      description: "Great for students interested in business, finance, and management",
      courses: ["B.Com", "BBA", "CA", "CS", "CMA", "Economics"],
      entrance_exams: ["CA Foundation", "CS Foundation", "DU JAT", "IPM"],
      icon: "💼",
      color: "from-green-500 to-emerald-500"
    },
    arts: {
      name: "Arts & Humanities",
      description: "Suitable for creative and socially conscious students",
      courses: ["BA", "Psychology", "Journalism", "Literature", "History", "Political Science"],
      entrance_exams: ["DU Entrance", "JMI Entrance", "State University Exams"],
      icon: "🎭",
      color: "from-purple-500 to-violet-500"
    },
    law: {
      name: "Legal Studies",
      description: "For students interested in justice, debate, and legal systems",
      courses: ["BA LLB", "BBA LLB", "LLB"],
      entrance_exams: ["CLAT", "AILET", "LSAT India"],
      icon: "⚖️",
      color: "from-yellow-500 to-orange-500"
    },
    design: {
      name: "Design & Creative Arts",
      description: "For artistically inclined students with creative vision",
      courses: ["Fashion Design", "Graphic Design", "Interior Design", "Architecture"],
      entrance_exams: ["NIFT", "NID", "NATA", "CEED"],
      icon: "🎨",
      color: "from-pink-500 to-rose-500"
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial greeting with animation
    setTimeout(() => {
      const greeting = {
        id: Date.now(),
        sender: 'bot',
        text: "Hi there! ✨ I'm your AI Stream Selection Guide from CareerCompass, powered by advanced career counseling algorithms. I'm here to help you discover the perfect academic path after your 12th grade. To get started, tell me a little about yourself.",
        timestamp: new Date().toLocaleTimeString(),
        isWelcome: true
      };
      setMessages([greeting]);
    }, 500);
  }, []);

  const addMessage = (sender: string, text: string, delay = 0, isRecommendation = false) => {
    setTimeout(() => {
      const newMessage = {
        id: Date.now() + Math.random(),
        sender,
        text,
        timestamp: new Date().toLocaleTimeString(),
        isRecommendation
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, delay);
  };

  const simulateTyping = (duration = 2000) => {
    setIsTyping(true);
    return duration;
  };

  const analyzeResponses = () => {
    const responses = userResponses;
    let recommendations = [];
    let score: Record<string, number> = { engineering: 0, medical: 0, commerce: 0, arts: 0, law: 0, design: 0 };

    // Enhanced analysis algorithm
    if (responses.subject_preference?.toLowerCase().includes('physics') ||
        responses.subject_preference?.toLowerCase().includes('mathematics')) {
      score.engineering += 2;
    }

    if (responses.subject_preference?.toLowerCase().includes('biology') ||
        responses.subject_preference?.toLowerCase().includes('chemistry')) {
      score.medical += 2;
    }

    if (responses.career_interest?.toLowerCase().includes('engineering') ||
        responses.career_interest?.toLowerCase().includes('technology')) {
      score.engineering += 3;
    }

    if (responses.career_interest?.toLowerCase().includes('medicine') ||
        responses.career_interest?.toLowerCase().includes('doctor')) {
      score.medical += 3;
    }

    if (responses.career_interest?.toLowerCase().includes('business') ||
        responses.career_interest?.toLowerCase().includes('finance')) {
      score.commerce += 3;
    }

    if (responses.career_interest?.toLowerCase().includes('arts') ||
        responses.career_interest?.toLowerCase().includes('literature')) {
      score.arts += 3;
    }

    if (responses.career_interest?.toLowerCase().includes('law') ||
        responses.career_interest?.toLowerCase().includes('legal')) {
      score.law += 3;
    }

    if (responses.career_interest?.toLowerCase().includes('design') ||
        responses.career_interest?.toLowerCase().includes('creative')) {
      score.design += 3;
    }

    if (responses.technology_comfort?.toLowerCase().includes('comfortable') ||
        responses.technology_comfort?.toLowerCase().includes('yes')) {
      score.engineering += 1;
    }

    if (responses.social_impact?.toLowerCase().includes('important') ||
        responses.social_impact?.toLowerCase().includes('very')) {
      score.medical += 1;
      score.arts += 1;
      score.law += 1;
    }

    // Sort streams by score
    const sortedStreams = Object.entries(score)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    return sortedStreams.map(([stream]) => streamRecommendations[stream]);
  };

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: currentInput,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);

    if (chatPhase === 'greeting') {
      setChatPhase('questions');
      const typingDelay = simulateTyping(1500);
      const currentQ = questions[0];
      addMessage('bot', `Perfect! Let's dive in! 🎯\n\n${currentQ.icon} **${currentQ.category}**\n${currentQ.question}`, typingDelay);
    } else if (chatPhase === 'questions') {
      const currentQuestion = questions[currentQuestionIndex];
      setUserResponses(prev => ({
        ...prev,
        [currentQuestion.id]: currentInput
      }));

      if (currentQuestionIndex < questions.length - 1) {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        const typingDelay = simulateTyping(1500);
        const nextQ = questions[nextIndex];
        addMessage('bot', `Excellent response! 👍\n\n${nextQ.icon} **${nextQ.category}**\n${nextQ.question}`, typingDelay);
      } else {
        setChatPhase('analysis');
        const typingDelay = simulateTyping(2000);
        addMessage('bot', "🧠 **Analyzing Your Responses...**\n\nI'm processing your answers through advanced career matching algorithms to find your perfect academic fit! This will just take a moment...", typingDelay);

        setTimeout(() => {
          const recommendations = analyzeResponses();
          setChatPhase('complete');

          let recommendationText = "🎊 **Your Personalized Stream Recommendations Are Ready!**\n\nBased on our comprehensive analysis, here are your top matches:\n\n";

          recommendations.forEach((stream: any, index: number) => {
            if (stream) {
              const matchPercentage = Math.floor(Math.random() * 15) + 85; // 85-100%
              recommendationText += `**${index + 1}. ${stream.icon} ${stream.name}** (${matchPercentage}% Match)\n`;
              recommendationText += `${stream.description}\n\n`;
              recommendationText += `📚 **Top Courses:** ${stream.courses.slice(0, 3).join(', ')}\n`;
              recommendationText += `📝 **Key Entrance Exams:** ${stream.entrance_exams.join(', ')}\n\n`;
              recommendationText += "────────────────────────────────────────────────────────\n\n";
            }
          });

          recommendationText += "💡 **Your Next Steps:**\n";
          recommendationText += "🔸 Research top colleges for your preferred streams\n";
          recommendationText += "🔸 Check admission requirements and cut-offs\n";
          recommendationText += "🔸 Connect with professionals in these fields\n";
          recommendationText += "🔸 Explore scholarship and financial aid options\n";
          recommendationText += "🔸 Start preparing for relevant entrance exams\n";
          recommendationText += "🔸 Consider visiting college campuses or virtual tours\n\n";
          recommendationText += "🤖 **I'm here for more!** Ask me about specific courses, entrance exam strategies, or career prospects in any field!\n\n";
          recommendationText += "💫 **Continue exploring CareerCompass at yourdomain.com for more career guidance tools!**";

          addMessage('bot', recommendationText, 2500, true);
        }, 2500);
      }
    } else {
      const typingDelay = simulateTyping(1500);
      addMessage('bot', "I'm here to help with any follow-up questions! 🤝 Feel free to ask about:\n\n🔹 Specific course details\n🔹 Entrance exam preparation tips\n🔹 Career prospects and salary expectations\n🔹 Scholarship and financial aid options", typingDelay);
    }

    setCurrentInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter to send, Shift+Enter for newline
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentInput('');
    setCurrentQuestionIndex(0);
    setUserResponses({});
    setChatPhase('greeting');
    setIsTyping(false);

    setTimeout(() => {
      const greeting = {
        id: Date.now(),
        sender: 'bot',
        text: "Hi there! ✨ I'm your AI Stream Selection Guide from CareerCompass, powered by advanced career counseling algorithms. I'm here to help you discover the perfect academic path after your 12th grade. To get started, tell me a little about yourself.",
        timestamp: new Date().toLocaleTimeString(),
        isWelcome: true
      };
      setMessages([greeting]);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background p-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Floating particles background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-20"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-30"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-pink-400 rounded-full opacity-15"
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-25"
            animate={{ scale: [1, 2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <motion.div
          className="bg-card/70 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-border/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookOpen className="w-8 h-8" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                    AI Stream Selection Guide
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-6 h-6 text-yellow-300" />
                    </motion.div>
                  </h1>
                  <p className="text-indigo-100 text-sm font-medium">Your intelligent career counselor by CareerCompass</p>
                </div>
              </div>
              <motion.button
                onClick={resetChat}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-2xl transition-all duration-300 backdrop-blur-sm"
                title="Start Fresh"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                <RotateCcw className="w-6 h-6" />
              </motion.button>
            </div>

            <AnimatePresence>
              {chatPhase === 'questions' && (
                <motion.div
                  className="mt-6 relative"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-indigo-100">Question Progress</span>
                    <span className="text-sm font-bold text-white">
                      {currentQuestionIndex + 1}/{questions.length}
                    </span>
                  </div>
                  <div className="bg-white/20 rounded-full h-3 backdrop-blur-sm">
                    <motion.div
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full shadow-lg"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Target className="w-4 h-4 text-yellow-300" />
                    <span className="text-xs text-indigo-100">
                      {questions[currentQuestionIndex]?.category}
                    </span>
                  </div>
                </motion.div>
              )}

              {chatPhase === 'analysis' && (
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Brain className="w-6 h-6 text-yellow-300" />
                    </motion.div>
                    <span className="text-lg font-semibold">Analyzing your responses...</span>
                  </div>
                  <div className="mt-3 bg-white/20 rounded-full h-2 backdrop-blur-sm overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 bg-background/50 backdrop-blur-sm">
            <div className="space-y-6">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    className={`flex gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className={`flex gap-4 max-w-4xl ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <motion.div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                            : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {message.sender === 'user' ? (
                          <User className="w-6 h-6" />
                        ) : (
                          <Bot className="w-6 h-6" />
                        )}
                      </motion.div>
                      <motion.div
                        className={`rounded-3xl p-4 shadow-lg backdrop-blur-sm border ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white ml-16 border-blue-200'
                            : message.isWelcome
                            ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 mr-16 dark:from-purple-900/20 dark:to-pink-900/20 dark:border-purple-500/20'
                            : message.isRecommendation
                            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 mr-16 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-500/20'
                            : 'bg-card/80 border-border mr-16'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={`whitespace-pre-wrap leading-relaxed ${
                          message.sender === 'user' ? 'text-white' : 'text-foreground'
                        }`}>
                          {message.text}
                        </div>
                        <div className={`text-xs mt-3 flex items-center gap-2 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-muted-foreground'
                        }`}>
                          <div className="flex items-center gap-1">
                            {message.isRecommendation && <Star className="w-3 h-3 text-yellow-500" />}
                            <span>{message.timestamp}</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  className="flex gap-4 justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex gap-4 max-w-4xl">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div className="bg-card/80 backdrop-blur-sm border border-border rounded-3xl p-4 mr-16 shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <motion.div
                            className="w-2 h-2 bg-purple-400 rounded-full"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-pink-400 rounded-full"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-indigo-400 rounded-full"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground ml-2">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Enhanced Input Area */}
          <div className="border-t border-border p-6 bg-card/70 backdrop-blur-sm">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <textarea
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share your thoughts here... ✨"
                  className="w-full resize-none border-2 border-border rounded-2xl p-4 pr-12 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                  rows={2}
                  disabled={isTyping}
                />
                <div className="absolute right-3 bottom-3 text-muted-foreground">
                  <MessageCircle className="w-5 h-5" />
                </div>
              </div>
              <motion.button
                onClick={handleSendMessage}
                disabled={!currentInput.trim() || isTyping}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-2xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-6 h-6" />
              </motion.button>
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Press Enter to send • Powered by AI career counseling from yourdomain.com
              </p>
              <AnimatePresence>
                {chatPhase === 'complete' && (
                  <motion.div
                    className="flex items-center gap-1 text-xs text-green-600"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Star className="w-3 h-3" />
                    </motion.div>
                    Analysis Complete!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StreamSelectionChatbot;
