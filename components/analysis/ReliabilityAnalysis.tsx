import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../Table';
import { MOCK_RELIABILITY_DATA } from '../../constants';
import { useI18n } from '../../context/I18nContext';

const ReliabilityAnalysis: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('mean_time_between_failures')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{MOCK_RELIABILITY_DATA.mtbf} {t('hours')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('mean_time_to_repair')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{MOCK_RELIABILITY_DATA.mttr} {t('hours')}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('system_reliability_metrics')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('system')}</TableHead>
                <TableHead>{t('mtbf_hours')}</TableHead>
                <TableHead>{t('mttr_hours')}</TableHead>
                <TableHead>{t('availability')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_RELIABILITY_DATA.systems.map((system) => (
                <TableRow key={system.name}>
                  <TableCell>{system.name}</TableCell>
                  <TableCell>{system.mtbf}</TableCell>
                  <TableCell>{system.mttr}</TableCell>
                  <TableCell>{system.availability}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReliabilityAnalysis;