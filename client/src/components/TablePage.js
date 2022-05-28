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

//TODO Podmienić danynmi
//TODO https://stackblitz.com/edit/table-nullable-cell-data-js?file=Demo.js
const dataArray = Array(10).fill(undefined).map(
    (_, index) => ({
        column1: `column:1 row:${index}`,
        column2: `column:2 row:${index}`,
        column3: `column:3 row:${index}`,
        column4: `column:4 row:${index}`,
        column5: `column:5 row:${index}`,
        column6: `column:6 row:${index}`,
        id: index,
    }),
);

//TODO jak przekazac dane po kliknieciu
const handleReadJson = async () => {
    const url = "http://localhost:8000/api/laureates"
    const token = localStorage.getItem("token");
    console.log(token)
    const {data: res} = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const json = res['laureates'];
    const jsonArr = [];

    for (let i = 0; i < json.length; i++) {
        if (json[i].hasOwnProperty('givenName')){
            jsonArr.push({
                column1: json[i].fullName.en
            })
        }
    }

    console.log(jsonArr)
}

const tablePropsInit: ITableProps = {
    columns: [
        { key: 'column1', title: 'First Name', dataType: DataType.String },
        { key: 'column2', title: 'Last Name', dataType: DataType.String },
        { key: 'column3', title: 'Gender', dataType: DataType.String },
        { key: 'column4', title: 'Birth Date', dataType: DataType.Date },
        { key: 'column5', title: 'Country', dataType: DataType.String },
        { key: 'column6', title: 'Wiki', dataType: DataType.String },

    ],
    data: dataArray, //TODO przekazac dane
    editingMode: EditingMode.Cell,
    rowKeyField: 'id',
    sortingMode: SortingMode.Single,
};

const TablePage: React.FC = () => {
    const [tableProps, changeTableProps] = useState(tablePropsInit);
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