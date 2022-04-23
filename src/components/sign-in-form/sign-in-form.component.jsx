import { useState } from 'react';
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserFromEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const defaultfromFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultfromFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultfromFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserFromEmailAndPassword(
        email,
        password
      );
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          alert('Email with this user dosent exists');
          break;
        case 'auth/wrong-password':
          alert('Incorrect password for the email');
          break;

        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
