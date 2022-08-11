export const hasHistory: () => boolean = () => {
    if (process.server) {
        return false
    }
    return Boolean(history.state.back)
}
