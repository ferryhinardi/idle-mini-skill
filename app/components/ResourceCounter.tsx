'use client'

import { formatNumber } from '@/lib/idleFormulas'
import '@/styles/components.css'

interface ResourceCounterProps {
  resources: number
  resourcesPerSecond: number
}

export default function ResourceCounter({
  resources,
  resourcesPerSecond,
}: ResourceCounterProps) {
  return (
    <div className="resource-counter">
      <div className="resource-display">
        <div className="resource-icon">💎</div>
        <div className="resource-info">
          <div className="resource-amount" data-testid="resource-amount">
            {formatNumber(resources)}
          </div>
          <div className="resource-label">Crystals</div>
        </div>
      </div>
      <div className="resource-rate" data-testid="resource-rate">
        +{formatNumber(resourcesPerSecond)}/s
      </div>
    </div>
  )
}
