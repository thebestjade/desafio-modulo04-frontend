import './styles.css'

import SearchInput, { createFilter } from 'react-search-input'

import emails from './mails'

const KEYS_TO_FILTERS = ['user.name', 'subject', 'dest.name']


function InputSearch() {
    const filteredEmails = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    return (
        <div>
            <SearchInput className="search-input" onChange={this.searchUpdated} />
            {filteredEmails.map(email => {
                return (
                    <div className="mail" key={email.id}>
                        <div className="from">{email.user.name}</div>
                        <div className="subject">{email.subject}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default InputSearch;


