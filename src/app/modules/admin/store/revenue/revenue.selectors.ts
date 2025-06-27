import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RevenueState } from './revenue.reducer';

export const selectRevenueState = createFeatureSelector<RevenueState>('revenue');

export const selectRevenueData = createSelector(
    selectRevenueState,
    state => state.data
);

export const selectRevenueLoading = createSelector(
    selectRevenueState,
    state => state.loading
);