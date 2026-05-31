import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  deleteFirebaseStorageFile,
  uploadImageToFirebaseStorage,
} from "@/lib/firebase-storage";
import {
  deleteLocalImage,
  uploadImageLocally,
} from "@/lib/local-file-storage";

async function requireAdmin() {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const authError = await requireAdmin();
    if (authError) return authError;

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const bucketRaw = (formData.get("bucket") as string) || "images";
    const folderRaw = (formData.get("folder") as string) || "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (bucketRaw !== "images") {
      return NextResponse.json({ error: "Invalid bucket" }, { status: 400 });
    }

    const folder = folderRaw.trim();
    const validFolder =
      /^[a-zA-Z0-9/_-]{1,80}$/.test(folder) &&
      !folder.startsWith("/") &&
      !folder.endsWith("/") &&
      !folder.includes("..") &&
      !folder.includes("\\");
    if (!validFolder) {
      return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
    }

    const maxSize = 4 * 1024 * 1024; // 4MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Max 4MB." },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, AVIF" },
        { status: 400 }
      );
    }

    const extensionByMime: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/avif": "avif",
    };
    const ext = extensionByMime[file.type] ?? "bin";
    const fileName = `${folder}/${Date.now()}-${crypto.randomUUID()}.${ext}`;

    const useFirebaseUploads =
      !!process.env.FIREBASE_PRIVATE_KEY?.trim() &&
      !!process.env.FIREBASE_CLIENT_EMAIL?.trim() &&
      !!(
        process.env.FIREBASE_STORAGE_BUCKET?.trim() ||
        process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim()
      );

    const publicUrl = useFirebaseUploads
      ? await uploadImageToFirebaseStorage(fileName, file)
      : await uploadImageLocally(fileName, file);
    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error("Upload handler error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authError = await requireAdmin();
    if (authError) return authError;

    const { url } = (await request.json()) as { url?: string };

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Invalid file URL" }, { status: 400 });
    }

    if (url.startsWith("/")) {
      await deleteLocalImage(url);
    } else {
      await deleteFirebaseStorageFile(url);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete handler error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
