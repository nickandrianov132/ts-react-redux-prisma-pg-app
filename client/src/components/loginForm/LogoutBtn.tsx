import { useUserLogoutMutation } from "../../services/userApi";
import { useAppDispatch } from "../../store/hooks/hooks";
import { logout } from "../../store/slices/authSlice";

const LogoutBtn = () => {
    const [logoutUser] = useUserLogoutMutation();
    const dispatch = useAppDispatch();

    const handlerLogout = async () => {
        try {
            await logoutUser().unwrap();

        } catch (error) {
            console.error("Failed to loggout on server");
        } finally {
            dispatch(logout());
        }
    }

    return (
        <button
            onClick={handlerLogout}
            className="border border-blue-900/30 rounded-md text-slate-200 bg-blue-600 hover:bg-blue-500 hover:text-white"
        >
        Logout
        </button>
    );
}

export default LogoutBtn;
