/**React component to create a new ticket */
const NewTicket = () => {
  return (
    <div className='container-xxl'>
      <h1>Create a Ticket</h1>
      <form>
        <div class='mb-3'>
          <label for='title' class='form-label'>
            Title
          </label>
          <input
            type='text'
            class='form-control'
            id='title'
            placeholder='Enter a title'
          />
        </div>
        <div class='mb-3'>
          <label for='price' class='form-label'>
            Price
          </label>
          <input
            type='price'
            class='form-control'
            id='price'
            placeholder='Enter a price'
          />
        </div>
        <button type='submit' class='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewTicket;
