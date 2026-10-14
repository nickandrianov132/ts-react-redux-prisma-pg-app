import { useState } from "react";
import { useAppSelector } from "../store/hooks/hooks";
import LoginBtn from "./loginForm/LoginBtn";
import LogoutBtn from "./loginForm/LogoutBtn";
import Login from "./loginForm/Login";


const Header = () => {
    const token = useAppSelector((state) => state.user.accessToken);
    const [isLogin, setIsLogin] = useState(false);
    const isLoggedIn = Boolean(token);
    console.log(isLoggedIn);
    console.log(token);

    return (
        <header className='relative flex w-full bg-slate-800'>
            {isLoggedIn ?
                <LogoutBtn />
                :
                <LoginBtn setIsLogin={setIsLogin}/>
            }
            {isLogin &&
                <Login setIsLogin={setIsLogin}/>
            }
        </header>
    );
}

export default Header;
