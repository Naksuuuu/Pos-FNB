import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { memo } from "react";

const Collapsible = memo(({ className, ...props }) => {
  return <CollapsiblePrimitive.Root data-slot="collapsible" className={className} {...props} />;
});

const CollapsibleTrigger = memo(({ ...props }) => {
  return <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />;
});

const CollapsibleContent = memo(({ ...props }) => {
  return <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />;
});

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
