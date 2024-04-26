'use server'

import { cookies } from 'next/headers'

export async function control() {
  //console.log(cookies())
  cookies().delete('authjs.session-token')
}
