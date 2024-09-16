from pydantic import BaseModel

class CreateIssue(BaseModel):
    issue_type: str
    issue_title: str
    issue_desc: str