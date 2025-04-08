import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import ModalBs from 'react-bootstrap/Modal';
import React from 'react';
import Button from 'react-bootstrap/Button';
import FormBs from 'react-bootstrap/Form';
import { ItemsContext, UPLOAD_ITEMS } from '../context/itemsContext';
import {axiosInstance} from '../../services/axios.config';
import { useContext } from 'react';


export const Modal = (props) => {

  const {items,dispatch} = useContext(ItemsContext)

    const initialCredentials = {
      name: props.item.name || '',
      description: props.item.description || '',
      image: props.item.image || '',
      stock: props.item.stock || 0,
      price: props.item.price || 0                //valores 
    }
  
    const formSchema = Yup.object().shape({
      name: Yup.string()
          .min(4,'nombre demasiado corto')
          .max(20,'nombre demasiado largo')
          .required('el campo es obligatorio'),         //Esquema de validacion
      description: Yup.string()
                      .min(10,'descripcion demasiada corta')
                      .max(150,'descripcion demasiada larga')
                      .required('el campo es obligatorio'),
      image: Yup.string().required('el campo es obligatorio'),
      stock: Yup.number().required('el campo es obligatorio'),
      price: Yup.number().required('el campo es obligatorio')
    })


  return (
    <div>
        <ModalBs
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalBs.Header closeButton className='bg-dark'>
        <ModalBs.Title id="contained-modal-title-vcenter">
          Modificar producto
        </ModalBs.Title>
      </ModalBs.Header>
      <ModalBs.Body className='bg-dark'>
        <Formik
                initialValues={initialCredentials}
                validationSchema={formSchema}        //declaro Formik
                onSubmit={ async (values,{isSubmitting})=>{
                  console.log(values);
                  //await props.onSubmit(props.item.id,values)
                  axiosInstance.put(`/${props.item.id}`,values)
                  .then(r => {
                    if(r.status === 200) {
                      const itemsUpload = items.map(item =>{
                      if (item.id === r.data.id ) {
                        return r.data
                      }
                      return item
                    })
                    dispatch({type:UPLOAD_ITEMS,payload: itemsUpload})
                    setSubmitting(false)

                    }else{
                      throw new Error(`[ERROR ${r.status}] Error en la solicitud`)
                    }
                    
                })
                  .catch (err => console.log(err))
                  props.onHide()
                }}
              >
        
                  {
                      ({values,isSubmitting,errors,touched,handleChange}) => (
                        <Form>
                          <FormBs.Group className='mb-3'>
                              <label htmlFor='name'>Nombre del producto</label>
                              <Field id='name' type='text' placeholder='Ingrese nombre del producto' name='name' className='form-control field-input' onChange={handleChange}/>
                              {
                                errors.name && touched.name && (
                                <ErrorMessage name= 'name' component='div'></ErrorMessage>
                                )
                              }
                          </FormBs.Group>
                              
                          <FormBs.Group className='mb-3'>
                                <label htmlFor='description'>Descripcion del producto</label>
                                <Field id='description' type='text' placeholder='Ingrese la descripcion' name='description' className='form-control field-input' onChange={handleChange}/>
                                {
                                  errors.description && touched.description && (
                                  <ErrorMessage name= 'description' component='div'></ErrorMessage>
                                  )
                                }
                          </FormBs.Group>
        
                              
                          <FormBs.Group className='mb-3'>
                                <label htmlFor='image'>Imagen del producto</label>
                                <Field id='image' type='text' placeholder='imagen' name='image' className='form-control field-input' onChange={handleChange}/>
                                {
                                  errors.image && touched.image && (
                                  <ErrorMessage name= 'name' component='div'></ErrorMessage>
                                  )
                                }
                          </FormBs.Group>
        
        
                          <FormBs.Group className='mb-3'>
                                <label htmlFor='stock'>Stock del producto</label>
                                <Field id='stock' type='text' placeholder='Ingrese cantidad ' name='stock' className='form-control field-input' onChange={handleChange}/>
                                {
                                  errors.stock && touched.stock && (
                                  <ErrorMessage name= 'stock' component='div'></ErrorMessage>
                                  )
                                }
                          </FormBs.Group>
        
                          <FormBs.Group className='mb-3'>
                                <label htmlFor='price'>Ingrese el precio del producto</label>
                                <Field id='price' type='text' placeholder='Ingrese precio ' name='price' className='form-control field-input' onChange={handleChange}/>
                                {
                                  errors.price && touched.price && (
                                  <ErrorMessage name= 'price' component='div'></ErrorMessage>
                                  )
                                }
                          </FormBs.Group>
                              
                              <Button className='btn btn-primary' type='submit' >Modificar</Button>
                              {
                                isSubmitting ? (<p>Enviando informacion</p>) : null
                              }
                              
                        </Form>
                      )
                  }
        
              </Formik>
      </ModalBs.Body>
      <ModalBs.Footer className='bg-dark'>
        <Button onClick={props.onHide}>Cerrar</Button>
      </ModalBs.Footer>
    </ModalBs>

    </div>
  );
}

export default Modal;