import React, { useEffect, useState } from "react"
import styles from '../../styles/box-photo.module.css';
const ListPagination=(props)=>{
  const [pagination,setPagination]=useState([])
  useEffect(()=>{
      setPagination(props.pagination);
  },[props.pagination])
  const paginationFunc=(url,token)=>{
    if(props.toggleCari==true){ 
      props.paginationCariFunc(url,token)
    }else{
      props.paginationFunc(url,token)
    }
  
  }
  const createBoxPage=(page)=>{
    return(
       <div className="d-inline-block">
          {
            props.currentPage==page.indeks?(
              <div className={"d-inline-block bg-danger me-2 p-2 py-0  "+styles.box_pages} onClick={()=>paginationFunc(page.url,0)}>
                  <p className="mb-2 mt-1 mx-1 text-light">
                    {page.indeks}
                  </p>
              </div>
            ):(
              page.indeks==">"||page.indeks=="<"?(
                page.indeks==">"?(
                  <div className={"d-inline-block me-2 p-2 py-0  bg-light border border-danger "+styles.box_pages} onClick={()=>paginationFunc(page.url,1)}>
                      <p className="mb-2 mt-1 mx-1 text-danger ">
                          {page.indeks}
                      </p>
                  </div>
                ):(
                  <div className={"d-inline-block me-2 p-2 py-0  bg-light border border-danger "+styles.box_pages} onClick={()=>paginationFunc(page.url,2)}>
                      <p className="mb-2 mt-1 mx-1 text-danger ">
                          {page.indeks}
                      </p>
                  </div>
                )
               
              ):(
                <div className={"d-inline-block me-2 p-2 py-0  bg-light border border-danger "+styles.box_pages} onClick={()=>paginationFunc(page.url,0)}>
                    <p className="mb-2 mt-1 mx-1 text-danger ">
                        {page.indeks}
                    </p>
                </div>
              )
             
            )
          }
          
       </div>
    )
  }  
  return(
        <React.Fragment>
            <div className="my-2">
              {
                pagination.map((page)=>(
                  createBoxPage(page)
                ))
              }
            </div>
        </React.Fragment>
    )
}
export default ListPagination;