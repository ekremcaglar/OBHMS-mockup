import React, { useState } from 'react';
import { useI18n } from '../context/I18nContext';
import Icon from './Icon';
import tusasLogo from '../assets/tusas_logo.svg';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { t } = useI18n();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin();
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#101827]">
            <div className="w-full max-w-md p-8 space-y-8 bg-[#1d2939] rounded-lg shadow-lg">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <img src={tusasLogo} alt="TUSAS Logo" className="h-12" />
                    </div>
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <Icon name="Plane" className="h-8 w-8 text-sky-500" />
                        <span className="text-xl font-bold text-white tracking-wider whitespace-nowrap">KAAN OBHMS</span>
                    </div>
                    <p className="text-lg text-gray-400">{t('login_to_account')}</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">{t('username')}</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                                placeholder={t('username')}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password-input" className="sr-only">{t('password')}</label>
                            <input
                                id="password-input"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                                placeholder={t('password')}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        >
                            {t('login')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;