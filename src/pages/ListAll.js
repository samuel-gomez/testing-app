import React, { useState } from "react";
import Person from "../components/Person";
import SearchInput from "../components/SearchInput";

const filterPerson = (search) => {
  const re = new RegExp(search, "i");
  return (person) => re.test(person.firstname) || re.test(person.lastname);
};

const ListAll = ({ people }) => {
  const [searchInputValue, setSearchInputValue] = useState("");

  const handleChange = (e) => setSearchInputValue(e?.target?.value ?? "");

  return (
    <>
      <div className="card-container">
        <SearchInput
          id="search"
          label="search by name"
          value={searchInputValue}
          onChange={handleChange}
        />
      </div>
      <div className="card-container">
        {people.filter(filterPerson(searchInputValue)).map((person) => (
          <Person person={person} key={person.id} />
        ))}
      </div>
    </>
  );
};

export default ListAll;
