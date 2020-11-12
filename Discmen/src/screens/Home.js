import React, {useState, useEffect} from 'react';
import styled from "styled-components"
import FitaCassete from '../components/FitaCassete';
import axios from 'axios'
import MenuIcon from '@material-ui/icons/Menu';
import { AssignmentReturnTwoTone } from '@material-ui/icons';



const AppContainer = styled.div `
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  height: 100vh;
  width: 100vw;
  background-image: url(${props=> props.bkImage});
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
`
const CoverBackground = styled.div `
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  height: 100vh;
  width: 100vw;
  background: rgb(255,255,255);
background: linear-gradient(0deg, rgba(255,255,255,1) 10%, rgba(255,255,255,0) 95%);
  z-index: 2;

`

const DivPlaylist = styled.div`

  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 100vw;
  max-width: 100vw;
  height: ${props => props.open? '150px': '96px'};
  box-shadow: 10px 20px 50px rgba(0,0,0,0.2);
  overflow: hidden;
  overflow-x: scroll;
  background-color: #F2EFE4;
  @media screen and (max-width: 500px){
   
    height: ${props => props.open? '150px': '86px'};
   
    
}
`
const BurgerOpen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 74px;
  height: 64px;
  width: 64px;
`

const TrackDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:flex-start;
  
  width: 100px;
  height:100% ;
  cursor: pointer;
  transition: 3s ease;
  &:hover{
    background-color:${props=>props.bkColor}
  }
`
const AlbumImage = styled.img`
  border-radius: 50%;
  margin: 8px;
  border: 3px solid ${props=>props.color ? props.color : 'grey'};
  animation:spin linear 4s infinite;
    animation-play-state: ${props=>props.animationPlay? 'running': 'paused'};
    @keyframes spin { 
      100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } 
    }
`

const NameTrack = styled.h3`
    font-family: 'Caveat', cursive;
    color: #1B1B1F;
    margin: auto;
    margin-left:5px ;
`
const AudioTrack = styled.audio`
   filter: invert(100);
   background-color:none;
   position: absolute;
   bottom: 150px;
   width: 40%;
   left:30%;
   outline: none;
   @media screen and (max-width: 500px){
    width: 80%;
    left:10%;
    bottom: 200px;
   
    
}


`


const Home = () => {

  const [tracks, setTracks]= useState([])
  const [trackName, setTrackName] = useState('Awesome Playlist')
  const [artistName, setArtistName] = useState('')
  const [menu, setMenu] = useState(false)
  const [previewUrl, setPreview] = useState('')
  const [animationPlay, setAnimationPlay] = useState(false)
  const [colors , setColors] = useState(['#41A69C', '#F2C063', '#F24141','#41A69C', '#F2C063', '#F24141'])
  const [bkImage , setBkImages]= useState('')

  const getTracks = ()=>{
    const urlSpotify = 'https://api.spotify.com/v1/me/tracks'
    axios.get(urlSpotify, {
      headers: {
        Authorization: 'Bearer BQDHIKnPVE26FfE4YMbfc_oLK-ar5DXgUMV3iutT7D2ihC79NK_gkdpU721LHkY7APdJICGp-4XMuxADDGcrWE9feiqXVYtUUe9I9Kp2_VqAJn7dgVWTLEKTJ5Eq68opppbkXd1DoODd60C8mjCvGEV90W8EJE3RPDLMT_5Mg6Vw_3YMYXEEuf0yMP05HRYSa4U-IyGN8VdF50zrd_tUrtovDm_sD-QOErDDJ2Pd0lIxj0E6rnnQNOzs_-vvmnvlvNLw64J2HBeOyTumBbCCpxejACVGwaNZ3kI' 
      }
    }).then(response=>{
      
      const arrayTracks = response.data.items.map(item=>{
        return {
          getTrack: item.track.href,
          trackName: item.track.name,
          preview: item.track.preview_url,
          artistName: item.track.artists[0].name,
          getArtist: item.track.artists[0].href,
          albumImage: item.track.album.images[2].url,
          albumImageLarge: item.track.album.images[0].url,
          getAlbum: item.track.album.href,
          albumName: item.track.album.name,
          animationPlay: false
        }
      })
      setTracks(arrayTracks)
      console.log(arrayTracks)
    }).catch(error=>{
      console.log(error.message)
    })
  }
  useEffect(()=>{
    getTracks()
  }, [])

  const playtrack = (preview, trackName, artist, bkImage)=>{

    const newTracks = tracks.map(track=>{
      if(track.trackName === trackName){
        track.animationPlay = true
        setTrackName(trackName)
        setArtistName(artist)
        setPreview(preview)
        setBkImages(bkImage)
      }else{
        track.animationPlay = false
      }
      return track
    })
    setTracks(newTracks)
    setAnimationPlay(false)

  }

  const playNext = (track)=>{

    const arraytracks = tracks.filter(song=>{
      return song.trackName !== track
    })
    const random = Math.floor(Math.random() * arraytracks.length)

    const nextTrack = arraytracks[random]
    playtrack(nextTrack.preview, nextTrack.trackName, nextTrack.artistName, nextTrack.albumImageLarge)

  }

 

   

   



  return (
    <AppContainer bkImage={bkImage}>
      <CoverBackground>

     <FitaCassete animationPlay={animationPlay} songTitle={trackName + ' by ' + artistName}/>
          {previewUrl && 
          <AudioTrack 
            autoPlay='true'
            onPlay={()=> setAnimationPlay(true)}
            onPause={()=>{setAnimationPlay(false)}}
            controls
            onEnded={()=>playNext(trackName)}
            src={previewUrl}>
                Your browser does not support the
                <code>AudioTrack</code> element.
        </AudioTrack>}
      
      <DivPlaylist open={menu} >
        <TrackDiv>
        <BurgerOpen onClick={()=> setMenu(!menu) }>
          <MenuIcon fontSize='enherit'/>
        </BurgerOpen>
        <NameTrack>Awesome Playlists</NameTrack>
        </TrackDiv>
        {tracks && tracks.map(track=>{
          const random = Math.floor(Math.random() * colors.length)
          return <TrackDiv bkColor={colors[random]} 
                  key={track.trackName}
                  onClick={()=>playtrack(track.preview, track.trackName, track.artistName, track.albumImageLarge)}>
            <AlbumImage color={colors[random]} animationPlay={track.animationPlay} src={track.albumImage}/>
            <NameTrack>{track.trackName}</NameTrack>
          </TrackDiv>
        })}
      </DivPlaylist>
      </CoverBackground>
    </AppContainer>
  );
}


export default Home;
