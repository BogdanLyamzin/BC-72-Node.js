import { useSelector, useDispatch } from "react-redux";

import { getUser } from "../../../redux/auth/auth-selectors";

import { logout } from "../../../redux/auth/auth-operations";

import styles from "./navbar-user.module.scss";

const NavbarUser = () => {
    const {username} = useSelector(getUser);

    const dispatch = useDispatch();

    const onLogout = ()=> {
        dispatch(logout())
    }

    return (
        <div>
            {username}, <button onClick={onLogout}>Logout</button>
        </div>
    )
}

export default NavbarUser;