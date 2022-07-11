import React,{useContext,useEffect,useState} from 'react'

import HomePageHeader from '../components/HomePage/HomePageHeader'
import HomePageTiendaCaja from '../components/HomePage/HomePageTiendaCaja'
import HomePageTiendaCardItem from '../components/HomePage/HomePageTiendaCardItem'
import HomePageTiendaGraphip from '../components/HomePage/HomePageTiendaGraphip'
import AlertLoading from '../components/Utils/AlertLoading'

import { AportesContext } from '../context/AportesContext'


import { TiendaContext } from '../context/TiendaContext'

const HomePage = () => {
  
  const {
    tienda,
    loading,
  }=useContext(TiendaContext)

  const {
    totalAportes,
   
  } = useContext(AportesContext)

  
  return (
      
      <div className='container-sm'>
        {loading?<AlertLoading />:<>
        <HomePageHeader tienda={tienda}/>
        

        <div className='row g-2'>
            <div className='col-sm-12'>
              <HomePageTiendaGraphip />
            </div>
        

          <div className='row g-2 align-items-center justify-content-center'>
            <div className='col-md-4 col-xxl-4 align-self-center'>
              <HomePageTiendaCaja tienda={tienda} />
            </div>
          </div>
              <div className='row g-3'>
                <div className='col-md-4 col-xxl-4'>
                  <HomePageTiendaCardItem tipo={"Inversión"} tienda={tienda} total={totalAportes()}/>
                </div>
                <div className='col-md-4 col-xxl-4'>
                  <HomePageTiendaCardItem tipo={"Gastos"} tienda={tienda} total={0}/>
                </div>
                <div className='col-md-4 col-xxl-4'>
                  <HomePageTiendaCardItem tipo={"Utilidades"} tienda={tienda} total={0}/>
                </div>
                <div className='col-md-4 col-xxl-4'>
                  <HomePageTiendaCardItem tipo={"Pérdidas"} tienda={tienda} total={0}/>
                </div>
                <div className='col-md-4 col-xxl-4'>
                  <HomePageTiendaCardItem tipo={"Ingresos x Ventas"} tienda={tienda} total={0}/>
                </div>
                <div className='col-md-4 col-xxl-4'>
                  <HomePageTiendaCardItem tipo={"Dinero x Cobrar"} tienda={tienda} total={0}/>
                </div>
              </div>
            
        </div>
        </>
        }
      </div>

  
  )
}

export default HomePage


