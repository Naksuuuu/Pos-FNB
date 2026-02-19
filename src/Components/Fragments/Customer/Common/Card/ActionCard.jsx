import { memo, useEffect, useRef, useState } from "react";

import { Button } from "@/Components/Elements/Shadcn/button";
import { Card, CardContent, CardFooter } from "@/Components/Elements/Shadcn/card";

const ActionCard = memo(({ children, onActionClick, actionTitle }) => {
  const cardRef = useRef();
  const [cardHeight, setCardHeight] = useState(0);

  useEffect(() => {
    setCardHeight(cardRef.current?.clientHeight || 0);
  }, []);

  return (
    <>
      <Card ref={cardRef} className="fixed bottom-0 left-0 w-full p-4 gap-3 rounded-t-2xl shadow-[0_-1px_10px_0.5px_rgba(0,0,0,0.2)]">
        {children && <CardContent className="px-0! flex items-center justify-between">{children}</CardContent>}
        <CardFooter className="px-0!">
          <Button className="w-full" onClick={onActionClick}>
            {actionTitle}
          </Button>
        </CardFooter>
      </Card>
      <div className={`h-[${cardHeight}px] w-full`}></div>
    </>
  );
});

export default ActionCard;
