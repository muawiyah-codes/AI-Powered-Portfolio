from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []
    recruiter_mode: Optional[bool] = False

class SourceReference(BaseModel):
    title: str
    source_type: str
    snippet: str

class ChatResponse(BaseModel):
    reply: str
    sources: List[SourceReference] = []
    suggested_questions: List[str] = []
    confidence: float = 0.95
    provider: str = "RAG Engine"

class SearchQuery(BaseModel):
    query: str
    limit: Optional[int] = 5

class ProjectResult(BaseModel):
    id: str
    title: str
    subtitle: str
    category: str
    technologies: List[str]
    summary: str
    score: float
    github: str
    demo: str

class SearchResponse(BaseModel):
    query: str
    results: List[ProjectResult]
    total: int
