import '../scss/style.scss';
import { render } from 'react-dom';

import ApolloProvider from './ApolloProvider';

const root = document.getElementById('app');
render(ApolloProvider, root);


//------------------------------------


if (module && module.hot) {
	module.hot.accept();
}
