import axios from 'axios';
import { useState } from 'react';

export const useRequest = ({ url, method, body }) => {
  const [errors, setErrors] = useState(null);

  const executeRequest = async () => {
    try {
      // Look up method by index
      const response = await axios[method](url, body);
      setErrors(null);

      return response.data;
    } catch (err) {
      // Use generic error formatting for multiple component err handling
      setErrors(
        <div className='alert alert-danger'>
          <h4>Something went wrong:</h4>
          <ul className='my-0'>
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { executeRequest, errors };
};
