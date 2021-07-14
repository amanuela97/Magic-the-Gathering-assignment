import React, {useEffect} from 'react';
import Paper from '@material-ui/core/Paper';    
import { makeStyles } from '@material-ui/core/styles';
import {
    Table as MaterialTable, TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow} 
    from '@material-ui/core';
    
function Table({rules, chapters,onSelect}) {

    const useStyles = makeStyles({
        table: {
          minWidth: 450,
        },
    });

    const classes = useStyles();

    useEffect(() => {
        console.log('Table component');
    },[chapters, rules]); 

    return (
        <TableContainer component={Paper} style={{width: "50%"}}>
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
              <a href="#?"  onClick={(e) => onSelect(e,chapter)}>{chapter}</a>
              </TableCell> 
            </TableRow>
            ))}
          </TableBody>
        </MaterialTable>
      </TableContainer>
    );
}

export default Table;