import styles from '../../styles/hot-tag.module.css';
import BoxPhotoHotTag from './BoxPhotoHotTag';
const HotTag=(props)=>{
   
  return(
    <div className="bg-light mt-5 p-1 rounded shadow">
      <div>
         <h3 id={styles.title_hot_tag}>Hot tag dalam satu minggu</h3>
        {
          props.hotTag.map((hotTag)=>(
            <BoxPhotoHotTag hotTag={hotTag}/>
          ))
        } 
      </div>
    </div>
  )
}
export default HotTag;