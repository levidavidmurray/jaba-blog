export const useConstants = (): {
    SITE_NAME: string,
    SITE_TITLE: string,
    SITE_DESCRIPTION: string,
    SITE_SEO_DESCRIPTION: string,
    SHRUG: string,
    SHRUG_ESC: string,
    TWITTER_PROFILE: string,
    TWITTER_HANDLE: string,
    TWITTER_CARD_IMAGE: string,
} => {
    const config = useRuntimeConfig();
    return config.public;
}
