import React, {useContext, useState } from 'react';
import {AppContext, useAppContext} from "../AppContext";
import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, EditingMode, SortingMode, FilteringMode, SortDirection,ActionType, } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';
import {deleteRow, loadData, updateData } from 'ka-table/actionCreators';
import { search, updateFilterRowValue } from 'ka-table/actionCreators';
import { kaDateUtils } from 'ka-table/utils';
import { hideLoading, showLoading } from 'ka-table/actionCreators';
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


const DeleteRow: React.FC<ICellTextProps> = ({
    dispatch, rowKeyValue
  }) => {
   return (
      <button
        className='delete-row-column-button'
        onClick={() => {
            
            async function deleteLaureate(){
                if(window.confirm("Are you sure?")){
                    dispatch(deleteRow(rowKeyValue))
                    const url = "http://localhost:8000/api/deleteNobelPrize/"+rowKeyValue
                    console.log(url)
                    const token = localStorage.getItem("token");
                await axios.delete(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }}).then(response => {
                        console.log(response)
                    }).catch(error =>{
                        console.log("getting categories ERROR")
                        console.log(error.message)
                    })
                }
            }
            deleteLaureate();
        }}
      >delete</button>
   );
  };

  const EditRow: React.FC<ICellTextProps> = ({
    dispatch, rowKeyValue
  }) => {
    const [laureateId, setLaureateId] = useState()
   return (
      <button
        className='edit-row-column-button'
        onClick={() => {
            window.location.replace("/editNobelPrize/"+rowKeyValue);
        }}
      >edit</button>
   );
  };


const TablePage: React.FC = () => {

    
    const [tableProps, changeTableProps] = useState( {
        columns: [
            { key: 'column1', title: 'Name', dataType: DataType.String },
            { key: 'column2', title: 'Award Year', dataType: DataType.String },
            { key: 'column3', title: 'Category', dataType: DataType.String, style:{textAlign:'center',} },
            { key: 'column4', title: 'Prize', dataType: DataType.Int, style:{textAlign:'center',} },
            { key: 'column5', title: 'PrizeAdjusted', dataType: DataType.Int, style:{textAlign:'center',} },
            { key: 'column6', title: 'Motivation', dataType: DataType.String },
            { key: 'column7', title: 'Wiki', dataType: DataType.String },
            { key: ':delete', width: 70, style: { textAlign: 'center' } },
            { key: ':edit', width: 70, style: { textAlign: 'center' } },
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
            const url = "http://localhost:8000/api/PrizesFromDatabase"
            const token = localStorage.getItem("token");
            const {data: res} = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            let json = res;
            const jsonArr = [];
            for (let i = 0; i < json.length; i++) {
                const prize = json[i]
                {
                    jsonArr.push({
                        column1: prize.laureate_name,
                        column2: prize.award_year,
                        column3: prize.category,
                        column4: prize.prize,
                        column5: prize.prize_adjusted,
                        column6: prize.motivation,
                        column7: prize.wikipedia,
                        id: prize.id
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
        childComponents={{
          cellText: {
            content: (props) => {
              switch (props.column.key){
                case ':delete': return <DeleteRow {...props}/>;
                case ':edit': return <EditRow {...props}/>;
              }
            }
          },
          filterRowCell: {
              content:(props) =>{
                  switch (props.column.key){
                      case ':delete': return <></>;
                      case ':edit': return <></>;
                      case 'column6': return <></>;
                      case 'column7': return <></>;
                  }
              }
          }
        }}
        dispatch={dispatch}
      />
    );
};


export default TablePage;