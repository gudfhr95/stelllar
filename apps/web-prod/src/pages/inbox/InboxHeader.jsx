import { IconInbox } from '@/components/ui/icons/Icons'
import Header from '@/components/ui/header/Header'
import { useStore } from '@/hooks/useStore'
import HeaderTab from '@/components/ui/header/HeaderTab'
import { useTranslation } from 'react-i18next';

export default function InboxHeader() {
  const { t } = useTranslation()
  return (
    <Header icon={<IconInbox className="h-5 w-5" />} title={t('inbox.title')} showDivider>
      <div className="flex items-center space-x-4">
        <InboxTab page="Unread" label={t('inbox.tab.unread')}/>
        <InboxTab page="All" label={t('inbox.tab.all')}/>
      </div>
    </Header>
  )
}

function InboxTab({ page, label }) {
  const [inboxPage, setInboxPage] = useStore(s => [s.inboxPage, s.setInboxPage])
  return (
    <HeaderTab
      page={page}
      currentPage={inboxPage}
      setCurrentPage={setInboxPage}
    >
      {label}
    </HeaderTab>
  )
}
