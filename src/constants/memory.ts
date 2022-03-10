export type MemoryCardType = {
    name: string
    url: string
}

export const SHUFFLE_MEMORY_CARDS: (cards: MemoryCardType[], isMultiply?: boolean) => MemoryCardType[] = (cards, isMultiply = true) => {
    const array = isMultiply ? [...cards, ...cards] : cards
    const length = array.length;
    for (let i = length; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const currentIndex = i - 1;
        const temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array
}

export const FETCH_MEMORY_CARDS = async (limit: number | null = null, setIsLoading: (flag: boolean) => void) => {
    setIsLoading(true)
    const links = new Array(limit || 6).fill('https://pokeapi.co/api/v2/pokemon')

    const fetchItem = (link, i) => fetch(`${link}/${i}/`).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response.json()
    })

    return await Promise.all(
        links.map((link, i) => fetchItem(link, i + 1))
    )
        .then((results) => {
            setTimeout(() => { setIsLoading(false) }, 2000)
            const images = results.map(({ name, sprites: { front_shiny: url } }) => ({ name, url }))
            return SHUFFLE_MEMORY_CARDS(images)
        })
        .catch((error) => {
            setIsLoading(false)
            console.error(error)
        })   
}

export const DEFAULT_MEMORY_CARDS_LENGTH = 12
