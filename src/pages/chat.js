import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { MainLayout } from "src/components/layout/main-layout";
import { useSendChatMessage, useGetChatHistory } from "@workspace/api-client-react";
import { Button } from "src/components/ui/button";
import { Textarea } from "src/components/ui/textarea";
import { Bot, User, Send, Sparkles, Loader2 } from "lucide-react";
import { ScrollArea } from "src/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
export default function Chatbot() {
    const { data: history, isLoading: loadingHistory } = useGetChatHistory();
    const chatMutation = useSendChatMessage();
    const [input, setInput] = useState("");
    // Local state for optimistic updates
    const [messages, setMessages] = useState([]);
    const bottomRef = useRef(null);
    useEffect(() => {
        if (history) {
            setMessages(history.map(h => ({ role: h.role, content: h.content })));
        }
    }, [history]);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, chatMutation.isPending]);
    const handleSend = () => {
        if (!input.trim() || chatMutation.isPending)
            return;
        const userMsg = input.trim();
        setInput("");
        // Optimistic update
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        chatMutation.mutate({ data: { message: userMsg } }, {
            onSuccess: (data) => {
                setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
            },
            onError: () => {
                setMessages(prev => [...prev, { role: 'assistant', content: "Désolé, une erreur est survenue de mon côté. Veuillez réessayer." }]);
            }
        });
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    return (_jsx(MainLayout, { children: _jsxs("div", { className: "flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto bg-card border border-border shadow-lg rounded-3xl overflow-hidden", children: [_jsxs("div", { className: "bg-primary/5 border-b border-border p-4 flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md", children: _jsx(Bot, { className: "w-6 h-6" }) }), _jsxs("div", { children: [_jsx("h2", { className: "font-display font-bold text-lg text-foreground", children: "Tuteur IA" }), _jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [_jsx(Sparkles, { className: "w-3 h-3 text-purple-500" }), " Posez vos questions de cours"] })] })] }), _jsx(ScrollArea, { className: "flex-1 p-4 md:p-6 bg-muted/10", children: loadingHistory ? (_jsx("div", { className: "flex items-center justify-center h-full", children: _jsx(Loader2, { className: "w-8 h-8 animate-spin text-muted-foreground" }) })) : messages.length === 0 ? (_jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center max-w-md mx-auto opacity-50", children: [_jsx(Bot, { className: "w-16 h-16 mb-4 text-primary" }), _jsx("h3", { className: "text-xl font-bold mb-2", children: "Comment puis-je vous aider ?" }), _jsx("p", { className: "text-sm", children: "Je suis votre tuteur virtuel. Demandez-moi de vous expliquer un concept math\u00E9matique, de vous r\u00E9sumer un cours de SVT ou de vous aider avec une dissertation de Philo." })] })) : (_jsxs("div", { className: "space-y-6", children: [messages.map((msg, i) => (_jsxs("div", { className: `flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`, children: [_jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white'}`, children: msg.role === 'user' ? _jsx(User, { className: "w-4 h-4" }) : _jsx(Bot, { className: "w-4 h-4" }) }), _jsx("div", { className: `max-w-[80%] rounded-2xl p-4 ${msg.role === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-tr-sm shadow-md'
                                            : 'bg-card border border-border text-foreground rounded-tl-sm shadow-sm'}`, children: _jsx("div", { className: "prose prose-sm dark:prose-invert max-w-none", children: msg.role === 'user' ? msg.content : _jsx(ReactMarkdown, { children: msg.content }) }) })] }, i))), chatMutation.isPending && (_jsxs("div", { className: "flex gap-4", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center shrink-0", children: _jsx(Bot, { className: "w-4 h-4" }) }), _jsxs("div", { className: "bg-card border border-border rounded-2xl rounded-tl-sm p-4 flex gap-1 items-center", children: [_jsx("span", { className: "w-2 h-2 rounded-full bg-primary/50 animate-bounce", style: { animationDelay: '0ms' } }), _jsx("span", { className: "w-2 h-2 rounded-full bg-primary/50 animate-bounce", style: { animationDelay: '150ms' } }), _jsx("span", { className: "w-2 h-2 rounded-full bg-primary/50 animate-bounce", style: { animationDelay: '300ms' } })] })] })), _jsx("div", { ref: bottomRef })] })) }), _jsxs("div", { className: "p-4 bg-card border-t border-border", children: [_jsxs("div", { className: "relative flex items-end gap-2 max-w-4xl mx-auto bg-muted/30 rounded-2xl border border-border p-2 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all", children: [_jsx(Textarea, { value: input, onChange: (e) => setInput(e.target.value), onKeyDown: handleKeyDown, placeholder: "Posez une question sur vos cours...", className: "min-h-[44px] max-h-[200px] bg-transparent border-0 focus-visible:ring-0 resize-none shadow-none text-base py-3", rows: 1 }), _jsx(Button, { onClick: handleSend, disabled: !input.trim() || chatMutation.isPending, size: "icon", className: "h-11 w-11 rounded-xl shrink-0 bg-primary hover:bg-primary/90", children: _jsx(Send, { className: "w-5 h-5" }) })] }), _jsx("p", { className: "text-[10px] text-center text-muted-foreground mt-2", children: "Le Tuteur IA peut faire des erreurs. V\u00E9rifiez toujours avec vos cours officiels." })] })] }) }));
}
