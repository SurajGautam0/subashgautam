import { RedisConnectionStatus } from "@/components/redis-connection-status"
import { BlobConnectionStatus } from "@/components/blob-connection-status"

interface DashboardHeaderProps {
  title: string
  description?: string
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      <div className="flex items-center gap-2">
        <RedisConnectionStatus />
        <BlobConnectionStatus />
      </div>
    </div>
  )
}
