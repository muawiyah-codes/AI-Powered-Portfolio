import json
import os
from typing import List, Dict, Any

class KnowledgeBase:
    def __init__(self, base_dir: str = None):
        if base_dir is None:
            # Look for knowledge directory relative to backend or root
            possible_paths = [
                os.path.join(os.path.dirname(__file__), "..", "..", "knowledge"),
                os.path.join(os.getcwd(), "knowledge"),
                os.path.join(os.getcwd(), "..", "knowledge"),
            ]
            self.base_dir = next((p for p in possible_paths if os.path.exists(p)), os.path.join(os.getcwd(), "knowledge"))
        else:
            self.base_dir = base_dir

        self.profile: Dict[str, Any] = {}
        self.projects: List[Dict[str, Any]] = []
        self.skills: List[Dict[str, Any]] = []
        self.resume_text: str = ""
        self.chunks: List[Dict[str, Any]] = []
        self.load_data()
        self.build_chunks()

    def load_data(self):
        profile_path = os.path.join(self.base_dir, "profile.json")
        projects_path = os.path.join(self.base_dir, "projects.json")
        skills_path = os.path.join(self.base_dir, "skills.json")
        resume_path = os.path.join(self.base_dir, "resume.md")

        if os.path.exists(profile_path):
            with open(profile_path, "r", encoding="utf-8") as f:
                self.profile = json.load(f)
        if os.path.exists(projects_path):
            with open(projects_path, "r", encoding="utf-8") as f:
                self.projects = json.load(f)
        if os.path.exists(skills_path):
            with open(skills_path, "r", encoding="utf-8") as f:
                self.skills = json.load(f)
        if os.path.exists(resume_path):
            with open(resume_path, "r", encoding="utf-8") as f:
                self.resume_text = f.read()

    def build_chunks(self):
        self.chunks = []
        
        # 1. Profile Chunk
        if self.profile:
            self.chunks.append({
                "id": "profile_core",
                "title": f"Profile: {self.profile.get('name', 'Developer')}",
                "source": "Portfolio Profile",
                "category": "Biography & Contact",
                "text": f"Name: {self.profile.get('name')}. Title: {self.profile.get('title')}. Location: {self.profile.get('location')}. Email: {self.profile.get('email')}. GitHub: {self.profile.get('github')}. LinkedIn: {self.profile.get('linkedin')}. Bio: {self.profile.get('bio')}."
            })
            
            # Education chunks
            for edu in self.profile.get("education", []):
                self.chunks.append({
                    "id": f"edu_{edu.get('degree', '')[:10]}",
                    "title": f"Education: {edu.get('degree')}",
                    "source": "Education Records",
                    "category": "Education",
                    "text": f"Education: {edu.get('degree')} at {edu.get('institution')} ({edu.get('period')}). Grade: {edu.get('grade')}. Highlights: {' '.join(edu.get('highlights', []))}"
                })
                
            # Experience chunks
            for exp in self.profile.get("experience", []):
                self.chunks.append({
                    "id": f"exp_{exp.get('role', '')[:10]}",
                    "title": f"Experience: {exp.get('role')} at {exp.get('organization')}",
                    "source": "Experience Section",
                    "category": "Work Experience",
                    "text": f"Role: {exp.get('role')} at {exp.get('organization')} ({exp.get('period')}, {exp.get('location')}). Responsibilities: {' '.join(exp.get('responsibilities', []))}"
                })

            # Certifications
            for cert in self.profile.get("certifications", []):
                self.chunks.append({
                    "id": f"cert_{cert.get('title', '')[:10]}",
                    "title": f"Certification: {cert.get('title')}",
                    "source": "Certifications",
                    "category": "Certifications",
                    "text": f"Certification: {cert.get('title')} issued by {cert.get('issuer')} ({cert.get('date')}). Description: {cert.get('description')}"
                })

        # 2. Project Chunks
        for proj in self.projects:
            tech_str = ", ".join(proj.get("technologies", []))
            metrics_str = ", ".join([f"{k}: {v}" for k, v in proj.get("metrics", {}).items()])
            arch_steps = " -> ".join([s.get("name") for s in proj.get("architectureSteps", [])])
            challenges_str = " ".join(proj.get("challenges", []))
            solutions_str = " ".join(proj.get("solutionsImplemented", []))

            chunk_text = (
                f"Project: {proj.get('title')} ({proj.get('category')}). Subtitle: {proj.get('subtitle')}. "
                f"Technologies: {tech_str}. Key Verified Metrics: {metrics_str}. "
                f"Summary: {proj.get('summary')} Problem: {proj.get('problem')} "
                f"Solution: {proj.get('solution')} Architecture Pipeline: {arch_steps}. "
                f"Challenges: {challenges_str} Solutions: {solutions_str} "
                f"GitHub: {proj.get('github')}."
            )

            self.chunks.append({
                "id": f"proj_{proj.get('id')}",
                "title": f"Project: {proj.get('title')}",
                "source": proj.get("title"),
                "category": proj.get("category"),
                "text": chunk_text
            })

        # 3. Skills Chunks
        for cat in self.skills:
            skills_list = []
            for s in cat.get("skills", []):
                used_in = ", ".join(s.get("usedIn", []))
                skills_list.append(f"{s.get('name')} ({s.get('level')} level: {s.get('description')} Used in: {used_in})")
            
            self.chunks.append({
                "id": f"skill_cat_{cat.get('category')[:10]}",
                "title": f"Skills: {cat.get('category')}",
                "source": "Skills Matrix",
                "category": "Technical Skills",
                "text": f"Category: {cat.get('category')}. Skills: {' | '.join(skills_list)}"
            })

    def get_all_chunks(self) -> List[Dict[str, Any]]:
        return self.chunks
