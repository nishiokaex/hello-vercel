from fastapi import FastAPI
import threading

app = FastAPI()

counter = 0
counter_lock = threading.Lock()

@app.get("/api/counter")
def get_counter():
    return {"counter": counter}

@app.post("/api/counter/increment")
def increment_counter():
    global counter
    with counter_lock:
        counter += 1
        return {"counter": counter}

@app.post("/api/counter/decrement")
def decrement_counter():
    global counter
    with counter_lock:
        counter -= 1
        return {"counter": counter}