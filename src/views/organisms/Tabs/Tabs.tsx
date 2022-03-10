import React from 'react'
import { Tabs as BootstrapTabs, Tab } from 'react-bootstrap'

import { AppContext } from '_app/providers'
import { GET_COMPONENT, TABS, TabValueType } from '_app/constants'

import styles from './Tabs.module.scss'

const Tabs: React.FunctionComponent = () => {
    const { currentTab, setCurrentTab, visibleConfetti, setVisibleConfetti } = React.useContext(AppContext)

    const renderTabs: React.ReactElement[] = React.useMemo(() => (
        TABS.map(({ title, component }: TabValueType, index: number) => (
            <Tab
                className={styles.tabContent}
                eventKey={title}
                key={`${index}-${title}`}
                title={title}
            >
                {GET_COMPONENT(component)}
            </Tab>
        ))
    ), [TABS])

    return (
        <div className={styles.Tabs}>
            <BootstrapTabs
                activeKey={currentTab}
                id="controlled-tab-example"
                onSelect={(tabName) => {
                    if (visibleConfetti) {
                        setVisibleConfetti(false)
                    }
                    setCurrentTab(tabName)
                }}
            >
                {renderTabs}
            </BootstrapTabs>
        </div>
    )
}

export default Tabs
