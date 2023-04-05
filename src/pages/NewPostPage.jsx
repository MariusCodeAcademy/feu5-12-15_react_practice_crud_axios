import React from 'react';
import Container from '../components/ui/Container';
import { InputField } from '../components/ui/InputComps';
import { useFormik } from 'formik';
import { SubmitButton } from '../components/ui/Button.styled';
import * as Yup from 'yup';
import axios from 'axios';
import Feedback from '../components/ui/Feedback';

const inputsData = [
  { id: 1, type: 'text', label: 'Title', name: 'title' },
  { id: 2, type: 'texarea', label: 'Body', name: 'body' },
  { id: 3, type: 'text', label: 'Author', name: 'author' },
  { id: 4, type: 'text', label: 'Tags', name: 'tags' },
  { id: 5, type: 'date', label: 'Date', name: 'date' },
];

function NewPostPage() {
  // prideti newPostError state

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
      author: '',
      tags: '',
      date: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().min(3).required(),
      body: Yup.string().min(10).required(),
      author: Yup.string().min(3).required(),
      tags: Yup.string().min(3).required(),
      date: Yup.date().required(),
    }),
    onSubmit(values) {
      console.log('submiting...', values);
      sendDataToBe(values);
    },
  });

  function sendDataToBe(dataToSend) {
    axios
      .post('http://localhost:5000/posts', dataToSend)
      .then((resp) => {
        console.log('pavyko resp ===', resp);
      })
      .catch((err) => {
        console.warn('NEpavyko err ===', err);
        // set new newPostError to err
      });
  }

  // const toShowErrror = ar newPostError code yra ERR_NETWORK

  // console.log('formik.errors ===', formik.errors);
  return (
    <Container>
      <h1>NewPostPage</h1>
      <p>Welcome to NewPostPage</p>
      <Feedback show={true} type={'error'}>
        Testing feedback
      </Feedback>
      <form onSubmit={formik.handleSubmit}>
        {inputsData.map((iObj) => (
          <InputField
            key={iObj.id}
            type={iObj.type}
            label={iObj.label}
            name={iObj.name}
            value={formik.values[iObj.name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched[iObj.name] && formik.errors[iObj.name]}
          />
        ))}
        <SubmitButton>Create</SubmitButton>
      </form>
    </Container>
  );
}

export default NewPostPage;