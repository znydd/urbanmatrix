from fastapi import APIRouter, HTTPException, Depends
from app.db.databse import get_db
from app.utils.security import get_current_user
from app.schema.issue import CreateIssue

router = APIRouter()


@router.post('/postissue')
async def post_issue(issue_form: CreateIssue, db = Depends(get_db),current_user: dict = Depends(get_current_user)):
    user_id = current_user['id']
    cursor = db.cursor()
    cursor.execute("INSERT INTO issues (user_id, issue_type, issue_title, issue_desc) VALUES (%s, %s, %s, %s) RETURNING issue_id",
                   (int(user_id), issue_form.issue_type,issue_form.issue_title, issue_form.issue_desc))
    created_issue = cursor.fetchone()
    db.commit()
    cursor.close()
    
    return created_issue

@router.get('/getallissue')
async def get_all_issue(db = Depends(get_db),current_user: dict = Depends(get_current_user)):
    cursor = db.cursor()
    cursor.execute("SELECT issue_id, issue_type, issue_title, issue_desc, issue_status FROM issues")
    all_issues = cursor.fetchall()
    cursor.close()
    print(all_issues)
    all_issues_return_form = [
        {
            "id": item[0],
            "type": item[1],
            "title": item[2],
            "description": item[3],
            "status": "In Progress" if item[4] else "Un-verified"
        }
        for item in all_issues
    ]
    return all_issues_return_form



@router.get('/getfilteredissue/{issue_type}')
async def get_all_issue(issue_type: str, db = Depends(get_db),current_user: dict = Depends(get_current_user)):
    user_id = current_user['id']
    cursor = db.cursor()
    if issue_type == "My Isssue posts":
        cursor.execute("SELECT issue_id, issue_type, issue_title, issue_desc, issue_status FROM issues WHERE user_id = %s", (int(user_id),))
        all_issues = cursor.fetchall()
        cursor.close()
    else:        
        cursor.execute("SELECT issue_id, issue_type, issue_title, issue_desc, issue_status FROM issues WHERE issue_type = %s", (issue_type,))
        all_issues = cursor.fetchall()
        cursor.close()
        
    print(all_issues)
    all_issues_return_form = [
        {
            "id": item[0],
            "type": item[1],
            "title": item[2],
            "description": item[3],
            "status": "In Progress" if item[4] else "Un-verified"
        }
        for item in all_issues
    ]
    return all_issues_return_form