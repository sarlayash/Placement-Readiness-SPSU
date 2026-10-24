import { DayPlan, DailyBadge } from '../types';
import { DAYS_1_TO_5 } from './days1to5';
import { DAYS_6_TO_10 } from './days6to10';
import { SYLLABUS_MODULES } from './syllabusModules';

export const COMPLETE_10_DAY_PLAN: DayPlan[] = [...DAYS_1_TO_5, ...DAYS_6_TO_10];

export const ALL_DAILY_BADGES: DailyBadge[] = COMPLETE_10_DAY_PLAN.map((d) => d.badge);

export { SYLLABUS_MODULES };
