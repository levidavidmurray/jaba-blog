export const useHost = () => {
    if (process.server) {
        return useRequestHeaders().host
    }

    return location?.host
}