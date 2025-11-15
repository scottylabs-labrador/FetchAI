import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Auth } from '@supabase/auth-ui-react'
import { supabase } from '../lib/supabase'
import { useEffect } from 'react'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
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
        view="sign_in"
      />
      <p className="text-center mt-4">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </div>
  )
}
