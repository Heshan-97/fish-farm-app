import * as React from "react";
import {  useEffect } from "react";
import {
  Typography,
  Button,
  Input,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box"; //for the model
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Validation import
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  editboatName: yup.string().required("Boat name is required !"),
  editGpsPosition: yup
    .string("GPS position must be number !")
    .typeError("GPS position is required !")
    .required("GPS position is required !"),
  editNoOfCages: yup
    .number("Cages must be number !")
    .min(0, "Cages must be 0 or positive number !")
    .integer("Cages must be an integer")
    .typeError("No of cages is required !")
    .required("No of cages is required !"),
  editfishFarmsFarmId: yup.string().required("Select a fish farm name !"),
});
//For model pop up
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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

const EditBoat = ({formData,fishFarms,handleClose,getData}) => {


  


  const {register, handleSubmit, formState: { errors }, trigger, reset, setValue } = useForm({
    resolver: yupResolver(schema),
   
  });
  useEffect(() =>{
 reset(
  {
    editboatName: formData.boatName,
    editGpsPosition: formData.gpsPosition,
    editNoOfCages: formData.noOfCages,
    editfishFarmsFarmId: formData.fishFarmsFarmId,
}
 )
  },[formData, reset]) 

  

  const onSubmit = (formValues) => {
    const url = `https://localhost:7102/api/Boat?id=${formData.boatId}`;
    const data = {
      "boatId" : formValues.editboatId,
      "boatName": formValues.editboatName,
      "gpsPosition": formValues.editGpsPosition,
      "noOfCages": formValues.editNoOfCages,
      "fishFarmsFarmId" : formValues.editfishFarmsFarmId
    }
    axios.put(url, data)
    .then((result) => {
      handleClose();
      getData();
      toast.success('Boat record has been updated');
    })
    .catch((error) => {
      toast.error(error);
    })
    console.log(data);
    // Close the modal
    handleClose();
  };



  return ( formData?.boatId &&
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
          fontFamily={"inherit"}>
          Edit Boat
        </Typography>
        <hr />
        <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          <InputLabel style={labelStyle}>
            Boat name&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
            <Input
              type="text"
              className="form-control"
              placeholder="Edit boat name"
              {...register("editboatName")} 
              onChange={(e) =>{ setValue("boatName",e.target.value); trigger("boatName");}}></Input>{" "}
          </InputLabel><p style={paragraphStyle}>{errors.editboatName?.message}</p>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <InputLabel style={labelStyle}>
            GPS position&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
            <Input
              type="text"
              className="form-control"
              placeholder="Edit GPS position"
              {...register("editGpsPosition")}
              onChange={(e) => { setValue("editGpsPosition",e.target.value); trigger("editGpsPosition");}}></Input>{" "}
          </InputLabel><p style={paragraphStyle}>{errors.editGpsPosition?.message}</p>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <InputLabel style={labelStyle}>
            No of Cages&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
            <Input
              type="number"
              className="form-control"
              placeholder="Edit No of Cages "
              {...register("editNoOfCages")}
              onChange={(e) => {setValue("editNoOfCages",e.target.value); trigger("editNoOfCages");}}>
              {" "}
            </Input>
          </InputLabel><p style={paragraphStyle}>{errors.editNoOfCages?.message}</p>
        </Typography>
        <Typography id="modal-modal-text" sx={{ mt: 2 }}>
          {/* <InputLabel>
            Famrm ID&nbsp;&nbsp;&nbsp;&nbsp;:
            <Input
              type="text"
              className="form-control"
              placeholder="Enter Working farm name"
              {...register("editfishFarmsFarmId")}
              onChange={(e) => { setValue("editfishFarmsFarmId", e.target.value); trigger("editfishFarmsFarmId");}}
              disabled></Input>{" "}
          </InputLabel> */}
          <br />
          <Box sx={{ maxWidth: 350 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" style={labelStyle}>
                -- Select Fish Farm Name --:
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="-- Select a fish farm name --"
                {...register("editfishFarmsFarmId")}
                onChange={(e) =>  { setValue("editfishFarmsFarmId", e.target.value); trigger("editfishFarmsFarmId");}}
                defaultValue={formData.fishFarmsFarmId}
                >

                <MenuItem>--Select--</MenuItem>
                {fishFarms.map((fishFarm) => {
                  return (
                    <MenuItem key={fishFarm.farmId} value={fishFarm.farmId}>
                      {fishFarm.farmName}
                    </MenuItem>
                  );
                })}
              </Select><p style={paragraphStyle}>{errors.editfishFarmsFarmId?.message}</p>
            </FormControl>
          </Box>
        </Typography>
        <br />
        <Typography align="right">
          <hr />
          
          <Button
            variant="contained"
            color="primary"
            type="submit">
            Edit
          </Button>
          &nbsp;
          <Button
            variant="contained"
            color="info"
            onClick={() => handleClose()}>
            {" "}
            Close{" "}
          </Button>
        </Typography>
      </Box>
    </form>
  );
};
export default EditBoat;
