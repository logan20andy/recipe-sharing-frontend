import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const RecipeSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    image: Yup.string().url('Invalid URL').required('Required'),
    ingredients: Yup.string().required('Required'),
    steps: Yup.string().required('Required')
});

const AddRecipePage = ({ history }) => {
    return (
        <div>
            <h1>Add Recipe</h1>
            <Formik
                initialValues={{ title: '', description: '', image: '', ingredients: '', steps: '' }}
                validationSchema={RecipeSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const token = localStorage.getItem('token');
                    axios.post('/api/recipes', values, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(response => {
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
                        <Field type="text" name="title" placeholder="Title" />
                        <Field type="text" name="description" placeholder="Description" />
                        <Field type="text" name="image" placeholder="Image URL" />
                        <Field type="text" name="ingredients" placeholder="Ingredients (comma separated)" />
                        <Field type="text" name="steps" placeholder="Steps (comma separated)" />
                        <button type="submit" disabled={isSubmitting}>
                            Add Recipe
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddRecipePage;
