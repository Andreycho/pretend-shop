"use client"

import { Head, useForm } from "@inertiajs/react"
import { LoaderCircle, Eye, EyeOff, Mail, Lock, User, UserPlus } from "lucide-react"
import { type FormEventHandler, useState, useEffect } from "react"

import InputError from "@/components/input-error"
import TextLink from "@/components/text-link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import AuthLayout from "@/layouts/auth-layout"

declare global {
  interface Window {
    route: any
  }
}

type RegisterForm = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(window.route("register"), {
      onFinish: () => reset("password", "password_confirmation"),
    })
  }

  // Calculate password strength
  useEffect(() => {
    if (!data.password) {
      setPasswordStrength(0)
      return
    }

    let strength = 0

    // Length check
    if (data.password.length >= 8) strength += 25

    // Contains lowercase
    if (/[a-z]/.test(data.password)) strength += 25

    // Contains uppercase
    if (/[A-Z]/.test(data.password)) strength += 25

    // Contains number or special char
    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(data.password)) strength += 25

    setPasswordStrength(strength)
  }, [data.password])

  // Get password strength color
  const getStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-destructive"
    if (passwordStrength <= 50) return "bg-amber-500"
    if (passwordStrength <= 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  // Get password strength text
  const getStrengthText = () => {
    if (passwordStrength <= 25) return "Weak"
    if (passwordStrength <= 50) return "Fair"
    if (passwordStrength <= 75) return "Good"
    return "Strong"
  }

  return (
    <AuthLayout>
      <Head title="Register" />

      <Card className="w-full max-w-md border-none shadow-none sm:border sm:shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your details to create your account</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={submit}>
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="name"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  disabled={processing}
                  placeholder="John Doe"
                  className="pl-10"
                />
              </div>
              <InputError message={errors.name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  required
                  tabIndex={2}
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  disabled={processing}
                  placeholder="email@example.com"
                  className="pl-10"
                />
              </div>
              <InputError message={errors.email} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  tabIndex={3}
                  autoComplete="new-password"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  disabled={processing}
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
              {data.password && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Progress value={passwordStrength} className={getStrengthColor()} />
                    <span className="text-xs text-muted-foreground ml-2">{getStrengthText()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use 8+ characters with a mix of letters, numbers & symbols
                  </p>
                </div>
              )}
              <InputError message={errors.password} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirmation">Confirm password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password_confirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  tabIndex={4}
                  autoComplete="new-password"
                  value={data.password_confirmation}
                  onChange={(e) => setData("password_confirmation", e.target.value)}
                  disabled={processing}
                  placeholder="••••••••"
                  className="pl-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
              <InputError message={errors.password_confirmation} />
            </div>

            <Button type="submit" className="w-full" tabIndex={5} disabled={processing}>
              {processing ? (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <UserPlus className="mr-2 h-4 w-4" />
              )}
              Create account
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t p-6">
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <TextLink href={window.route("login")} tabIndex={6} className="font-semibold">
              Log in
            </TextLink>
          </div>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
