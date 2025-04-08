import React,{useEffect, useState,useContext} from 'react';
import { axiosInstance } from '../services/axios.config';
import Table from '../components/Table/Table';
import { ItemsContext } from '../components/context/itemsContext';
import { UPLOAD_ITEMS } from '../components/context/itemsContext';




export const ShowProducts = () => {

  //const [items,setItems] = useState([])
  const {items,dispatch} = useContext(ItemsContext)

    useEffect(() => {
      axiosInstance.get('/')
      .then(r => {
        if(r.status == 200){
          //setItems(r.data)
          dispatch({type: UPLOAD_ITEMS,payload: r.data})
        }else {
          throw new Error(`[${r.status}]ERROR en la solicitud`)
        }
      })
      .catch(err => console.log(err))
    },[]);

   /*  const editItem = (id,data) => {
      console.log('editando producto');
      //TODO aca vamos a hacer un put
      axiosInstance.put(`/${id}`,data)
        .then(r => {
          if(r.status === 200){
            axiosInstance.get('/')
            .then(r=> {
              if(r.status === 200){
                setItems(r.data)
              }else {
                throw new Error(`[${r.status}]ERROR en la solicitud`)
              }
            })
            .catch (err => console.log(err))
          }else{
            throw new Error(`[${r.status}]ERROR en la solicitud`)

          }
            
        })
        .catch (err => console.log(err))
      
    } */
    

  return (
    <div>
        <h1 style={{textAlign: 'center'}}>Productos en sistema</h1>

        <div className='container mt-3'>
            {
              items.length > 0 ?
                <Table items={items} />
              :
              <h2 style={{textAlign: 'center'}}>No hay productos en sistema</h2>
            }
        </div>
    </div>
  );
}

export default ShowProducts;