
import Header from './header'
import Albums from './albums'
import standard from '../styles/Standard.module.css'

export default function Standard({state,setFilter,data}){

    return (
    <div className={standard.container}>
        
        <Header styles={standard} state={state} setFilter={setFilter} />
        <main className={standard.main}>
          <Albums state={state} data={data} />
        </main>

      </div>)

    }