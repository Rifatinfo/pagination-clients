import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const Rootes = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default Rootes;