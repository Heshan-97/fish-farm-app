import * as React from "react";
import { useState, useEffect} from "react";
//For Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Typography,
  Button,
  Container,
  Input,
  Checkbox,
  InputLabel,
  FormControl,
} from "@mui/material";
import { styled } from '@mui/material/styles';

//for the model
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//For Image 
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
//import {BrowserRouter, Routes, Route} from 'react-router-dom';
//import FishFarmUpdate from '../FishFarm/FishFarmUpdate';

//For model pop up
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
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



const FarmList = () => {

  //dammy data
  /*const farmdata = [
    {
      farmId: 1,
      farmName: "Test Farm",
      farmPictureUrl: "https://chat.openai.com/",
      bargeAvailability: "Y",
    },
    {
      farmId: 2,
      farmName: "Farm",
      farmPictureUrl: "https://chat.openai.com/",
      bargeAvailability: "Y",
    },
    {
      farmId: 3,
      farmName: "Test",
      farmPictureUrl: "https://chat.openai.com/",
      bargeAvailability: "N",
    },
    {
      farmId: 4,
      farmName: "Abc",
      farmPictureUrl: "https://chat.openai.com/",
      bargeAvailability: "Y",
    },
    {
      farmId: 5,
      farmName: "shark",
      farmPictureUrl: "https://chat.openai.com/",
      bargeAvailability: "N",
    },
  ];*/

  //set data using hooks
  const [data, setData] = useState([]);

  useEffect( () => {
    getData();

  }, [])

  //Get Function---------------------------------------------------start
  const getData =() => {
    axios.get('https://localhost:7102/api/FishFarm')
    .then((result) => {
      setData(result.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }
//------------------------------------------------------------------end
  //Set variable for add new form
 const [farmName, SetfarmName] = useState('');
 const [farmPictureUrl, SetfarmPictureUrl] = useState('');
 const [bargeAvailability, SetbargeAvailability] = useState(false);
 const [selectedFile, setSelectedFile] = useState(null);
 const [workersNameList, setWorkersNameList] = useState([]);
 //constFishFarmsNameList [WorkerName, SetWorkerName] = useState('');



 //Set variable for edit/update new form
 const [editfarmId, SetEditfarmId] = useState('');
 const [editfarmName, SetEditfarmName] = useState('');
 const [editfarmPictureUrl, SetEditfarmPictureUrl] = useState('');
 const [editbargeAvailability, SetEditbargeAvailability] = useState(false);

  //For pop up edit
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleClose = () => setOpenEdit(false);

  // For pop up add
  const [openAdd, setOpenAdd] = useState(false)
  const handleOpenAdd = () => setOpenAdd(true);
  const handleAddClose = () => setOpenAdd(false);

  //View workers
  const [openWorkersView, setOpenWorkersView] = useState(false);
  const handleOpenWorkersView = () => setOpenWorkersView(true);
  const handleViewClose = () => setOpenWorkersView(false);  

 

//OnClickHandleEdit in form--------------------------GetbyId function-------------------------Start
const handleEdit = (farmId) => {
  handleOpenEdit(farmId);
  axios.get(`https://localhost:7102/api/FishFarm/${farmId}`)
    .then((result) => {
      SetEditfarmId(farmId);
      SetEditfarmName(result.data.farmName);
      SetEditfarmPictureUrl(result.data.farmPictureUrl);
      SetEditbargeAvailability(result.data.bargeAvailability);
    })
    .catch((error) => {
      console.error(error);
    })
}
//-----------------------------------------------------------------------------------------End

//OnClickHandleEdit in popup --------------------------------Put fuction-------------------Start
const handleUpdate = (farmId) =>{
    const url = `https://localhost:7102/api/FishFarm?id=${editfarmId}`;
    const data = {
      "farmId" : editfarmId,
      "farmName": editfarmName,
      "farmPictureUrl": editfarmPictureUrl,
      "bargeAvailability": editbargeAvailability,
    }
    axios.put(url, data)
    .then((result) => {
      handleClose();
      getData();
      clear();
      toast.success('Fish farm has been updated');
      handleAddClose();
    })
    .catch((error) => {
      toast.error(error);
    })
}
/*const handleEditBargeChange = (e) => {
  if(e.target.checked)
  {
    SetbargeAvailability(true);
  }
  else
  {
    SetbargeAvailability(false);
  }
}*/
const handleEditBargeChange = (e) => {
  console.log("handleEditBargeChange", e.target.checked);
  SetEditbargeAvailability(e.target.checked);
};
//----------------------------------------------------------------------------------------End

//onClickHanleDelete----------------Delete function-------------------------start 
const handleDelete = (farmId) =>{
  if(window.confirm("Are you sure to delete this fish farm!") === true)
  {
    axios.delete(`https://localhost:7102/api/FishFarm?id=${farmId}`)
    .then((result) => {
      if(result.status === 200)
      {
        toast.success('Fish farm has been deleted');
        getData();
      }
    })
    .catch((error) => {
      toast.error(error);
    })
  }
}
//---------------------------------------------------------------------------------------------End

//onClickHanleAdd new fish farm in from
const handleAddForm = () => {
  handleOpenAdd();
}

const handleUploadImg = (event) => {
console.log("test",event.target);
  //const getFarmImgeUrl = event.target.file[0];
  //console.log(getFarmImgeUrl);
  //setSelectedFile(getFarmImgeUrl);

  const file = event.target.files[0];


  setSelectedFile(file);
 /* formData.append('ImageFile', file);
  axios.post('https://localhost:7102/api/FishFarm/SaveImage', formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  }).then(response => {
      console.log(response);
  }).catch(error => {
      console.log(error);
  });
*/
}

//onClickHanleAdd new fish farm in popup---------------post function---------------------------start
const handleAdd = (e) => {
    const url = 'https://localhost:7102/api/FishFarm/SaveImage'
    var sd =new FormData()
    sd.append('ImageFile', selectedFile)
    sd.append('farmName', farmName)
    sd.append('bargeAvailability', bargeAvailability)
    /*const data = {
      "farmName": farmName,
      "farmPictureUrl": farmPictureUrl,
      "bargeAvailability": bargeAvailability,
      
    }*/
    axios.post(url, sd)
    .then((result) => {
      getData();
      clear();
      toast.success('Fish farm has been added');
      handleAddClose();
    })
    .catch((error) => {
      toast.error(error);
    })
}
const clear = () => {
  SetfarmName('');
  SetfarmPictureUrl('');
  SetbargeAvailability(false);
  SetEditfarmId('')
  SetEditfarmName('')
  SetEditfarmPictureUrl('')
  SetEditbargeAvailability(false);
}
const handleBargeChange = (e) => {
  if(e.target.checked)
  {
    SetbargeAvailability(true);
  }
  else
  {
    SetbargeAvailability(false);
  }
}

//---------------View Workers Button-----------------------
const handleViewWorkers = () => {

  handleOpenWorkersView();
//useEffect(() => {    //get farmlist from farm table
const getworkersName =() => {
  axios.get('https://localhost:7102/api/Workers')
    .then((response) => {
      setWorkersNameList(response.data);
      //toast.success('Farm name list has been loaded');
    })
    .catch((error) => {
      console.log(error);
    })
  }
  getworkersName();
//}, []);
}

//------------- View Boats Button--------------------
const handleViewBoats = () => {

}
//------------------------------------------------------------------end

  return (
    
    <Container>
      <ToastContainer/>
      <TableContainer component={Paper}>
        <Typography variant="h4"><br/>&nbsp;&nbsp;Fish Farms</Typography>
        <Typography variant="h4" align="right"><Button variant="contained" color="primary" onClick={() => handleAddForm()} > + Add new farm</Button>&nbsp;&nbsp;</Typography><hr/>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead >
            <StyledTableRow>
              <StyledTableCell >#</StyledTableCell>
              <StyledTableCell align="right" >Fish Farm Image</StyledTableCell>
              <StyledTableCell align="right" >Fish Farm Name</StyledTableCell>
              <StyledTableCell align="right" >Barge Availability</StyledTableCell>
              <StyledTableCell align="right" >View Workers</StyledTableCell>
              <StyledTableCell align="right" >View Boats</StyledTableCell>
              <StyledTableCell align="right" >Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody >
            {
              data && data.length > 0 ?
                data.map((item, index) => {
                  return (
                    <StyledTableRow key={index} >
                    <StyledTableCell component="th" scope="row"> {index+ 1} ({item.farmId} )</StyledTableCell>
                    <StyledTableCell align="right">
                        <Stack direction="row" spacing={2} >
                            <Avatar alt="Remy Sharp" src={ item.farmPictureUrl} sx={{ width: 100, height: 100 }} />
                        </Stack>
                    </StyledTableCell>
                    <StyledTableCell align="right">{item.farmName}</StyledTableCell>
                    <StyledTableCell align="right">{!!item.bargeAvailability ? 'Yes' : 'No'}</StyledTableCell>
                    <StyledTableCell align="right"><Button variant="contained" color="primary" onClick={() => handleViewWorkers(item.farmId)} >View</Button></StyledTableCell>
                    <StyledTableCell align="right"><Button variant="contained" color="primary" onClick={() => handleViewBoats(item.farmId)} >View</Button></StyledTableCell>
                    <StyledTableCell align="right">
                      <Button variant="contained" color="inherit" onClick={() => handleEdit(item.farmId)} >Edit</Button>&nbsp;
                      <Button variant="contained" color="error" onClick={() => handleDelete(item.farmId)} > Delete </Button>
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
              
          <Modal  open={openEdit} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" align="center" fontFamily={"inherit"}>
                  Edit fish farm
                </Typography>
                <Typography id="modal-modal-text" sx={{ mt: 2 }}>
                <InputLabel>Fish farm name&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="text" className="form-control" placeholder="Edit fish farm name" value={editfarmName} onChange={(e) => SetEditfarmName(e.target.value)}/></InputLabel> 
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <InputLabel>Farm picture URL:&nbsp;<Input type="text" className="form-control" placeholder="Edit farm picture URL" value={editfarmPictureUrl} onChange={(e) => SetEditfarmPictureUrl(e.target.value)}/></InputLabel> 
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <InputLabel>Barge Availability&nbsp;:<Checkbox type="checkbox" className="form-control" placeholder="Tick barge availability" checked={editbargeAvailability} onChange={(e) => handleEditBargeChange(e)} /> </InputLabel>
                </Typography><br/>
                <Typography align="right"><hr/>
                  <Button variant="contained" color="primary" onClick={() => handleUpdate()} >Edit</Button>&nbsp;
                  <Button variant="contained" color="info" onClick={() => handleClose()} > Close </Button>
                </Typography>
              </Box>
          </Modal>

          <Modal open={openAdd} onClose={handleAddClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" align="center" fontFamily={"inherit"}>
              Add new fish farm
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          <InputLabel>Fish farm name&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="text" className="form-control" placeholder="Enter fish farm name" value={farmName} onChange={(e) => SetfarmName(e.target.value) }></Input></InputLabel> 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                
          <Box sx={{ maxWidth: 300 }}>
              <FormControl fullWidth>
              <InputLabel>Select Farm Image&nbsp;:&nbsp;</InputLabel> <br/><br/>
                <Input type="file" className="form-control"  onChange={(e) => handleUploadImg(e)}></Input>
            </FormControl>
          </Box>

          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <InputLabel>Barge Availability&nbsp;&nbsp;:<Checkbox type="checkbox" className="form-control" placeholder="Tick barge availability" checked={bargeAvailability} onChange={(e) => handleBargeChange(e)} /></InputLabel>
          </Typography><br/>
          <Typography align="right"><hr/>
          <Button variant="contained" color="primary" onClick={() => handleAdd()} >Add</Button>&nbsp;
          <Button variant="contained" color="info" onClick={() => handleAddClose()} > Close </Button>
          </Typography>
        </Box>
      </Modal>

      
         
      <Modal open={openWorkersView} onClose={handleViewClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
        <TableContainer component={Paper}>
        	<Typography variant="h4">&nbsp;&nbsp;Workers</Typography>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
          		<TableHead >
            		<StyledTableRow>
              			<StyledTableCell >#</StyledTableCell>
              			<StyledTableCell align="left" >Worker Name</StyledTableCell>
              			<StyledTableCell align="left" >Role</StyledTableCell>
            		</StyledTableRow>
          		</TableHead>
          	<TableBody >
            		{		
                 workersNameList.map((worker, index) => {
                              return (
                                <StyledTableRow key={index} >
                                  <StyledTableCell component="th" scope="row">{index+ 1} {worker.workerId}</StyledTableCell>
                                  <StyledTableCell >{worker.firstName}</StyledTableCell>
                                  <StyledTableCell >{worker.crewRole}</StyledTableCell>
                                  </StyledTableRow>
                              ) })
              		}
          	</TableBody>
        	</Table>
        	<Typography align="right"><hr/><Button variant="contained" color="info" onClick={() => handleViewClose()} > Close </Button></Typography>
          </TableContainer>
        </Box>
      </Modal>

      


      </TableContainer><br/>
      
    </Container>
  );
};

export default FarmList;
