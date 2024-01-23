import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import styles from '../../styles/main.module.css';
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const  Master=()=>{
  const navigate = useNavigate();
  const  redirectMainPhoto=()=>{  
      navigate('/')
  }
  const  redirectGalleryPhoto=()=>{  
      navigate('/gallery')
  }
  return(
    <React.Fragment>
        <Helmet>
          <style>{'body{ background-color:#A9A9A9; }'}</style>
        </Helmet>
      <div style={{width:"fit-content"}} className="mx-auto">
          <div className=" d-inline-block me-3" >
                <h3 className={"w-100 text-center py-1 "+styles.title_bar} style={{cursor:"pointer"}} onClick={redirectMainPhoto}>Home</h3>
          </div>
          <div className=" d-inline-block me-3"  >
                <h3 className={"w-100 text-center py-1 text-dark fw-bold "+styles.title_bar} style={{cursor:"pointer"}}>|</h3>
          </div>
          <div className=" d-inline-block me-3"  >
                <h3 className={"w-100 text-center py-1  "+styles.title_bar} style={{cursor:"pointer"}} onClick={redirectGalleryPhoto}>Gallery</h3>
          </div>
      </div>
       
      <Outlet></Outlet>
    </React.Fragment>
  )
};
export default Master;