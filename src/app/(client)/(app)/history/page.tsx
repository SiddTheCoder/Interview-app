"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

function page() {
  const router = useRouter()
  return (
    <div>
      History
      <Button onClick={() => router.back()}>Back</Button>
    </div>
  )
}

export default page
