import React from 'react';
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import FormBs from 'react-bootstrap/Form';
import './formulario.css'
import { axiosInstance } from '../../services/axios.config';
import axios from 'axios';

export const FormCreateProduct = () => {

  const initialCredentials = {
    name: '',
    description: '',
    image: '',
    stock: 0,
    price: 0                //valores 
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
    <div className='container'>
      <Formik
        initialValues={initialCredentials}
        validationSchema={formSchema}        //declaro Formik
        onSubmit={(values,{isSubmitting})=>{
          console.log(values);
          axiosInstance.post('/',values)
          .then(r => {
            if (r.status == 201) {
               console.log(r)
            isSubmitting(false)
            } else{
              throw new Error(`[${r.status}]error en la solicitud`)
            }
           
          })
          .catch ( err => console.log(err))
        }}
      >

          {
              ({values,isSubmitting,errors,touched}) => (
                <Form>
                  <FormBs.Group className='mb-3'>
                      <label htmlFor='name'>Nombre del producto</label>
                      <Field id='name' type='text' placeholder='Ingrese nombre del producto' name='name' className='form-control field-input'/>
                      {
                        errors.name && touched.name && (
                        <ErrorMessage name= 'name' component='div'></ErrorMessage>
                        )
                      }
                  </FormBs.Group>
                      
                  <FormBs.Group className='mb-3'>
                        <label htmlFor='description'>Descripcion del producto</label>
                        <Field id='description' type='text' placeholder='Ingrese la descripcion' name='description' className='form-control field-input'/>
                        {
                          errors.description && touched.description && (
                          <ErrorMessage name= 'description' component='div'></ErrorMessage>
                          )
                        }
                  </FormBs.Group>

                      
                  <FormBs.Group className='mb-3'>
                        <label htmlFor='image'>Imagen del producto</label>
                        <Field id='image' type='text' placeholder='imagen' name='image' className='form-control field-input'/>
                        {
                          errors.image && touched.image && (
                          <ErrorMessage name= 'name' component='div'></ErrorMessage>
                          )
                        }
                  </FormBs.Group>


                  <FormBs.Group className='mb-3'>
                        <label htmlFor='stock'>Stock del producto</label>
                        <Field id='stock' type='text' placeholder='Ingrese cantidad ' name='stock' className='form-control field-input '/>
                        {
                          errors.stock && touched.stock && (
                          <ErrorMessage name= 'stock' component='div'></ErrorMessage>
                          )
                        }
                  </FormBs.Group>

                  <FormBs.Group className='mb-3'>
                        <label htmlFor='price'>Ingrese el precio del producto</label>
                        <Field id='price' type='text' placeholder='Ingrese precio ' name='price' className='form-control field-input'/>
                        {
                          errors.price && touched.price && (
                          <ErrorMessage name= 'price' component='div'></ErrorMessage>
                          )
                        }
                  </FormBs.Group>
                      
                      <Button className='btn btn-primary' type='submit' >Cargar producto</Button>
                      {
                        isSubmitting ? (<p>Enviando informacion</p>) : null
                      }
                      
                </Form>
              )
          }

      </Formik>
    </div>
  );
}

export default FormCreateProduct;
