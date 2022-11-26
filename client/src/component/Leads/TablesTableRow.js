import { Divider } from "@chakra-ui/react";
import { React } from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";
import { GlobalFilter } from "./Filter";

export default function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    visibleColumns,
    prepareRow,
    setGlobalFilter,
    preGlobalFilteredRows,
  } = useTable(
    {
      columns,
      data,
      
    },
    useFilters,
    useGlobalFilter
  );

  return (
    <table {...getTableProps()}  style={{width:"100%", margin:"20px"}}>
      <thead>
      
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render("Header")}
                {/* rendering column filter */}
                {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
            
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <Divider my={10} w={"100%"}/>
      <tbody {...getTableBodyProps()} style={{lineHeight:"48px"}}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} >
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}