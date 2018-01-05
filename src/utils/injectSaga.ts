

export default function injectSagaFactory(store) {
    return function injectSaga(key, descriptor = {}, args) {

        const newDescriptor = { ...descriptor};
        const { saga, mode } = newDescriptor as any;
        
        let hasSaga = Reflect.has(store.injectedSagas, key);

        if (!hasSaga) {
            store.injectedSagas[key] = { ...newDescriptor, task: store.runSaga(saga, args) }; // eslint-disable-line no-param-reassign
          }
    }
};