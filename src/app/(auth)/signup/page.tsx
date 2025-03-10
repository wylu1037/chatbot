"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useCreateUser, useFindFirstUser } from "@/lib/hooks/user";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

// Define the form data type
type FormData = z.infer<typeof formSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: signup } = useCreateUser();

  // Check if the user already exists
  const { data: user } = useFindFirstUser(
    {
      where: {
        email: form.getValues("email"),
      },
    },
    {
      enabled: !!form.getValues("email"),
    },
  );

  // Handle the form submission
  const handleSubmit = async (data: FormData) => {
    setIsLoading(true);

    if (user) {
      form.setError("email", {
        message: "User already exists",
      });
      setIsLoading(false);
      return;
    }

    try {
      await signup({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      form.setError("root.serverError", {
        message: "Registration failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create Account 🚀</h1>
          <p className="text-muted-foreground">
            Enter your information to get started
          </p>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    type="text"
                    {...field}
                    autoCapitalize="none"
                    autoComplete="name"
                    autoCorrect="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="hello@example.com"
                    type="email"
                    {...field}
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Show server error if it exists */}
          {form.formState.errors.root?.serverError && (
            <FormMessage className="text-red-500">
              {form.formState.errors.root.serverError.message}
            </FormMessage>
          )}

          <Button
            type="submit"
            className="group relative w-full"
            disabled={isLoading}
          >
            <span className="absolute inset-0 h-full w-full translate-x-1 translate-y-1 transform bg-black transition duration-200 ease-out group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 h-full w-full border-2 border-black bg-white group-hover:bg-black"></span>
            <span className="relative text-black group-hover:text-white">
              {isLoading ? "Creating..." : "Create Account"}
            </span>
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
