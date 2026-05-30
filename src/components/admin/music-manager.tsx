"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { MusicGenre } from "@/types";
import {
  createMusicGenre,
  deleteMusicGenre,
  updateMusicGenre,
} from "@/lib/actions/music";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ImageUploadField } from "@/components/admin/image-upload-field";

type MusicFormState = {
  id?: string;
  slug: string;
  nameEn: string;
  nameKa: string;
  descriptionEn: string;
  descriptionKa: string;
  youtubeLinksText: string;
  images: string[];
  sortOrder: number;
};

const emptyMusicForm: MusicFormState = {
  slug: "",
  nameEn: "",
  nameKa: "",
  descriptionEn: "",
  descriptionKa: "",
  youtubeLinksText: "",
  images: [],
  sortOrder: 0,
};

function parseLines(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function MusicManager({ genres }: { genres: MusicGenre[] }) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<MusicFormState>(emptyMusicForm);
  const [saving, setSaving] = useState(false);

  const openDialog = (genre?: MusicGenre) => {
    setForm(
      genre
        ? {
            id: genre.id,
            slug: genre.slug,
            nameEn: genre.nameEn,
            nameKa: genre.nameKa,
            descriptionEn: genre.descriptionEn,
            descriptionKa: genre.descriptionKa,
            youtubeLinksText: genre.youtubeLinks.join("\n"),
            images: genre.images,
            sortOrder: genre.sortOrder,
          }
        : emptyMusicForm
    );
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        slug: form.slug,
        nameEn: form.nameEn,
        nameKa: form.nameKa,
        descriptionEn: form.descriptionEn,
        descriptionKa: form.descriptionKa,
        youtubeLinks: parseLines(form.youtubeLinksText),
        images: form.images,
        sortOrder: Number(form.sortOrder) || 0,
      };

      if (form.id) {
        await updateMusicGenre(form.id, payload);
        toast.success("Music genre updated");
      } else {
        await createMusicGenre(payload);
        toast.success("Music genre created");
      }

      setDialogOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to save music genre");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this music genre?")) return;
    try {
      await deleteMusicGenre(id);
      toast.success("Music genre deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete music genre");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Music</h1>
          <p className="text-muted-foreground">{genres.length} music genres</p>
        </div>
        <Button onClick={() => openDialog()}>
          Add Genre
        </Button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {genres.map((genre) => (
          <Card key={genre.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{genre.nameEn}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {genre.descriptionEn}
                  </p>
                </div>
                <Badge variant="secondary">{genre.sortOrder}</Badge>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => openDialog(genre)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => void handleDelete(genre.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Genre" : "Add Genre"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Slug</Label>
                <Input
                  value={form.slug}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, slug: event.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={form.sortOrder}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      sortOrder: Number(event.target.value),
                    }))
                  }
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Name (EN)</Label>
                <Input
                  value={form.nameEn}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, nameEn: event.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Name (KA)</Label>
                <Input
                  value={form.nameKa}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, nameKa: event.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <Label>Description (EN)</Label>
              <Textarea
                value={form.descriptionEn}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    descriptionEn: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Description (KA)</Label>
              <Textarea
                value={form.descriptionKa}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    descriptionKa: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>YouTube Links</Label>
              <Textarea
                value={form.youtubeLinksText}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    youtubeLinksText: event.target.value,
                  }))
                }
                placeholder="One link per line"
              />
            </div>
            <ImageUploadField
              label="Genre Images"
              folder="music"
              values={form.images}
              onChange={(images) => setForm((current) => ({ ...current, images }))}
            />
            <Button
              className="w-full"
              disabled={saving}
              onClick={() => void handleSave()}
            >
              Save Genre
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
