"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { ChatBubble } from "@/components/marketplace/chat-bubble";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Send, Package, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Message, Product } from "@/lib/types";
import Image from "next/image";
import { productsService, chatsService } from "@/services/api";
import { ChatSkeleton } from "@/components/ui/skeleton";

interface ChatPageProps {
  params: Promise<{
    conversationId: string;
  }>;
}

export default function ChatPage({ params }: ChatPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, isInitialized } = useAuthStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { conversationId } = use(params);
  const mountedRef = useRef<boolean>(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [chats, setChats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewChat, setIsNewChat] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Track component mount state
  useEffect(() => {
    console.log('Chat page mounted');
    mountedRef.current = true;
    return () => {
      console.log('Chat page unmounted');
      mountedRef.current = false;
    };
  }, []);

  // Check if this is a new chat
  useEffect(() => {
    setIsNewChat(conversationId === "new");
  }, [conversationId]);

  // Get seller from product API data
  const getSeller = () => {
    // For all chats, get seller from product.seller (API response)
    if (product?.seller) {
      return product.seller;
    }

    // Fallback: try to get seller from query params
    const sellerId = searchParams.get("sellerId");
    if (sellerId) {
      // Create minimal seller object from query param
      return { id: sellerId, name: "Seller", avatar: "", verified: false };
    }

    return null;
  };

  const seller = getSeller();

  // Fetch product and chat data from API
  useEffect(() => {
    const fetchData = async () => {
      let productId: string | null = null;

      try {
        setLoading(true);

        if (isNewChat) {
          // For new chats, get productId from query params
          productId = searchParams.get("productId");
          if (!productId) {
            setLoading(false);
            return;
          }

          // Fetch product and initial chat data (if any)
          const [productData, chatData] = await Promise.all([
            productsService.getProductById(productId),
            chatsService.getChat(productId, true),
          ]);

          setProduct(productData);
          setChats(chatData);

          if (chatData?.messages) {
            setMessages(chatData.messages);
          }
        } else {
          // For existing chats, fetch chat data using conversationId as chatId
          const chatData = await chatsService.getChat(conversationId, false);

          if (chatData) {
            setChats(chatData);
            setMessages(chatData.messages);

            // Extract productId from chat and fetch product details
            if (chatData.productId) {
              const productData = await productsService.getProductById(
                chatData.productId
              );
              setProduct(productData);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isNewChat, conversationId, searchParams]);

  // Redirect if not authenticated (after auth store initializes)
  useEffect(() => {
    // Wait for auth store to initialize before checking authentication
    if (isInitialized && !isAuthenticated && !isSending && mountedRef.current) {
      router.push("/login");
    }
  }, [isAuthenticated, isInitialized, isSending, router]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return <ChatSkeleton messageCount={3} />;
  }

  // Require product and seller for all chats
  if (!product || !seller) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="mb-4 text-lg font-medium">Could not load chat information</p>
        <Button asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  const refetchMessages = async () => {
    if (isRefreshing || !mountedRef.current) return;

    setIsRefreshing(true);
    try {
      let chat: typeof undefined | any;

      if (isNewChat) {
        // For new chats, use product_id to fetch messages
        if (!product?.id) {
          console.log('Cannot refresh: no product ID');
          return;
        }
        chat = await chatsService.getChat(product.id, true); // true = isProductId
      } else {
        // For existing chats, use chat ID to fetch messages
        chat = await chatsService.getChat(conversationId, false);
      }

      if (mountedRef.current && chat?.messages) {
        setMessages(chat.messages);
        console.log('Messages refreshed:', chat.messages.length);
      }
    } catch (error) {
      console.error('Failed to refresh messages:', error);
    } finally {
      if (mountedRef.current) {
        setIsRefreshing(false);
      }
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Send button clicked, mountedRef.current:', mountedRef.current);

    if (!inputValue.trim() || isSending || !product || !seller || !mountedRef.current) {
      console.log('Send blocked:', {
        emptyInput: !inputValue.trim(),
        isSending,
        noProduct: !product,
        noSeller: !seller,
        notMounted: !mountedRef.current,
        mountedRefValue: mountedRef.current,
      });
      return;
    }

    setIsSending(true);
    const messageText = inputValue.trim();

    try {
      if (isNewChat) {
        // For new chats, send via API using product ID
        console.log('Sending new chat message:', { productId: product.id, content: messageText });
        const message = await chatsService.sendMessage(
          product.id,
          messageText,
          undefined,
          false // isExistingChat = false for new chats
        );

        console.log('API response:', message);

        if (mountedRef.current && message) {
          setMessages((prev) => [...prev, message]);
          setInputValue("");
          // Fetch latest messages from API for new chats
          setTimeout(() => refetchMessages(), 500);
        } else if (mountedRef.current && !message) {
          console.warn('API returned null, using fallback');
          // Fallback: create message locally if API fails
          const newMessage: Message = {
            id: `msg-${Date.now()}`,
            senderId: user?.id || "user-1",
            senderName: user?.name || "You",
            content: messageText,
            timestamp: new Date().toISOString(),
            isRead: false,
            productId: product.id,
            attachments: [],
          };
          setMessages((prev) => [...prev, newMessage]);
          setInputValue("");
        }
      } else {
        // For existing chats, send via API using chat ID
        console.log('Sending existing chat message:', { chatId: conversationId, content: messageText });
        const message = await chatsService.sendMessage(
          conversationId,
          messageText,
          undefined,
          true // isExistingChat = true for existing chats
        );

        console.log('API response:', message);

        if (mountedRef.current && message) {
          setMessages((prev) => [...prev, message]);
          setInputValue("");
          // Fetch latest messages from API to sync with server
          setTimeout(() => refetchMessages(), 500);
        } else if (mountedRef.current && !message) {
          console.warn('API returned null, using fallback');
          // Fallback: create message locally if API fails
          const newMessage: Message = {
            id: `msg-${Date.now()}`,
            senderId: user?.id || "user-1",
            senderName: user?.name || "You",
            content: messageText,
            timestamp: new Date().toISOString(),
            isRead: false,
            productId: product.id,
            attachments: [],
          };

          setMessages((prev) => [...prev, newMessage]);
          setInputValue("");

          // Refetch messages after a delay to get seller's response
          setTimeout(() => refetchMessages(), 3000);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Show error feedback
      if (mountedRef.current) {
        setInputValue(messageText); // Restore message so user doesn't lose it
      }
    } finally {
      if (mountedRef.current) {
        setIsSending(false);
      }
    }
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
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
                <AvatarImage src={seller.avatar || ""} alt={seller.name || "Seller"} />
                <AvatarFallback>{seller.name?.[0] || "S"}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="font-semibold">{seller.name || "Seller"}</h1>
                <p className="text-xs text-muted-foreground">
                  {seller.verified && "✓ Verified Seller • "}
                  Usually responds in a few hours
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={refetchMessages}
              disabled={isRefreshing || isNewChat}
              title="Refresh messages"
              aria-label="Refresh messages"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </header>

      {/* Product Info */}
      <div className="border-b bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href={`/products/${product.id}`}
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-lg border bg-white">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">{product.name}</p>
              <p className="text-sm font-semibold text-primary">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <Package className="h-5 w-5 shrink-0 text-muted-foreground" />
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-secondary/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} userId={user?.id} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t bg-card">
        <form
          onSubmit={handleSendMessage}
          className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8"
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
