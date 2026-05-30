import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const filePathArray = (await params).path;
  const relativePath = filePathArray.join("/");
  
  // Clean path to prevent directory traversal attacks
  const cleanPath = path.normalize(relativePath).replace(/^(\.\.(\/|\\|$))+/, "");
  
  // Resolve path inside public/uploads
  const absolutePath = path.join(process.cwd(), "public/uploads", cleanPath);
  
  if (!existsSync(absolutePath)) {
    return new NextResponse("Not Found", { status: 404 });
  }
  
  try {
    const fileBuffer = await readFile(absolutePath);
    
    // Determine content type
    let contentType = "application/octet-stream";
    const ext = path.extname(absolutePath).toLowerCase();
    if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".png") contentType = "image/png";
    else if (ext === ".webp") contentType = "image/webp";
    else if (ext === ".avif") contentType = "image/avif";
    else if (ext === ".svg") contentType = "image/svg+xml";
    
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving uploaded file dynamically:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
