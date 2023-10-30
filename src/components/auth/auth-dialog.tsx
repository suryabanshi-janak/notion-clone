'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { AUTH_TYPE } from '@/types/auth';
import { Signin } from './signin';
import { Signup } from './signup';

export function AuthDialog({ type = AUTH_TYPE.SIGNIN }: { type?: AUTH_TYPE }) {
  const [authType, setAuthType] = React.useState<AUTH_TYPE>(type);

  const toggleAuthType = () =>
    setAuthType((prev) =>
      prev === AUTH_TYPE.SIGNIN ? AUTH_TYPE.SIGNUP : AUTH_TYPE.SIGNIN
    );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={type === AUTH_TYPE.SIGNIN ? 'outline' : 'default'}>
          {type === AUTH_TYPE.SIGNIN ? 'Login' : 'Get Jotion free'}
        </Button>
      </DialogTrigger>

      {authType === AUTH_TYPE.SIGNIN ? (
        <Signin toggleType={toggleAuthType} />
      ) : (
        <Signup toggleType={toggleAuthType} />
      )}
    </Dialog>
  );
}
