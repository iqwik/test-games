import React from 'react'

import { AppContextProvider } from '_app/providers'
import { Tabs } from '_app/views/organisms'

import '_styles/theme.scss'

const App: React.FunctionComponent = () => (
    <AppContextProvider>
        <div className="wrapper">
            <p>
                &#8592;&nbsp; <a href="https://github.com/iqwik/test-games">back to repo</a>
            </p>
            <Tabs />
        </div>
    </AppContextProvider>
)

export default React.memo(App)
