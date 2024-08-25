from dotenv import load_dotenv
import os
import psycopg2


load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

def get_db():
    conn = psycopg2.connect(DATABASE_URL)
    print("success")
    try:
        yield conn
    finally:
        conn.close()