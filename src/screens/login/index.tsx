import { AuthLayout } from '@/src/widgets/auth-layout';
import { LoginForm } from '@/src/features/auth/ui/login-form';

export const LoginScreen = () => {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
};
