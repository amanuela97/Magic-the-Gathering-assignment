import React, {useEffect} from 'react';
import Paper from '@material-ui/core/Paper';    
import { makeStyles } from '@material-ui/core/styles';
import {
    Table as MaterialTable, TableBody, 
    TableCell, 
    TableHead, 
    TableRow} 
    from '@material-ui/core';
    
function Table({chapters,onSelect}) {

    const useStyles = makeStyles({
        table: {
          minWidth: "50%",
        },
    });

    const classes = useStyles();

    useEffect(() => {
    },[chapters]); 

    return (
        <div component={Paper} className="TableContainer" id="top">
        <MaterialTable className={classes.table}  aria-label="simple table">
        <TableHead>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>Table Of Content for Magic the Gathering</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chapters?.map((chapter, index) => (
            <TableRow key={index}>
              <TableCell> 
              <a href="#top"  onClick={(e) => onSelect(chapter)}>{chapter}</a>
              </TableCell> 
            </TableRow>
            ))}
          </TableBody>
        </MaterialTable>
      </div>
    );
}

export default Table;