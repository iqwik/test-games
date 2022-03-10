/**
 * @see - https://pokeapi.co/
 */
const REMOTE_IMAGES_LINK = 'https://pokeapi.co/api/v2/pokemon'

const DEFAULT_CARDS_LIMIT = 6

export const DEFAULT_MEMORY_CARDS_LENGTH = 12

export type MemoryCardType = {
    name: string
    url: string
}

type ShuffleMemoryCardsType = (cards: MemoryCardType[], isMultiply?: boolean) => MemoryCardType[]

/**
 * Should shuffle memory cards
 */
export const SHUFFLE_MEMORY_CARDS: ShuffleMemoryCardsType = (cards, isMultiply = true) => {
    const array = isMultiply ? [...cards, ...cards] : cards

    for (let i = array.length; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i)
        const currentIndex = i - 1
        const temp = array[currentIndex]

        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temp
    }

    return array
}

export const FETCH_MEMORY_CARDS = async (limit: number | null = null, setIsLoading: (flag: boolean) => void) => {
    setIsLoading(true)
    const links = new Array(limit || DEFAULT_CARDS_LIMIT).fill(REMOTE_IMAGES_LINK)

    const fetchItem = (link: string, i: number) => fetch(`${link}/${i}/`).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response.json()
    })

    return await Promise.all(
        links.map((link, i) => fetchItem(link, i + 1))
    )
        .then((results) => {
            /**
             * @note - Some troubleshooting with slow network connection :P
             */
            setTimeout(() => { setIsLoading(false) }, 2000)
            const images = results.map(({ name, sprites: { front_shiny: url } }) => ({ name, url }))
            return SHUFFLE_MEMORY_CARDS(images)
        })
        .catch((error) => {
            setIsLoading(false)
            console.error(error)
        })   
}

