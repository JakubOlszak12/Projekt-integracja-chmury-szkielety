import React from 'react';

import { ActionType } from 'ka-table/enums';
import { dateUtils } from 'ka-table/utils';

export const CustomImageCell = ({
                                    value,
                                }) => {
    return (
        <div>
            <img className='custom-cell-image' src={value} alt=''/>
        </div>
    );
};

export const FilterOperators = ({
                                    column, dispatch,
                                }) => {
    return (
        <select
            className='form-control'
            defaultValue={column.filterRowOperator}
            onChange={(event) => {
                dispatch(ActionType.ChangeFilterRow, { column: {...column, filterRowOperator: event.currentTarget.value}});
            }}>
            <option value={'='}>=</option>
            <option value={'<'}>{'<'}</option>
            <option value={'>'}>{'>'}</option>
            <option value={'<='}>{'<='}</option>
            <option value={'>='}>{'>='}</option>
        </select>
    );
};

export const CustomNumberFilterEditor = ({
                                             column, dispatch,
                                         }) => {
    return (
        <div>
            <FilterOperators column={column} dispatch={dispatch}/>
            <input
                defaultValue={column.filterRowValue}
                style={{width: 60}}
                onChange={(event) => {
                    const filterRowValue = event.currentTarget.value !== '' ? Number(event.currentTarget.value) : null;
                    dispatch(ActionType.ChangeFilterRow, { column: {...column, filterRowValue}});
                }}
                type='number'
            />
        </div>
    );
};

export const CustomDateFilterEditor = ({
                                           column, dispatch,
                                       }) => {
    const fieldValue = column.filterRowValue;
    const value = fieldValue && dateUtils.getDateInputValue(fieldValue);
    return (
        <div>
            <FilterOperators column={column} dispatch={dispatch}/>
            <input
                type='date'
                value={value || ''}
                onChange={(event) => {
                    const targetValue = event.currentTarget.value;
                    const filterRowValue = targetValue ? new Date(targetValue) : null;
                    const updatedColumn = {...column, filterRowValue};
                    dispatch(ActionType.ChangeFilterRow, {column: updatedColumn});
                }}
            />
        </div>
    );
};
