import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Input from '../components/Input';

const INITIAL = {
  firstname: 'John',
  lastname: 'Doe',
  email: 'john.doe@gmail.com',
  manager: 'unknown',
};

const FormContext = createContext({ data: INITIAL, onChange: () => ({}) });

const Form = ({ defaultValue, onSubmit, children }) => {
  const [data, setData] = useState(defaultValue);

  const handleChange = useCallback(e => {
    setData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  }, []);

  const contextValue = useMemo(() => ({ data, onChange: handleChange }), [
    data,
    handleChange,
  ]);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      onSubmit(contextValue.data);
    },
    [contextValue.data, onSubmit],
  );
  return (
    <FormContext.Provider value={contextValue}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  );
};

const SubmitButton = () => (
  <button className="waves-effect waves-light btn">
    <i className="material-icons left">add</i>Soumettre
  </button>
);

const InputWithContext = ({ id, ...props }) => {
  const { data, onChange } = useContext(FormContext);
  return <Input onChange={onChange} value={data[id]} id={id} {...props} />;
};

const DisplayData = () => {
  const { data } = useContext(FormContext);
  return (
    <ul className="collection">
      {Object.keys(data).map(key => (
        <li key={key} className="collection-item">
          {data[key]}
        </li>
      ))}
    </ul>
  );
};

const AddPeople = () => {
  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const onSubmit = useCallback(data => console.log(data), []);

  return (
    <div className="card-container">
      <Form defaultValue={INITIAL} onSubmit={onSubmit}>
        <InputWithContext
          name="firstname"
          id="firstname"
          icon="face"
          label="The firstname"
        />
        <InputWithContext
          name="lastname"
          id="lastname"
          icon="account_circle"
          label="The lastname"
        />
        <InputWithContext
          name="email"
          id="email"
          icon="email"
          label="The email"
        />
        <InputWithContext
          name="manager"
          id="manager"
          icon="supervisor_account"
          label="The manager"
        />
        <SubmitButton />
        <h3>Données :</h3>
        <DisplayData />
      </Form>
    </div>
  );
};

export default AddPeople;
