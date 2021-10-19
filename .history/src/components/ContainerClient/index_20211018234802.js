import IconEdit from "../../assets/IconEdit";
import IconMenssage from "../../assets/IconMessage";
import IconPhone from "../../assets/IconPhone";
import "./styles.css";

function ContainerClient({
  id,
  name,
  email,
  phone,
  totalcharges,
  totalchargespaid,
  status,
  cpf,
  openEditClient,
  openDetailClient,
}) {
  return (
    <div className="container-status flex-row">
      <ul className="list flex-row items-center">
        <div className="flex-column first-column flex-basis-lg">
          <h5 className="pd-bt-mid cursor-pointer" onClick={openDetailClient}>
            {name}
            {console.log(openDetailClient)}
          </h5>
          <span className="pd-bt-sm info">
            <IconMenssage />
            {email}
          </span>
          <span className="pd-bt-sm info">
            <IconPhone />
            {phone.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3")}
          </span>
        </div>
        <span className="totalCharges flex-basis-mid">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalcharges)}
        </span>
        <span className="totalChargesPaid flex-basis-mid">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalchargespaid)}
        </span>
        <span
          className="status flex-basis-mid"
          style={
            status.toUpperCase() === "EM DIA"
              ? { color: "#4EC06E" }
              : { color: "#FF4D4D" }
          }
        >
          {status.toUpperCase()}
        </span>
        <button className="button-edit-client" onClick={openEditClient}>
          {<IconEdit />}
        </button>
      </ul>
    </div>
  );
}

export default ContainerClient;
