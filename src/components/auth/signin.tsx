'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SigninFormData, SigninValidator } from '@/lib/validators/auth';

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

export function Signin() {
  const form = useForm<SigninFormData>({
    resolver: zodResolver(SigninValidator),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SigninFormData) => {};

  return (
    <DialogContent className='sm:max-w-md'>
      <DialogHeader>
        <DialogTitle>Sign in</DialogTitle>
        <DialogDescription>to continue to Jotion</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
          <Button type='submit'>Continue</Button>
        </form>
      </Form>
      <DialogFooter className='sm:justify-start text-sm'>
        No account?{' '}
        <Button variant='link' className='h-fit pl-2' size='sm'>
          Sign up
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
