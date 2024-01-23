import React, { useEffect, useRef } from "react";
import styles from '../../styles/box-photo.module.css';
import { useNavigate } from "react-router-dom";
// useNavigate
const BoxPhoto=(props)=>{
  const srcPhoto = useRef();
  const navigate = useNavigate();
  useEffect(()=>{
    // srcPhoto.current  ="htpps://farm"+props.photo.farm+'.staticflickr.com/'+props.photo.server+'/'+props.photo.id+'_'+props.photo.secret+'.jpg';
    // srcPhoto.current  =;
  },[])
  const redirectToDetailPhoto=(photoId,secret)=>{
     navigate(`/detil/${photoId}/${secret}`)
  }
  return(
    <React.Fragment>
      <div className={styles.box_image+" position-relative"} style={{cursor:"pointer"}} onClick={()=>redirectToDetailPhoto(props.photo.id,props.photo.secret)}>
        <img src={`https://live.staticflickr.com/${props.photo.server}/${props.photo.id}_${props.photo.secret}_w.jpg`} alt="" />
      
      </div>   
    </React.Fragment>     
  )
}
export default BoxPhoto;