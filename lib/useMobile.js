import { useMediaQuery } from "react-responsive"

export default function useMobile(){
    const limit = '800px'
    return useMediaQuery({ query: `(max-width: ${limit})` })
}