import psycopg2

connection = psycopg2.connect(
    host="localhost",
    database="smart_traffic_db",
    user="postgres",
    password="natasha",
    port="5432"
)

print("Database connected successfully!")