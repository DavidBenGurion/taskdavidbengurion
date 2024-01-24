import React, { useEffect, useState } from "react";
import styles from '../../styles/first-page.module.css';
import axiosClient from "../../axios-client";
import { useNavigate } from "react-router-dom";
const FirstPage=()=>{
  const [photoList,setPhotoList]=useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    axiosClient.get(`?method=flickr.photos.search&api_key=7864a899300716253e64d678a63f6323&tags=animal&per_page=9&page=1&format=json&nojsoncallback=1`).then(({data})=>{
      var dataPhotoList=[];
      console.log(data.photos);
      for (let index = 0; index < 4; index++) {
          dataPhotoList.push({src:`https://live.staticflickr.com/${data.photos.photo[index].server}/${data.photos.photo[index].id}_${data.photos.photo[index].secret}_w.jpg`,
                            id:data.photos.photo[index].id,
                            secret:data.photos.photo[index].secret})
      }
      console.log(dataPhotoList)
      setPhotoList(dataPhotoList)
    })
  },[])
  const redirectToDetailPhoto=(photoId,secret)=>{
    navigate(`/detil/${photoId}/${secret}`)
 }
  return(
    <React.Fragment>
      <div style={{width:"90%"}} className="mx-auto ">
        <div className="d-inline-block pe-2" style={{width:"40%"}}>
            <div>
                <h1 className={"w-100 text-end "+styles.firstPage}>Flckr</h1>
            </div>
           <div>
                <p className={styles.firstPage+" w-100 text-end"}>Art, Hobbies, and Fashion</p>
                <div style={{borderTop:"1px solid black",borderBottom:"1px solid black",}} className="py-2">
                    <h1 className={styles.firstPage+" w-100 text-end"}>This website have some photo</h1>
                </div>
           </div>
        </div>
        <div className="d-inline-block "  style={{width:"60%"}}>
             {
                photoList.length>0?(
                    <div className="box_image_container my-1" style={{width:"fit-content",backgroundColor:"#B80000"}}>
                          <div style={{width:"fit-content"}}>
                            <div className={"d-inline-block bg-light m-2 align-top  "+styles.box_image} >
                                <img src={photoList[0].src} className={"w-100 h-100 "+styles.img} style={{cursor:"pointer"}} onClick={()=>redirectToDetailPhoto(photoList[0].id,photoList[0].secret)}/>
                            </div>
                            <div className={"d-inline-block bg-light m-2 align-top "+styles.box_image} >
                              <img src={photoList[1].src} className={"w-100 h-100 "+styles.img}style={{cursor:"pointer"}} onClick={()=>redirectToDetailPhoto(photoList[1].id,photoList[1].secret)}/>
                            </div>
                          </div>
                          <div style={{width:"fit-content"}} className="m-2">
                            <div className={"d-inline-block bg-light me-2 align-top "+styles.box_image} >
                              <img src={photoList[2].src} className={"w-100 h-100 "+styles.img} style={{cursor:"pointer"}} onClick={()=>redirectToDetailPhoto(photoList[2].id,photoList[2].secret)}/>
                            </div>
                            <div className={"d-inline-block bg-light m-2 align-top "+styles.box_image} >
                              <img src={photoList[3].src} className={"w-100 h-100 "+styles.img} style={{cursor:"pointer"}} onClick={()=>redirectToDetailPhoto(photoList[3].id,photoList[3].secret)}/>
                            </div>
                          </div>
                    </div>
                ):(null)
             }
             
          </div>
      </div>
     
    </React.Fragment>
  )
}
export default FirstPage;