import os
import yaml
import argparse
from pathlib import Path

def load_skill_descriptions(skills_dir: Path):
    skill_info = []
    for entry in skills_dir.iterdir():
        if entry.is_dir():
            skill_md = entry / "SKILL.md"
            if skill_md.is_file():
                try:
                    with open(skill_md, "r", encoding="utf-8") as f:
                        # yaml front matter is delimited by --- lines
                        content = f.read()
                    # split front matter
                    if content.startswith("---"):
                        parts = content.split("---")
                        # parts[1] is the yaml front matter
                        meta = yaml.safe_load(parts[1])
                        description = meta.get("description", "")
                        name = meta.get("name", entry.name)
                        skill_info.append({"name": name, "path": str(entry), "description": description})
                except Exception as e:
                    print(f"Failed to parse {skill_md}: {e}")
    return skill_info

def jaccard_similarity(a: str, b: str) -> float:
    set_a = set(a.lower().split())
    set_b = set(b.lower().split())
    if not set_a or not set_b:
        return 0.0
    return len(set_a & set_b) / len(set_a | set_b)

def rank_skills(task_desc: str, skills, top_n: int = 3):
    scores = []
    for skill in skills:
        score = jaccard_similarity(task_desc, skill["description"])
        scores.append((score, skill))
    scores.sort(key=lambda x: x[0], reverse=True)
    return [skill for _, skill in scores[:top_n] if _ > 0]

def invoke_skill(skill_name: str, task_desc: str):
    # Use Antigravity sub‑agent invocation via CLI command
    # The exact command depends on Antigravity's runtime; we use a placeholder
    os.system(f"agy run {skill_name} \"{task_desc}\"")

def main():
    parser = argparse.ArgumentParser(description="Auto‑select and run relevant Antigravity skills.")
    parser.add_argument("task_description", help="Natural language description of the task to perform.")
    parser.add_argument("--max_results", type=int, default=3, help="Maximum number of skills to invoke.")
    args = parser.parse_args()

    workspace_root = Path(__file__).resolve().parents[2]  # <workspace>/skills/skill-selector/../..
    skills_dir = workspace_root / "skills"
    all_skills = load_skill_descriptions(skills_dir)
    selected = rank_skills(args.task_description, all_skills, args.max_results)
    if not selected:
        print("No suitable skills found for the given task.")
        return
    print(f"Selected {len(selected)} skill(s): {[s['name'] for s in selected]}")
    for skill in selected:
        print(f"Invoking skill: {skill['name']}")
        invoke_skill(skill['name'], args.task_description)

if __name__ == "__main__":
    main()
