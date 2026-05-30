"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

type ImageUploadFieldProps = {
  label: string;
  folder: string;
  values: string[];
  onChange: (values: string[]) => void;
  multiple?: boolean;
  maxImages?: number;
};

export function ImageUploadField({
  label,
  folder,
  values,
  onChange,
  multiple = true,
  maxImages,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [removingUrl, setRemovingUrl] = useState<string | null>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    if (maxImages !== undefined && values.length + files.length > maxImages) {
      toast.error(`You can only upload up to ${maxImages} images (currently ${values.length} uploaded).`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setUploading(true);

    try {
      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        const body = new FormData();
        body.append("file", file);
        body.append("bucket", "images");
        body.append("folder", folder);

        const response = await fetch("/api/upload", {
          method: "POST",
          body,
        });

        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as
            | { error?: string }
            | null;
          throw new Error(payload?.error || "Upload failed");
        }

        const payload = (await response.json()) as { url: string };
        uploadedUrls.push(payload.url);
      }

      onChange(multiple ? [...values, ...uploadedUrls] : uploadedUrls.slice(0, 1));
      toast.success("Image uploaded");
      if (inputRef.current) inputRef.current.value = "";
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (url: string) => {
    setRemovingUrl(url);
    try {
      await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
    } catch {
      // Best-effort local cleanup; persisted field removal is the source of truth.
    } finally {
      onChange(values.filter((value) => value !== url));
      setRemovingUrl(null);
    }
  };

  const isLimitReached = maxImages !== undefined && values.length >= maxImages;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label>{label}</Label>
        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple={multiple}
            className="hidden"
            onChange={(event) => void handleUpload(event.target.files)}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading || isLimitReached}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            Upload
          </Button>
        </div>
      </div>

      {values.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((url) => (
            <Card key={url}>
              <CardContent className="p-3">
                <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
                  <Image src={url} alt="" fill className="object-cover" />
                </div>
                <div className="mt-2 flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={removingUrl === url}
                    onClick={() => void handleRemove(url)}
                  >
                    {removingUrl === url ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          No images uploaded
        </div>
      )}
    </div>
  );
}
