import Loadable from 'routing/Loadable';

export const handleLoadedModules = (injectReducer, injectSagas) => (
	[reducer, sagas, component]
) => {
	injectReducer('roomReducer', reducer.default);
	injectSagas('roomSagas', sagas.default);
	return component;
};

export default Loadable({
	loader: ({ injectReducer, injectSagas }) =>
		Promise.all([import('./reducer'), import('./sagas'), import('./index')]).then(
			handleLoadedModules(injectReducer, injectSagas)
		)
});
