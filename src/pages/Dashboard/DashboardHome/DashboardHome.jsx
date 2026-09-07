import Loader from "../../../components/Loading/Loader";
import useRole from "../../../hooks/useRole";
import AdminDashboardHome from "./AdminDashboardHome";
import RiderDashboardHome from "./RiderDashboardHome";
import UserDashboardHome from "./UserDashboardHome";

const DashboardHome = () => {

    const { role, RoleLoading } = useRole();


    if (RoleLoading) {
        return <Loader></Loader>;
    }


    if (role === 'admin') {
        return <AdminDashboardHome></AdminDashboardHome>;
    }

    if (role === 'rider') {
        return <RiderDashboardHome></RiderDashboardHome>;
    }

    if (role === 'user') {
        return <UserDashboardHome></UserDashboardHome>;
    }

};

export default DashboardHome;