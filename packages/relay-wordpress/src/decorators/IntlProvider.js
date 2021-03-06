// @flow
import * as React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';

const langCache = {};
const getMessages = locale => {
  if (langCache[locale]) {
    return langCache[locale];
  }
  // eslint-disable-next-line global-require, import/no-dynamic-require, $FlowFixMe
  langCache[locale] = require(`../langs/${locale}.js`).default;
  return langCache[locale];
};

export default (ComposedComponent: any) => {
  const displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component';

  return class WithIntlProvider extends React.Component<any, any> {
    static displayName = `WithIntlProvider(${displayName})`;

    state = {
      locale: 'en',
    };

    componentDidMount() {
      // eslint-disable-next-line global-require, import/no-dynamic-require, $FlowFixMe
      const localeData = require(`react-intl/locale-data/${this.state.locale}`);
      addLocaleData(localeData);
    }

    render() {
      return (
        <IntlProvider locale={this.state.locale} messages={getMessages(this.state.locale)}>
          <ComposedComponent {...this.props} />
        </IntlProvider>
      );
    }
  };
};
