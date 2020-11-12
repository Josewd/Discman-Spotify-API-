import React from 'react';
import styled from "styled-components"
import BrightnessLowRoundedIcon from '@material-ui/icons/BrightnessLowRounded';


const DivCassete = styled.div`
  
  background-color: #1B1B1F;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 20px;
  height: 350px;
  width: 550px;
  margin: auto;
  margin-top: 200px;
  box-shadow: 0px 50px 20px rgba(0,0,0,0.2);
  @media screen and (max-width: 500px){
      width:350px;
      height: 250px;
  }
`
const DivCircleAnimationLeft = styled.div`

    font-size: 100px;
    height: 90px;
    width: 90px;
    border-radius: 50%;
    border: 40px solid #1B1B1F;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -25px;
    margin-left: -15px;
    animation:spin linear 4s infinite;
    animation-play-state: ${props=>props.animationPlay? 'running': 'paused'};
    @keyframes spin { 
      100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } 
    }
    @media screen and (max-width: 500px){
      
        font-size: 70px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    border: 30px solid #1B1B1F;
      
  }

`
const DivCircleAnimationRight = styled(DivCircleAnimationLeft)`

    font-size: 100px;
    height: 90px;
    width: 90px;
    border-radius: 50%;
    border: 30px solid #1B1B1F;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: -8px;
    margin-top: -8px;
    @media screen and (max-width: 500px){
      
      font-size: 70px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  border: 20px solid #1B1B1F;
    
}

`

const DivStamp = styled.div`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  height: 300px;
  width: 95%;
  margin: auto;
  margin-top: 30px;
  background-color: #F2EFE4;
  border-radius: 20px;
  z-index: 2;
  overflow: hidden;
  @media screen and (max-width: 500px){
      
      height: 200px;
  }
`
const DivAnimation = styled.div`

  width: 75%;
  margin: auto;
  height: 55%;
  position: absolute;
  top: 60px;
  right: 70px;
  background-color:#F2EFE4;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 500px){
      
      right: 45px;
      top: 50px;
      
  }
  

`
const Divglass = styled.div`

  width: 75%;
  margin: auto;
  height: 55%;
  position: absolute;
  top: 60px;
  right: 70px;
  background-color: rgba(65,164,165, 0.5);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  z-index: 4;
  @media screen and (max-width: 500px){
      
      right: 45px;
      top: 50px;
      
  }
  
`



const DivCasseteBottom = styled.div`
  width: 60%;
  margin: auto;
  background-color:#1B1B1F;
 
  height: 25%;
  border-left: 60px solid #1B1B1F;
  border-right: 60px solid #1B1B1F;
  border-bottom: 60px solid #202020;
  border-top: 0px solid black;
  margin-top:-30px;
  margin-bottom: 10px;
  z-index: 1;
`
const Circle = styled.div`

  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #4D4D59;

`
const DivCircle = styled.div`
  width: 100%;
  position: absolute;
  bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  z-index: 3; 
`
const DivLine = styled.div`

    background-color: ${props=> props.bkColor};
    height: ${props=>props.height};
    margin-top: 2px;

`
const SongTitle = styled.h1`
    font-family: 'Caveat', cursive;
    color: blue;
    margin: auto;
    
`

const FitaCassete = (props) => {
  return (
      <DivCassete draggable='true'>
            <DivStamp>
                <Divglass/>
                <DivAnimation>
                    <DivCircleAnimationLeft animationPlay={props.animationPlay} >
                        <BrightnessLowRoundedIcon fontSize='inherit'/>
                    </DivCircleAnimationLeft>
                    <DivCircleAnimationRight animationPlay={props.animationPlay}>
                        <BrightnessLowRoundedIcon fontSize='inherit'/>
                    </DivCircleAnimationRight>
                </DivAnimation>
                <DivLine bkColor='#F24141' height='20%'/>
                <DivLine bkColor='#F24141' height='15%'/>
                <DivLine bkColor='#F2C063' height='15%'/>
                <DivLine bkColor='#F2C063' height='10%'/>
                <DivLine bkColor='#41A69C' height='10%'/>
                <DivLine bkColor='#41A69C' height='5%'/>
                <SongTitle>{props.songTitle}</SongTitle>
            </DivStamp>
            <DivCasseteBottom></DivCasseteBottom>
            <DivCircle>
                <Circle/>
                <Circle/>
                <Circle/>
            </DivCircle>
      </DivCassete>
  );
}


export default FitaCassete;
