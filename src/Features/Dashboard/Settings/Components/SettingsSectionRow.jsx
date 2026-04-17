const SettingsSectionRow = ({ title, description, children }) => {
  return (
    <div className="grid grid-cols-1 gap-4 py-5 border-b md:grid-cols-12">
      <div className="space-y-1 md:col-span-4">
        <p className="text-sm font-semibold">{title}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="md:col-span-8">{children}</div>
    </div>
  );
};

export default SettingsSectionRow;
