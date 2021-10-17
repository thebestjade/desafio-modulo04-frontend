import IconSearch from "../../assets/IconSearch";
import "./styles.css";

function InputSearch({ value, onChange, onClick }) {
  return (
    <div className="search flex-row">
      <input
        placeholder="Procurar por nome, e-mail ou CPF"
        id="search-input"
        className="input-search"
        value={value}
        onChange={onChange}
      />
      <button className="btn-search" type="button" onClick={onClick}>
        <IconSearch />
        <span>BUSCAR</span>
      </button>
    </div>
  );
}

export default InputSearch;
