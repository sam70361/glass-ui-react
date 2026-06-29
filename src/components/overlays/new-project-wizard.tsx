import { useState } from 'react';
import { toast } from 'sonner';
import type { DateRange } from 'react-day-picker';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Textarea } from 'src/components/ui/textarea';
import { Stepper } from 'src/components/ui/stepper';
import { MultiSelect } from 'src/components/ui/multi-select';
import { TagsInput } from 'src/components/ui/tags-input';
import { DateRangePicker } from 'src/components/ui/date-picker';
import { Field } from 'src/components/hook-form';
import { DescriptionList } from 'src/components/ui/misc';
import { useTeamQuery, useCreateProjectMutation } from 'src/api';
import { useTranslation } from 'src/i18n';

export function NewProjectWizard({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { t } = useTranslation();
  const team = useTeamQuery().data ?? [];
  const createProject = useCreateProjectMutation();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [range, setRange] = useState<DateRange | undefined>();

  const steps = [
    { label: t('wizard.basics') },
    { label: t('wizard.membersAndTags') },
    { label: t('wizard.plan') },
    { label: t('wizard.done') },
  ];

  const reset = () => {
    setStep(0); setName(''); setDesc(''); setMembers([]); setTags([]); setRange(undefined);
  };
  const canNext = step !== 0 || name.trim().length > 0;
  const submit = () => {
    createProject.mutate(
      { name: name.trim(), description: desc.trim() },
      {
        onSuccess: () => {
          toast.success(t('wizard.projectCreated'));
          onOpenChange(false);
          reset();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) reset(); }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('wizard.createProject')}</DialogTitle>
        </DialogHeader>

        <Stepper steps={steps} current={step} className="mb-6" />

        {step === 0 && (
          <div className="space-y-4">
            <Field label={t('wizard.projectName')} required>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field label={t('wizard.projectDesc')}>
              <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
            </Field>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <Field label={t('wizard.members')}>
              <MultiSelect value={members} onChange={setMembers} options={team.map((m) => ({ value: m.id, label: m.name }))} />
            </Field>
            <Field label={t('wizard.tags')}>
              <TagsInput value={tags} onChange={setTags} />
            </Field>
          </div>
        )}
        {step === 2 && (
          <Field label={t('wizard.period')}>
            <DateRangePicker value={range} onChange={setRange} />
          </Field>
        )}
        {step === 3 && (
          <DescriptionList
            columns={1}
            items={[
              { label: t('wizard.projectName'), value: name || '—' },
              { label: t('wizard.projectDesc'), value: desc || '—' },
              { label: t('wizard.members'), value: members.length ? `${members.length} ${t('wizard.people')}` : '—' },
              { label: t('wizard.tags'), value: tags.join(', ') || '—' },
              { label: t('wizard.period'), value: range?.from ? `${range.from.toLocaleDateString()} ${t('wizard.startFrom')}` : '—' },
            ]}
          />
        )}

        <div className="mt-6 flex justify-between">
          <Button variant="ghost" onClick={() => (step === 0 ? onOpenChange(false) : setStep(step - 1))}>
            {step === 0 ? t('common.cancel') : t('common.prev')}
          </Button>
          {step < steps.length - 1 ? (
            <Button variant="primary" disabled={!canNext} onClick={() => setStep(step + 1)}>
              {t('common.next')}
            </Button>
          ) : (
            <Button variant="primary" onClick={submit}>
              {t('wizard.createProject')}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
