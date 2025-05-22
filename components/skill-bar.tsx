interface SkillBarProps {
  name: string
  percentage: number
}

export function SkillBar({ name, percentage }: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">{name}</h4>
        <span className="text-sm text-muted-foreground">{percentage}%</span>
      </div>
      <div className="skill-bar">
        <div className="skill-progress" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
