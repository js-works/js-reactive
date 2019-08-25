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

const LocaleCtx = context<string>('LocaleCtx')
  .validate(Spec.integer)
  .defaultValue('en')

type AppProps = {
  defaultLocale: string
}

const App = component<AppProps>('App')
  .validate(
    Spec.checkProps({
      optional: {
        defaultLocale: Spec.oneOf('en', 'fr', 'de')
      }
    })
  )

  .render(props => {
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

interface LocaleTextProps {
  id: string
}

const LocaleText = component<LocaleTextProps>('LocaleText')
  .validate(
    Spec.checkProps({
      required: {
        id: Spec.string
      }
    })
  )

  .render(props => {
    const locale = useContext(LocaleCtx)

    return (
      <p>
        { translations[locale][props.id] }
      </p>
    )
  })

export default <App defaultLocale="en"/>
