import { InputGroup, InputGroupAddon, InputGroupInput } from "../Shadcn/input-group";

const Input = ({ className, firstAddon = null, lastAddon = null, ...props }) => {
  return (
    <InputGroup className={className}>
      {firstAddon && <InputGroupAddon align="inline-start">{firstAddon}</InputGroupAddon>}
      <InputGroupInput {...props} />
      {lastAddon && <InputGroupAddon align="inline-end">{lastAddon}</InputGroupAddon>}
    </InputGroup>
  );
};
export { Input };
