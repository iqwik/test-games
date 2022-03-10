import React from 'react'
import Button from 'react-bootstrap/Button'

import { DEFAULT_MEMORY_CARDS_LENGTH, MemoryCardType } from '_app/constants'
import { MemoryCard } from '_app/views/atoms'
import { useMemoryCard, UseMemoryCardTypes } from '_app/hooks'

import styles from './Memory.module.scss'

const Memory: React.FunctionComponent = () => {
    const {
        cards,
        moves,
        checkIsInactive,
        checkIsFlipped,
        handleCardClick,
        handleRestart,
        shouldDisableAllCards,
    }: UseMemoryCardTypes = useMemoryCard()

    return (
        <div className={styles.Memory}>
            <h3>Total cards: {DEFAULT_MEMORY_CARDS_LENGTH * 2}</h3>
            <div
                className={styles.container}
                style={{
                    gridTemplateColumns: `repeat(${(DEFAULT_MEMORY_CARDS_LENGTH * 2) / 3}, 1fr)`,
                    gridTemplateRows: `repeat(3, 1fr)`,
                }}
            >
                {cards.map((card: MemoryCardType, index: number) => (
                    <MemoryCard
                        key={index}
                        cardImageUrl={card.url}
                        isDisabled={shouldDisableAllCards}
                        isInactive={checkIsInactive(card)}
                        isFlipped={checkIsFlipped(index)}
                        onClick={() => handleCardClick(index)}
                    />
                ))}
            </div>
            <br />
            <div>
                <div className="score">
                    <div className="moves">
                        <span className="bold">Moves:</span> {moves}
                    </div>
                </div>
                <div className="restart">
                    <Button variant="outline-secondary" onClick={handleRestart}>
                        Restart
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Memory
