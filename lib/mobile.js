
import Header from './header'
import Albums from './albums'
import mobile from '../styles/Mobile.module.css'

export default function Mobile({state,setFilter,data}){

    return (
    <div className={mobile.container}>

        <Header styles={mobile} state={state} setFilter={setFilter} />
        <main className={mobile.main}>
          <Albums state={state} data={data} />
        </main>

      </div>)

    }