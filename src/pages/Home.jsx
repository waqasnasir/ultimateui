import React from "react";
import { PageHeader } from 'antd';
import BotSetup from "../components/BotSetup/BotSetup";

const Home = () => {
    return (
        <>
            <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="Create Bot"
                subTitle="Create your own Bot here"
            />
            <BotSetup />
        </>
    )
}

export default Home;