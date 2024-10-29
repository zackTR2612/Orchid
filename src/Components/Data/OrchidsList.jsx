// OrchidList.jsx

import React, { useState } from 'react';
import useOrchidData from './data';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const OrchidList = () => {
  const { orchids, loading, error, deleteOrchid, addOrchid, updateOrchid } = useOrchidData();
  const [editingOrchid, setEditingOrchid] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleEdit = (orchid) => {
    setEditingOrchid(orchid);
  };

  const handleCancelEdit = () => {
    setEditingOrchid(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Orchid List</h1>
      <ul className="list-group mb-4">
        {orchids.map((orchid) => (
          <li key={orchid.id} className="list-group-item d-flex justify-content-between align-items-center">
            {orchid.orchidName}
            <div>
              <button className="btn btn-warning mx-2" onClick={() => handleEdit(orchid)}>Edit</button>
              <button className="btn btn-danger" onClick={() => deleteOrchid(orchid.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <h2>{editingOrchid ? "Edit Orchid" : "Add New Orchid"}</h2>
      <Formik
        initialValues={{
          orchidName: editingOrchid ? editingOrchid.orchidName : '',
          isNatural: editingOrchid ? editingOrchid.isNatural : false,
          description: editingOrchid ? editingOrchid.description : '',
          category: editingOrchid ? editingOrchid.category : '',
          image: editingOrchid ? editingOrchid.image : '',
          videoUrl: editingOrchid ? editingOrchid.videoUrl : '', // Thêm videoUrl
        }}
        enableReinitialize={true} 
        validationSchema={Yup.object({
          orchidName: Yup.string().required('Required').min(2, 'Must be at least 2 characters'),
          description: Yup.string().required('Required').min(10, 'Must be at least 10 characters'),
          category: Yup.string().required('Required'),
          image: Yup.string().url('Must be a valid URL').required('Required'),
          videoUrl: Yup.string().url('Must be a valid URL'), // Thêm xác thực cho videoUrl
        })}
        onSubmit={(values, { resetForm }) => {
          if (editingOrchid) {
            const updatedValues = {
              ...editingOrchid,
              ...values,
            };
            updateOrchid(editingOrchid.id, updatedValues);
            handleCancelEdit();
          } else {
            addOrchid(values);
          }
          resetForm();
        }}
      >
        {({ values }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="orchidName" className="form-label">Orchid Name</label>
              <Field name="orchidName" className="form-control" />
              <ErrorMessage name="orchidName" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <Field name="description" as="textarea" className="form-control" rows="4" />
              <ErrorMessage name="description" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <Field name="category" className="form-control" />
              <ErrorMessage name="category" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image URL</label>
              <Field name="image" className="form-control" />
              <ErrorMessage name="image" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="videoUrl" className="form-label">Video URL</label>
              <Field name="videoUrl" className="form-control" />
              <ErrorMessage name="videoUrl" component="div" className="text-danger" />
            </div>
            <div className="mb-3 form-check">
              <Field type="checkbox" name="isNatural" className="form-check-input" />
              <label className="form-check-label">Is Natural</label> 
            </div>
            <button type="submit" className="btn btn-primary">{editingOrchid ? 'Update Orchid' : 'Add Orchid'}</button>
            {editingOrchid && <button type="button" className="btn btn-secondary ms-2" onClick={handleCancelEdit}>Cancel</button>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OrchidList;
