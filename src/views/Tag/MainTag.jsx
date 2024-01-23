import React, { useDebugValue, useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";
import axios from "axios";
import PhotoList from "../Main/PhotoList";
import ListPagination from "../Main/ListPagination";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2'
import styles from '../../styles/main.module.css';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
const MainTag=()=>{
  const[photos,setPhotos]=useState([]);
    const[pagination,setPagination]=useState([]) 
    const startPageList=useRef();
    const endPageList=useRef();
    const {tagSearch}=useParams();
    const currentPage=useRef();
    const [cariData,setCariData]=useState(tagSearch);
    const [toggleCari,setToggleCari]=useState(false);
    const swalLoading = withReactContent(Swal)
    const cariInput=useRef("");
    useEffect(()=>{
      //  getRecentPhoto();
      setToggleCari(true);
      cariInput.current = cariData;
      cariDataByTag();
    },[])
    const getRecentPhoto=()=>{
        endPageList.current=10;
        startPageList.current=1;
        swalLoading.fire({
            title: <p>Loading</p>,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: () => {
             swalLoading.showLoading()
            },
        })
        axiosClient.get('?method=flickr.photos.getRecent&api_key=7864a899300716253e64d678a63f6323&extras=date_upload&per_page=9&page=1&format=json&nojsoncallback=1').then(({data})=>{
            setPhotos(data.photos.photo);
            console.log(data);
            console.log(data);
            currentPage.current =data.photos.page;
            startPageList.current=data.photos.page;
            if(data.photos.pages<data.photos.page+10){
                endPageList.current=(data.photos.pages-data.photos.page)+data.photos.page;
                }else{
                endPageList.current = data.photos.page+9;
            }
            
            var dataPage=[];     
            for (let i =startPageList.current; i <= endPageList.current; i++) {
                dataPage.push({
                    indeks:i,
                    url:`?method=flickr.photos.getRecent&api_key=7864a899300716253e64d678a63f6323&extras=date_upload&per_page=9&page=${i}&format=json&nojsoncallback=1`
                });
            }
            if(data.photos.page+10<data.photos.pages){
                dataPage.push({
                    indeks:'>',
                    url:`?method=flickr.photos.getRecent&api_key=7864a899300716253e64d678a63f6323&extras=date_upload&per_page=9&page=${endPageList.current+1}&format=json&nojsoncallback=1`
                });
            }
            setPagination(dataPage);
            swalLoading.close();
            // console.log(data.photos.photo);
        })
    }
    const paginationFunc=(url,token)=>{
        swalLoading.fire({
            title: <p>Loading</p>,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            // icon:'success',
            // text:'Produk berhasil ditambahakan',
            didOpen: () => {
             swalLoading.showLoading()
            },
        })
        axiosClient.get(url).then(({data})=>{
            setPhotos([]);
            setPhotos(data.photos.photo);
            if(token==1){
                currentPage.current =data.photos.page;
                startPageList.current=data.photos.page;
                endPageList.current = data.photos.page+9;
                if(data.photos.pages<data.photos.page+10){
                    endPageList.current=(data.photos.pages-data.photos.page)+data.photos.page;
                }else{
                    endPageList.current = data.photos.page+9;
                }
            }else if(token==2){
                currentPage.current =data.photos.page;
                startPageList.current=data.photos.page-9;
                endPageList.current =data.photos.page;
            }else{
                currentPage.current =data.photos.page;
            }
            if(token!=0){
                var dataPage=[];
                if(data.photos.page-10>0){
                    dataPage.push({
                        indeks:'<',
                        url:`?method=flickr.photos.getRecent&api_key=7864a899300716253e64d678a63f6323&extras=date_upload&per_page=9&page=${startPageList.current-1}&format=json&nojsoncallback=1`
                    });
                }
                for (let i =startPageList.current; i <= endPageList.current; i++) {
                    dataPage.push({
                        indeks:i,
                        url:`?method=flickr.photos.getRecent&api_key=7864a899300716253e64d678a63f6323&extras=date_upload&per_page=9&page=${i}&format=json&nojsoncallback=1`
                    });
                }
                if(startPageList.current+10<data.photos.pages){
                    dataPage.push({
                        indeks:'>',
                        url:`?method=flickr.photos.getRecent&api_key=7864a899300716253e64d678a63f6323&extras=date_upload&per_page=9&page=${endPageList.current+1}&format=json&nojsoncallback=1`
                    });
                }
                setPagination(dataPage);;
            }
            swalLoading.close();
           
           
        }) 
    }
    const cariDataHandle=(event)=>{
        setCariData(event.target.value);
    }
    const cariDataKeyDown=(event)=>{
        if(event.key=="Enter"){
            if(cariData==""){
                setToggleCari(false);  
                getRecentPhoto();
            }else{
                setToggleCari(true);
                cariInput.current =  cariData;  
                cariDataByTag();
            }

        }
    }
    const cariDataByTag=()=>{
        endPageList.current=10;
        startPageList.current=1;
        swalLoading.fire({
            title: <p>Loading</p>,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            // icon:'success',
            // text:'Produk berhasil ditambahakan',
            didOpen: () => {
             swalLoading.showLoading()
            },
        })
        setPagination([]);
        axiosClient.get(`?method=flickr.photos.search&api_key=7864a899300716253e64d678a63f6323&tags=${cariData}&per_page=9&page=1&format=json&nojsoncallback=1`).then(({data})=>{
            setPhotos(data.photos.photo);
            currentPage.current =data.photos.page;      
            startPageList.current=data.photos.page;
            if(data.photos.pages<data.photos.page+10){
                endPageList.current=(data.photos.pages-data.photos.page)+data.photos.page;
                }else{
                endPageList.current = data.photos.page+9;
            }
            
            var dataPage=[];     
            for (let i =startPageList.current; i <= endPageList.current; i++) {
                dataPage.push({
                    indeks:i,
                    url:`?method=flickr.photos.search&api_key=7864a899300716253e64d678a63f6323&tags=${cariData}&per_page=9&page=${i}&format=json&nojsoncallback=1`
                });
            }
            if(data.photos.page+10<data.photos.pages){
                dataPage.push({
                    indeks:'>',
                    url:`?method=flickr.photos.search&api_key=7864a899300716253e64d678a63f6323&tags=${cariData}&per_page=9&page=${endPageList.current+1}&format=json&nojsoncallback=1`
                });
            }         
            setPagination(dataPage);
            swalLoading.close();
        })
    }
    const cariPaginationFunc=(url,token)=>{
        console.log(url);
        swalLoading.fire({
            title: <p>Loading</p>,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: () => {
             swalLoading.showLoading()
            },
        })
        axiosClient.get(url).then(({data})=>{
            setPhotos([]);
            setPhotos(data.photos.photo);
            if(token==1){
                currentPage.current =data.photos.page;
                startPageList.current=data.photos.page;
                endPageList.current = data.photos.page+9;
                if(data.photos.pages<data.photos.page+10){
                    endPageList.current=(data.photos.pages-data.photos.page)+data.photos.page;
                }else{
                    endPageList.current = data.photos.page+9;
                }
            }else if(token==2){
                currentPage.current =data.photos.page;
                startPageList.current=data.photos.page-9;
                endPageList.current =data.photos.page;
            }else{
                currentPage.current =data.photos.page;
            }
            // console.log(currentPage);
            if(token!=0){
                setPagination([]);
                console.log("tes");
                var dataPage=[];
                if(data.photos.page-10>0){
                    dataPage.push({
                        indeks:'<',
                        url:`?method=flickr.photos.search&api_key=7864a899300716253e64d678a63f6323&tags=${cariData}&per_page=9&page=${startPageList.current-1}&format=json&nojsoncallback=1`
                    });
                }
                for (let i =startPageList.current; i <= endPageList.current; i++) {
                    dataPage.push({
                        indeks:i,
                        url:`?method=flickr.photos.search&api_key=7864a899300716253e64d678a63f6323&tags=${cariData}&per_page=9&page=${i}&format=json&nojsoncallback=1`
                    });
                }
                if(startPageList.current+10<data.photos.pages){
                    dataPage.push({
                        indeks:'>',
                        url:`?method=flickr.photos.search&api_key=7864a899300716253e64d678a63f6323&tags=${cariData}&per_page=9&page=${startPageList.current+1}&format=json&nojsoncallback=1`
                    });
                }
                setPagination(dataPage); 
            }
            swalLoading.close();
        }) 
    }
    const closeCariBox=()=>{
        setToggleCari(false);  
        getRecentPhoto();
        setCariData("");
    }
    return(
        <React.Fragment>
             <div className="mx-auto" style={{width:"90%"}}> 
                {/* <h1>hell world</h1> */}
                <div className="box-cari w-50 mx-auto py-1 ">
                    <div className="  d-inline-block" style={{width:"90%"}}>
                        <input type="text" class="w-100 py-1" id={styles.input_cari} name="cariFoto" value={cariData} onChange={cariDataHandle} onKeyDown={cariDataKeyDown} placeholder="Cari Foto" />
                    </div>
                    <div className="d-inline-block" style={{width:"10%"}}>
                        <div style={{width:"fit-content",cursor:"pointer"}} className="mx-auto bg-danger px-2 py-1 rounded-circle" onClick={cariDataByTag}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-light"/>
                        </div>
                    </div>
                </div>
                {
                    toggleCari==true?(
                        <div className="w-100 my-1">
                            <div style={{width:"fit-content"}} className="px-2  position-relative">
                                 <div className="pt-1 ps-2">
                                    <div className=" px-3 rounded mt-1" style={{backgroundColor:"#F5F7F8",border:"2px solid #A9A9A9"}}>{cariInput.current}</div>
                                 </div>
                                 <div className="position-absolute top-0  z-0 bg-danger px-2 rounded-circle text-light fw-bold d-block " style={{cursor:"pointer"}} onClick={closeCariBox}>
                                   <p className="m-0 my-1" style={{fontSize:"7px"}}>X</p> 
                                </div>
                            </div>
                        </div>
                    ):(null)
                }
                <div>
                    <div>
                        {
                            toggleCari==true?(
                                null
                            ):(
                                <h3 id={styles.text_foto} className="mt-1">
                                Daftar List Foto Terbaru :
                            </h3>
                            )
                        }
                        
                    </div>
                    <table>
                         <PhotoList photos={photos}/>  
                         {
                            pagination.length>0?(
                                <tfoot>
                                    <tr>
                                        <td colSpan={3}>
                                            {<ListPagination pagination={pagination} currentPage={currentPage.current} paginationFunc={paginationFunc} paginationCariFunc={cariPaginationFunc} toggleCari={toggleCari}/>}
                                        </td>
                                    </tr>
                                </tfoot>
                            ):(null)
                         }
                        
                    </table>
                </div>
             </div>
        </React.Fragment>
       
    )
}
export default MainTag;