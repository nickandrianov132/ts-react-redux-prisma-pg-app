import type { Dispatch, SetStateAction } from "react";

export interface ILoginBtnProps {
    setIsLogin: Dispatch<SetStateAction<boolean>>
}

const LoginBtn = ({setIsLogin}: ILoginBtnProps) => {

    return (
        <button
            onClick={() => setIsLogin(true)}
            className="border border-slate-400/50 rounded-md bg-emerald-500 text-slate-200 hover:bg-emerald-400 hover:text-white"
        >
            Login
        </button>
    );
}

export default LoginBtn;
