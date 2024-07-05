import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

const Modal = DialogPrimitive.Root;
const ModalTrigger = DialogPrimitive.Trigger;
const ModalContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Content
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 flex items-center justify-center overflow-hidden",
      className
    )}
    {...props}
  >
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      {children}
    </div>
  </DialogPrimitive.Content>
));
ModalContent.displayName = DialogPrimitive.Content.displayName;

const ModalHeader = ({ className, ...props }) => (
  <div className={cn("mb-4", className)} {...props} />
);
const ModalFooter = ({ className, ...props }) => (
  <div className={cn("mt-4", className)} {...props} />
);
const ModalTitle = DialogPrimitive.Title;
const ModalDescription = DialogPrimitive.Description;

export { Modal, ModalTrigger, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription };