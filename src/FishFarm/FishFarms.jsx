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
import {Typography, Button, Container,Input,InputLabel,FormControl} from "@mui/material";
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

//Validation input 
import { useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import EditFishFarm from "./FishFarmEdit";
const schema = yup.object({
  farmName: yup.string().required('Fish farm name is required !'),
  selectedFile: yup.string('Image must be uploaded !').typeError('Image must be uploaded !').required('Image is required !'),
  /*bargeAvailability: yup.number('Something went Wrong !').min(0, 'Something went Wrong !').integer('Something went Wrong !').typeError('Something went Wrong !').required('Something went Wrong !!'), */
});

//css for error message
const paragraphStyle = {
  color: "red"
};
//css for input Lable
const labelStyle = {
  fontFamily: "Arial",
  fontSize: "16px",
  fontWeight: "bold",
  color: "black"
};

//For model pop up
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
//For model pop up
const styleView = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  maxHeight: '80vh', 
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',  /* Enable scrolling */
  
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

//Css for checkbox
const checkboxStyle = {
  display: 'inline-block',
  width: '20px',
  height: '20px',
  borderRadius: '3px',
  backgroundColor: 'blue',
  border: 'none',
  marginRight: '5px',
  verticalAlign: 'middle',
  position: 'relative',
  cursor: 'pointer',
};

const FarmList = () => {
  
  //set data using hooks
  const [data, setData] = useState([]);
  useEffect( () => { getData();}, [])

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
 const [bargeAvailability, SetbargeAvailability] = useState(false);
 const [selectedFile, setSelectedFile] = useState(null);
 const [workersNameList, setWorkersNameList] = useState([]);

  //For pop up edit
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleClose = () => setOpenEdit(false);
  const [formData, setFormData] = useState({});

  // For pop up add
  const [openAdd, setOpenAdd] = useState(false)
  const handleOpenAdd = () => setOpenAdd(true);
  const handleAddClose = () => setOpenAdd(false);

  const handleAddBoatClose = () => {
    handleAddClose();
    clear();
    reset();
}

  //View workers
  const [openWorkersView, setOpenWorkersView] = useState(false);
  const handleOpenWorkersView = () => setOpenWorkersView(true);
  const handleViewClose = () => setOpenWorkersView(false);  

  //View Boats
const [openBoatView, setOpenBoatView] = useState(false);
  const handleOpenBoatView = () => setOpenBoatView(true);
  const handleViewBoatClose = () => setOpenBoatView(false);

//OnClickHandleEdit in form--------------------------GetbyId function-------------------------Start
const handleEdit = (farmId) => {
  handleOpenEdit(farmId);
  axios.get(`https://localhost:7102/api/FishFarm/${farmId}`)
    .then((result) => {
      setFormData(result.data)
    })
    .catch((error) => {
      console.error(error);
    })
}

//onClickHanleDelete----------------Delete function-------------------------start 
const handleDelete = (farmId) =>{

  if(window.confirm("Are you sure to delete this fish farm!") === true)
  {
    
    axios.delete(`https://localhost:7102/api/FishFarm?id=${farmId}`)
    .then((result) => {
      if(result.status === 500)
      {
        toast.success('The fish farm cannot be deleted as it relies on both its workers and boats');
        getData();
      }
      if(result.status === 200)
      {
        toast.success('Fish farm has been deleted !');
        getData();
      }
      
    })
    .catch((error) => {
      if (error.response && error.response.status === 500) {
        toast.warning('The fish farm cannot be deleted as it relies on both its workers and boats');
        getData();
      } else {
        toast.error('An error occurred while deleting the fish farm.');
      }
      toast.error(error,"Error!");
    })
  }
}
//---------------------------------------------------------------------------------------------End

//onClickHanleAdd new fish farm in from
const handleAddForm = () => {
  handleOpenAdd();
}

const handleUploadImg = (event) => {
 
    const file = event.target.files[0];
    setSelectedFile(file);
    
}

const { register, handleSubmit, formState:{ errors },trigger, reset, setValue } = useForm({
  resolver: yupResolver(schema),
  defaultValues: {
    farmName: "",
    selectedFile: "",
    bargeAvailability: false
  } 
});


//onClickHanleAdd new fish farm in popup---------------post function---------------------------start
const onSubmit = (formValues) => {
  console.log(formValues.farmName);
  console.log(selectedFile);
  
    const url = 'https://localhost:7102/api/FishFarm/AddFishFarm'
    var sd =new FormData()
    sd.append('ImageFile', selectedFile)
    sd.append('farmName', formValues.farmName)
    sd.append('bargeAvailability', bargeAvailability)
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
  SetbargeAvailability(false);
  setSelectedFile('')
  reset();
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
const handleViewWorkers = (farmId) => {

  handleOpenWorkersView();
const getworkersName =() => {
  axios.get('https://localhost:7102/api/Workers')
    .then((response) => {
      const filteredWorkers = response.data.filter(worker => worker.fishFarmsFarmId === farmId);
      setWorkersNameList(filteredWorkers);
    })
    .catch((error) => {
      console.log(error);
    })
  }
  getworkersName();
}

//------------- View Boats Button--------------------
const handleViewBoats = (farmId) => {
  handleOpenBoatView();
  const getboatName =() => {
    axios.get('https://localhost:7102/api/Boat')
      .then((response) => {
        const filteredBoat = response.data.filter(Boat => Boat.fishFarmsFarmId === farmId);
        setWorkersNameList(filteredBoat);
      })
      .catch((error) => {
        console.log(error);
      })
    }
    getboatName();

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

           {/* Modal For Edit Fish Farm    */}
          <Modal  open={openEdit} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <EditFishFarm handleClose={handleClose} formData={formData}  getData={getData}/>
          </Modal>


           {/* Modal For Add Fish Farm    */}     
          <Modal open={openAdd} onClose={handleAddBoatClose}  aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" align="center" fontFamily={"inherit"}>
              Add new fish farm
          </Typography><hr/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}> 
            <InputLabel style={labelStyle} >Fish Farm Name&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; 
            <Input  type="text" className="form-control"  placeholder="Enter Fish Farm Name"  {...register("farmName")} onChange= {(e) => {setValue("farmName",e.target.value); trigger("farmName");  } }> </Input>
            </InputLabel><p style={paragraphStyle}>{errors.farmName?.message}</p>
             </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}> 
          <Box sx={{ maxWidth: 300 }}>
              <FormControl fullWidth>
              <InputLabel style={labelStyle} >Select Farm Image&nbsp;:&nbsp;</InputLabel> <br/><br/>
                <Input type="file" className="form-control" {...register("selectedFile")}  onChange={(e) =>{handleUploadImg(e); trigger("selectedFile"); }}></Input>
            </FormControl><p style={paragraphStyle}>{errors.selectedFile?.message}</p>
          </Box> 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <InputLabel style={labelStyle} >Barge Availability&nbsp;&nbsp;:&nbsp;&nbsp;<Input type="checkbox" style={checkboxStyle} className="form-control" placeholder="Tick barge availability" checked={bargeAvailability}   onChange={(e) =>{handleBargeChange(e);}} /></InputLabel>
          </Typography><br/>
          <Typography align="right"><hr/>
          <Button type="submit"  variant="contained" color="info"  > Add </Button>&nbsp;
          <Button variant="contained" color="info" onClick={() => handleAddBoatClose()} > Close </Button>
          </Typography>
        </Box>
        </form>
      </Modal>

      
         {/* Modal For View Fish Farm worker details*/}
      <Modal open={openWorkersView} onClose={handleViewClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={styleView}>
        <TableContainer component={Paper}>
        	<Typography variant="h4">&nbsp;&nbsp;Workers</Typography>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
          		<TableHead >
            		<StyledTableRow>
              			<StyledTableCell >#</StyledTableCell>
              			<StyledTableCell align="left" >Worker Name</StyledTableCell>
                    <StyledTableCell align="left" >age</StyledTableCell>
              			<StyledTableCell align="left" >Role</StyledTableCell>
                    <StyledTableCell align="left" >Position</StyledTableCell>
                    <StyledTableCell align="left" >Certified date period</StyledTableCell>
            		</StyledTableRow>
          		</TableHead>
          	<TableBody >
            		{		
                 workersNameList.map((worker, index) => {
                              return (
                                <StyledTableRow key={index} >
                                  <StyledTableCell component="th" scope="row">{index+ 1} {worker.workerId}</StyledTableCell>
                                  <StyledTableCell >{worker.firstName}</StyledTableCell>
                                  <StyledTableCell >{worker.age}</StyledTableCell>
                                  <StyledTableCell >{worker.crewRole}</StyledTableCell>
                                  <StyledTableCell >{worker.workerPosition}</StyledTableCell>
                                  <StyledTableCell >{worker.certifiedDatePeriod}</StyledTableCell>
                                  </StyledTableRow>
                              ) })
              		}
          	</TableBody>
        	</Table>
        	<Typography align="right"><hr/><Button variant="contained" color="info" onClick={() => handleViewClose()} > Close </Button></Typography>
          </TableContainer>
        </Box>
      </Modal>

        {/* Modal For View Fish Farm Boat details    */}          
      <Modal open={openBoatView} onClose={handleViewBoatClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={styleView}>
        <TableContainer component={Paper}>
        	<Typography variant="h4">&nbsp;&nbsp;Boats</Typography>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
          		<TableHead >
            		<StyledTableRow>
              			<StyledTableCell >#</StyledTableCell>
              			<StyledTableCell align="left" >Boat name</StyledTableCell>
                    <StyledTableCell align="left" >GPS position</StyledTableCell>
              			<StyledTableCell align="left" >No of cages</StyledTableCell>
            		</StyledTableRow>
          		</TableHead>
          	<TableBody >
            		{		
                 workersNameList.map((Boat, index) => {
                              return (
                                <StyledTableRow key={index} >
                                  <StyledTableCell component="th" scope="row">{index+ 1} {Boat.workerId}</StyledTableCell>
                                  <StyledTableCell >{Boat.boatName}</StyledTableCell>
                                  <StyledTableCell >{Boat.gpsPosition}</StyledTableCell>
                                  <StyledTableCell >{Boat.noOfCages}</StyledTableCell>
                                  </StyledTableRow>
                              ) })
              		}
          	</TableBody>
        	</Table>
        	<Typography align="right"><hr/><Button variant="contained" color="info" onClick={() => handleViewBoatClose()} > Close </Button></Typography>
          </TableContainer>
        </Box>
      </Modal>



      </TableContainer><br/>      
    </Container>
  );
};
export default FarmList;
