"use client"

import { Head, useForm } from "@inertiajs/react"
import { LoaderCircle, Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react"
import { type FormEventHandler, useState } from "react"

import InputError from "@/components/input-error"
import TextLink from "@/components/text-link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import AuthLayout from "@/layouts/auth-layout"

declare global {
  interface Window {
    route: any
  }
}

type LoginForm = {
  email: string
  password: string
  remember: boolean
}

interface LoginProps {
  status?: string
  canResetPassword: boolean
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
    email: "",
    password: "",
    remember: false,
  })

  const [showPassword, setShowPassword] = useState(false)

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(window.route("login"), {
      onFinish: () => reset("password"),
    })
  }

  return (
    <AuthLayout>
      <Head title="Log in" />

      <Card className="w-full max-w-md border-none shadow-none sm:border sm:shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Log in to your account</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>

        <CardContent>
          {status && <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-600">{status}</div>}

          <form className="space-y-4" onSubmit={submit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  placeholder="email@example.com"
                  className="pl-10"
                />
              </div>
              <InputError message={errors.email} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {canResetPassword && (
                  <TextLink href={window.route("password.request")} className="text-xs" tabIndex={5}>
                    Forgot password?
                  </TextLink>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  tabIndex={2}
                  autoComplete="current-password"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
              <InputError message={errors.password} />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                name="remember"
                checked={data.remember}
                onCheckedChange={(checked) => setData("remember", checked === true)}
                tabIndex={3}
              />
              <Label htmlFor="remember" className="text-sm">
                Remember me for 30 days
              </Label>
            </div>

            <Button type="submit" className="w-full" tabIndex={4} disabled={processing}>
              {processing ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
              Log in
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t p-6">
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <TextLink href={window.route("register")} tabIndex={6} className="font-semibold">
              Sign up
            </TextLink>
          </div>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
