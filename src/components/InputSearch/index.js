import IconSearch from "../../assets/IconSearch";
import "./styles.css";

function InputSearch({ value, onChange, onClick, entity = 'clientes' }) {
  return (
    <div className="search flex-row">
      <input
        placeholder={entity === "clientes" ? "Procurar por nome, email ou telefone" : "Procurar por nome ou id"}
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
