import { useTranslation } from 'react-i18next'
import notFound from '../assets/404-D_FLHmTM.svg'

export const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center">
      <img alt={t('ui.notfoundPage.title')} className="img-fluid h-25" src={notFound} />
      <h1 className="h4 text-muted">{t('ui.notfoundPage.title')}</h1>
      <p className="text-muted">
        {t('ui.notfoundPage.suggestion')}
        <a href="/">{t('ui.notfoundPage.link')}</a>
      </p>
    </div>
  )
}
