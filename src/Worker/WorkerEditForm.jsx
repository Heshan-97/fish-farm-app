import * as React from "react";
import { useEffect} from "react";
import moment from 'moment'
//For Table

import {
  Typography,
  Button,
  Input,
  InputLabel,
} from "@mui/material";

//for the model
import Box from '@mui/material/Box';
import axios from "axios";
import {  toast } from 'react-toastify';
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
const schema = yup.object({
  editpictureUrl: yup.string().required('Image URL is required !'),
  editage: yup.number().integer('Age must be valid number !').min(18, 'Age must be at least 18').typeError('Age must be valid number !').required('Age is required !'),
  editfirstName: yup.string().required('Worker first name is required !'),
  editmiddleName: yup.string().required('Worker middle name is required !'),
  editlastName: yup.string().required('Worker last name is required !'),
  editemail: yup.string().email('Invalid email address').required('Email is required'),
  editcertifiedDatePeriod1: yup.date().typeError('Date is required!').required('Date is required !'),
  editcrewRole: yup.string().required('Crew role is required !'),
  editworkerPosition: yup.string().required('Worker position  is required !'),
  editfishFarmsFarmId: yup.string().required('Select a fish farm name !'),
});


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
    overflow: 'scroll',  /* Enable scrolling */
    height: 750
  };
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



