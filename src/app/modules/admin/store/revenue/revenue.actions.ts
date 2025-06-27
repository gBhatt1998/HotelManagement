import { createAction, props } from '@ngrx/store';
import { RevenueAggregation } from 'src/app/modules/admin/models/RevenueAggregation.model';

export const loadMonthlyRevenue = createAction('[Revenue] Load Monthly');
export const loadWeeklyRevenue = createAction('[Revenue] Load Weekly');

export const loadRevenueSuccess = createAction('[Revenue] Load Success',
    props<{ data: RevenueAggregation[] }>());

export const loadRevenueFailure = createAction('[Revenue] Load Failure',
    props<{ error: any }>());