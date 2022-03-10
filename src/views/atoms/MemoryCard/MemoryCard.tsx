import React from 'react'
import classnames from 'classnames'
import pokeball from '_app/assets/img/pokeball.png'

import styles from './MemoryCard.module.scss'

type MemoryCardPropsTypes = {
    cardImageUrl: string
    isInactive: boolean
    isFlipped: boolean
    isDisabled: boolean
    onClick: () => void
}

const MemoryCard: React.FC<MemoryCardPropsTypes> = ({
    cardImageUrl,
    isInactive,
    isFlipped,
    isDisabled,
    onClick,
}) => (
    <div
        className={classnames(styles.MemoryCard, {
            [styles['is-flipped']]: isFlipped,
            [styles['is-inactive']]: isInactive
        })}
        onClick={() => { !isFlipped && !isDisabled && onClick() }}
    >
        <div className={`${styles['MemoryCard-face']} ${styles['MemoryCard-font-face']}`}>
            <img src={pokeball} alt="memory-card" />
        </div>
        <div className={`${styles['MemoryCard-face']} ${styles['MemoryCard-back-face']}`}>
            <img src={cardImageUrl} alt="memory-card" />
        </div>
    </div>
)

export default MemoryCard
