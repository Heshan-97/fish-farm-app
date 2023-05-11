import * as React from "react";
import { useState, useEffect} from "react";
//For Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Typography,
  Button,
  Container,
  Input,
  InputLabel,
  FormControl,
  Select,
  MenuItem
} from "@mui/material";

//for the model
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//For model pop up
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

//For Table css
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const BoatList = () => {

  //set data using hooks
  const [data, setData] = useState([]);

  useEffect( () => {
    getData();

  }, [])

  //Get Function---------------------------------------------------start
  const getData =() => {
    axios.get('https://localhost:7102/api/Boat')
    .then((result) => {
      setData(result.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }
//------------------------------------------------------------------end
  //Set variable for add new form
 const [boatName, SetboatName] = useState('');
 const [gpsPosition, SetgpsPosition] = useState('');
 const [noOfCages, SetNoOfCages] = useState('');
 const [fishFarms, setFishFarms] = useState([]);
  const [fishFarmsFarmId, SetFishFarmsFarmId] = useState('');

 //Set variable for edit/update new form
 const [editboatId, SetEditboatId] = useState('');
 const [editboatName, SetEditboatName] = useState('');
 const [editGpsPosition, SetEditGpsPosition] = useState('');
 const [editNoOfCages, SetEditNoOfCages] = useState('');
 const [editfishFarmsFarmId, editSetFishFarmsFarmId] = useState('');

  //For pop up edit
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleClose = () => setOpenEdit(false);

  // For pop up add
  const [openAdd, setOpenAdd] = useState(false)
  const handleOpenAdd = () => setOpenAdd(true);
  const handleAddClose = () => setOpenAdd(false);

 

//OnClickHandleEdit in form--------------------------GetbyId function-------------------------Start
const handleEdit = (boatId) => {
  //useEffect(() => {    //get farmlist from farm table
  const getFarmName =() => {
    axios.get('https://localhost:7102/api/FishFarm')
      .then((response) => {
        setFishFarms(response.data);
        //toast.success('Farm name list has been loaded');
      })
      .catch((error) => {
        console.log(error);
      })
    }
    getFarmName();
  //}, []); 
  handleOpenEdit(boatId);
  axios.get(`https://localhost:7102/api/Boat/${boatId}`)
    .then((result) => {
      SetEditboatId(boatId);
      SetEditboatName(result.data.boatName);
      SetEditGpsPosition(result.data.gpsPosition);
      SetEditNoOfCages(result.data.noOfCages);
      editSetFishFarmsFarmId(result.target.fishFarmsFarmId);
    })
    .catch((error) => {
      console.error(error);
    })
}
//-----------------------------------------------------------------------------------------End
//firm farm dropdown Edit***********************************************************************************************
const handleFarmNameEdit =(event) => {
  const getFarmNameid = event.target.value;
  console.log(getFarmNameid);
  editSetFishFarmsFarmId(getFarmNameid);
}
//OnClickHandleEdit in popup --------------------------------Put fuction-------------------Start
const handleUpdate = (boatId) =>{
    const url = `https://localhost:7102/api/Boat?id=${editboatId}`;
    const data = {
      "boatId" : editboatId,
      "boatName": editboatName,
      "gpsPosition": editGpsPosition,
      "noOfCages": editNoOfCages,
      "fishFarmsFarmId" : editfishFarmsFarmId
    }
    axios.put(url, data)
    .then((result) => {
      handleClose();
      getData();
      clear();
      toast.success('Boat record has been updated');
      handleAddClose();
    })
    .catch((error) => {
      toast.error(error);
    })
}


//----------------------------------------------------------------------------------------End

//onClickHanleDelete----------------Delete function-------------------------start 
const handleDelete = (boatId) =>{
  if(window.confirm("Are you sure to delete this boat record!") === true)
  {
    axios.delete(`https://localhost:7102/api/Boat?id=${boatId}`)
    .then((result) => {
      if(result.status === 200)
      {
        toast.success('Boat record has been deleted');
        getData();
      }
    })
    .catch((error) => {
      toast.error(error);
    })
  }
}
//---------------------------------------------------------------------------------------------End

//onClickHanleAdd new boat in from
const handleAddForm = () => {
  //useEffect(() => {    //get farmlist from farm table
  const getFarmName =() => {
    axios.get('https://localhost:7102/api/FishFarm')
      .then((response) => {
        setFishFarms(response.data) ;
        //toast.success('Farm name has been loaded');
      })
      .catch((error) => {
        console.log(error);
      })
    }
    getFarmName();
  //}, []); 
  handleOpenAdd();
}
//firm farm dropdown Add***********************************************************************************************
const handleFarmNameAdd =(event) => {
  const getFarmNameid = event.target.value;
  console.log(getFarmNameid);
  SetFishFarmsFarmId(getFarmNameid);
}
//onClickHanleAdd new boat in popup---------------post function---------------------------start
const handleAdd = () => {
    const url = 'https://localhost:7102/api/Boat'
    const data = {
      "boatName": boatName,
      "gpsPosition": gpsPosition,
      "noOfCages": noOfCages,
      "fishFarmsFarmId" : fishFarmsFarmId
    }
    axios.post(url, data)
    .then((result) => {
      getData();
      clear();
      toast.success('Boat has been added');
      handleAddClose();
    })
    .catch((error) => {
      toast.error(error);
    })
}
const clear = () => {
  SetboatName('');
  SetgpsPosition('');
  SetNoOfCages('');
  SetFishFarmsFarmId('');
  SetEditboatId('')
  SetEditboatName('')
  SetEditGpsPosition('')
  SetEditNoOfCages('');
  SetEditNoOfCages('');
  

}

//------------------------------------------------------------------end 



  return (
    
    <Container>
      <ToastContainer/>
      <TableContainer component={Paper}>
        <Typography variant="h4"><br/>&nbsp;&nbsp;Boats</Typography>
        <Typography align="right"><Button variant="contained" color="primary" onClick={() => handleAddForm()} > + Add new boat</Button>&nbsp;&nbsp;</Typography><hr/>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell align="right">Boat Name</StyledTableCell>
              <StyledTableCell align="right">GPS Position</StyledTableCell>
              <StyledTableCell align="right">No Of Cages</StyledTableCell>
              <StyledTableCell align="right">FishFarm Name</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {
              data && data.length > 0 ?
                data.map((item, index) => {
                  return (
                    <StyledTableRow key={index} >
                    <StyledTableCell> {index+ 1} ({item.boatId}) </StyledTableCell>
                    <StyledTableCell align="right">{item.boatName}</StyledTableCell>
                    <StyledTableCell align="right">{item.gpsPosition}</StyledTableCell>
                    <StyledTableCell align="right">{item.noOfCages}</StyledTableCell>
                    <StyledTableCell align="right">{item.fishFarms?.farmName}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Button variant="contained" color="inherit" onClick={() => handleEdit(item.boatId)} >Edit</Button>&nbsp;
                      <Button variant="contained" color="error" onClick={() => handleDelete(item.boatId)} > Delete </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                  )
                })
                :
                'Loading...'
                //
                //
              }
          </TableBody>
        </Table>
              
          <Modal
            open={openEdit}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" align="center" fontFamily={"inherit"}>
                  Edit Boat
                </Typography>
                <Typography id="modal-modal-text" sx={{ mt: 2 }}>
                    <InputLabel>Boat name&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="text" className="form-control" placeholder="Edit boat name" value={editboatName} onChange={(e) => SetEditboatName(e.target.value)}></Input> </InputLabel>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <InputLabel>GPS position&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="text" className="form-control" placeholder="Edit GPS position" value={editGpsPosition} onChange={(e) => SetEditGpsPosition(e.target.value)}></Input> </InputLabel>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <InputLabel>No of Cages&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="text" className="form-control" placeholder="Edit No of Cages " value={editNoOfCages} onChange={(e) => SetEditNoOfCages(e.target.value)}> </Input></InputLabel>
                </Typography>
                <Typography id="modal-modal-text" sx={{ mt: 2 }}>
              <InputLabel>Famrm ID&nbsp;&nbsp;&nbsp;&nbsp;:<Input type="text" className="form-control" placeholder="Enter Working farm name" value={editfishFarmsFarmId} onChange={(e) => editSetFishFarmsFarmId(e.target.value) } disabled></Input> </InputLabel>
             <br/> 
              <Box sx={{ maxWidth: 350 }}>
                  <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">-- Select Fish Farm Name --:</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select"  value={editfishFarmsFarmId} onChange={(e) => handleFarmNameEdit(e)} >
                            <MenuItem >--Select--</MenuItem>
                            { fishFarms.map((fishFarm) => {
                              return (
                                  <MenuItem key={fishFarm.farmId} value={fishFarm.farmId}>{fishFarm.farmName}</MenuItem>
                              )
                            })}
                    </Select>
                  </FormControl>
                </Box>
          </Typography>
                <br/>
                <Typography align="right"><hr/>
                  <Button variant="contained" color="primary" onClick={() => handleUpdate()} >Edit</Button>&nbsp;
                  <Button variant="contained" color="info" onClick={() => handleClose()} > Close </Button>
                </Typography>
              </Box>
          </Modal>

          <Modal
        open={openAdd}
        onClose={handleAddClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" align="center" fontFamily={"inherit"}>
              Add New Boat
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          <InputLabel>Boat name&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="text" className="form-control" placeholder="Enter boat name" value={boatName} onChange={(e) => SetboatName(e.target.value) }></Input> </InputLabel>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <InputLabel>GPS position&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="text" className="form-control" placeholder="Enter GPS Position" value={gpsPosition} onChange={(e) => SetgpsPosition(e.target.value) }></Input> </InputLabel>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <InputLabel>No of Cages&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="text" className="form-control" placeholder="No of Cages" value={noOfCages} onChange={(e) => SetNoOfCages(e.target.value)} ></Input></InputLabel>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          
              <Box sx={{ maxWidth: 300 }}>
                  <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">-- Select a fish farm name --</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select"  onChange={(e) => handleFarmNameAdd(e)}>
                    <MenuItem >--Select--</MenuItem>
                            { fishFarms.map((fishFarm) => {
                              return (
                                  <MenuItem key={fishFarm.farmId} value={fishFarm.farmId}>{fishFarm.farmName}</MenuItem>
                              )
                            })}
                    </Select>
                  </FormControl>
                </Box>
          </Typography>
          <br/>
          <Typography align="right"><hr/>
          <Button variant="contained" color="primary" onClick={() => handleAdd()} >Add</Button>&nbsp;
          <Button variant="contained" color="info" onClick={() => handleAddClose()} > Close </Button>
          </Typography>
        </Box>
      </Modal>

      </TableContainer><br/>
    </Container>
  );
};

export default BoatList;
