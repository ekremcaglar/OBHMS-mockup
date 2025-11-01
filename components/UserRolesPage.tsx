import React from 'react';
import { ROLE_GROUPS, ROLE_I18N_MAP } from '../constants';
import { useI18n } from '../context/I18nContext';
import Icon from './Icon';
import { UserRole } from '../types';

const roleInteractions: Record<UserRole, string[]> = {
    'Maintenance Technician': [
        'maintenance_technician_interaction_1',
        'maintenance_technician_interaction_2',
        'maintenance_technician_interaction_3',
        'maintenance_technician_interaction_4',
    ],
    'Logistics Planner / Supply Chain Analyst': [
        'logistics_planner_interaction_1',
        'logistics_planner_interaction_2',
        'logistics_planner_interaction_3',
    ],
    'Pilot / Operator': [
        'pilot_operator_interaction_1',
        'pilot_operator_interaction_2',
    ],
    'Prognostic Engineer': [
        'prognostic_engineer_interaction_1',
        'prognostic_engineer_interaction_2',
    ],
    'Diagnostic Engineer / Investigator': [
        'diagnostic_engineer_interaction_1',
        'diagnostic_engineer_interaction_2',
    ],
    'Reliability Analyst': [
        'reliability_analyst_interaction_1',
        'reliability_analyst_interaction_2',
    ],
    'System Engineering Lead': [
        'system_engineering_lead_interaction_1',
        'system_engineering_lead_interaction_2',
        'system_engineering_lead_interaction_3',
    ],
    'OBHMS Administrator / System Owner': [
        'obhms_administrator_interaction_1',
    ],
    'Security Officer': [
        'security_officer_interaction_1',
    ],
    'Data Steward': [
        'data_steward_interaction_1',
    ],
    'Compliance/Certification Officer': [
        'compliance_officer_interaction_1',
        'compliance_officer_interaction_2',
    ],
    'External Systems Integrator': [
        'external_systems_integrator_interaction_1',
    ],
};

const UserRoleCard: React.FC<{ role: UserRole }> = ({ role }) => {
    const { t } = useI18n();
    const roleKey = ROLE_I18N_MAP[role];
    const interactions = roleInteractions[role] || [];

    return (
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-lg backdrop-blur-sm">
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t(roleKey as any)}</h3>
                <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('core_responsibilities')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t(`${roleKey}_desc` as any)}</p>
                </div>
                <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('key_obhms_interactions')}</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        {interactions.map(interactionKey => (
                            <li key={interactionKey}>{t(interactionKey as any)}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const UserRolesPage: React.FC = () => {
    const { t } = useI18n();

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <Icon name="Users" className="w-10 h-10" />
                {t('user_roles_guide_title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                {t('user_roles_guide_subtitle')}
            </p>

            <div className="space-y-12">
                {ROLE_GROUPS.map(group => (
                    <section key={group.group}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b-2 border-sky-500 pb-3">
                            {t(group.group as any)}
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {group.roles.map(role => (
                                <UserRoleCard key={role} role={role} />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default UserRolesPage;