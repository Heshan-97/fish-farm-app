
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
import { Typography, Button,Container,Input,InputLabel} from "@mui/material";

//for the model
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//For Image 
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

//For Select
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//Validation
import { useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import EditWorker from "./WorkerEditForm";
const schema = yup.object({
  selectedFile: yup.string().required('Image is required !'),
  //pictureUrl: yup.string().required('Image URL is required !'),
  age: yup.number().integer('Age must be number !').min(18, 'Age must be at least 18').typeError('Age is required  !').required('Age is required !'),
  firstName: yup.string().required('Worker first name is required !'),
  middleName: yup.string().required('Worker middle name is required !'),
  lastName: yup.string().required('Worker last name is required !'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  certifiedDatePeriod1: yup.date().typeError('Date is required!').required('Date is required !'),
  crewRole: yup.string().required('Crew role is required !'),
  workerPosition: yup.string().required('Worker position is required !'),
  getFarmNameid: yup.string().required('Select a fish farm name !'),
});

//For model pop up
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: '80vh', 
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const WorkerList = () => {

  //set data using hooks
  const [data, setData] = useState([]);

  useEffect( () => {
    getData();

  }, [])

  //Get Function---------------------------------------------------start
  const getData =() => {
    axios.get('https://localhost:7102/api/Workers')
    .then((result) => {
      setData(result.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }
//------------------------------------------------------------------end
  //Set variable for add new form
 const [fishFarms, setFishFarms] = useState([]);
 const [selectedFile, setSelectedFile] = useState(null);

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

 

//OnClickHandleEdit in form--------------------------GetbyId function-------------------------Start
const handleEdit = (workerId) => {
  const getFarmName =() => {
    axios.get('https://localhost:7102/api/FishFarm')
      .then((response) => {
        setFishFarms(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
    }
    getFarmName();
  handleOpenEdit(workerId);
  axios.get(`https://localhost:7102/api/Workers/${workerId}`)
    .then((result) => {
        setFormData(result.data);
    })
    .catch((error) => {
      console.error(error);
    })
}
//----------------------------------------------------------------------------------------End

//onClickHanleDelete----------------Delete function-------------------------start 
const handleDelete = (workerId) =>{
  if(window.confirm("Are you sure to delete this worker!") === true)
  {
    axios.delete(`https://localhost:7102/api/Workers?id=${workerId}`)
    .then((result) => {
      if(result.status === 200)
      {
        toast.success('Worker has been deleted');
        getData();
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 500) {
        toast.warning('The workers cannot be deleted !');
        getData();
      } else {
        toast.error('An error occurred while deleting the worker.');
      }
      toast.error(error);
    })
  }
}
//---------------------------------------------------------------------------------------------End

//onClickHanleAdd new Worker in from
const handleAddForm = () => {
    const getFarmName =() => {
    axios.get('https://localhost:7102/api/FishFarm')
      .then((response) => {
        setFishFarms(response.data) ;
      })
      .catch((error) => {
        console.log(error);
      })
    }
    getFarmName();
  handleOpenAdd();
}

const { register, handleSubmit, formState:{ errors },trigger, reset, setValue } = useForm({
  resolver: yupResolver(schema),
  defaultValues:{
    selectedFile: "",
    age: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    certifiedDatePeriod: "",
    crewRole: "",
    workerPosition: "",
    fishFarmsFarmId: "",
  }
});


//onClickHanleAdd new Worker in popup---------------post function---------------------------start

const handleUploadImg = (event) => {
  const file = event.target.files[0];
  setSelectedFile(file);
}
const onSubmit = (formValues) => {
  console.log("hello");
  console.log(
              selectedFile,
              formValues.age,
              formValues.firstName,
              formValues.middleName,
              formValues.lastName,
              formValues.email,
              formValues.certifiedDatePeriod1,
              formValues.crewRole,
              formValues.workerPosition,
              formValues.getFarmNameid    
    );
    const url = 'https://localhost:7102/api/Workers/AddWorker'
    var sd =new FormData()
    sd.append('age', formValues.age)
    sd.append('firstName', formValues.firstName)
    sd.append('middleName', formValues.middleName)
    sd.append('lastName', formValues.lastName)
    sd.append('email', formValues.email)
    sd.append('certifiedDatePeriod', new Date(formValues.certifiedDatePeriod1).toISOString())
    sd.append('crewRole', formValues.crewRole)
    sd.append('workerPosition', formValues.workerPosition)
    sd.append('fishFarmsFarmId', formValues.getFarmNameid)
    sd.append('ImageFile', selectedFile)
 
    axios.post(url, sd)
    .then((result) => {
      getData();
      clear();
      reset();
      toast.success('Worker has been added');
      handleAddClose();
    })
    .catch((error) => {
      toast.error(error);
      
    })
}
const clear = () => {
}
//------------------------------------------------------------------end 


  return (
    
    <Container maxWidth={true} className="my-container"  >
      <Typography variant="h4"><br/>&nbsp;&nbsp;Workers</Typography>
        <Typography align="right"><Button variant="contained" color="primary" onClick={() => handleAddForm()} > + Add new Worker</Button>&nbsp;&nbsp;</Typography><hr/>
      <ToastContainer/>
      <TableContainer component={Paper}>
        
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>#</StyledTableCell> 
              <StyledTableCell align="right">Worker avater</StyledTableCell>
              <StyledTableCell align="right">Age</StyledTableCell>
              <StyledTableCell align="right">First Name</StyledTableCell>
              <StyledTableCell align="right">Middle Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Certified Date Until</StyledTableCell>
              <StyledTableCell align="right">Crew Role</StyledTableCell>
              <StyledTableCell align="right">Workers Position</StyledTableCell>
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
                    <StyledTableCell> {index+ 1} ({item.workerId}) </StyledTableCell>
                    <StyledTableCell align="right">
                        <Stack direction="row" spacing={2} >
                            <Avatar alt="Remy Sharp" src={process.env.PUBLIC_URL + item.pictureUrl} sx={{ width: 100, height: 100 }} />
                        </Stack>
                    </StyledTableCell>
                    <StyledTableCell align="right">{item.age}</StyledTableCell>
                    <StyledTableCell align="right">{item.firstName}</StyledTableCell>
                    <StyledTableCell align="right">{item.middleName}</StyledTableCell>
                    <StyledTableCell align="right">{item.lastName}</StyledTableCell>
                    <StyledTableCell align="right">{item.email}</StyledTableCell>
                    <StyledTableCell align="right">{item.certifiedDatePeriod}</StyledTableCell>
                    <StyledTableCell align="right">{item.crewRole}</StyledTableCell>
                    <StyledTableCell align="right">{item.workerPosition}</StyledTableCell>
                    
                    <StyledTableCell align="right">
                      {item.fishFarms?.farmName}
                      </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button variant="contained" color="inherit" onClick={() => handleEdit(item.workerId)} >Edit</Button>&nbsp;
                      <Button variant="contained" color="error" onClick={() => handleDelete(item.workerId)} > Delete </Button>
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
              {/* Modal For Edit Workers */}
          <Modal open={openEdit} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <EditWorker handleClose={handleClose} fishFarms={fishFarms} getData={getData} formData={formData}/>
          </Modal>

              {/* Modal For Add Workers */}
          <Modal open={openAdd} onClose={handleAddBoatClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
          <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2" align="center" fontFamily={"inherit"}>
              Add new Worker
          </Typography><hr/>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          {/* <InputLabel style={labelStyle}>Workers Picture URL&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="text" className="form-control" placeholder="Workers Picture URL"  {...register("pictureUrl")}  onChange={(e) =>{setValue("pictureUrl",e.target.value); trigger("pictureUrl");}}></Input></InputLabel><p style={paragraphStyle}>{errors.pictureUrl?.message}</p> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}> 
          <Box sx={{ maxWidth: 300 }}>
              <FormControl fullWidth>
              <InputLabel style={labelStyle} >Select Worker Picture&nbsp;:&nbsp;</InputLabel> <br/><br/>
                <Input type="file" className="form-control" {...register("selectedFile")}  onChange={(e) =>{handleUploadImg(e); trigger("selectedFile"); }}></Input>
            </FormControl><p style={paragraphStyle}>{errors.selectedFile?.message}</p>
          </Box> 
          </Typography>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          <InputLabel style={labelStyle}>Worker Age&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="number" className="form-control" placeholder="Enter Worker Age" {...register("age")}  onChange={(e) => {setValue("age",e.target.value); trigger("age");} } ></Input> </InputLabel><p style={paragraphStyle}>{errors.age?.message}</p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <InputLabel style={labelStyle}>First Name&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="text" className="form-control" placeholder="Enter Worker First Name" {...register("firstName")}  onChange={(e) => {setValue("firstName",e.target.value); trigger("firstName");} }/></InputLabel><p style={paragraphStyle}>{errors.firstName?.message}</p>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          <InputLabel style={labelStyle}>Middle Name&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="text" className="form-control" placeholder="Enter Worker Middle Name" {...register("middleName")}  onChange={(e) => {setValue("middleName",e.target.value); trigger("middleName");} } ></Input> </InputLabel><p style={paragraphStyle}>{errors.middleName?.message}</p>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          <InputLabel style={labelStyle}>Last Name&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="text" className="form-control" placeholder="Enter Worker Last Name" {...register("lastName")}  onChange={(e) => {setValue("lastName",e.target.value); trigger("lastName");} }/> </InputLabel><p style={paragraphStyle}>{errors.lastName?.message}</p>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          <InputLabel style={labelStyle}>Worker Email&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="email" className="form-control" placeholder="Enter Worker Email" {...register("email")} onChange={(e) => {setValue("email",e.target.value); trigger("email");} } ></Input> </InputLabel><p style={paragraphStyle}>{errors.email?.message}</p>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          <InputLabel style={labelStyle} >Certified Date Period:&nbsp;&nbsp;&nbsp;:&nbsp;
          <Input type="date" min="2000-01-01" max="2100-12-31" className="form-control"  {...register("certifiedDatePeriod1")} onChange={(e) => {setValue("certifiedDatePeriod1",e.target.value); trigger("certifiedDatePeriod1");} }  pattern="\d{4}-\d{2}-\d{2}"></Input></InputLabel><p style={paragraphStyle}>{errors.certifiedDatePeriod1?.message}</p>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          
              <Box sx={{ maxWidth: 300 }}>
                  <FormControl fullWidth >
                  <InputLabel id="demo-simple-select-label" style={labelStyle}>--- Crew Role ---</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" {...register("crewRole")}  onChange={(e) => {setValue("crewRole",e.target.value); trigger("crewRole");}}  ><p style={paragraphStyle}>{errors.crewRole?.message}</p>
                          <MenuItem >--Select--</MenuItem>
                          <MenuItem value={'CEO'}>CEO</MenuItem>
                          <MenuItem value={'Worker'}>Worker</MenuItem>
                          <MenuItem value={'Captain'}>Captain</MenuItem>
                    </Select><p style={paragraphStyle}>{errors.crewRole?.message}</p>
                  </FormControl>
                </Box>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          <InputLabel style={labelStyle}>Working Position&nbsp;&nbsp;&nbsp;&nbsp;:<Input type="text" className="form-control" placeholder="Enter Working Position" 
          {...register("workerPosition")} onChange={(e) => { setValue("workerPosition", e.target.value); trigger("workerPosition");} } ></Input> </InputLabel><p style={paragraphStyle}>{errors.workerPosition?.message}</p>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          
              <Box sx={{ maxWidth: 300 }}>
                  <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" style={labelStyle}>-- Select a fish farm name --</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select"  {...register("getFarmNameid")} onChange={(e) => { setValue("getFarmNameid", e.target.value); trigger("getFarmNameid");}} >
                    <MenuItem >--Select--</MenuItem>
                            { fishFarms.map((fishFarm) => {
                              return (
                                  <MenuItem key={fishFarm.farmId} value={fishFarm.farmId}>{fishFarm.farmName}</MenuItem>
                              )
                            })}
                    </Select><p style={paragraphStyle}>{errors.getFarmNameid?.message}</p>
                  </FormControl>
                </Box>
          </Typography>
          <br/>
          <Typography align="right"><hr/>
          {/*<Button variant="contained" color="primary" onClick={() => onSubmit()} >Add</Button>*/}
           <Button type="submit"  variant="contained" color="info"  > Add </Button>&nbsp;&nbsp; 
          <Button variant="contained" color="info" onClick={() => handleAddBoatClose()} > Close </Button>
          </Typography>
        </Box>
        </form>
      </Modal>

      </TableContainer><br/>
    </Container>
  );
};

export default WorkerList;
