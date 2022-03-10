import { useContext, useEffect, useState } from 'react'
import { PuzzleContext } from '_app/providers'

/**
 * Use it to find out whether all tiles are in position
 */
export const usePuzzleTilesPositionStatus = () => {
    const { tilesStatus } = useContext(PuzzleContext)
    const [areTilesInPosition, setAreTilesInPosition] = useState(false)

    useEffect(() => {
        const areInPosition = Object.values(tilesStatus).every((status) => status === true)
        setAreTilesInPosition(areInPosition)

        console.log({ tilesStatus, areInPosition })
    }, [tilesStatus])

    return areTilesInPosition
};
