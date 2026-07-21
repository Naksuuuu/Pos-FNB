import { memo, useCallback, useState } from "react";

import { Button } from "@/Components/Elements/Shadcn/button";
import { Card, CardContent, CardFooter } from "@/Components/Elements/Shadcn/card";

const ActionCard = memo(({ children, onActionClick, actionTitle, disabled }) => {
  const [cardHeight, setCardHeight] = useState(0);

  const cardRef = useCallback((node) => {
    if (node !== null) {
      setCardHeight(node.clientHeight);
    }
  }, []);

  return (
    <>
      <Card
        ref={cardRef}
        className="fixed bottom-0 left-0 w-full p-4 gap-3 rounded-t-2xl rounded-b-none shadow-[0_-1px_10px_0.5px_rgba(0,0,0,0.2)] "
      >
        {children && <CardContent className="px-0! flex items-center justify-between">{children}</CardContent>}
        <CardFooter className="px-0!">
          <Button className="w-full" onClick={onActionClick} disabled={disabled}>
            {actionTitle}
          </Button>
        </CardFooter>
      </Card>
      <div style={{ height: `${cardHeight}px` }}>a</div>
    </>
  );
});

export default ActionCard;
