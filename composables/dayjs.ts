import { daysInWeek } from 'date-fns';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(relativeTime);
dayjs.extend(timezone);

dayjs.tz.setDefault('America/Vancouver');

export const $dayjs = dayjs
