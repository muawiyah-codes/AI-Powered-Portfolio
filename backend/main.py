import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from models.schemas import ChatRequest, ChatResponse, SearchQuery, SearchResponse
from rag.knowledge import KnowledgeBase
from rag.pipeline import RAGPipeline

# Load environment variables reliably from backend directory or root
env_path = os.path.join(os.path.dirname(__file__), ".env")
if os.path.exists(env_path):
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()

app = FastAPI(
    title="Muawiyah Portfolio AI Backend",
    description="Production RAG and Semantic Intelligence API for AI/ML Portfolio",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Knowledge Base & RAG Pipeline
kb = KnowledgeBase()
rag = RAGPipeline(kb)

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "AI Portfolio Intelligence API",
        "developer": kb.profile.get("name", "Muawiyah"),
        "chunks_indexed": len(kb.get_all_chunks()),
        "projects_count": len(kb.projects),
        "llm_provider": "Groq / Gemini / Native RAG"
    }

@app.get("/api/profile")
def get_profile():
    return kb.profile

@app.get("/api/projects")
def get_projects(category: str = None):
    if category and category.lower() != "all":
        return [p for p in kb.projects if p["category"].lower() == category.lower()]
    return kb.projects

@app.get("/api/projects/{project_id}")
def get_project(project_id: str):
    for p in kb.projects:
        if p["id"] == project_id:
            return p
    raise HTTPException(status_code=404, detail="Project not found")

@app.get("/api/skills")
def get_skills():
    return kb.skills

@app.post("/api/chat", response_model=ChatResponse)
def chat_with_portfolio_ai(req: ChatRequest):
    if not req.message or not req.message.strip():
        raise HTTPException(status_code=400, detail="Empty query provided")
    
    response = rag.answer_query(
        query=req.message,
        history=req.history,
        recruiter_mode=req.recruiter_mode or False
    )
    return response

@app.post("/api/search", response_model=SearchResponse)
def semantic_search(query: SearchQuery):
    if not query.query or not query.query.strip():
        raise HTTPException(status_code=400, detail="Empty search query")
    
    results = rag.semantic_search(query.query, limit=query.limit or 5)
    return SearchResponse(
        query=query.query,
        results=results,
        total=len(results)
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
