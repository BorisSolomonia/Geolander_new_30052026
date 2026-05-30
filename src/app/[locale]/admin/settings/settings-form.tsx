"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { updateSetting } from "@/lib/actions/settings";
import { toast } from "sonner";
import {
  adminSettingsFields,
  businessUiCopy,
} from "@/content/business-defaults";

type AdminSettingsFormProps = {
  initialValues: Record<string, string>;
};

export function AdminSettingsForm({ initialValues }: AdminSettingsFormProps) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const withDefaults: Record<string, string> = {};
    for (const field of adminSettingsFields) {
      withDefaults[field.key] = initialValues[field.key] ?? "";
    }
    return withDefaults;
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const field of adminSettingsFields) {
        await updateSetting(field.key, values[field.key] ?? "");
      }
      toast.success(businessUiCopy.saveSettingsSuccess);
    } catch {
      toast.error(businessUiCopy.saveSettingsError);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{businessUiCopy.siteConfigurationTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {adminSettingsFields.map((field) => (
          <div key={field.key}>
            <Label htmlFor={field.key}>{field.label}</Label>
            <Input
              id={field.key}
              value={values[field.key] || ""}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  [field.key]: e.target.value,
                }))
              }
              placeholder={field.placeholder}
            />
          </div>
        ))}

        <Button
          onClick={handleSave}
          className="w-full sm:w-auto"
          disabled={saving}
        >
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {businessUiCopy.saveSettingsButton}
        </Button>
      </CardContent>
    </Card>
  );
}
