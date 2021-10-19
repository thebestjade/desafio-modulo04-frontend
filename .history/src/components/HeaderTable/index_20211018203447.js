/* eslint-disable no-unused-vars */
import "./styles.css";

function HeaderTable({ titles }) {

  return (
    <div className="header-table flex-row">
      <ul className="list flex-row">
        {titles.map((title) => (
          <li className="li" key={title.toString()}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HeaderTable;
