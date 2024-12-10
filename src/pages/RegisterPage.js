import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
});

const RegisterPage = ({ history }) => {
    return (
        <div>
            <h1>Register</h1>
            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={RegisterSchema}
                onSubmit={(values, { setSubmitting }) => {
                    axios.post('/api/users/register', values)
                        .then(response => {
                            history.push('/login');
                        })
                        .catch(error => {
                            console.error(error);
                            setSubmitting(false);
                        });
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="name" placeholder="Name" />
                        <Field type="email" name="email" placeholder="Email" />
                        <Field type="password" name="password" placeholder="Password" />
                        <button type="submit" disabled={isSubmitting}>
                            Register
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterPage;
