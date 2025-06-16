// revenue.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as RevenueActions from './revenue.actions';
import { RevenueAggregation } from 'src/app/shared/models/RevenueAggregation.model';

export interface RevenueState {
    data: RevenueAggregation[];
    loading: boolean;
    error: any;
}

export const initialState: RevenueState = {
    data: [],
    loading: false,
    error: null
};

export const revenueReducer = createReducer(
    initialState,
    on(RevenueActions.loadMonthlyRevenue, RevenueActions.loadWeeklyRevenue, state =>
        ({ ...state, loading: true, error: null })
    ),
    on(RevenueActions.loadRevenueSuccess, (state, { data }) =>
        ({ ...state, loading: false, data })
    ),
    on(RevenueActions.loadRevenueFailure, (state, { error }) =>
        ({ ...state, loading: false, error })
    )
);
