import './App.css';

//Components
import Workers from './Worker/Workers';
import FishFarmHome from './FishFarm/FishFarmAppHome';
import FishFarms from './FishFarm/FishFarms';
import NavBar from './components/NavBar';
import Boats from './Boat/Boats';
import BoatEditForm from './Boat/BoatEditForm';
//import FishFarmUpdate from './FishFarm/FishFarmUpdate';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    
    <BrowserRouter>
    
      <NavBar/>
      <Routes>
      <Route path="/" element={< FishFarmHome/>} />
      <Route path="/all" element= {< FishFarms />} />
      <Route path="/workers" element={< Workers />} />
      <Route path="/boats" element={< Boats />} />
      <Route path="/boatEditForm/:boatid" element={<BoatEditForm/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
