/* eslint-disable no-unused-vars */
import './styles.css'

function HeaderTable({ titles }) {

    const listItems = titles.map((title) =>
        <li className='li' key={title.toString()}>
            {title}
        </li>
    );

    return (
        <div className='header-table flex-row'>
            <ul className='list flex-row'>
                {listItems}
            </ul>
        </div>
    );
}

export default HeaderTable;