import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Auth } from '@supabase/auth-ui-react'
import { supabase } from '../lib/supabase'
import { useEffect } from 'react'

export const Route = createFileRoute('/forgot-password')({
    component: ForgotPassword,
})

function ForgotPassword() {
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
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-logo">FetchAI</h1>
                    <p className="auth-subtitle">Reset your password</p>
                </div>
                <Auth
                    supabaseClient={supabase}
                    appearance={{
                        style: {
                            button: {
                                background: '#18181b',
                                color: '#fafafa',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '10px 16px',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'opacity 0.2s ease',
                            },
                            input: {
                                background: '#fafafa',
                                border: '1px solid #e4e4e7',
                                borderRadius: '8px',
                                padding: '10px 14px',
                                fontSize: '14px',
                                color: '#18181b',
                                outline: 'none',
                                transition: 'border-color 0.2s ease',
                            },
                            label: {
                                color: '#52525b',
                                fontSize: '13px',
                                fontWeight: '500',
                                marginBottom: '4px',
                            },
                            anchor: {
                                display: 'none',
                            },
                            container: {
                                gap: '4px',
                            },
                            message: {
                                fontSize: '13px',
                                color: '#ef4444',
                            },
                        },
                    }}
                    view="forgotten_password"
                    providers={[]}
                />
                <p className="auth-footer">
                    Remember your password?{' '}
                    <Link to="/login" className="auth-link">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}
