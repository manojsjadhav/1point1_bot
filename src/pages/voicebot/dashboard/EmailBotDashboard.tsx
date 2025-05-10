import { useEffect } from "react";
import { Layout } from "../../../components";
import { setBreadcrumbs } from "../../../redux/nodeSlice/breadcrumbSlice";
import { useDispatch } from "react-redux";

const EmailBotDashboard = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(
            setBreadcrumbs([
                { label: "Email Bot Dashboard", path: "/emailBot" },
            ])
        );
    }, [dispatch]);
    
    return (
        <Layout>
            <div>Email Bot Dashboard</div>
        </Layout>
    );
};

export default EmailBotDashboard
    ;
