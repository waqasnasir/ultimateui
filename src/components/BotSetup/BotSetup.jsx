import React from "react";
import { Steps, Button, message } from 'antd';
import ChooseIntents from "../ChooseIntents/ChooseIntents";
import "./BotSetup.css";

const { Step } = Steps;
const steps = [
    {
        title: 'Choose Intents',
        content: <ChooseIntents />,
    },
    {
        title: 'Step 2',
        content: 'Second-content',
    },
    {
        title: 'Finish',
        content: 'Last-content',
    },
];

// TODO: intent selections in table will not persist between wizard. redux needs to be added to persist the selection or keep the intent selection in BotSetup component

const BotSetup = () => {
    const [current, setCurrent] = React.useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <div className="steps-container">
            {/* used Steps comopnent so that it looks like a bot setup wizard */}
            <Steps current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}

            </div>
        </div>
    )

}

export default BotSetup;