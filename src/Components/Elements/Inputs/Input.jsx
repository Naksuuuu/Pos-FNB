import { memo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Controller } from "react-hook-form";

import { cn } from "@/Utils/cn";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/Components/Elements/Shadcn/input-group";
import { Button } from "@/Components/Elements/Shadcn/button";

const Input = memo(({ className, firstAddon = null, lastAddon = null, ref, ...props }) => {
  return (
    <InputGroup className={cn(className, "bg-input/30")}>
      {firstAddon && <InputGroupAddon align="inline-start">{firstAddon}</InputGroupAddon>}
      <InputGroupInput ref={ref} {...props} />
      {lastAddon && <InputGroupAddon align="inline-end">{lastAddon}</InputGroupAddon>}
    </InputGroup>
  );
});

const InputPassword = memo(({ ...props }) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  return (
    <Input
      type={visiblePassword ? "text" : "password"}
      {...props}
      lastAddon={
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="hover:bg-transparent ring-0 focus-visible:ring-0 border-0 focus-visible:ring-offset-0 focus-visible:border-none"
          onClick={() => setVisiblePassword((prev) => !prev)}
        >
          {visiblePassword ? <Eye /> : <EyeOff />}
        </Button>
      }
    />
  );
});

const InputRupiah = memo(({ control, name, ...props }) => {
  const formatRupiah = (val) => {
    if (val === undefined || val === null || val === "") return "";
    const parsed = Number(val);
    if (!Number.isNaN(parsed)) {
      return new Intl.NumberFormat("id-ID").format(Math.floor(parsed));
    }
    const numberString = String(val).replace(/[^0-9]/g, "");
    if (!numberString) return "";
    return new Intl.NumberFormat("id-ID").format(Number(numberString));
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref } }) => {
        const displayValue = formatRupiah(value);

        const handleChange = (e) => {
          const rawValue = e.target.value.replace(/[^0-9]/g, "");
          onChange(rawValue);
        };

        return (
          <Input
            {...props}
            ref={ref}
            value={displayValue}
            onChange={handleChange}
            inputMode="numeric"
            firstAddon="Rp"
          />
        );
      }}
    />
  );
});

const InputNumber = memo(({ control, name, ...props }) => {
  const formatNumber = (val) => {
    if (val === undefined || val === null || val === "") return "";
    const parsed = Number(val);
    if (!Number.isNaN(parsed)) {
      return new Intl.NumberFormat("id-ID").format(Math.floor(parsed));
    }
    const numberString = String(val).replace(/[^0-9]/g, "");
    if (!numberString) return "";
    return new Intl.NumberFormat("id-ID").format(Number(numberString));
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref } }) => {
        const displayValue = formatNumber(value);

        const handleChange = (e) => {
          const rawValue = e.target.value.replace(/[^0-9]/g, "");
          onChange(rawValue);
        };

        return (
          <Input
            {...props}
            ref={ref}
            value={displayValue}
            onChange={handleChange}
            inputMode="numeric"
          />
        );
      }}
    />
  );
});

export { Input, InputPassword, InputRupiah, InputNumber };
