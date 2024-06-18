import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "react-bootstrap/esm/Button"
import Form from "react-bootstrap/esm/Form"
import { makeSearchKey } from "../../utils/appFunctions"
export interface IAppSearchBar {
    searchFn: (key: string) => void,
    placeholder: string,
    isDirectValue?: boolean
}
export const AppSearchBar = ({ searchFn, placeholder = 'Search', isDirectValue = false }: IAppSearchBar) => {
    return <form className="d-flex" role="search">
        <Form.Control className="me-2" type="search" placeholder={placeholder} aria-label={placeholder} onChange={(searchValue) => {
            searchFn(makeSearchKey(searchValue.target.value || '', isDirectValue))
        }} />
        <Button variant="outline-primary" onClick={() => {
        }}>
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </Button>

    </form>
}