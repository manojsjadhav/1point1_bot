import React from 'react'
import { Layout } from '../../../components'
import AgentLists from '../../../components/agentcreation/agentlists/AgentLists'

const EmailBotAIAgent = () => {
    return (
        <Layout>
            <AgentLists />
            {/* {agentFlowtoggle ? <AgentLists /> : <VoiceAgentFlow />} */}
        </Layout>
    )
}

export default EmailBotAIAgent