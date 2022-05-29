import React, {useContext, useState } from 'react';
import {AppContext, useAppContext} from "../AppContext";
import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, EditingMode, SortingMode, FilteringMode, SortDirection, } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';
import { search, updateFilterRowValue } from 'ka-table/actionCreators';
import { kaDateUtils } from 'ka-table/utils';
import axios from "axios";

const CustomDateFilterEditor = ({
                                    column, dispatch,
                                }) => {
    const fieldValue = column.filterRowValue;
    const value = fieldValue && kaDateUtils.getDateInputValue(fieldValue);
    return (
        <div>
            <>Less than: </>
            <input
                type='date'
                value={value || ''}
                onChange={(event) => {
                    const targetValue = event.currentTarget.value;
                    const filterRowValue = targetValue ? new Date(targetValue) : null;
                    dispatch(updateFilterRowValue(column.key, filterRowValue));
                }}
            />
        </div>
    );
};




const TablePage: React.FC = () => {
    const {jsonPrizeData} = useContext(AppContext)
    const [tableProps, changeTableProps] = useState( {
        columns: [
            { key: 'column1', title: 'Name', dataType: DataType.String },
            { key: 'column2', title: 'Award Year', dataType: DataType.String },
            { key: 'column3', title: 'Category', dataType: DataType.String, style:{textAlign:'center',} },
            { key: 'column4', title: 'Prize', dataType: DataType.Int, style:{textAlign:'center',} },
            { key: 'column5', title: 'PrizeAdjusted', dataType: DataType.Int, style:{textAlign:'center',} },
            { key: 'column6', title: 'Motivation', dataType: DataType.String },
            { key: 'column7', title: 'Wiki', dataType: DataType.String },
    
        ],
        data: jsonPrizeData, //TODO przekazac dane
        rowKeyField: 'id',
        sortingMode: SortingMode.Single,
        filteringMode: FilteringMode.FilterRow,
    });
    const dispatch: DispatchFunc = (action) => {
        changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
    };

    return (
        <Table
            {...tableProps}
            dispatch={dispatch}
        />
    );
};


export default TablePage;