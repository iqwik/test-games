import React from 'react'
import { Button } from 'react-bootstrap'
import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib'

import { IMAGE_URL, EXTRA_IMAGE_URL, DEFAULT_PUZZLE_NUM } from '_app/constants'
import { AppContext } from '_app/providers'

import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css'

import styles from './Puzzle.module.scss'

const Puzzle: React.FunctionComponent = () => {
    const { setVisibleConfetti } = React.useContext(AppContext)
    const [refreshPuzzle, setRefreshPuzzle] = React.useState(false)
    const [imageUrl, setImageUrl] = React.useState(IMAGE_URL)

    React.useEffect(() => {
        if (refreshPuzzle) {
            setRefreshPuzzle(false)
            // @ts-ignore
            setImageUrl((prevImageUrl) => {
                if (prevImageUrl !== EXTRA_IMAGE_URL) {
                    return EXTRA_IMAGE_URL
                }

                return IMAGE_URL
            })
        }
    }, [refreshPuzzle])

    const renderPuzzle = React.useCallback(() => (
        <JigsawPuzzle
            imageSrc={imageUrl}
            rows={DEFAULT_PUZZLE_NUM}
            columns={DEFAULT_PUZZLE_NUM}
            onSolved={() => {
                setVisibleConfetti(true)
            }}
        />
    ), [imageUrl])

    return (
        <>
            <h3>Total cards: {DEFAULT_PUZZLE_NUM * DEFAULT_PUZZLE_NUM}</h3>
            <div className={styles.puzzleContainer}>
                {renderPuzzle()}
            </div>
            <br />
            <div className="restart">
                <Button variant="outline-secondary" onClick={() => { setRefreshPuzzle(true) }}>
                    Restart
                </Button>
            </div>
        </>
    )
}

export default Puzzle
