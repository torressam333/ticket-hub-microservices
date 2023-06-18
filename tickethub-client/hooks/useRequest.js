/**
 * Meant to be used as a custom hook only inside of other components.
 *
 * Cannot be used to fetch data during an ssr process. i.e. genInitialProps() etc...
 */
import axios from 'axios';
import { useState } from 'react';

export const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const executeRequest = async () => {
    try {
      setErrors(null);

      // Look up method by index
      const response = await axios[method](url, body);

      // Allow implementing files to provide a success action
      if (onSuccess) onSuccess(response.data);

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
