import React from 'react'
import * as Spec from 'js-spec/validators'
import { component, context } from '../main/index'

const { useState, useContext } = React

export default {
  title: 'Context'
}

// === i18n ==========================================================

const translations: Record<string, Record<string, string>> = {
  en: {
    salutation: 'Hello, ladies and gentlemen!'
  },
  de: {
    salutation: 'Hallo, meine Damen und Herren!'
  },
  fr: {
    salutation: 'Salut, Mesdames, Messieurs!'
  }
}

const LocaleCtx = context<string>({
  name: 'LocaleCtx',
  default: 'en',
  validate: Spec.string
})

type AppProps = {
  defaultLocale: string
}

const App = component<AppProps>('App', props => {
  const [locale, setLocale] = useState(() => props.defaultLocale)

  return (
    <LocaleCtx.Provider value={locale}>
      <div>
        <label htmlFor="lang-selector">Select language: </label>
        <select id="lang-selector" value={locale} onChange={(ev: any) => setLocale(ev.target.value)}>
          <option value="en">en</option>
          <option value="fr">fr</option>
          <option value="de">de</option>
        </select>
        <LocaleText id="salutation"/>
      </div>
    </LocaleCtx.Provider>
  )
})

type LocaleTextProps = {
  id: string
}

const LocaleText = component<LocaleTextProps>('LocaleText', props => {
  const locale = useContext(LocaleCtx)

  return (
    <p>
      { translations[locale][props.id] }
    </p>
  )
})

export const internationalization = () => <App defaultLocale="en"/>
