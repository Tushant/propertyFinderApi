import Loadable from "routing/Loadable";

export const handleLoadedModules = (injectReducer, injectSagas) => (
  [reducer, sagas, component]
) => {
  injectReducer("flassMessage", reducer.default);
  injectSagas("flashMessageSaga", sagas.default);
  return component;
};

export default Loadable({
  loader: ({ injectReducer, injectSagas }) =>
    Promise.all([
      import("./reducer"),
      import("./sagas"),
      import("./index")
    ]).then(handleLoadedModules(injectReducer, injectSagas))
});
