import React, {useContext, useState } from 'react';
import {AppContext, useAppContext} from "../AppContext";
import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, EditingMode, SortingMode, FilteringMode, SortDirection,ActionType, } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';
import { loadData, updateData } from 'ka-table/actionCreators';
import { search, updateFilterRowValue } from 'ka-table/actionCreators';
import { kaDateUtils } from 'ka-table/utils';
import axios from "axios";
import { hideLoading, showLoading } from 'ka-table/actionCreators';

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
    const [tableProps, changeTableProps] = useState( {
        columns: [
            { key: 'column1', title: 'First Name', dataType: DataType.String },
            { key: 'column2', title: 'Last Name', dataType: DataType.String },
            { key: 'column3', title: 'Gender', dataType: DataType.String, style:{textAlign:'center',} },
            { key: 'column4', title: 'Birth Date', dataType: DataType.String, style:{textAlign:'center',} },
            { key: 'column5', title: 'Born', dataType: DataType.String, style:{textAlign:'center',} },
            { key: 'column6', title: 'Wiki', dataType: DataType.String },
    
        ],
        singleAction: loadData(),
        rowKeyField: 'id',
        sortingMode: SortingMode.Single,
        filteringMode: FilteringMode.FilterRow,
        loading: {
            enabled: true,
            text: 'Loading data'
          }
    });
    const dispatch: DispatchFunc = async (action) => {
        changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
        
    if (action.type === ActionType.LoadData) {
        const url = "http://localhost:8000/api/laureates"
        const token = localStorage.getItem("token");
        const {data: res} = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
       
        let json = res['laureates'];
        const jsonArr = [];

        for (let i = 0; i < json.length; i++) {
            const person = json[i]
            //TODO walidacja
            if (person.hasOwnProperty('givenName') &&
                person.hasOwnProperty('familyName') &&
                person.hasOwnProperty('gender') &&
                person.hasOwnProperty('birth')&&
                'place' in person.birth)
            {
                jsonArr.push({
                    column1: person.givenName.en,
                    column2: person.familyName.en,
                    column3: person.gender,
                    column4:  person.birth.date,
                    column5: person.birth.place.country.en,
                    column6: person.wikipedia.english,
                    id: person.id
                })
            }
        }
        dispatch(hideLoading());
        dispatch(updateData(jsonArr));
      }
    };

    return (
        <Table
            {...tableProps}
            dispatch={dispatch}
        />
    );
};

export default TablePage;