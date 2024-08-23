├── frontend
├── backend/
    ├── app/
    │   ├── api/  
    │   ├── core/
    │   ├── db/
    │   ├── models/
    │   ├── schemas/
    │   ├── services/
    │   └── main.py
    ├── tests/
    ├── alembic/
    ├── .env
    ├── .gitignore
    ├── requirements.txt
    └── README.md


inside app/api

├── app/
│   ├── api/
│   │   ├── __init__.py
│   │   ├── api_v1/
│   │   │   ├── __init__.py
│   │   │   ├── endpoints/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── users.py
│   │   │   │   ├── items.py
│   │   │   │   └── auth.py
│   │   │   └── router.py
│   │   └── api_v2/
│   │       ├── __init__.py
│   │       ├── endpoints/
│   │       │   ├── __init__.py
│   │       │   └── ...
│   │       └── router.py
│   └── main.py

