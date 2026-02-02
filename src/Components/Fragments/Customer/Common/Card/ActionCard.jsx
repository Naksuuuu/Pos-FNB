import { Button } from "@/Components/Elements/Shadcn/Button/button";
import { Card, CardContent, CardFooter } from "@/Components/Elements/Shadcn/Card/card";
import { memo } from "react";

const ActionCard = memo(({ children, onActionClick, actionTitle }) => {
  return (
    <Card className="fixed bottom-0 left-0 w-full p-4 gap-3 rounded-t-2xl shadow-[0_-1px_10px_0.5px_rgba(0,0,0,0.2)]">
      <CardContent className="px-0! flex items-center justify-between">{children}</CardContent>
      <CardFooter className="px-0!">
        <Button className="w-full bg-emerald-600 hover:bg-emerald-600" onClick={onActionClick}>
          {actionTitle}
        </Button>
      </CardFooter>
    </Card>
  );
});

export default ActionCard;
