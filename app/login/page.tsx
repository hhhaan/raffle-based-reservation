import { LoginForm } from '@/src/features/auth/ui/login-form';
import { AuthLayout } from '@/src/widgets/auth-layout';

export default function LoginPage() {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
}
