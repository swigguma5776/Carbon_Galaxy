import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { Button,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText, 
    DialogTitle,
    styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { CarbonForm } from '../CarbonForm';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 , minWidth: 100},
  {
    field: 'website_url',
    headerName: 'Website URL',
    width: 175,
    editable: true,
  },
  {
    field: 'carbon_per_webpage',
    headerName: 'Carbon per Webpage (in grams)',
    type: 'number',
    width: 250,
    editable: true,
  },
  {
    field: 'carbon_per_year',
    headerName: 'Carbon per Year (in grams)',
    type: 'number',
    width: 250,
    editable: true,
  },
  {
    field: 'green_energy',
    headerName: 'Green Energy',
    width: 150,
    editable: true,
  },
  {
    field: 'trees_needed',
    headerName: 'Trees needed to offset Carbon',
    type: 'number', 
    flex: 2,
    minWidth: 230,
    editable: true,
  },
  
];

interface gridData{
    data:{
        id?: string; 
    }
}

const myStyles = {
    text: {
      color: 'white', 
    }
}





export const DataTable = () => {
    let { carbonData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = () => {
        setOpen(true)
    }

    let handleClose = () => {
        setOpen(false)
    
    }

    let deleteData = async () => {
        serverCalls.delete(`${gridData[0]}`)
        await getData()
        window.location.reload();
  
    }

    return (
        <Box sx={{ height: 375, width: '80%', marginTop: '50px', marginRight: 'auto', marginLeft: 'auto'}}>
        
          <DataGrid sx= {myStyles.text}
            rows={carbonData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={newSelectionModel => setData(newSelectionModel)}
            {...carbonData}
          />

          <Button variant='contained' onClick={handleOpen}>Update</Button>
          <Button variant="contained" color="warning" onClick={deleteData}>Delete</Button>
          

            {/*Dialog Pop Up begin */}
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Your Website Search</DialogTitle>
            <DialogContent>
              <DialogContentText>{gridData[1]}</DialogContentText>
                <CarbonForm id={`${gridData[0]}`}/>
            </DialogContent>
            <DialogActions>
              <Button onClick = {handleClose} color="primary">Cancel</Button>
              <Button onClick={handleClose} color = "primary">Done</Button> 
            </DialogActions>
          </Dialog>
        </Box>
    );

}