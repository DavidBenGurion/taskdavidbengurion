import { useEffect, useState } from "react";
import styles from '../../styles/hot-tag.module.css';
import { useNavigate } from "react-router-dom";
const BoxPhotoHotTag=(props)=>{
  const [photo,setPhoto]=useState({});
  const navigate = useNavigate();
  useEffect(()=>{
      setPhoto(props.hotTag.thm_data.photos.photo[0])
  },[])
  const redirectToTag=(tag)=>{
    navigate(`/tag/${tag}`)
}
  return(
    <div className='container_hot  mb-3' style={{height:"300px",cursor:"pointer"}} onClick={()=>redirectToTag(props.hotTag._content)}>
      <div className='my-0 w-25' style={{height:"10%",backgroundColor:"#D0D4CA"}}>
        <p className={"px-2 "+styles.hot_tag_title}>{props.hotTag._content}</p>
      </div>
      <div className="box_image my-0 p-2 position-relative" style={{height:"80%",backgroundColor:"#D0D4CA"}}>
        <div className="w-100 h-100 position-relative">
          <img src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`} className="w-100 h-100" /> 
          <div className={"position-absolute bottom-0  w-100 p-1 "+styles.text_container} style={{height:"40%"}}>
            <p className={styles.text_desc+" fw-bold  mb-0"}>Title : {photo.title}</p>
            <p className={styles.text_owner+" fw-bold  mb-0"}>Photo By : {photo.owner}</p>

            {/* <p className={styles.text_desc+" fw-bold"}></p> */}
          </div>
        </div> 
      </div>
      
        
    </div>
  )
}
export default BoxPhotoHotTag