import { useEffect, useRef } from "react";
import React from "react";
import BoxPhoto from "./BoxPhoto";
const PhotoList=(props)=>{
  const listPhoto=()=>{
    const lengthDiv = Math.floor(props.photos.length/3);
    const modLength =props.photos.length%3;
    var actualLength = lengthDiv;

    var index3=0;
    modLength>0?actualLength+=1:actualLength;
    var rows = [];
    for (let i = 0; i < actualLength; i++) {
        let length3 =3;
        modLength>0?i+1==actualLength?length3=modLength:length3:length3
        var cols = [];
        for(let j=0;j<length3; j++) {
            cols.push(<td key={"td"+j+i}><BoxPhoto photo={props.photos[index3+j]}/></td>)
        }
        rows.push(<tr key={"tr-"+i}>{cols}</tr>);
        index3=index3+3;
    }
        return rows;
  }
  return(
    <React.Fragment>
          <tbody>
              {listPhoto()}
          </tbody>
    </React.Fragment>
  )
}
export default PhotoList;