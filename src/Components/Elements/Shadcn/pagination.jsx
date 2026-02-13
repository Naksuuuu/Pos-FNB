import * as React from "react";

import { cn } from "@/Utils/cn";
import { Button } from "@/Components/Elements/Shadcn/button";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";

const Pagination = React.memo(({ className, ...props }) => {
  return <nav role="navigation" aria-label="pagination" data-slot="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />;
});

const PaginationContent = React.memo(({ className, ...props }) => {
  return <ul data-slot="pagination-content" className={cn("gap-0.5 flex items-center", className)} {...props} />;
});

const PaginationItem = React.memo(({ ...props }) => {
  return <li data-slot="pagination-item" {...props} />;
});

const PaginationLink = React.memo(({ className, isActive, size = "icon", ...props }) => {
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(className)}
      nativeButton={false}
      render={<a aria-current={isActive ? "page" : undefined} data-slot="pagination-link" data-active={isActive} {...props} />}
    />
  );
});

const PaginationPrevious = React.memo(({ className, text = "Previous", ...props }) => {
  return (
    <PaginationLink aria-label="Go to previous page" size="default" className={cn("pl-1.5!", className)} {...props}>
      <ChevronLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  );
});

const PaginationNext = React.memo(({ className, text = "Next", ...props }) => {
  return (
    <PaginationLink aria-label="Go to next page" size="default" className={cn("pr-1.5!", className)} {...props}>
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  );
});

const PaginationEllipsis = React.memo(({ className, ...props }) => {
  return (
    <span aria-hidden data-slot="pagination-ellipsis" className={cn("size-8 [&_svg:not([class*='size-'])]:size-4 flex items-center justify-center", className)} {...props}>
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  );
});

export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious };
