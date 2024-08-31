import os
from pathlib import Path
from fastapi import HTTPException
from PIL import Image, ImageDraw, ImageFont
from app.schema.admin import BirthCert


UPLOAD_FOLDER = "docsbucket/birth_certificate"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

CURRENT_DIR = Path(__file__).parent.absolute()
BACKGROUND_IMAGE_PATH = CURRENT_DIR/"templates/Birth_cert_tmpl.jpg"

async def create_birth_certificate(user_info: BirthCert):    
    try:
        img = Image.open(BACKGROUND_IMAGE_PATH)
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Background image not found")
    
    # Create a blank image
    img = img.resize((800, 600))
    d = ImageDraw.Draw(img)
    
    # Use a font (you'll need to specify the path to a .ttf font file)
    font = ImageFont.truetype("fonts/Poppins-Medium.otf", size=16)
    
    birth_cert_no = str(user_info.birth_cert_no)
    
    # Add text to the image
    d.text((365, 138), f"{birth_cert_no[0:3]}-{birth_cert_no[3:]}", fill=(0, 0, 0), font=font)
    d.text((197, 192), f"{user_info.name}", fill=(0, 0, 0), font=font)
    d.text((275, 228), f"{user_info.father}", fill=(0, 0, 0), font=font)
    d.text((283, 264), f"{user_info.mother}", fill=(0, 0, 0), font=font)
    d.text((218, 301), f"{user_info.address}", fill=(0, 0, 0), font=font)
    
    # Save the image
    filename = f"{user_info.birth_cert_no}_birth_certificate.png"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    img.save(filepath)
    
    return filepath


