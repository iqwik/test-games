import React from 'react'
import Button from 'react-bootstrap/Button'

import { AppContext } from '_app/providers'
import { SHUFFLE_MEMORY_CARDS, DEFAULT_MEMORY_CARDS_LENGTH, MemoryCardType } from '_app/constants'
import { MemoryCard } from '_app/views/atoms'

import styles from './Memory.module.scss'

const Memory: React.FunctionComponent = () => {
    const { visibleConfetti, setVisibleConfetti, memoryCards } = React.useContext(AppContext)
    const [cards, setCards] = React.useState([] as MemoryCardType[])

    React.useEffect(() => {
        if (memoryCards?.length) {
            setCards(memoryCards)
        }
    }, [memoryCards])

    const [openCards, setOpenCards] = React.useState([])
    const [clearedCards, setClearedCards] = React.useState({})

    const [shouldDisableAllCards, setShouldDisableAllCards] = React.useState(false)
    const [moves, setMoves] = React.useState(0)
    
    const timeout = React.useRef(null)

    const disable = () => {
        setShouldDisableAllCards(true)
    }
    const enable = () => {
        setShouldDisableAllCards(false)
    }
    
    const checkCompletion = () => {
        if (Object.keys(clearedCards).length === DEFAULT_MEMORY_CARDS_LENGTH) {
            setVisibleConfetti(true)
        }
    }
    const evaluate = () => {
        const [first, second] = openCards
        enable()
        if (cards[first].name === cards[second].name) {            
            setClearedCards((prev) => ({ ...prev, [cards[first].name]: true }))
            setOpenCards([])
            return
        }
        // This is to flip the cards back after 500ms duration
        // @ts-ignore
        timeout.current = setTimeout(() => {
            setOpenCards([])
        }, 500)
    }

    const handleCardClick = (index: number) => {
        if (openCards.length === 1) {
            // @ts-ignore
            setOpenCards((prev) => [...prev, index])
            setMoves((moves) => moves + 1)
            disable()
        } else {
            // @ts-ignore
            clearTimeout(timeout.current)
            // @ts-ignore
            setOpenCards([index])
        }
    }

    React.useEffect(() => {
        let timeout: any = null
        if (openCards.length === 2) {
            timeout = setTimeout(evaluate, 300)
        }
        return () => {
            clearTimeout(timeout)
        }
    }, [openCards])
    
    React.useEffect(() => {
        checkCompletion()
    }, [clearedCards])
      
    // @ts-ignore
    const checkIsFlipped = (index: number) => openCards.includes(index)
    
    const checkIsInactive = (card: MemoryCardType) => Boolean(clearedCards[card.name])

    const handleRestart = () => {
        setClearedCards({})
        setOpenCards([])
        if (visibleConfetti) {
            setVisibleConfetti(false)
        }
        setMoves(0)
        setShouldDisableAllCards(false)

        // set a shuffled deck of cards
        // @ts-ignore
        setCards(SHUFFLE_MEMORY_CARDS(cards, false))
    }

    return (
        <div className={styles.Memory}>
            <h3>Total cards: {DEFAULT_MEMORY_CARDS_LENGTH * 2}</h3>
            <div className={styles.container} style={{ gridTemplateColumns: `repeat(${(DEFAULT_MEMORY_CARDS_LENGTH * 2) / 3}, 1fr)`, gridTemplateRows: `repeat(3, 1fr)` }}>
                {cards.map((card, index) => (
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
