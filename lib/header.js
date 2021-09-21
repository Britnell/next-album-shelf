// import styles from '../styles/Header.module.css'
import Image from "next/image"
import up from "../public/img/up.svg"
import down from "../public/img/down.svg"

function Arrow({label,state}){
    if(label!==state.sorting)
        return null;
    
    if(state.increasing)
        return <Image 
            src={up}
            alt={"increasing"}
            width={12} height={12}
        />
    else
        return <Image 
            src={down}
            alt={"decreasing"}
            width={12} height={12}
        />

}

function FilterButton({label,state,onclick}){
    
    return (
        <div
        className='filter'
        onClick={()=>onclick(label)} >
            <div className='filter-label' >{label}</div>
            <Arrow state={state} label={label} />
        </div>
    )
}
export default function Header({state,setFilter}){

    function sortingClick(id){
        setFilter({ sorting: id })
    }

    return (<>
    <header className='header' >
        {/* <div className='title' >My digital album shelf</div> */}
        <div className='hcontainer' >
            <FilterButton label="Release Date" state={state}  onclick={sortingClick} />
            <FilterButton label="Artist" state={state} onclick={sortingClick} />
            <FilterButton label="Label" state={state} onclick={sortingClick} />
            <FilterButton label="Popularity" state={state} onclick={sortingClick} />
            {/* <div className={styles.filter} onClick={sortingClick} >Genre</div> */}
            <div className='search' >
                Search
            </div>
        </div>
    </header>
    </>)
}