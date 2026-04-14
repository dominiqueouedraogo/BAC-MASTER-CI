"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Chatbot;
var react_1 = require("react");
var main_layout_1 = require("@/components/layout/main-layout");
var api_client_react_1 = require("@workspace/api-client-react");
var button_1 = require("@/components/ui/button");
var textarea_1 = require("@/components/ui/textarea");
var lucide_react_1 = require("lucide-react");
var scroll_area_1 = require("@/components/ui/scroll-area");
var react_markdown_1 = require("react-markdown");
function Chatbot() {
    var _a = (0, api_client_react_1.useGetChatHistory)(), history = _a.data, loadingHistory = _a.isLoading;
    var chatMutation = (0, api_client_react_1.useSendChatMessage)();
    var _b = (0, react_1.useState)(""), input = _b[0], setInput = _b[1];
    // Local state for optimistic updates
    var _c = (0, react_1.useState)([]), messages = _c[0], setMessages = _c[1];
    var bottomRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (history) {
            setMessages(history.map(function (h) { return ({ role: h.role, content: h.content }); }));
        }
    }, [history]);
    (0, react_1.useEffect)(function () {
        var _a;
        (_a = bottomRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    }, [messages, chatMutation.isPending]);
    var handleSend = function () {
        if (!input.trim() || chatMutation.isPending)
            return;
        var userMsg = input.trim();
        setInput("");
        // Optimistic update
        setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [{ role: 'user', content: userMsg }], false); });
        chatMutation.mutate({ data: { message: userMsg } }, {
            onSuccess: function (data) {
                setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [{ role: 'assistant', content: data.reply }], false); });
            },
            onError: function () {
                setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [{ role: 'assistant', content: "Désolé, une erreur est survenue de mon côté. Veuillez réessayer." }], false); });
            }
        });
    };
    var handleKeyDown = function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    return (<main_layout_1.MainLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto bg-card border border-border shadow-lg rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary/5 border-b border-border p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md">
            <lucide_react_1.Bot className="w-6 h-6"/>
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-foreground">Tuteur IA</h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <lucide_react_1.Sparkles className="w-3 h-3 text-purple-500"/> Posez vos questions de cours
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <scroll_area_1.ScrollArea className="flex-1 p-4 md:p-6 bg-muted/10">
          {loadingHistory ? (<div className="flex items-center justify-center h-full">
              <lucide_react_1.Loader2 className="w-8 h-8 animate-spin text-muted-foreground"/>
            </div>) : messages.length === 0 ? (<div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto opacity-50">
              <lucide_react_1.Bot className="w-16 h-16 mb-4 text-primary"/>
              <h3 className="text-xl font-bold mb-2">Comment puis-je vous aider ?</h3>
              <p className="text-sm">Je suis votre tuteur virtuel. Demandez-moi de vous expliquer un concept mathématique, de vous résumer un cours de SVT ou de vous aider avec une dissertation de Philo.</p>
            </div>) : (<div className="space-y-6">
              {messages.map(function (msg, i) { return (<div key={i} className={"flex gap-4 ".concat(msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
                  <div className={"w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ".concat(msg.role === 'user' ? 'bg-primary text-white' : 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white')}>
                    {msg.role === 'user' ? <lucide_react_1.User className="w-4 h-4"/> : <lucide_react_1.Bot className="w-4 h-4"/>}
                  </div>
                  <div className={"max-w-[80%] rounded-2xl p-4 ".concat(msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-sm shadow-md'
                    : 'bg-card border border-border text-foreground rounded-tl-sm shadow-sm')}>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {msg.role === 'user' ? msg.content : <react_markdown_1.default>{msg.content}</react_markdown_1.default>}
                    </div>
                  </div>
                </div>); })}
              {chatMutation.isPending && (<div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center shrink-0">
                    <lucide_react_1.Bot className="w-4 h-4"/>
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-4 flex gap-1 items-center">
                    <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0ms' }}/>
                    <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }}/>
                    <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }}/>
                  </div>
                </div>)}
              <div ref={bottomRef}/>
            </div>)}
        </scroll_area_1.ScrollArea>

        {/* Input Area */}
        <div className="p-4 bg-card border-t border-border">
          <div className="relative flex items-end gap-2 max-w-4xl mx-auto bg-muted/30 rounded-2xl border border-border p-2 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
            <textarea_1.Textarea value={input} onChange={function (e) { return setInput(e.target.value); }} onKeyDown={handleKeyDown} placeholder="Posez une question sur vos cours..." className="min-h-[44px] max-h-[200px] bg-transparent border-0 focus-visible:ring-0 resize-none shadow-none text-base py-3" rows={1}/>
            <button_1.Button onClick={handleSend} disabled={!input.trim() || chatMutation.isPending} size="icon" className="h-11 w-11 rounded-xl shrink-0 bg-primary hover:bg-primary/90">
              <lucide_react_1.Send className="w-5 h-5"/>
            </button_1.Button>
          </div>
          <p className="text-[10px] text-center text-muted-foreground mt-2">Le Tuteur IA peut faire des erreurs. Vérifiez toujours avec vos cours officiels.</p>
        </div>
      </div>
    </main_layout_1.MainLayout>);
}
