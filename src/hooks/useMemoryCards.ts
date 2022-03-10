import {
    useContext, useEffect, useRef, useState,
} from 'react'

import {
    SHUFFLE_MEMORY_CARDS, DEFAULT_MEMORY_CARDS_LENGTH, MemoryCardType,
} from '_app/constants'
import { AppContext } from '_app/providers'

export type UseMemoryCardTypes = {
    cards: MemoryCardType[] | never[]
    moves: number
    checkIsFlipped: (index: number) => boolean
    checkIsInactive: (card: MemoryCardType) => boolean
    handleCardClick: (index: number) => void
    handleRestart: () => void
    shouldDisableAllCards: boolean
}

export const useMemoryCard: () => UseMemoryCardTypes = () => {
    const { visibleConfetti, setVisibleConfetti, memoryCards } = useContext(AppContext)
    const [cards, setCards] = useState([] as MemoryCardType[])

    useEffect(() => {
        if (memoryCards?.length) {
            setCards(memoryCards)
        }
    }, [memoryCards])

    const [openCards, setOpenCards] = useState<number[]>([])
    const [clearedCards, setClearedCards] = useState({})

    const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false)
    const [moves, setMoves] = useState(0)
    
    const timeout: any = useRef(null)

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
        
        timeout.current = setTimeout(() => {
            setOpenCards([])
        }, 500)
    }

    const handleCardClick = (index: number) => {
        if (openCards.length === 1) {
            setOpenCards((prev) => [...prev, index])
            setMoves((moves) => moves + 1)
            disable()
        } else {
            clearTimeout(timeout.current)
            setOpenCards([index])
        }
    }

    useEffect(() => {
        let timeout: any = null
        if (openCards.length === 2) {
            timeout = setTimeout(evaluate, 300)
        }
        return () => {
            clearTimeout(timeout)
        }
    }, [openCards])
    
    useEffect(() => {
        checkCompletion()
    }, [clearedCards])

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
        setCards(SHUFFLE_MEMORY_CARDS(cards, false))
    }

    return {
        cards,
        moves,
        checkIsFlipped,
        checkIsInactive,
        handleCardClick,
        handleRestart,
        shouldDisableAllCards,
    }
}