import { z } from "zod";

export const  commentSchema = z.object({
  Id: z.string(),
  UserId: z.string(),
  Message: z.string()
});

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
  Comments: z.array(commentSchema).optional()
});

export type Item = z.infer<typeof taskSchema>;
