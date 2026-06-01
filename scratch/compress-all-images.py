import os
from PIL import Image

# Setup directories to compress
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
target_dirs = [
    os.path.join(base_dir, 'public', 'places'),
    os.path.join(base_dir, 'public', 'cars'),
    os.path.join(base_dir, 'public', 'uploads')
]

max_dimension = 1920
quality = 82

print("Starting image compression for all folders...")

for target_dir in target_dirs:
    if not os.path.exists(target_dir):
        print(f"Skipping non-existent directory: {target_dir}")
        continue
        
    print(f"\nScanning directory: {target_dir}")
    for root, dirs, files in os.walk(target_dir):
        for file in files:
            file_lower = file.lower()
            if file_lower.endswith(('.png', '.jpeg', '.jpg')):
                if file_lower == 'place_your_images_here.txt':
                    continue
                    
                file_path = os.path.join(root, file)
                name_part, ext_part = os.path.splitext(file)
                
                # Check original size
                orig_size = os.path.getsize(file_path)
                
                # Target path (always convert to .jpg to standardise)
                target_path = os.path.join(root, f"{name_part}.jpg")
                
                try:
                    with Image.open(file_path) as img:
                        # Convert transparent images to white background
                        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                            alpha = img.convert('RGBA')
                            bg = Image.new('RGBA', alpha.size, (255, 255, 255, 255))
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
                            print(f"  Resizing {file} from {width}x{height} to {img_rgb.size[0]}x{img_rgb.size[1]}")
                        
                        img_rgb.save(target_path, 'JPEG', quality=quality, optimize=True)
                        new_size_bytes = os.path.getsize(target_path)
                        
                        # If the new file is smaller, keep it. Otherwise, if it's the same extension, keep it anyway
                        # but delete the original if it was a different extension.
                        if os.path.abspath(file_path) != os.path.abspath(target_path):
                            os.remove(file_path)
                            print(f"  Compressed and standardized: {file} ({orig_size / 1024 / 1024:.2f} MB) -> {name_part}.jpg ({new_size_bytes / 1024 / 1024:.2f} MB)")
                        else:
                            print(f"  Compressed: {file} ({orig_size / 1024 / 1024:.2f} MB) -> ({new_size_bytes / 1024 / 1024:.2f} MB)")
                            
                except Exception as e:
                    print(f"Error processing {file}: {e}")

print("\nImage optimization completed successfully!")
