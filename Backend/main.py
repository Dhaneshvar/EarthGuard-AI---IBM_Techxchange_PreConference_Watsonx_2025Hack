from flask import Flask, request, jsonify
from flask_cors import CORS
import asyncio
from beeai_framework.backend import ChatModel
from beeai_framework.tools.search.wikipedia import WikipediaTool
from beeai_framework.tools.weather import OpenMeteoTool
from beeai_framework.workflows.agent import AgentWorkflow, AgentWorkflowInput
from beeai_framework.tools.search.duckduckgo import DuckDuckGoSearchTool
from beeai_framework.middleware.trajectory import GlobalTrajectoryMiddleware

app = Flask(__name__)
CORS(app)

# Initialize workflow
llm = ChatModel.from_name(
    "watsonx:ibm/granite-3-8b-instruct",
    settings={
        "project_id": "",
        "api_key": "",
        "base_url": "https://us-south.ml.cloud.ibm.com",
    },
)

workflow = AgentWorkflow(name="Smart assistant")
workflow.add_agent(
    name="PandemicAnalyzer",
    role="A pandemic analyst. you should analyze the pandemic situation and provide information.",
    instructions="You use given tools to analyze the pandemic situation.",
    tools=[WikipediaTool()],
    llm=llm,
)
workflow.add_agent(
    name="WeatherForecaster",
    role="A weather reporter.",
    instructions="You provide detailed weather reports.",
    tools=[OpenMeteoTool()],
    llm=llm,
)
workflow.add_agent(
    name="WebResearcher",
    role="you have to search explictly on news websites, Pandemic and disaster related websites and gather information.",
    instructions="You can combine disparate information into a final coherent summary. Always provide in structured bulleted format.",
    tools=[DuckDuckGoSearchTool()],
    llm=llm,
)

def run_async_workflow(prompt):
    """Run async workflow synchronously."""
    try:
        async def _run_workflow():
            result = await workflow.run(
                inputs=[AgentWorkflowInput(prompt=f"Always provide in structured bulleted markdown format. {prompt}")]
            ).middleware(GlobalTrajectoryMiddleware())
            return result.state.final_answer
        
        # Run async function in sync context
        return asyncio.run(_run_workflow())
    except Exception as e:
        return f"Error: {str(e)}"


@app.route('/api/chat', methods=['POST'])
def chat():
    """Synchronous route handler for chat endpoint."""
    try:
        data = request.get_json()
        prompt = data.get('query', "")
        print(f"Received prompt: {prompt}")
        
        if not prompt:
            return jsonify({'error': 'No message provided'}), 400

        response = run_async_workflow(prompt)
        
        return jsonify({
            'ai_response': response,
            'status': 'success'
        })
        
    except Exception as e:
        return jsonify({
            'ai_response': str(e),
            'status': 'error'
        }), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
