from fastapi import FastAPI
from database import connection

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Smart Traffic Backend is running"}

@app.get("/db-test")
def database_test():
    cursor = connection.cursor()
    cursor.execute("SELECT 1")
    result = cursor.fetchone()
    cursor.close()

    return {"database": "connected", "result": result[0]}

@app.post("/events")
def add_event(ambulance_id: str, event_type: str):
    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO traffic_events (ambulance_id, event_type, event_time)
        VALUES (%s, %s, NOW())
        """,
        (ambulance_id, event_type)
    )

    connection.commit()
    cursor.close()

    return {"message": "Event added successfully"}