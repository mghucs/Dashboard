import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react"; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import "ag-grid-enterprise";
import "ag-grid-charts-enterprise";
function Grid({gridData}) {
  
  const [colDefs] = useState([
    { field: "Date"},
    { field: "USD"},
    { field: "CAD"},
    { field: "EUR"},
  ]);
  // Ref to hold the grid instance
  const gridRef = useRef(null);

  // Function to save sorting state
  const onSaveSortingState = () => {
    const sortingState = gridRef.current.api.getColumnState();
    // Save sorting state to localStorage
    localStorage.setItem("sortingState", JSON.stringify(sortingState));
  };

  // Function to load sorting state
  const onLoadSortingState = () => {
    const sortingState = JSON.parse(localStorage.getItem("sortingState"));
    if (sortingState) {
      gridRef.current.api.applyColumnState({
        state: sortingState,
        defaultState: { sort: null },
      })
    }
  };
  
  return (
      <div
        className="ag-theme-quartz"
        style={{ height: 450 }} 
      >
        <AgGridReact 
            ref={gridRef}
            onSortChanged={onSaveSortingState}
            onFirstDataRendered={onLoadSortingState}
            rowData={gridData}
            columnDefs={colDefs}
            sideBar={'columns'}
            pagination={true}
            paginationPageSize={20}
        />
      </div>
    )
};

export {Grid}