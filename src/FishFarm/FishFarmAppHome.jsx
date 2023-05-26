
import React from 'react';
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import '../HomePage.css';
const FishFarmHome = () => {
    const images = [
        "slideShow/fish.jpg",
        "slideShow/FishFarm900.jpg",
        "slideShow/ilmakuvasto.jpg",
        "slideShow/norwegian.jpg",
        "slideShow/iStock-1251358437.jpg"
    ];
    
    
    return (
        
        <div className="home-page">
      <div className="banner">
        <h1 className="page-name">Welcome to HavBruksloggen Fish Farm.</h1>
        <div className="hover-box">
          <p className="p-tag">Havbruksloggen is an easy-to-use software system which collects all information about a fish farm in</p>
        </div>
      </div>
      <Slide>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[0]})` }}>
                    {/* <span>Slide 1</span> */}
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[1]})` }}>
                    {/* <span>Slide 2</span> */}
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[2]})` }}>
                    {/* <span>Slide 3</span> */}
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[3]})` }}>
                    {/* <span>Slide 3</span> */}
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[4]})` }}>
                    {/* <span>Slide 3</span> */}
                </div>
            </div>
        </Slide>
     
    </div>
    
    )
}
export default FishFarmHome;