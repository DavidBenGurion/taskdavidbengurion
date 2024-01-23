import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import styles from '../../styles/main-detil.module.css';
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
const MainDetil=()=>{
  const navigate = useNavigate();
  const{secret,photoId}=useParams();
  const[photoinfo,setPhotoInfo]=useState({owner:{username:"",nsid:"",location:""},
                                          description:{_content:""},
                                          id:"",
                                          secret:"",
                                          server:"",
                                          tags:{tag:[]},
                                          dates:{taken:""}});
  useEffect(()=>{
    axiosClient.get(`?method=flickr.photos.getInfo&api_key=7864a899300716253e64d678a63f6323&photo_id=${photoId}&secret=${secret}&format=json&nojsoncallback=1`).then(({data})=>{
        // setPhotoInfo(data.photo)
        console.log(data)
        setPhotoInfo(data.photo)
       })
  },[])
  const redirectToTag=(tag)=>{
      navigate(`/tag/${tag}`)
  }
  return(
    <React.Fragment>
      <div className="w-75 mx-auto " style={{height:"fit-content"}}>
        {
          photoinfo!=null?(
            <div> 
            <div className="w-50 d-inline-block align-top ">
              <h3 className={styles.title_photo}>Photo: </h3>
              <div className="mx-auto d-block" style={{}}>
                
                <img src={`https://live.staticflickr.com/${photoinfo.server}/${photoinfo.id}_${photoinfo.secret}_w.jpg`} className="w-100 h-100"  />
              </div>  
          </div>
          <div className="d-inline-block  p-2 shadow-sm" style={{width:"47%",marginLeft:"1%",backgroundColor:"white"}}>
              <h3 className={styles.title_photo}>Keterangan :</h3>
              <table className="">
                  <tr>
                    <td colSpan={3}>
                      <div className="d-block">
                          <div className="d-inline-block">
                            <p className="fw-boldp">{`${photoinfo.owner.username}(${photoinfo.owner.nsid})`}</p>
                          </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div className="d-inline-block ms-1">
                            <FontAwesomeIcon icon={faLocationDot} className="text-danger" style={{fontSize:"14px"}}/>
                          </div>
                          <div className="d-inline-block ms-2">
                            <h5>{photoinfo.owner.location}</h5>
                          </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="text-capitalize">tanggal upload</p>
                    </td>
                    <td><p>:</p></td>
                    <td>
                      <p>{photoinfo.dates.taken}</p>
                    </td>
                  </tr>
                  {
                    photoinfo.description._content!=""?(
                       <React.Fragment>
                        <tr>
                          <td colSpan={3}>
                              <p className="fw-bold">Deskripsi</p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                              <p>{photoinfo.description._content}</p>
                          </td>
                        </tr>
                        </React.Fragment>
                     
                    ):(null)
                    }
                    <tr>
                      <td colSpan={3}>
                        <p className="fw-bold">Tags : </p>
                      </td>
                    </tr>
                    {
                      photoinfo.tags.tag.length>0?(
                        <React.Fragment>
                           <tr>
                              <td colSpan={3}>
                                {
                                  photoinfo.tags.tag.map((tag)=>(
                                    <React.Fragment>
                                      <div className="d-inline-block me-1"> 
                                          <button type="button" class="btn btn-outline-danger mb-2 rounded" onClick={()=>redirectToTag(tag._content)}>{tag._content}</button>
                                      </div>
                                    </React.Fragment>
                                  ))
                                }
                            </td>
                          </tr>
                        </React.Fragment>
                      ):(null)
                    }
                   
              </table>
          </div>
            </div>
          
          ):(null)
        }
       
      </div>
    </React.Fragment>
    
  )
}
export default MainDetil;