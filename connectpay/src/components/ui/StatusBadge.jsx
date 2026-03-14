export default function StatusBadge({ status, config }) {
  const info = config[status] || { label: status, bg: 'bg-gray-500/10', text: 'text-gray-400' }

  return (
    <span className={`status-badge ${info.bg} ${info.text}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {info.label}
    </span>
  )
}
