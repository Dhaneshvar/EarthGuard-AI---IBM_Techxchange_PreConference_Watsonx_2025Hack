from flask import Flask, request, jsonify
from flask_cors import CORS
import asyncio
from beeai_framework.backend import ChatModel
from beeai_framework.tools.search.wikipedia import WikipediaTool
from beeai_framework.tools.weather import OpenMeteoTool
from beeai_framework.workflows.agent import AgentWorkflow, AgentWorkflowInput
from beeai_framework.tools.search.duckduckgo import DuckDuckGoSearchTool
from beeai_framework.middleware.trajectory import GlobalTrajectoryMiddleware
from beeai_framework.tools import StringToolOutput, tool

app = Flask(__name__)
CORS(app)

# Initialize workflow
llm = ChatModel.from_name(
    "watsonx:ibm/granite-3-8b-instruct",
    settings={
        "project_id": "3",
        "api_key": "9",
        "base_url": "https://us-south.ml.cloud.ibm.com",
    },
)


@tool(description="You are a news search tool. you have to extract keyword from the expression and search news related to it.")
def search_news(keyword: str) -> StringToolOutput:
    from newsapi import NewsApiClient
    # Init
    newsapi = NewsApiClient(api_key='b769be7ba87a450f89104326b356f18b')

    print(f"Searching news for keyword: {keyword}")
    all_articles = newsapi.get_everything(q=keyword,
                                        from_param='2025-07-16',
                                        to='2025-08-17',
                                        language='en',
                                        sort_by='relevancy',
                                        page=1
    )
    
    print(all_articles)

    # Extract only top 5 articles
    articles = all_articles.get("articles", [])[:5]

    # Store required fields as objects (dicts)
    parsed_articles = []
    for article in articles:
        parsed_articles.append({
            "title": article.get("title"),
            "description": article.get("description"),
            "url": article.get("url"),
            "urlToImage": article.get("urlToImage"),
            # "content": article.get("content"),
        })

    # Print results
    for idx, a in enumerate(parsed_articles, 1):
        print(f"\nArticle {idx}:")
        print(f"Title: {a['title']}")
        print(f"Description: {a['description']}")
        print(f"URL: {a['url']}")
        print(f"Image: {a['urlToImage']}")

    return parsed_articles

workflow = AgentWorkflow(name="Smart Disaster EarthGuard AI Agent")

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

# Custom Tool for news search
workflow.add_agent(
        name="NewsSearcher",
        role="A news search agent.",
        instructions="you have to use this news seach tool with main keyword from the user given prompt. eg. 'disaster', 'pandemic', 'emergency'. Provide output in well structured format only finally",
        tools=[search_news],
        llm=llm,
)

workflow.add_agent(
    name="SocialMediaAnalyzer",
    role="A social media analyst.",
    instructions="You analyze social media trends and provide insights.",
    tools=[SocialMediaSearchTool()],
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
