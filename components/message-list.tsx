"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { markMessageAsRead } from "@/lib/actions"
import { Mail, MailOpen, ChevronDown, ChevronUp } from "lucide-react"
import type { ContactMessage } from "@/lib/types"

export function MessageList({ initialMessages }: { initialMessages: ContactMessage[] }) {
  const [messages, setMessages] = useState(initialMessages)
  const [openMessageId, setOpenMessageId] = useState<string | null>(null)

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await markMessageAsRead(messageId)
      setMessages(messages.map((message) => (message.id === messageId ? { ...message, read: true } : message)))
    } catch (error) {
      console.error("Error marking message as read:", error)
    }
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <Mail className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
        <h3 className="mt-4 text-lg font-medium">No messages yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          When someone sends you a message through your contact form, it will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => {
        const isOpen = openMessageId === message.id
        const messageDate = message.createdAt ? new Date(message.createdAt.seconds * 1000) : new Date()

        return (
          <Collapsible
            key={message.id}
            open={isOpen}
            onOpenChange={(open) => {
              setOpenMessageId(open ? message.id : null)
              if (open && !message.read && message.id) {
                handleMarkAsRead(message.id)
              }
            }}
          >
            <Card className={`overflow-hidden ${!message.read ? "border-primary/50 bg-primary/5" : ""}`}>
              <CollapsibleTrigger asChild>
                <CardContent className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {message.read ? (
                        <MailOpen className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Mail className="h-5 w-5 text-primary" />
                      )}
                      <div>
                        <div className="font-medium">{message.name}</div>
                        <div className="text-sm text-muted-foreground">{message.subject}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs text-muted-foreground">
                        {formatDistanceToNow(messageDate, { addSuffix: true })}
                      </div>
                      {!message.read && <Badge variant="default">New</Badge>}
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </div>
                </CardContent>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="p-4 pt-0 border-t">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">From:</span> {message.name}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span> {message.email}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium mb-1">Message:</div>
                      <p className="text-muted-foreground whitespace-pre-wrap">{message.message}</p>
                    </div>
                    <div className="flex justify-end">
                      <Button asChild variant="outline" size="sm">
                        <a href={`mailto:${message.email}?subject=Re: ${message.subject}`}>Reply via Email</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        )
      })}
    </div>
  )
}
