import { LoginForm } from '@/src/features/auth/ui/login-form';
import { AuthLayout } from '@/src/widgets/auth-layout';

export const LoginScreen = () => {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
};
