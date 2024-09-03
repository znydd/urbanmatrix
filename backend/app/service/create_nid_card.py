import os
from pathlib import Path
from fastapi import HTTPException
from PIL import Image, ImageDraw, ImageFont
from app.schema.admin import Nid


UPLOAD_FOLDER = "docsbucket/nid"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

CURRENT_DIR = Path(__file__).parent.absolute()
BACKGROUND_IMAGE_PATH = CURRENT_DIR/"templates/Nid_tmpl.png"

async def create_nid_card(user_info: Nid): 
    try:
        img = Image.open(BACKGROUND_IMAGE_PATH)
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Background image not found")
    
    # Create a blank image
    img = img.resize((1050, 600))
    d = ImageDraw.Draw(img)
    
    # Use a font (you'll need to specify the path to a .ttf font file)
    font = ImageFont.truetype("fonts/Poppins-Medium.otf", size=24)
    
    nid_no = str(user_info.nid_no)
    
    # Add text to the image
    d.text((410, 115), f"{nid_no[0:3]}-{nid_no[3:]}", fill=(255, 66, 71), font=font)
    d.text((218, 195), f"{user_info.name}", fill=(0, 0, 0), font=font)
    d.text((330, 250), f"{user_info.father}", fill=(0, 0, 0), font=font)
    d.text((345, 308), f"{user_info.mother}", fill=(0, 0, 0), font=font)
    d.text((315, 365), f"{user_info.dob} (YYYY-MM-DD)", fill=(0, 0, 0), font=font)
    d.text((218, 420), f"{user_info.email}", fill=(0, 0, 0), font=font)
    d.text((245, 525), f"{user_info.address}", fill=(0, 0, 0), font=font)
    
    # Save the image
    filename = f"{user_info.nid_no}_nid.png"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    img.save(filepath)
    
    return filepath


