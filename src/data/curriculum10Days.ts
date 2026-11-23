import { DayPlan, DailyBadge } from '../types';
import { DAYS_1_TO_5 } from './days1to5';
import { DAYS_6_TO_10 } from './days6to10';
import { DAYS_11_TO_12 } from './days11to12';
import { DAYS_13_TO_15 } from './days13to15';
import { DAYS_16 } from './day16Plan';
import { SYLLABUS_MODULES } from './syllabusModules';

export const COMPLETE_10_DAY_PLAN: DayPlan[] = [
  ...DAYS_1_TO_5,
  ...DAYS_6_TO_10,
  ...DAYS_11_TO_12,
  ...DAYS_13_TO_15,
  ...DAYS_16,
];
export const COMPLETE_12_DAY_PLAN: DayPlan[] = COMPLETE_10_DAY_PLAN;
export const COMPLETE_15_DAY_PLAN: DayPlan[] = COMPLETE_10_DAY_PLAN;
export const COMPLETE_16_DAY_PLAN: DayPlan[] = COMPLETE_10_DAY_PLAN;

export const ALL_DAILY_BADGES: DailyBadge[] = COMPLETE_10_DAY_PLAN.map((d) => d.badge);

export { SYLLABUS_MODULES, DAYS_11_TO_12, DAYS_13_TO_15, DAYS_16 };
