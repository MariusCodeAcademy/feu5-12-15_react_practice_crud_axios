// forma
import React from 'react';
import styled from 'styled-components';
import InputField from '../ui/InputComps';
import { useFormik } from 'formik';
import { SubmitButton } from '../ui/Button.styled';
import { useAuthContext } from '../../store/AuthProvider';

const commentObj = {
  authorEmail: 'james@bond.com',
  text: 'this is a test comment',
  postId: '9021793848917992',
};

function CommentForm() {
  const { email } = useAuthContext();
  const formik = useFormik({
    initialValues: {
      author: email,
      text: '',
    },
    validate(values) {
      const errors = {};
      if (!values.text) {
        errors.text = 'Text is Required';
      } else if (values.text.length < 10) {
        errors.text = 'Must be min 10 characters long';
      }
      return errors;
    },
    onSubmit(values) {
      console.log('values ===', values);
      // sukurti comentaro objekta (commentObj) ir issiusti i back
      // gauti cia postId
      // ivygdyti funkcija esancia CommentBlock componente
    },
  });

  return (
    <Wrap>
      <Title>Comment here</Title>
      <form onSubmit={formik.handleSubmit}>
        <InputField
          value={formik.values.author}
          onChange={formik.handleChange}
          name={'author'}
          type="text"
          label={'Author'}
          disabled={true}
        />
        <InputField
          value={formik.values.text}
          onChange={formik.handleChange}
          name={'text'}
          type="texarea"
          label={'Comment Text'}
          error={formik.errors.text}
        />
        <SubmitButton>Comment</SubmitButton>
      </form>
    </Wrap>
  );
}

const Wrap = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
`;
const Title = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export default CommentForm;
// author - supildytas automatiskai kaip email
// , text, - validuojamas kad butu privalomas ir maziausiai 10 raidziu
// formik,
// <InputField />
// onSubmit iskonsoliti objekta su author ir text
