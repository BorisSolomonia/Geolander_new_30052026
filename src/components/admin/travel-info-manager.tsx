"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { FuelStation, Market } from "@/types";
import {
  createFuelStation,
  createMarket,
  deleteFuelStation,
  deleteMarket,
  updateFuelStation,
  updateMarket,
} from "@/lib/actions/travel-info";
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
import { ImageUploadField } from "@/components/admin/image-upload-field";

type StationFormState = {
  id?: string;
  name: string;
  descriptionEn: string;
  descriptionKa: string;
  website: string;
  logo: string;
  sortOrder: number;
};

type MarketFormState = {
  id?: string;
  name: string;
  priceLevel: "budget" | "mid-range" | "premium";
  descriptionEn: string;
  descriptionKa: string;
  logo: string;
  sortOrder: number;
};

const emptyStation: StationFormState = {
  name: "",
  descriptionEn: "",
  descriptionKa: "",
  website: "",
  logo: "",
  sortOrder: 0,
};

const emptyMarket: MarketFormState = {
  name: "",
  priceLevel: "mid-range",
  descriptionEn: "",
  descriptionKa: "",
  logo: "",
  sortOrder: 0,
};

export function TravelInfoManager({
  stations,
  markets,
}: {
  stations: FuelStation[];
  markets: Market[];
}) {
  const router = useRouter();
  const [stationDialogOpen, setStationDialogOpen] = useState(false);
  const [marketDialogOpen, setMarketDialogOpen] = useState(false);
  const [stationForm, setStationForm] = useState<StationFormState>(emptyStation);
  const [marketForm, setMarketForm] = useState<MarketFormState>(emptyMarket);
  const [saving, setSaving] = useState(false);

  const openStationDialog = (station?: FuelStation) => {
    setStationForm(
      station
        ? {
            id: station.id,
            name: station.name,
            descriptionEn: station.descriptionEn,
            descriptionKa: station.descriptionKa,
            website: station.website ?? "",
            logo: station.logo ?? "",
            sortOrder: station.sortOrder,
          }
        : emptyStation
    );
    setStationDialogOpen(true);
  };

  const openMarketDialog = (market?: Market) => {
    setMarketForm(
      market
        ? {
            id: market.id,
            name: market.name,
            priceLevel: market.priceLevel,
            descriptionEn: market.descriptionEn,
            descriptionKa: market.descriptionKa,
            logo: market.logo ?? "",
            sortOrder: market.sortOrder,
          }
        : emptyMarket
    );
    setMarketDialogOpen(true);
  };

  const saveStation = async () => {
    setSaving(true);
    try {
      const payload = {
        name: stationForm.name,
        descriptionEn: stationForm.descriptionEn,
        descriptionKa: stationForm.descriptionKa,
        website: stationForm.website || undefined,
        logo: stationForm.logo || undefined,
        sortOrder: Number(stationForm.sortOrder) || 0,
      };
      if (stationForm.id) {
        await updateFuelStation(stationForm.id, payload);
        toast.success("Fuel station updated");
      } else {
        await createFuelStation(payload);
        toast.success("Fuel station created");
      }
      setStationDialogOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to save fuel station");
    } finally {
      setSaving(false);
    }
  };

  const saveMarket = async () => {
    setSaving(true);
    try {
      const payload = {
        name: marketForm.name,
        priceLevel: marketForm.priceLevel,
        descriptionEn: marketForm.descriptionEn,
        descriptionKa: marketForm.descriptionKa,
        logo: marketForm.logo || undefined,
        sortOrder: Number(marketForm.sortOrder) || 0,
      };
      if (marketForm.id) {
        await updateMarket(marketForm.id, payload);
        toast.success("Market updated");
      } else {
        await createMarket(payload);
        toast.success("Market created");
      }
      setMarketDialogOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to save market");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Travel Info</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => openStationDialog()}>
            Add Fuel Station
          </Button>
          <Button className="bg-navy hover:bg-navy-dark" onClick={() => openMarketDialog()}>
            Add Market
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Fuel Stations ({stations.length})</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stations.map((station) => (
            <Card key={station.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium">{station.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {station.descriptionEn}
                    </p>
                  </div>
                  <Badge variant="secondary">{station.sortOrder}</Badge>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openStationDialog(station)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={async () => {
                      if (!confirm("Delete this fuel station?")) return;
                      await deleteFuelStation(station.id);
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
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold">Markets ({markets.length})</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((market) => (
            <Card key={market.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium">{market.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {market.descriptionEn}
                    </p>
                  </div>
                  <Badge variant="secondary">{market.priceLevel}</Badge>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openMarketDialog(market)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={async () => {
                      if (!confirm("Delete this market?")) return;
                      await deleteMarket(market.id);
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
      </div>

      <Dialog open={stationDialogOpen} onOpenChange={setStationDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {stationForm.id ? "Edit Fuel Station" : "Add Fuel Station"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Name</Label>
                <Input
                  value={stationForm.name}
                  onChange={(event) =>
                    setStationForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Website</Label>
                <Input
                  value={stationForm.website}
                  onChange={(event) =>
                    setStationForm((current) => ({
                      ...current,
                      website: event.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <Label>Description (EN)</Label>
              <Textarea
                value={stationForm.descriptionEn}
                onChange={(event) =>
                  setStationForm((current) => ({
                    ...current,
                    descriptionEn: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Description (KA)</Label>
              <Textarea
                value={stationForm.descriptionKa}
                onChange={(event) =>
                  setStationForm((current) => ({
                    ...current,
                    descriptionKa: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Sort Order</Label>
              <Input
                type="number"
                value={stationForm.sortOrder}
                onChange={(event) =>
                  setStationForm((current) => ({
                    ...current,
                    sortOrder: Number(event.target.value),
                  }))
                }
              />
            </div>
            <ImageUploadField
              label="Logo"
              folder="travel/stations"
              values={stationForm.logo ? [stationForm.logo] : []}
              multiple={false}
              onChange={(values) =>
                setStationForm((current) => ({
                  ...current,
                  logo: values[0] ?? "",
                }))
              }
            />
            <Button className="bg-navy hover:bg-navy-dark" disabled={saving} onClick={() => void saveStation()}>
              Save Fuel Station
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={marketDialogOpen} onOpenChange={setMarketDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{marketForm.id ? "Edit Market" : "Add Market"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Name</Label>
                <Input
                  value={marketForm.name}
                  onChange={(event) =>
                    setMarketForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Price Level</Label>
                <select
                  className="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm"
                  value={marketForm.priceLevel}
                  onChange={(event) =>
                    setMarketForm((current) => ({
                      ...current,
                      priceLevel: event.target.value as MarketFormState["priceLevel"],
                    }))
                  }
                >
                  <option value="budget">budget</option>
                  <option value="mid-range">mid-range</option>
                  <option value="premium">premium</option>
                </select>
              </div>
            </div>
            <div>
              <Label>Description (EN)</Label>
              <Textarea
                value={marketForm.descriptionEn}
                onChange={(event) =>
                  setMarketForm((current) => ({
                    ...current,
                    descriptionEn: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Description (KA)</Label>
              <Textarea
                value={marketForm.descriptionKa}
                onChange={(event) =>
                  setMarketForm((current) => ({
                    ...current,
                    descriptionKa: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Sort Order</Label>
              <Input
                type="number"
                value={marketForm.sortOrder}
                onChange={(event) =>
                  setMarketForm((current) => ({
                    ...current,
                    sortOrder: Number(event.target.value),
                  }))
                }
              />
            </div>
            <ImageUploadField
              label="Logo"
              folder="travel/markets"
              values={marketForm.logo ? [marketForm.logo] : []}
              multiple={false}
              onChange={(values) =>
                setMarketForm((current) => ({
                  ...current,
                  logo: values[0] ?? "",
                }))
              }
            />
            <Button className="bg-navy hover:bg-navy-dark" disabled={saving} onClick={() => void saveMarket()}>
              Save Market
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
