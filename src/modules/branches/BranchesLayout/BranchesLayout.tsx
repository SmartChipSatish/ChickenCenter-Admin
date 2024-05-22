import { Outlet, useNavigate } from "react-router-dom"
import './BranchesLayout.scss'
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { isBrannch } from "../store/branchesSlice";
import { useEffect } from "react";


const BranchLayout = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const isBranch = useSelector((state: any) => state.brancesSlice.isBrannch)

    const createBranch = () => {
        navigation('create');
        dispatch(isBrannch(false))
    }
   
    return <>
        {isBranch && <div className="brancheslayout-titleDiv">
            <p className="pageTile">Branches</p>
            <Button variant="outline-primary" onClick={() => {
                createBranch()
            }}><FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> Add</Button>
        </div>}


        <Outlet />
    </>
}

export default BranchLayout;