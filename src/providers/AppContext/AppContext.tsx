import React from 'react'
import classnames from 'classnames'

import { FETCH_MEMORY_CARDS, TABS_TITLES, DEFAULT_MEMORY_CARDS_LENGTH } from '_app/constants'
import { Confetti } from '_app/views/atoms'
import { AppContextValues } from './AppContext.types'

const defaultAppContextValues = {
    currentTab: '',
    setCurrentTab: () => {},
    visibleConfetti: false,
    setVisibleConfetti: () => {},
    isLoading: false,
    setIsLoading: () => {},
    memoryCards: [],
    setMemoryCards: () => {},
}

export const AppContext = React.createContext<AppContextValues>(defaultAppContextValues)

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentTab, setCurrentTab] = React.useState<AppContextValues['currentTab']>(TABS_TITLES.PUZZLE)
    const [visibleConfetti, setVisibleConfetti] = React.useState(defaultAppContextValues.visibleConfetti)
    const [isLoading, setIsLoading] = React.useState(defaultAppContextValues.isLoading)
    const [memoryCards, setMemoryCards] = React.useState(defaultAppContextValues.memoryCards)

    React.useEffect(() => {
        let isMounted = true

        FETCH_MEMORY_CARDS(DEFAULT_MEMORY_CARDS_LENGTH, setIsLoading)
            .then((result) => {
                if (isMounted) {
                    // @ts-ignore
                    setMemoryCards(result)
                }
            })

        return () => { isMounted = false }
    }, [])

    return (
        <>
            <div className={classnames('app', {
                'is-loading': isLoading
            })}>
                <AppContext.Provider value={{
                    currentTab,
                    setCurrentTab,
                    visibleConfetti,
                    setVisibleConfetti,
                    isLoading,
                    setIsLoading,
                    memoryCards,
                }}
                >
                    <>
                        {children}
                        <Confetti visible={visibleConfetti} />
                    </>
                </AppContext.Provider>
            </div>
            <div className={classnames('info', {
                'info-message': isLoading,
            })}>
                <p>Please wait...</p>
            </div>
        </>
    )
}

export default AppContextProvider
