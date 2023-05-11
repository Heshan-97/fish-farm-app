
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
  InputLabel
} from "@mui/material";

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
import { useForm } from "react-hook-form";
import { zodResolver} from "@hookform/resolvers";
import * as z from "zod";

//const  

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

const WorkerList = () => {

 //------------------------------------validation ------------------------
const { register , handleSubmit} = useForm();
const onFormSubmit =(data) => {
  console.log(data);
}


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

 const [pictureUrl, SetpictureUrl] = useState('');
 const [age, Setage] = useState('');
 const [firstName, SetfirstName] = useState('');
 const [middleName, SetmiddleName] = useState('');
 const [lastName, SetlastName] = useState('');
 const [email, Setemail] = useState('');
 const [certifiedDatePeriod1, SetcertifiedDatePeriod1] = useState('');
 const [crewRole, SetcrewRole] = useState('');
 const [workerPosition, SetworkerPosition] = useState('');
 const [fishFarms, setFishFarms] = useState([]);
  const [fishFarmsFarmId, SetFishFarmsFarmId] = useState('');
 
 //Set variable for edit/update new form
 const [editworkerId, SetEditworkerId] = useState('');
 const [editpictureUrl, SetEditpictureUrl] = useState('');
 const [editage, SetEditage] = useState('');
 const [editfirstName, SetEditfirstName] = useState('');
 const [editmiddleName, SetEditmiddleName] = useState('');
 const [editlastName, SetEditlastName] = useState('');
 const [editemail, SetEditemail] = useState('');
 const [editcertifiedDatePeriod1, SetEditcertifiedDatePeriod1] = useState('');
 const [editcrewRole, SetEditcrewRole] = useState('');
 const [editworkerPosition, SetEditworkerPosition] = useState('');
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


const handleEdit = (workerId) => {
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
  handleOpenEdit(workerId);
  axios.get(`https://localhost:7102/api/Workers/${workerId}`)
    .then((result) => {
        SetEditworkerId(workerId);
        SetEditpictureUrl(result.data.pictureUrl);
        SetEditage(result.data.age);
        SetEditfirstName(result.data.firstName);
        SetEditmiddleName(result.data.middleName);
        SetEditlastName(result.data.lastName);
        SetEditemail(result.data.email);
        SetEditcertifiedDatePeriod1(result.data.certifiedDatePeriod);
        SetEditcrewRole(result.data.crewRole);
        SetEditworkerPosition(result.data.workerPosition);
        editSetFishFarmsFarmId(result.data.fishFarmsFarmId);
      
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
const handleUpdate = (workerId) =>{
  
    const url = `https://localhost:7102/api/Workers/dto?idd=${editworkerId}`;
    const data = {
        "workerId": editworkerId,
        "pictureUrl": editpictureUrl,
        "age": editage,
        "firstName": editfirstName,
        "middleName": editmiddleName,
        "lastName": editlastName,
        "email": editemail,
        "certifiedDatePeriod": editcertifiedDatePeriod1,
        "crewRole": editcrewRole,
        "workerPosition": editworkerPosition,
        "fishFarmsFarmId": editfishFarmsFarmId

    }
    axios.put(url, data)
    .then((result) => {
      handleClose();
      getData();
      clear();
      toast.success('Worker has been updated');
      handleAddClose();
    })
    .catch((error) => {
      toast.error(error);
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
      toast.error(error);
    })
  }
}
//---------------------------------------------------------------------------------------------End

//onClickHanleAdd new Worker in from
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

//onClickHanleAdd new Worker in popup---------------post function---------------------------start
const handleAdd = () => {
  console.log("Hello");
  
    const url = 'https://localhost:7102/api/Workers/dto'
    const data = {
        "pictureUrl": pictureUrl,
        "age": age,
        "firstName": firstName,
        "middleName": middleName,
        "lastName": lastName,
        "email": email,
        "certifiedDatePeriod": certifiedDatePeriod1,
        "crewRole": crewRole,
        "workerPosition": workerPosition,
        "fishFarmsFarmId": fishFarmsFarmId,
        
    }
    
    axios.post(url, data)
    .then((result) => {
      getData();
      clear();
      toast.success('Worker has been added');
      handleAddClose();
    })
    .catch((error) => {
      toast.error(error);
    })
}
const clear = () => {
    SetpictureUrl('');
    Setage('');
    SetfirstName('');
    SetmiddleName('')
    SetlastName('')
    Setemail('')
    SetcertifiedDatePeriod1('');
    SetcrewRole('');
    SetworkerPosition('');
    SetFishFarmsFarmId('');
    //setFishFarms();


    SetEditworkerId('');
    SetEditpictureUrl('');
    SetEditage('');
    SetEditfirstName('');
    SetEditmiddleName('');
    SetEditlastName('');
    SetEditemail('');
    SetEditcertifiedDatePeriod1('');
    SetEditcrewRole('');
    SetEditworkerPosition('');
    SetEditworkerPosition('');

}

//------------------------------------------------------------------end 



  return (
    
    <Container maxWidth={false} className="my-container"  onSubmit={handleSubmit(onFormSubmit)}>
      <ToastContainer/>
      <TableContainer component={Paper}>
        <Typography variant="h4"><br/>&nbsp;&nbsp;Workers</Typography>
        <Typography align="right"><Button variant="contained" color="primary" onClick={() => handleAddForm()} > + Add new Worker</Button>&nbsp;&nbsp;</Typography><hr/>
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
              
          <Modal
            open={openEdit}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" align="center" fontFamily={"inherit"}>
                  Edit Worker
                </Typography>
                
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
              <InputLabel>Workers Picture URL&nbsp;&nbsp;&nbsp;&nbsp;:<Input type="text" className="form-control" placeholder="Workers Picture URL" value={editpictureUrl} onChange={(e) => SetEditpictureUrl(e.target.value) }/> </InputLabel>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
              <InputLabel>Worker Age&nbsp;&nbsp;&nbsp;&nbsp;:<Input type="number" className="form-control" placeholder="Enter Worker Age" value={editage} onChange={(e) => SetEditage(e.target.value) }/> </InputLabel>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <InputLabel>Worker First Name&nbsp;&nbsp;&nbsp;&nbsp;:<Input type="text" className="form-control" placeholder="Enter Worker First Name" value={editfirstName} onChange={(e) => SetEditfirstName(e.target.value) }></Input></InputLabel>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
              <InputLabel>Worker Middle Name&nbsp;&nbsp;&nbsp;&nbsp;:<Input type="text" className="form-control" placeholder="Enter Worker Middle Name" value={editmiddleName} onChange={(e) => SetEditmiddleName(e.target.value) }></Input> </InputLabel>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
              <InputLabel>Worker Last Name&nbsp;&nbsp;&nbsp;&nbsp;:<Input type="text" className="form-control" placeholder="Enter Worker Last Name" value={editlastName} onChange={(e) => SetEditlastName(e.target.value) }></Input> </InputLabel>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
              <InputLabel>Worker Email&nbsp;&nbsp;&nbsp;&nbsp;:<Input type="email" className="form-control" placeholder="Enter Worker Email" value={editemail} onChange={(e) => SetEditemail(e.target.value) }></Input> </InputLabel>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
              <InputLabel>Select new certified date&nbsp;:
              <Input type="text"  className="form-control" value={editcertifiedDatePeriod1} onChange={(e) =>  SetEditcertifiedDatePeriod1(e.target.value) } disabled></Input>
              <Input type="date" className="form-control"  value={editcertifiedDatePeriod1} onChange={(e) =>  SetEditcertifiedDatePeriod1(e.target.value) }></Input></InputLabel>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
             
              <Box sx={{ maxWidth: 300 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">-- Select Crew Role --</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={editcrewRole} onChange={(e) => SetEditcrewRole(e.target.value)}>
                          <MenuItem >--Select--</MenuItem>
                          <MenuItem value={'CEO'}>CEO</MenuItem>
                          <MenuItem value={'Worker'}>Worker</MenuItem>
                          <MenuItem value={'Captain'}>Captain</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
              <InputLabel>Working Position&nbsp;&nbsp;&nbsp;&nbsp;:<Input type="text" className="form-control" placeholder="Enter Working Position" value={editworkerPosition} onChange={(e) => SetEditworkerPosition(e.target.value) }></Input> </InputLabel>
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
              Add new Worker
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          <InputLabel>Workers Picture URL&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="text" className="form-control" placeholder="Workers Picture URL" value={pictureUrl} onChange={(e) => SetpictureUrl(e.target.value) } {...register("pictureUrl")}></Input></InputLabel>
          
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          <InputLabel>Worker Age&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="number" className="form-control" placeholder="Enter Worker Age" value={age} onChange={(e) => Setage(e.target.value) } {...register("age")}></Input> </InputLabel>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <InputLabel>First Name&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="text" className="form-control" placeholder="Enter Worker First Name" value={firstName} onChange={(e) => SetfirstName(e.target.value) } {...register("firstName")}></Input> </InputLabel>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          <InputLabel>Middle Name&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="text" className="form-control" placeholder="Enter Worker Middle Name" value={middleName} onChange={(e) => SetmiddleName(e.target.value) } {...register("middleName")}></Input> </InputLabel>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          <InputLabel>Last Name&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="text" className="form-control" placeholder="Enter Worker Last Name" value={lastName} onChange={(e) => SetlastName(e.target.value) } {...register("lastName")}></Input> </InputLabel>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          <InputLabel>Worker Email&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="email" className="form-control" placeholder="Enter Worker Email" value={email} onChange={(e) => Setemail(e.target.value) } {...register("email")}></Input> </InputLabel>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          <InputLabel>Certified Date Period:&nbsp;&nbsp;&nbsp;:&nbsp;
          <Input type="date" className="form-control"  value={certifiedDatePeriod1} onChange={(e) => SetcertifiedDatePeriod1(e.target.value) }  {...register("certifiedDatePeriod1")}></Input></InputLabel>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          
              <Box sx={{ maxWidth: 300 }}>
                  <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">--- Crew Role ---</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={crewRole} onChange={(e) => SetcrewRole(e.target.value)} {...register("crewRole")}>
                          <MenuItem >--Select--</MenuItem>
                          <MenuItem value={'CEO'}>CEO</MenuItem>
                          <MenuItem value={'Worker'}>Worker</MenuItem>
                          <MenuItem value={'Captain'}>Captain</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          <InputLabel>Working Position&nbsp;&nbsp;&nbsp;&nbsp;:<Input type="text" className="form-control" placeholder="Enter Working Position" value={workerPosition} onChange={(e) => SetworkerPosition(e.target.value) } {...register("workerPosition")}></Input> </InputLabel>
          </Typography>
          <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          
              <Box sx={{ maxWidth: 300 }}>
                  <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">-- Select a fish farm name --</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select"  onChange={(e) => handleFarmNameAdd(e, register)} >
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

export default WorkerList;
