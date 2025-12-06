'use client'

import { formatNumber } from '@/lib/idleFormulas'
import '@/styles/components.css'

interface UpgradeItemProps {
  id: string
  name: string
  description: string
  icon: string
  level: number
  cost: number
  effect: number
  canAfford: boolean
  onPurchase: () => void
}

export default function UpgradeItem({
  id,
  name,
  description,
  icon,
  level,
  cost,
  effect,
  canAfford,
  onPurchase,
}: UpgradeItemProps) {
  return (
    <div className="upgrade-item">
      <div className="upgrade-header">
        <div className="upgrade-icon">{icon}</div>
        <div className="upgrade-info">
          <div className="upgrade-name">{name}</div>
          <div className="upgrade-description">{description}</div>
        </div>
      </div>
      <div className="upgrade-stats">
        <div className="upgrade-level">
          Level: <span data-testid={`${id}-level`}>{level}</span>
        </div>
        <div className="upgrade-effect">
          Effect: <span>{effect.toFixed(2)}x</span>
        </div>
      </div>
      <button
        className={`upgrade-button ${canAfford ? 'can-afford' : 'cannot-afford'}`}
        onClick={onPurchase}
        disabled={!canAfford}
        data-testid={`upgrade-${id}`}
      >
        {canAfford ? `Upgrade (${formatNumber(cost)})` : `Need ${formatNumber(cost)}`}
      </button>
    </div>
  )
}
