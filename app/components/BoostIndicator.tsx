'use client'

import { BoostState } from '@/lib/types'
import { formatTime } from '@/lib/idleFormulas'
import '@/styles/components.css'

interface BoostIndicatorProps {
  boosts: BoostState[]
  getTimeRemaining: (boost: BoostState) => number
}

const BOOST_ICONS = {
  income: '💰',
  critical: '⚡',
  speed: '🚀',
}

const BOOST_NAMES = {
  income: 'Income Boost',
  critical: 'Critical Boost',
  speed: 'Speed Boost',
}

export default function BoostIndicator({ boosts, getTimeRemaining }: BoostIndicatorProps) {
  if (boosts.length === 0) {
    return (
      <div className="boost-indicator-empty">
        <p>No active boosts</p>
        <p className="boost-hint">Complete mini-games to earn boosts!</p>
      </div>
    )
  }

  return (
    <div className="boost-indicator" data-testid="boost-indicator">
      <h3>Active Boosts</h3>
      <div className="boost-list">
        {boosts.map((boost, index) => {
          const timeRemaining = getTimeRemaining(boost)
          const progress = (timeRemaining / boost.duration) * 100

          return (
            <div key={index} className="boost-item" data-testid="boost-item">
              <div className="boost-header">
                <span className="boost-icon">{BOOST_ICONS[boost.type]}</span>
                <span className="boost-name">{BOOST_NAMES[boost.type]}</span>
                <span className="boost-multiplier">x{boost.multiplier.toFixed(1)}</span>
              </div>
              <div className="boost-timer">
                {formatTime(timeRemaining / 1000)}
              </div>
              <div className="boost-progress-bar">
                <div
                  className="boost-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
