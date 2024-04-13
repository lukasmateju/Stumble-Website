'use client'
import React from 'react'
import { SignUpSchema } from '@/ZodSchema/UserSchema'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardHeader } from "@/components/ui/card"
import { Axis3DIcon } from 'lucide-react'
import axios from 'axios'
import { useToast } from "@/components/ui/use-toast"



type Props = {}

const SignupForm = (props: Props) => {
    const { toast } = useToast()
    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            username: "",
        },})
        
    async function onSubmit(values: z.infer<typeof SignUpSchema>) {
      try {
        const response = await axios.post('/api/signup', {
          username:values.username,
          email:values.email,
          password:values.password,
          confirmpassword:values.confirmpassword
        })
        toast({
          description: "User Registered Successfully",
        })
        console.log(response)
      } catch (error) {
        console.log(error)
        toast({
          description: "Error in Registering User",
        })
      }
    }
  return (
    <div className='mt-4 max-w-[1280px] mx-auto'>
        <Card className='p-5 max-w-[600px] mx-auto'>
            <CardHeader className='text-2xl font-semibold text center'>Register</CardHeader>
            <Form {...form}> 
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
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
                    <Input type='email' placeholder="Email" {...field} />
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
                    <Input type='password' placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="confirmpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder="Renter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <Button type="submit">Submit</Button>
            </form>
            </Form>
        </Card>

    </div>
  )
}

export default SignupForm