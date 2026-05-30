"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createLocation,
  createRegion,
  deleteLocation,
  deleteRegion,
  updateLocation,
  updateRegion,
} from "@/lib/actions/places";
import type { RegionWithLocations } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageUploadField } from "@/components/admin/image-upload-field";

type RegionFormState = {
  id?: string;
  slug: string;
  nameEn: string;
  nameKa: string;
  descriptionEn: string;
  descriptionKa: string;
  image: string | null;
  sortOrder: number;
};

type LocationFormState = {
  id?: string;
  regionId: string;
  nameEn: string;
  nameKa: string;
  descriptionEn: string;
  descriptionKa: string;
  whatMakesItSpecialEn: string;
  whatMakesItSpecialKa: string;
  typesText: string;
  images: string[];
  googleMapsUrl: string;
  latitude: string;
  longitude: string;
  sortOrder: number;
};

const emptyRegion: RegionFormState = {
  slug: "",
  nameEn: "",
  nameKa: "",
  descriptionEn: "",
  descriptionKa: "",
  image: null,
  sortOrder: 0,
};

const emptyLocation = (regionId = ""): LocationFormState => ({
  regionId,
  nameEn: "",
  nameKa: "",
  descriptionEn: "",
  descriptionKa: "",
  whatMakesItSpecialEn: "",
  whatMakesItSpecialKa: "",
  typesText: "",
  images: [],
  googleMapsUrl: "",
  latitude: "",
  longitude: "",
  sortOrder: 0,
});

