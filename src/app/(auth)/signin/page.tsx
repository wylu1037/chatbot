"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Loader2 as Loader, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { GithubIcon, DiscordIcon } from "@/components/icons";
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

const providersSchema = z.enum(["discord", "google", "github"], {
  message: "Invalid provider, only discord, google and github are supported",
});

type OAuthProvider = z.infer<typeof providersSchema>;

// Define the form schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

// Define the form data type
type FormData = z.infer<typeof formSchema>;

export default function SignInPage() {
  const router = useRouter();
  const [isSigning, setIsSigning] = useState(false);
  const [isVisibility, setIsVisibility] = useState<boolean>(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const toggleVisibility = () => setIsVisibility((prevState) => !prevState);

  const onSubmit = async (data: FormData) => {
    setIsSigning(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        form.setError("root.serverError", {
          message: `Failed to sign in: ${result.error}`,
        });
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      form.setError("root.serverError", {
        message: error instanceof Error ? error.message : "Failed to sign in",
      });
    } finally {
      setIsSigning(false);
    }
  };

  const handleOAuth = async (provider: OAuthProvider) => {
    try {
      const parsedProvider = providersSchema.safeParse(provider);
      if (!parsedProvider.success) {
        throw new Error(
          parsedProvider.error.errors.map((error) => error.message).join(", "),
        );
      }

      await signIn(parsedProvider.data);

      router.push("/");
      router.refresh();
    } catch (error) {
      form.setError("root.serverError", {
        message: error instanceof Error ? error.message : "Failed to sign in",
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
        <p className="text-muted-foreground">Sign in with your account</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* OAuth providers */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleOAuth("github")}
              >
                <GithubIcon />
                Github
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleOAuth("discord")}
              >
                <DiscordIcon />
                Discord
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or continue with email
                </span>
              </div>
            </div>

            {/* Email and password fields */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your email"
                        type="email"
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
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Enter your password"
                          type={isVisibility ? "text" : "password"}
                          autoCapitalize="none"
                          autoComplete="password"
                          autoCorrect="off"
                        />
                        <button
                          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          type="button"
                          onClick={toggleVisibility}
                          aria-label={
                            isVisibility ? "Hide password" : "Show password"
                          }
                          aria-pressed={isVisibility}
                          aria-controls="password"
                        >
                          {isVisibility ? (
                            <EyeOff
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          ) : (
                            <Eye size={16} strokeWidth={2} aria-hidden="true" />
                          )}
                        </button>
                      </div>
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

              {/* Sign in button */}
              <Button className="w-full" type="submit" disabled={isSigning}>
                {isSigning ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </div>

            {/* Sign up link */}
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
