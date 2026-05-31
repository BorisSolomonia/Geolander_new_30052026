import os
from PIL import Image

public_cars_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'cars')
print(f"Scanning directory: {public_cars_dir}")

max_dimension = 1920
quality = 82

for root, dirs, files in os.walk(public_cars_dir):
    for file in files:
        file_lower = file.lower()
        if file_lower.endswith(('.png', '.jpeg', '.jpg')):
            # Skip placeholder instruction files
            if file_lower == 'place_your_images_here.txt':
                continue
                
            file_path = os.path.join(root, file)
            name_part, ext_part = os.path.splitext(file)
            
            # Target output path is always <name>.jpg
            target_path = os.path.join(root, f"{name_part}.jpg")
            
            print(f"Processing: {file_path} -> {target_path}")
            
            try:
                with Image.open(file_path) as img:
                    # Convert transparent images to white background
                    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                        alpha = img.convert('RGBA')
                        bg = Image.new('RGBA', alpha.size, (255, 255, 255, 255))
                        # Paste alpha over white background
                        bg.paste(alpha, (0, 0), alpha)
                        img_rgb = bg.convert('RGB')
                    else:
                        img_rgb = img.convert('RGB')
                    
                    # Resize if too large
                    width, height = img_rgb.size
                    if width > max_dimension or height > max_dimension:
                        ratio = min(max_dimension / width, max_dimension / height)
                        new_size = (int(width * ratio), int(height * ratio))
                        img_rgb = img_rgb.resize(new_size, Image.Resampling.LANCZOS)
                        print(f"  Resized from {width}x{height} to {img_rgb.size[0]}x{img_rgb.size[1]}")
                        
                    img_rgb.save(target_path, 'JPEG', quality=quality)
                    print(f"  Saved size: {os.path.getsize(target_path)} bytes")
                    
                # If target_path is different from original file_path, delete original
                if os.path.abspath(file_path) != os.path.abspath(target_path):
                    os.remove(file_path)
                    print(f"  Removed original: {file_path}")
                    
            except Exception as e:
                print(f"Error processing {file_path}: {e}")

print("Image optimization completed successfully!")