function parseList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function PlacesManager({ regions }: { regions: RegionWithLocations[] }) {
  const router = useRouter();
  const [regionDialogOpen, setRegionDialogOpen] = useState(false);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [regionForm, setRegionForm] = useState<RegionFormState>(emptyRegion);
  const [locationForm, setLocationForm] = useState<LocationFormState>(
    emptyLocation(regions[0]?.id ?? "")
  );
  const [saving, setSaving] = useState(false);

  const regionOptions = useMemo(
    () => regions.map((region) => ({ id: region.id, name: region.nameEn })),
    [regions]
  );

  const openRegionDialog = (region?: RegionWithLocations) => {
    setRegionForm(
      region
        ? {
            id: region.id,
            slug: region.slug,
            nameEn: region.nameEn,
            nameKa: region.nameKa,
            descriptionEn: region.descriptionEn,
            descriptionKa: region.descriptionKa,
            image: region.image,
            sortOrder: region.sortOrder,
          }
        : emptyRegion
    );
    setRegionDialogOpen(true);
  };

  const openLocationDialog = (
    regionId?: string,
    location?: RegionWithLocations["locations"][number]
  ) => {
    setLocationForm(
      location
        ? {
            id: location.id,
            regionId: location.regionId,
            nameEn: location.nameEn,
            nameKa: location.nameKa,
            descriptionEn: location.descriptionEn,
            descriptionKa: location.descriptionKa,
            whatMakesItSpecialEn: location.whatMakesItSpecialEn,
            whatMakesItSpecialKa: location.whatMakesItSpecialKa,
            typesText: location.types.join(", "),
            images: location.images,
            googleMapsUrl: location.googleMapsUrl ?? "",
            latitude:
              location.latitude === null ? "" : String(location.latitude),
            longitude:
              location.longitude === null ? "" : String(location.longitude),
            sortOrder: location.sortOrder,
          }
        : emptyLocation(regionId ?? regions[0]?.id ?? "")
    );
    setLocationDialogOpen(true);
  };

  const handleSaveRegion = async () => {
    setSaving(true);
    try {
      const payload = {
        slug: regionForm.slug,
        nameEn: regionForm.nameEn,
        nameKa: regionForm.nameKa,
        descriptionEn: regionForm.descriptionEn,
        descriptionKa: regionForm.descriptionKa,
        image: regionForm.image,
        sortOrder: Number(regionForm.sortOrder) || 0,
      };

      if (regionForm.id) {
        await updateRegion(regionForm.id, payload);
        toast.success("Region updated");
      } else {
        await createRegion(payload);
        toast.success("Region created");
      }

      setRegionDialogOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to save region");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLocation = async () => {
    setSaving(true);
    try {
      const payload = {
        regionId: locationForm.regionId,
        nameEn: locationForm.nameEn,
        nameKa: locationForm.nameKa,
        descriptionEn: locationForm.descriptionEn,
        descriptionKa: locationForm.descriptionKa,
        whatMakesItSpecialEn: locationForm.whatMakesItSpecialEn,
        whatMakesItSpecialKa: locationForm.whatMakesItSpecialKa,
        types: parseList(locationForm.typesText),
        images: locationForm.images,
        googleMapsUrl: locationForm.googleMapsUrl || null,
        latitude: locationForm.latitude ? Number(locationForm.latitude) : null,
        longitude: locationForm.longitude
          ? Number(locationForm.longitude)
          : null,
        sortOrder: Number(locationForm.sortOrder) || 0,
      };

      if (locationForm.id) {
        await updateLocation(locationForm.id, payload);
        toast.success("Location updated");
      } else {
        await createLocation(payload);
        toast.success("Location created");
      }

      setLocationDialogOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to save location");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRegion = async (id: string) => {
    if (!confirm("Delete this region and its locations?")) return;
    try {
      await deleteRegion(id);
      toast.success("Region deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete region");
    }
  };

  const handleDeleteLocation = async (id: string) => {
    if (!confirm("Delete this location?")) return;
    try {
      await deleteLocation(id);
      toast.success("Location deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete location");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Places</h1>
          <p className="text-muted-foreground">
            {regions.length} regions,{" "}
            {regions.reduce((sum, region) => sum + region.locations.length, 0)}{" "}
            locations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => openLocationDialog()}>
            Add Location
          </Button>
          <Button onClick={() => openRegionDialog()}>
            Add Region
          </Button>
        </div>
      </div>

      {regions.map((region) => (
        <Card key={region.id}>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>{region.nameEn}</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                {region.descriptionEn}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => openLocationDialog(region.id)}
              >
                Add Location
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => openRegionDialog(region)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => void handleDeleteRegion(region.id)}
              >
                Delete
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {region.locations.map((location) => (
                <div key={location.id} className="rounded-md border p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium">{location.nameEn}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {location.descriptionEn}
                      </p>
                    </div>
                    <Badge variant="secondary">{location.sortOrder}</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {location.types.map((type) => (
                      <Badge key={type} variant="secondary" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openLocationDialog(region.id, location)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => void handleDeleteLocation(location.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Dialog open={regionDialogOpen} onOpenChange={setRegionDialogOpen}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {regionForm.id ? "Edit Region" : "Add Region"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Slug</Label>
                <Input
                  value={regionForm.slug}
                  onChange={(event) =>
                    setRegionForm((current) => ({
                      ...current,
                      slug: event.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={regionForm.sortOrder}
                  onChange={(event) =>
                    setRegionForm((current) => ({
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
                  value={regionForm.nameEn}
                  onChange={(event) =>
                    setRegionForm((current) => ({
                      ...current,
                      nameEn: event.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Name (KA)</Label>
                <Input
                  value={regionForm.nameKa}
                  onChange={(event) =>
                    setRegionForm((current) => ({
                      ...current,
                      nameKa: event.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <Label>Description (EN)</Label>
              <Textarea
                value={regionForm.descriptionEn}
                onChange={(event) =>
                  setRegionForm((current) => ({
                    ...current,
                    descriptionEn: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Description (KA)</Label>
              <Textarea
                value={regionForm.descriptionKa}
                onChange={(event) =>
                  setRegionForm((current) => ({
                    ...current,
                    descriptionKa: event.target.value,
                  }))
                }
              />
            </div>
            <ImageUploadField
              label="Region Image"
              folder="places/regions"
              values={regionForm.image ? [regionForm.image] : []}
              multiple={false}
              onChange={(values) =>
                setRegionForm((current) => ({
                  ...current,
                  image: values[0] ?? null,
                }))
              }
            />
            <Button
              className="w-full"
              disabled={saving}
              onClick={() => void handleSaveRegion()}
            >
              Save Region
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={locationDialogOpen} onOpenChange={setLocationDialogOpen}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {locationForm.id ? "Edit Location" : "Add Location"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Region</Label>
              <select
                className="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm"
                value={locationForm.regionId}
                onChange={(event) =>
                  setLocationForm((current) => ({
                    ...current,
                    regionId: event.target.value,
                  }))
                }
              >
                <option value="">Select region</option>
                {regionOptions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Name (EN)</Label>
                <Input
                  value={locationForm.nameEn}
                  onChange={(event) =>
                    setLocationForm((current) => ({
                      ...current,
                      nameEn: event.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Name (KA)</Label>
                <Input
                  value={locationForm.nameKa}
                  onChange={(event) =>
                    setLocationForm((current) => ({
                      ...current,
                      nameKa: event.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <Label>Description (EN)</Label>
              <Textarea
                value={locationForm.descriptionEn}
                onChange={(event) =>
                  setLocationForm((current) => ({
                    ...current,
                    descriptionEn: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Description (KA)</Label>
              <Textarea
                value={locationForm.descriptionKa}
                onChange={(event) =>
                  setLocationForm((current) => ({
                    ...current,
                    descriptionKa: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>What Makes It Special (EN)</Label>
              <Textarea
                value={locationForm.whatMakesItSpecialEn}
                onChange={(event) =>
                  setLocationForm((current) => ({
                    ...current,
                    whatMakesItSpecialEn: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>What Makes It Special (KA)</Label>
              <Textarea
                value={locationForm.whatMakesItSpecialKa}
                onChange={(event) =>
                  setLocationForm((current) => ({
                    ...current,
                    whatMakesItSpecialKa: event.target.value,
                  }))
                }
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Types (comma separated)</Label>
                <Input
                  value={locationForm.typesText}
                  onChange={(event) =>
                    setLocationForm((current) => ({
                      ...current,
                      typesText: event.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Google Maps URL</Label>
                <Input
                  value={locationForm.googleMapsUrl}
                  onChange={(event) =>
                    setLocationForm((current) => ({
                      ...current,
                      googleMapsUrl: event.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label>Latitude</Label>
                <Input
                  type="number"
                  step="any"
                  value={locationForm.latitude}
                  onChange={(event) =>
                    setLocationForm((current) => ({
                      ...current,
                      latitude: event.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Longitude</Label>
                <Input
                  type="number"
                  step="any"
                  value={locationForm.longitude}
                  onChange={(event) =>
                    setLocationForm((current) => ({
                      ...current,
                      longitude: event.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={locationForm.sortOrder}
                  onChange={(event) =>
                    setLocationForm((current) => ({
                      ...current,
                      sortOrder: Number(event.target.value),
                    }))
                  }
                />
              </div>
            </div>
            <ImageUploadField
              label="Location Images"
              folder="places/locations"
              values={locationForm.images}
              onChange={(images) =>
                setLocationForm((current) => ({ ...current, images }))
              }
            />
            <Button
              className="w-full"
              disabled={saving}
              onClick={() => void handleSaveLocation()}
            >
              Save Location
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
