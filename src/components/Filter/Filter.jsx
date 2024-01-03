export const Filter = ({filter, handleInputFilter}) => {
    return(
        <label>
          <p>Find Contacts by name:</p>
          <input
            value={filter}
            onChange={handleInputFilter}
            name="filter"
            type="text"
            placeholder="Input name"
          />
        </label>
    )
}

export default Filter;