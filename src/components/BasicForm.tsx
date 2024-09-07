"use client";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";
import AutoForm, { AutoFormSubmit } from "./ui/auto-form";

// Define your form schema using zod
const formSchema = z.object({
  subject: z
    .string({
      required_error: "Subject is required.",
    })
    .describe("Objet"),
  message: z
    .string({
      required_error: "Message is required.",
    })
    .describe("Message"),
});

const BasicForm = () => {
  const handleSubmit = (values: { subject: string; message: string }) => {
    toast(values.subject, {
      description: values.message,
    });
  };

  return (
    <AutoForm
      formSchema={formSchema}
      fieldConfig={{}}
      onSubmit={(values) => handleSubmit(values)}
    >
      <AutoFormSubmit className="w-fit">
        <Mail className="mr-2 size-4" />
        Envoyer
      </AutoFormSubmit>
    </AutoForm>
  );
};

export default BasicForm;