const EditWorker = ({handleClose,formData,fishFarms,getData}) => {

    const { register, handleSubmit, formState:{ errors },trigger, reset, setValue } = useForm({
        resolver: yupResolver(schema),  
      });

      useEffect (() =>{
        reset(
         {
            editpictureUrl: formData.pictureUrl ,
            editage: formData.age,
            editfirstName: formData.firstName,
            editmiddleName: formData.middleName,
            editlastName: formData.lastName,
            editemail: formData.email,
            editcertifiedDatePeriod1: moment(formData.certifiedDatePeriod).format('YYYY-MM-DD'),      //'2020-10-14',// (new Date(formData.certifiedDatePeriod)).toISOString(),
            editcrewRole: formData.crewRole,
            editworkerPosition: formData.workerPosition,
            editfishFarmsFarmId: formData.fishFarmsFarmId,
       }
        )
         },[formData?.workerId]) 

         console.log('formData.crewRole',formData.crewRole)

         const onSubmit = (formValues) =>{
             console.log(formValues.editworkerId,formValues.editpictureUrl,formValues.editage,formValues.editfirstName,formValues.editmiddleName,formValues.editlastName,formValues.editemail,formValues.editcertifiedDatePeriod1,formValues.editcrewRole,formValues.editworkerPosition,formValues.editfishFarmsFarmId);
            const url = `https://localhost:7102/api/Workers/dto?idd=${formData.workerId}`;
            const data = {
                "workerId": formData.workerId,
                "pictureUrl": formValues.editpictureUrl,
                "age": formValues.editage,
                "firstName": formValues.editfirstName,
                "middleName": formValues.editmiddleName,
                "lastName": formValues.editlastName,
                "email": formValues.editemail,
                "certifiedDatePeriod":  formValues.editcertifiedDatePeriod1,
                "crewRole": formValues.editcrewRole,
                "workerPosition": formValues.editworkerPosition,
                "fishFarmsFarmId": formValues.editfishFarmsFarmId
        
            }
            axios.put(url, data)
            .then((result) => {
              handleClose();
              getData();
              toast.success('Worker has been updated');
            })
            .catch((error) => {
              toast.error(error);
            })
        }
       
      

    return (formData?.workerId &&
        <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" align="center" fontFamily={"inherit"}>
          Edit Worker
        </Typography><hr/>
        
  <Typography id="modal-modal-text" sx={{ mt: 2 }}>
      <InputLabel style={labelStyle}>Workers Picture URL&nbsp;&nbsp;&nbsp;&nbsp;:<Input type="text" className="form-control" placeholder="Workers Picture URL"  {...register("editpictureUrl")} onChange={(e) => {setValue("editpictureUrl",e.target.value); trigger("editpictureUrl");} }/> </InputLabel><p style={paragraphStyle}>{errors.editpictureUrl?.message}</p>
  </Typography>
  <Typography id="modal-modal-text" sx={{ mt: 2 }}>
      <InputLabel style={labelStyle} >Worker Age&nbsp;&nbsp;&nbsp;&nbsp;:<Input type="number" className="form-control" placeholder="Enter Worker Age" {...register("editage")}  onChange={(e) => {setValue("editage",e.target.value); trigger("editage");} }/> </InputLabel><p style={paragraphStyle}>{errors.editage?.message}</p>
  </Typography>
  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      <InputLabel style={labelStyle}>Worker First Name&nbsp;&nbsp;&nbsp;&nbsp;:<Input type="text" className="form-control" placeholder="Enter Worker First Name" {...register("editfirstName")}  onChange={(e) => {setValue("editfirstName",e.target.value); trigger("editfirstName");} }></Input></InputLabel><p style={paragraphStyle}>{errors.editfirstName?.message}</p>
  </Typography>
  <Typography id="modal-modal-text" sx={{ mt: 2 }}>
      <InputLabel style={labelStyle}>Worker Middle Name&nbsp;&nbsp;&nbsp;&nbsp;:<Input type="text" className="form-control" placeholder="Enter Worker Middle Name" {...register("editmiddleName")}  onChange={(e) => {setValue("editmiddleName",e.target.value); trigger("editmiddleName");} }></Input> </InputLabel><p style={paragraphStyle}>{errors.editmiddleName?.message}</p>
  </Typography>
  <Typography id="modal-modal-text" sx={{ mt: 2 }}>
      <InputLabel style={labelStyle}>Worker Last Name&nbsp;&nbsp;&nbsp;&nbsp;:<Input type="text" className="form-control" placeholder="Enter Worker Last Name" {...register("editlastName")}  onChange={(e) => {setValue("editlastName",e.target.value); trigger("editlastName");} }></Input> </InputLabel><p style={paragraphStyle}>{errors.editlastName?.message}</p>
  </Typography>
  <Typography id="modal-modal-text" sx={{ mt: 2 }}>
      <InputLabel style={labelStyle}>Worker Email&nbsp;&nbsp;&nbsp;&nbsp;:<Input type="email" className="form-control" placeholder="Enter Worker Email" {...register("editemail")} onChange={(e) => {setValue("editemail",e.target.value); trigger("editemail");} }></Input> </InputLabel><p style={paragraphStyle}>{errors.editemail?.message}</p>
  </Typography>
  <Typography id="modal-modal-text" sx={{ mt: 2 }}>
      <InputLabel style={labelStyle}>Select new certified date&nbsp;:
      {/* <Input type="text"  className="form-control" {...register("editcertifiedDatePeriod1")} onChange={(e) =>  {setValue("editcertifiedDatePeriod1",e.target.value); trigger("editcertifiedDatePeriod1");} } disabled></Input> */}
      <Input type='date' className="form-control" {...register("editcertifiedDatePeriod1")} onChange={(e) =>  {setValue("editcertifiedDatePeriod1",e.target.value); trigger("editcertifiedDatePeriod1");} } ></Input></InputLabel><p style={paragraphStyle}>{errors.editcertifiedDatePeriod1?.message}</p>
  </Typography>
  <Typography id="modal-modal-text" sx={{ mt: 2 }}>
     
      <Box sx={{ maxWidth: 350 }}>
          <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label" style={labelStyle}>-- Select Crew Role --</InputLabel>
            <Select defaultValue={formData.crewRole} labelId="demo-simple-select-label" id="demo-simple-select" {...register("editcrewRole")} onChange={(e) => {setValue("editcrewRole",e.target.value); trigger("editcrewRole");}} >
                  <MenuItem >--Select--</MenuItem>
                  <MenuItem value={'CEO'}>CEO</MenuItem>
                  <MenuItem value={'Worker'}>Worker</MenuItem>
                  <MenuItem value={'Captain'}>Captain</MenuItem>
            </Select>
            <p style={paragraphStyle}>{errors.editcrewRole?.message}</p>
          </FormControl>
        </Box>
  </Typography>
  <Typography id="modal-modal-text" sx={{ mt: 2 }}>
      <InputLabel style={labelStyle}>Working Position&nbsp;&nbsp;&nbsp;&nbsp;:<Input type="text" className="form-control" placeholder="Enter Working Position" {...register("editworkerPosition")} onChange={(e) =>  {setValue("editworkerPosition",e.target.value); trigger("editworkerPosition");}}></Input> </InputLabel><p style={paragraphStyle}>{errors.editworkerPosition?.message}</p>
  </Typography>
  <Typography id="modal-modal-text" sx={{ mt: 2 }}>
      {/* <InputLabel style={labelStyle}>Famrm ID&nbsp;&nbsp;&nbsp;&nbsp;:<Input type="text" className="form-control" placeholder="Enter Working farm name" value={editfishFarmsFarmId} onChange={(e) => editSetFishFarmsFarmId(e.target.value) } disabled></Input> </InputLabel> */}
     <br/> 
      <Box sx={{ maxWidth: 350 }}>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" style={labelStyle}> &nbsp;&nbsp;&nbsp;&nbsp;  -- Select Fish Farm Name --</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" {...register("editfishFarmsFarmId")} onChange={(e) => {setValue("editfishFarmsFarmId",e.target.value); trigger("editfishFarmsFarmId");}} defaultValue={formData.fishFarmsFarmId} >
                    <MenuItem >--Select--</MenuItem>
                    { fishFarms.map((fishFarm) => {
                      return (
                          <MenuItem key={fishFarm.farmId} value={fishFarm.farmId}>{fishFarm.farmName}</MenuItem>
                      )
                    })}
            </Select><p style={paragraphStyle}>{errors.editfishFarmsFarmId?.message}</p>
          </FormControl>
        </Box>
  </Typography>
        <br/>
        <Typography align="right"><hr/>
        <Button
            variant="contained"
            color="primary"
            type="submit">
            Edit
          </Button>&nbsp;
          <Button variant="contained" color="info" onClick={() => handleClose()} > Close </Button>
        </Typography>
      </Box>
      </form>
    );
};
export default EditWorker;