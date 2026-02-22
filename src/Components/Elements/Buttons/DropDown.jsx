import React, { memo, useCallback } from "react";
import { Link } from "react-router";

import { Button } from "@/Components/Elements/Shadcn/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "@/Components/Elements/Shadcn/dropdown-menu";

const DropDown = memo(({ triggerLabel = null, triggerIcon: Icon = null, items = [], buttonProps = {} }) => {
  const renderTrigger = useCallback(
    (props) => (
      <Button {...props} {...buttonProps}>
        {Icon && <Icon className="size-4" />}
        {triggerLabel}
      </Button>
    ),
    [triggerLabel, Icon, buttonProps],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={renderTrigger} />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {items.map((item, index) => (
            <DropdownMenuItem
              nativeButton
              key={`${item.key}-${index}`}
              render={(props) => {
                const btnProps = {
                  variant: item.variant || "ghost",
                  size: item.size || "default",
                  ...props,
                };
                const defaultClassName = `${item.className} w-full text-start justify-start cursor-pointer!`;

                return (
                  <Button {...btnProps} onClick={item.onClick} className={`${defaultClassName} ${btnProps.className}`}>
                    {item.to ? (
                      <Link to={item.to} className="w-full h-full text-start">
                        {item.label}
                      </Link>
                    ) : (
                      <>{item.label}</>
                    )}
                  </Button>
                );
              }}
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export { DropDown };
