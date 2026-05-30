"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Testimonial } from "@/types";
import {
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
} from "@/lib/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type TestimonialFormState = {
  id?: string;
  name: string;
  route: string;
  textEn: string;
  textKa: string;
  rating: number;
  visible: boolean;
  sortOrder: number;
};

const emptyForm: TestimonialFormState = {
  name: "",
  route: "",
  textEn: "",
  textKa: "",
  rating: 5,
  visible: true,
  sortOrder: 0,
};

export function TestimonialsManager({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<TestimonialFormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  const openDialog = (testimonial?: Testimonial) => {
    setForm(
      testimonial
        ? {
            id: testimonial.id,
            name: testimonial.name,
            route: testimonial.route ?? "",
            textEn: testimonial.textEn,
            textKa: testimonial.textKa,
            rating: testimonial.rating,
            visible: testimonial.visible,
            sortOrder: testimonial.sortOrder,
          }
        : emptyForm
    );
    setDialogOpen(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        route: form.route || undefined,
        textEn: form.textEn,
        textKa: form.textKa,
        rating: Number(form.rating) || 5,
        visible: form.visible,
        sortOrder: Number(form.sortOrder) || 0,
      };
      if (form.id) {
        await updateTestimonial(form.id, payload);
        toast.success("Testimonial updated");
      } else {
        await createTestimonial(payload);
        toast.success("Testimonial created");
      }
      setDialogOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground">
            {testimonials.length} customer reviews
          </p>
        </div>
        <Button className="bg-navy hover:bg-navy-dark" onClick={() => openDialog()}>
          Add Testimonial
        </Button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  {testimonial.route ? (
                    <p className="text-xs text-muted-foreground">{testimonial.route}</p>
                  ) : null}
                </div>
                <Badge
                  className={
                    testimonial.visible
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }
                >
                  {testimonial.visible ? "Visible" : "Hidden"}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {testimonial.textEn}
              </p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => openDialog(testimonial)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={async () => {
                    if (!confirm("Delete this testimonial?")) return;
                    await deleteTestimonial(testimonial.id);
                    router.refresh();
                  }}
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
            <DialogTitle>
              {form.id ? "Edit Testimonial" : "Add Testimonial"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Route</Label>
                <Input
                  value={form.route}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, route: event.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <Label>Text (EN)</Label>
              <Textarea
                value={form.textEn}
                onChange={(event) =>
                  setForm((current) => ({ ...current, textEn: event.target.value }))
                }
              />
            </div>
            <div>
              <Label>Text (KA)</Label>
              <Textarea
                value={form.textKa}
                onChange={(event) =>
                  setForm((current) => ({ ...current, textKa: event.target.value }))
                }
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label>Rating</Label>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  value={form.rating}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      rating: Number(event.target.value),
                    }))
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
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.visible}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        visible: event.target.checked,
                      }))
                    }
                  />
                  Visible
                </label>
              </div>
            </div>
            <Button className="bg-navy hover:bg-navy-dark" disabled={saving} onClick={() => void save()}>
              Save Testimonial
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
