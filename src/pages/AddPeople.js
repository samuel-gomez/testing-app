import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Input from "../components/Input";

const INITIAL = {
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@gmail.com",
  manager: "unknown",
};

const Form = ({ defaultValue = INITIAL }) => {
  const [data, setData] = useState(defaultValue);
  const { setResult } = useContext(AddPeopleContext);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const handleChange = useCallback((e) => {
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setResult(null);
    const { firstname, lastname, email, manager } = e.target.elements;
    try {
      const data = await fetch("http://localhost:8888/api/people/add", {
        method: "POST",
        Accept: "application/json",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstname.value,
          lastname: lastname.value,
          email: email.value,
          manager: manager.value,
        }),
      });
      const { responseBody, anomaly = null } = await data.json();
      if (anomaly) {
        setErrorMessage(anomaly.label);
      } else {
        setResult(responseBody);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  }, []);

  return (
    <>
      {errorMessage && (
        <div role="alert" style={{ color: "red", fontWeight: "bold" }}>
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          name="firstname"
          id="firstname"
          icon="face"
          label="The firstname"
          onChange={handleChange}
          value={data.firstname}
        />
        <Input
          name="lastname"
          id="lastname"
          icon="account_circle"
          label="The lastname"
          onChange={handleChange}
          value={data.lastname}
        />
        <Input
          name="email"
          id="email"
          icon="email"
          label="The email"
          onChange={handleChange}
          value={data.email}
        />
        <Input
          name="manager"
          id="manager"
          icon="supervisor_account"
          label="The manager"
          onChange={handleChange}
          value={data.manager}
        />
        <button className="waves-effect waves-light btn">
          <i className="material-icons left">add</i>Soumettre
        </button>
      </form>
    </>
  );
};

const DisplayData = () => {
  const { result } = useContext(AddPeopleContext);
  return (
    <>
      <h4>Données sauvegardées :</h4>
      {result ? (
        <ul className="collection">
          {Object.keys(result).map((key) => (
            <li key={key} className="collection-item">
              {result[key]}
            </li>
          ))}
        </ul>
      ) : (
        <p>Pas de donnée</p>
      )}
    </>
  );
};

const AddPeopleContext = createContext({ result: null, setResult: () => ({}) });

const AddPeople = () => {
  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const [result, setResult] = React.useState(null);
  const contextResult = useMemo(() => ({ result, setResult }), [
    result,
    setResult,
  ]);

  return (
    <div className="card-container">
      <div className="form">
        <AddPeopleContext.Provider value={contextResult}>
          <Form />
          <DisplayData />
        </AddPeopleContext.Provider>
      </div>
    </div>
  );
};

export default AddPeople;
