import { Card } from "@/Components/Elements/Cards/Card";
import SettingsFormSection from "@/Features/Dashboard/Settings/Components/SettingsFormSection";
import SettingsLogoSection from "@/Features/Dashboard/Settings/Components/SettingsLogoSection";

const SettingsPage = () => {
  return (
    <div className="flex items-start justify-center w-full ">
      <div className="w-full space-y-4">
        <Card className="w-full p-0 space-y-4 shadow-sm md:p-0" outerClassName="border border-border rounded-2xl p-0">
          <div className="flex flex-col p-4 pb-4 border-b bg-primary md:p-6 text-background">
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold tracking-tight">Manajemen Settings</h3>
              </div>
              <p className="text-sm">Atur profil tenant, jam operasional, dan tampilan dashboard.</p>
            </div>
          </div>

          <SettingsFormSection />
        </Card>

        <SettingsLogoSection />
      </div>
    </div>
  );
};

export default SettingsPage;
