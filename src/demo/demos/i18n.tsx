import React from 'react'
import { Spec } from 'js-spec'

import { component, context } from '../../main/index'

const { useState, useContext } = React

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

const LocaleCtx = context<string>('LocaleCtx', 'en',
  { validate: Spec.string })

type AppProps = {
  defaultLocale: string
}

const validateAppProps = Spec.checkProps({
  optional: {
    defaultLocale: Spec.oneOf('en', 'fr', 'de')
  }
})

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

const validateLocaleTextProps = Spec.checkProps({
  required: {
    id: Spec.string
  }
})

const LocaleText = component<LocaleTextProps>('LocaleText', props => {
  const locale = useContext(LocaleCtx)

  return (
    <p>
      { translations[locale][props.id] }
    </p>
  )
})

export default <App defaultLocale="en"/>
