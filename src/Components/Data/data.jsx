// data.jsx

import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const baseURL = 'https://6717e6c4b910c6a6e02a8144.mockapi.io/Orchid';

const useOrchidData = () => {
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data (GET)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseURL);
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        const data = await response.json();
        setOrchids(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // POST data
  const addOrchid = async (newOrchid) => {
    try {
      const response = await fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify(newOrchid),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status}`);
      }
      const addedOrchid = await response.json();
      setOrchids((prev) => [...prev, addedOrchid]);
    } catch (err) {
      setError(err.message);
    }
  };

  // DELETE data
  const deleteOrchid = async (id) => {
    try {
      const response = await fetch(`${baseURL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status}`);
      }
      setOrchids((prev) => prev.filter((orchid) => orchid.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // PUT data (Update)
  const updateOrchid = async (id, updatedData) => {
    try {
      const response = await fetch(`${baseURL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status}`);
      }
      const updatedOrchid = await response.json();
      setOrchids((prev) =>
        prev.map((orchid) => (orchid.id === id ? updatedOrchid : orchid))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Formik setup for adding or updating an orchid
  const formik = useFormik({
    initialValues: {
      orchidName: '',
      isNatural: false,
      description: '',
      category: '',
      image: '',
      videoUrl: '', // Thêm thuộc tính videoUrl
    },
    validationSchema: Yup.object({
      orchidName: Yup.string().required('Required').min(2, 'Must be at least 2 characters'),
      description: Yup.string().required('Required').min(10, 'Must be at least 10 characters'),
      category: Yup.string().required('Required'),
      image: Yup.string().url('Must be a valid URL').required('Required'),
      videoUrl: Yup.string().url('Must be a valid URL'), // Xác thực cho videoUrl
    }),
    onSubmit: (values, { resetForm }) => {
      addOrchid(values);
      resetForm();
    },
  });

  return { orchids, loading, error, addOrchid, deleteOrchid, updateOrchid, formik };
};

export default useOrchidData;
