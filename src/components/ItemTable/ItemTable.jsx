import React,{useContext, useState} from 'react';
import Modal from '../Modal/Modal';
import axios from 'axios';
import { axiosInstance } from '../../services/axios.config';
import { ItemsContext, UPLOAD_ITEMS } from '../context/itemsContext';

const ItemTable = ({item}) => {
    const {name,price,stock,id} = item
    const [modalShow, setModalShow] = useState(false);

    const {items,dispatch} = useContext(ItemsContext)

    const handleDelete = (id) => {
      axiosInstance.delete(`/${id}`)
      .then(r => {
        if (r.status === 200 ) {

          const itemsUpload = items.filter( item => item.id !== r.data.id)
          dispatch({type: UPLOAD_ITEMS,payload: itemsUpload })
        }
        
      })

    }

  return (
    <>
        <tr>
          <td>{id}</td>
          <td>{name}</td>
          <td>{price}</td>
          <td>{stock}</td>
          <td style={{display: 'flex',justifyContent:'space-evenly'}}>
            <i style={{cursor:'pointer'}} class="bi bi-trash3" onClick={() => handleDelete(id)}></i> 
            <i style={{cursor:'pointer'}} class="bi bi-pencil-square" onClick={() => setModalShow(true)}></i></td>
        </tr>
        <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        item={item}

        />
    </>
  );
}

export default ItemTable;
