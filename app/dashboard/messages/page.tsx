import type { Metadata } from "next"
import { getContactMessages } from "@/lib/actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageList } from "@/components/message-list"

export const metadata: Metadata = {
  title: "Messages | Dashboard",
  description: "View contact messages from your portfolio website",
}

export default async function MessagesPage() {
  const messages = await getContactMessages()

  const unreadCount = messages.filter((message) => !message.read).length

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">View messages from your contact form</p>
        </div>
        {unreadCount > 0 && (
          <Badge variant="default" className="px-3 py-1">
            {unreadCount} unread
          </Badge>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Messages</CardTitle>
          <CardDescription>Messages sent through the contact form on your portfolio website</CardDescription>
        </CardHeader>
        <CardContent>
          <MessageList initialMessages={messages} />
        </CardContent>
      </Card>
    </div>
  )
}
