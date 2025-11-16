import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Auth } from '@supabase/auth-ui-react'
import { supabase } from '../lib/supabase' // Assuming path is correct
import { useEffect } from 'react'

// 1. Change route path
export const Route = createFileRoute('/signup')({
  // 2. Change component name
  component: SignUp,
})

// 3. Change function name
function SignUp() {
  const navigate = useNavigate()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          navigate({ to: '/' })
        }
      },
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [navigate])

  return (
    <div className="form-container">
      <Auth
        supabaseClient={supabase}
        appearance={{
          style: {
            button: {
              background: '#007bff',
              color: 'white',
              borderColor: '#007bff',
            },
            anchor: { color: '#007bff' },
          },
        }}
        view="sign_up"
        providers={[]}
      />
    </div>
  )
}