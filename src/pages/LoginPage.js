import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
});

const LoginPage = ({ history }) => {
    return (
        <div>
            <h1>Login</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                    axios.post('/api/users/login', values)
                        .then(response => {
                            localStorage.setItem('token', response.data.token);
                            history.push('/');
                        })
                        .catch(error => {
                            console.error(error);
                            setSubmitting(false);
                        });
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="email" name="email" placeholder="Email" />
                        <Field type="password" name="password" placeholder="Password" />
                        <button type="submit" disabled={isSubmitting}>
                            Login
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginPage;
