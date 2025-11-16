"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { conversations } from "@/data/conversations";
import { sellers } from "@/data/sellers";
import { useAuthStore } from "@/store/auth-store";
import { ChatBubble } from "@/components/marketplace/chat-bubble";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Send, Package, Loader2 } from "lucide-react";
import Link from "next/link";
import { Message, Product } from "@/lib/types";
import Image from "next/image";
import { productsService } from "@/services/api";

interface ChatPageProps {
  params: Promise<{
    conversationId: string;
  }>;
}

export default function ChatPage({ params }: ChatPageProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { conversationId } = use(params);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const conversation = conversations.find(
    (c) => c.id === conversationId
  );

  const seller = conversation
    ? sellers.find((s) => s.id === conversation.sellerId)
    : null;

  // Fetch product from API
  useEffect(() => {
    const fetchProduct = async () => {
      if (!conversation?.productId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await productsService.getProductById(conversation.productId);
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [conversation?.productId]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Load messages
  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages);
    }
  }, [conversation]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading conversation...</p>
        </div>
      </div>
    );
  }

  if (!conversation || !product || !seller) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="mb-4 text-lg font-medium">Conversation not found</p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || isSending) return;

    setIsSending(true);

    // Create new message
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: conversation.id,
      senderId: user?.id || "user-1",
      senderType: "user",
      content: inputValue.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    };

    // Add message to local state
    setMessages([...messages, newMessage]);
    setInputValue("");

    // Simulate seller response after 2 seconds
    setTimeout(() => {
      const sellerResponse: Message = {
        id: `msg-${Date.now()}`,
        conversationId: conversation.id,
        senderId: seller.id,
        senderType: "seller",
        content:
          "Thank you for your message! I'll get back to you shortly with more details.",
        timestamp: new Date().toISOString(),
        read: false,
      };
      setMessages((prev) => [...prev, sellerResponse]);
      setIsSending(false);
    }, 2000);
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex items-center gap-4 border-b bg-card px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          asChild
          aria-label="Back to products"
        >
          <Link href="/products">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>

        <div className="flex flex-1 items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={seller.avatar} alt={seller.name} />
            <AvatarFallback>{seller.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="font-semibold">{seller.name}</h1>
            <p className="text-xs text-muted-foreground">
              {seller.verified && "✓ Verified Seller • "}
              Usually responds in a few hours
            </p>
          </div>
        </div>
      </header>

      {/* Product Info */}
      <div className="border-b bg-secondary/30 px-4 py-3">
        <Link
          href={`/products/${product.id}`}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-lg border bg-white">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium">{product.title}</p>
            <p className="text-sm font-semibold text-primary">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <Package className="h-5 w-5 shrink-0 text-muted-foreground" />
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-secondary/10 px-4 py-6">
        <div className="mx-auto max-w-4xl space-y-4">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t bg-card">
        <form
          onSubmit={handleSendMessage}
          className="mx-auto max-w-4xl px-4 py-4"
        >
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isSending}
              className="flex-1"
              aria-label="Message input"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!inputValue.trim() || isSending}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
