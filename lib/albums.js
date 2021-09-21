import React from "react"
import Image from 'next/image'
import { useVirtual } from 'react-virtual'

import styles from '../styles/Album.module.css'

function ArtistLabel({data:artist}){
    
    return(
      <div className={styles.artist}>
        <a href={artist.uri}>{artist.name}</a>
      </div>
    )
  }
  function Artist({data}){
    return (
        <div className={styles.artists}>
            {data.artists.map((art,i)=><ArtistLabel data={art} key={i} />)}
        </div>
      )
  }
  

function Album({data}){
        
    return(
      <div  className={styles.albumCont} >

        <Image 
            src={data.images[1].url}
            alt={`${data.name} album cover`}
            // layout="fill"   objectFit="contain"
            width={300} height={300} 
            placeholder="blur"
            blurDataURL=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAzCAIAAABaAcxDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAHGSURBVFhH7ZXBkYMwDEVhbymBLkIZKSMVpByOHEk5HOkgJXAkCtaYWWyM9K0w7My+S2TGlr6+HCinaSrOxw//ngzErbIsOZrxGbaeA+hkucLCI14l0rm8Bty9qhnHfjEgaRRVYztbc0wKkXeY+ifaaiJcNicujXFhIbsNx92SNJQDaUqXiMgynx3AWhas6Xa7cSQjbdgvEbAm84MG38RhGDBNCRZZcMd933OkhypGR7lIwWTBzXiiGRa3gOzP5zNTE0EZIobRU5faBSqu1ytHM23bcqQkrM4GArOoqur1evFiBh5oeBD/JzZNw1E2YTNm/RGwW8TqLOgWXF7IRxYpdQsh2v0AarcSk+q6jqNsPjVy7oQVkbsl11TXNUcb3O93jvJQ+HS5XMZx5MUGsPGrg7ywmqNVHumVp3c6R0lIEynjhZjwiFTW4/HgaA8b102yZBKOfnELMN+E6HVUv06PYZGF3dZMolYRp3eLONiwLauItVuHKUtoIiJDPNizKCnJ3yNtFbF55enklzzb1UTs7JCkkOP6lCQUCDdSpsoj3ZojTm6SR9MBkF1/xIF44Ip5fIat5wD4aL7KX/gmnod/WRpOKaso3mM0rtKFmhI4AAAAAElFTkSuQmCC"
        />          
        
        <div className={styles.albumCard}>
          <div className={styles.title}>
            <a href={data.uri}>{data.name}</a>
          </div>
          
          <Artist data={data} />
          <div className={styles.date}>{data.release_date}</div>
          <div className={styles.label}>Label : {data.label}</div>
        </div>
            
  
      </div>
    )
  }

export default function Albums({data,state}){


    const gridRef = React.useRef()
    const {sorting,filter,increasing} = state


    function sortRef(obj,sorting){
        if(sorting==='Release Date')
            return new Date(obj.release_date).getTime();
        if(sorting==='Label')
            return obj.label;
        if(sorting==='Artist')
            return obj.artists[0].name
        if(sorting==='Popularity')
            return obj.popularity
        return obj.name
    }
  
    data.sort((a,b)=>{
        let dA = sortRef(a,sorting)
        let dB = sortRef(b,sorting)
        if(dA>dB) return increasing? 1:-1;
        if(dA<dB) return increasing?-1: 1;
        return 0;
    })
  
    const albumVirtualizer = useVirtual({
        size: data.length,
        parentRef: gridRef,
        estimateSize: React.useCallback(()=>20,[]),
        overscan: 8,
    })
  
    return (
      <div ref={gridRef} className={styles.albumGrid}>
        {/* <Album key={1} data={data[0]} /> */}
        {/* {data.map((d,k)=><Album key={k} data={d} />)} */}
        {albumVirtualizer.virtualItems.map(
            ({index,size,start}) => (<Album key={index} data={data[index]} />)
        )}
      </div>)
  }