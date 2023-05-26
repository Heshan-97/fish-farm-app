import * as React from "react";
import { useState, useEffect } from "react";
import {Typography, Button,Input,InputLabel,} from "@mui/material";
import Box from "@mui/material/Box"; //for the model

//import Modal from '@mui/material/Modal';
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Validation import
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object({
    editfarmName: yup.string().required('Fish farm name is required !'),
    editfarmPictureUrl: yup.string('Image must be uploaded !').typeError('Image must be uploaded 1!').required('Image must be uploaded 2!'),
    /*bargeAvailability: yup.number('Something went Wrong !').min(0, 'Something went Wrong !').integer('Something went Wrong !').typeError('Something went Wrong !').required('Something went Wrong !!'),
    */
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

const EditFishFarm = ({formData,handleClose,getData}) => {

    const { register, handleSubmit, formState:{ errors },trigger, reset, setValue } = useForm({
        resolver: yupResolver(schema),
      });
      
      console.log(formData.farmName,formData.farmPictureUrl,formData.bargeAvailability);
      useEffect(() =>{
        reset(
         {
            editfarmName: formData.farmName,
            editfarmPictureUrl: formData.farmPictureUrl,
            bargeAvailability: formData.bargeAvailability
       })},[formData, reset]) 

         const onSubmit = (formValues) =>{
          /*************************************************************/ 
      //     console.log(selectedFile,selectedFile.name);
      //     const urlimg = 'https://localhost:7102/api/Workers/UploadFile'
      // var sd =new FormData()
      // sd.append('File', selectedFile)
      // sd.append('FileName', selectedFile.name)
      // axios.post(urlimg, sd)
      // .then((result) => {
      //   toast.success('Image has been changed !');
      // })
      // .catch((error) => {
      //   toast.error(error);
      // })

          /******************************************* */
          const url = `https://localhost:7102/api/FishFarm?id=${formData.farmId}`;
          const data = {
            "farmId" : formValues.editfarmId,
            "farmName": formValues.editfarmName,
            "farmPictureUrl": formValues.editfarmPictureUrl,
            "bargeAvailability": formValues.bargeAvailability,
          }
          axios.put(url, data)
          .then((result) => {
            handleClose();
            getData();
            toast.success('Fish farm has been updated');
          })
          .catch((error) => {
            toast.error(error);
          })
          handleClose();
      }    
    //   const [selectedFile, setSelectedFile] = useState(null);
    //   const handleUploadImg = (event) => {
 
    //     const file = event.target.files[0];
    //     console.log(file);
    //     setSelectedFile(file);
        
    // }

      // const ChangeImage = () => {
       
      // }
     

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" align="center" fontFamily={"inherit"}>
          Edit fish farm
        </Typography><hr/>
        <Typography id="modal-modal-text" sx={{ mt: 2}}>
        <InputLabel style={labelStyle}>Fish farm name&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<Input type="text" className="form-control" placeholder="Edit fish farm name"  {...register("editfarmName")} onChange={(e) => {setValue("editfarmName",e.target.value); trigger("editfarmName");  }}/></InputLabel> <p style={paragraphStyle}>{errors.editfarmName?.message}</p>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <InputLabel style={labelStyle}>Farm picture URL:&nbsp;<Input type="text" className="form-control" placeholder="Edit farm picture URL"  {...register("editfarmPictureUrl")}  onChange={(e) =>{setValue("editfarmPictureUrl",e.target.value); trigger("editfarmPictureUrl");  } } disabled /></InputLabel> <p style={paragraphStyle}>{errors.editfarmPictureUrl?.message}</p>
        {/* <Input type="file" className="form-control" {...register("selectedFile")}  onChange={(e) =>{handleUploadImg(e); trigger("selectedFile"); }}></Input> */}
        {/* <Button variant="contained" color="info" onClick={() => ChangeImage()} > Change Image </Button> */}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <InputLabel style={labelStyle}>Barge Availability&nbsp;:&nbsp;&nbsp;&nbsp;<Input type="checkbox" style={checkboxStyle} className="form-control" placeholder="Tick barge availability"  {...register("bargeAvailability")}  onChange={(e) =>{setValue("bargeAvailability",e.target.checked); }}  /> </InputLabel>
        </Typography><br/>
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
export default EditFishFarm;