

function ContainerHome({ label, cor, value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="button-appearance-none"
    >
      <div
        style={{ borderColor: cor, color: cor }}
        className="flex-row container-value content-around"
      >
        <h4>{label}</h4>
        <h4 className="number-zero ">{value}</h4>
      </div>
    </button>
  );
}

export default ContainerHome;