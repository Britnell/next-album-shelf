// import styles from '../styles/Header.module.css'
import Image from "next/image"


function Arrow({label,state}){
    if(label!==state.sorting)
        return null;
    
    if(state.increasing)
        return <Image 
            // className={styles.arrow}
            src={"/img/up.svg"}
            alt={"increasing"}
            width={12} height={12}
        />
    else
        return <Image 
            src={"/img/down.svg"}
            alt={"decreasing"}
            width={12} height={12}
        />

}

function FilterButton({label,state,styles,onclick}){
    
    return (
        <div
        className={styles.filter} 
        onClick={()=>onclick(label)} >
            <div className={styles.label}>{label}</div>
            <Arrow state={state} label={label} />
        </div>
    )
}
export default function Header({state,setFilter,styles}){

    function sortingClick(id){
        setFilter({ sorting: id })
    }

    return (
    <header className={styles.header}>
        <div className={styles.title}>My digital album shelf</div>
        <div className={styles.hcontainer}>
            <FilterButton label="Artist" state={state} styles={styles} onclick={sortingClick} />
            <FilterButton label="Release Date" state={state} styles={styles} onclick={sortingClick} />
            <FilterButton label="Popularity" state={state} styles={styles} onclick={sortingClick} />
            <FilterButton label="Label" state={state} styles={styles} onclick={sortingClick} />
            {/* <div className={styles.filter} onClick={sortingClick} >Genre</div> */}
            <div className={styles.search} >
                Search
            </div>
        </div>
    </header>)
}