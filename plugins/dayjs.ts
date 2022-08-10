import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import timezone from 'dayjs/plugin/timezone.js';

export default defineNuxtPlugin(nuxtApp => {
    dayjs.extend(relativeTime);
    dayjs.extend(timezone);

    dayjs.tz.setDefault('America/Vancouver');

    nuxtApp.provide('dayjs', dayjs);
});
