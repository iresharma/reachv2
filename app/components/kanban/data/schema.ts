import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  Id: z.string(),
  Title: z.string(),
  Status: z.number(),
  Desc: z.string(),
  Label: z.object({
    Id: z.string(),
    Name: z.string(),
    Color: z.string(),
  }),
  Links: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
