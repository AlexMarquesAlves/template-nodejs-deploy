import z from "zod";

const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Thou name needs at least 3 characters" })
    .transform((name) => name.toUpperCase()),
  age: z.number().min(18, { message: "Thou need to be of legal age." }),
});
type User = z.infer<typeof userSchema>;

function saveUserToDatabase(user: User) {
  const { name, age } = userSchema.parse(user);

  console.log(name, age);
}

saveUserToDatabase({
  name: "¡Duque",
  age: 23,
});
