'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SignupFormData, SignupValidator } from '@/lib/validators/auth';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

export function Signup() {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignupFormData) => {
      await axios.post('/api/signup', data);
    },
  });

  const form = useForm<SignupFormData>({
    resolver: zodResolver(SignupValidator),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignupFormData) => mutate(data);

  return (
    <DialogContent className='sm:max-w-md'>
      <DialogHeader>
        <DialogTitle>Sign up</DialogTitle>
        <DialogDescription>to create an account in Jotion</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Email address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='Password' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={isPending}>
            {isPending && <Loader2 className='w-4 h-4 animate-spin mr-2' />}
            Continue
          </Button>
        </form>
      </Form>
      <DialogFooter className='sm:justify-start text-sm'>
        Already have an account?{' '}
        <Button variant='link' className='h-fit pl-2' size='sm'>
          Sign in
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
