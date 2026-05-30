import { getSettings } from "@/lib/actions/settings";
import { AdminSettingsForm } from "./settings-form";

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  return (
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="text-muted-foreground">
        Configure your site settings
      </p>
      <AdminSettingsForm initialValues={settings} />
    </div>
  );
}
