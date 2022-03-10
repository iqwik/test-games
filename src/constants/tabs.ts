import { Memory, Puzzle } from '_app/views/pages'

export const TABS_TITLES = Object.freeze({
    PUZZLE: 'Puzzle',
    MEMORY: 'Memory',
})

export type TabValueType = {
    title: string,
    component: React.ComponentType,
}

export const TABS = [
    { title: TABS_TITLES.PUZZLE, component: Puzzle },
    { title: TABS_TITLES.MEMORY, component: Memory },
] as TabValueType[]
