import { MemoryCardType } from '_app/constants'

export type AppContextValues = {
    currentTab: string
    setCurrentTab: (value: any) => void
    visibleConfetti: boolean
    setVisibleConfetti: (flag: boolean) => void
    isLoading: boolean
    setIsLoading: (flag: boolean) => void
    memoryCards: MemoryCardType[]
    setMemoryCards?: (cards: MemoryCardType[]) => void
}
