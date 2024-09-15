from fastapi import APIRouter, HTTPException, Depends
from app.db.databse import get_db
from app.utils.security import get_current_user

router = APIRouter()


@router.get("/startpoint")
async def get_all_starting_points(db = Depends(get_db),current_user: dict = Depends(get_current_user)):
    
    cursor = db.cursor()
    query = """
    SELECT stop1 AS stop FROM routes
    UNION
    SELECT stop2 AS stop FROM routes
    UNION
    SELECT stop3 AS stop FROM routes
    UNION
    SELECT stop4 AS stop FROM routes
    UNION
    SELECT stop5 AS stop FROM routes;
    """
    cursor.execute(query)
    all_loc = cursor.fetchall()
    all_loc_arr = [loc[0] for loc in all_loc]    
    
    return all_loc_arr


@router.post("/possibledestination/{start}")
async def start_points_routes(start: str, db = Depends(get_db), current_user: dict = Depends(get_current_user)):
    if not start:
        return {"msg":"start not selected"}
    
    cursor = db.cursor()
    query = f"""
    SELECT * 
    FROM routes
    WHERE stop1 = %s  
       OR stop2 = %s  
       OR stop3 = %s  
       OR stop4 = %s  
       OR stop5 = %s ;
    """
    cursor.execute(query, (start, start, start, start, start))
    possible_dest = cursor.fetchall()
    cursor.close()
    
    possible_dest_out = [
    {
        'route': row[0],                  # route_id
        'type': row[6],                   # route_type (bus/metro)
        'dest': [stop for stop in row[1:6] if stop != start]  # stops excluding 'Dhanmondi'
    }
    for row in possible_dest]
    print(possible_dest)
    
    return possible_dest_out



@router.get("/alltransport/{route_id}")
async def get_all_transport(route_id: str, db = Depends(get_db)):
    route_id = int(route_id)

    cursor = db.cursor()
    query = """
    SELECT 'bus' AS type, bus_company AS name 
    FROM bus
    WHERE route_id = %s

    UNION

    SELECT 'metro' AS type, metro_name AS name 
    FROM metro
    WHERE route_id = %s;
    """
    cursor.execute(query, (route_id, route_id))
    all_transport = cursor.fetchall()
    cursor.close()
    
    all_transport_out = [f"Bus - {transport[1]}" if transport[0] == "bus" else f"Metro - {transport[1]}" for transport in all_transport]
    
    print(all_transport)
    
    
    return all_transport_out