import { useEffect } from "react";
import { isBrannch } from "../../store/branchesSlice";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const CreateBranchPage = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const back = () => {
        dispatch(isBrannch(true));
        navigation('/branches')

    }
    return (<>
        <p>Create Branch</p>
        <Button variant="outline-primary" onClick={() => {
            back()
        }}><FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> Add</Button>
    </>)
}

export default CreateBranchPage;