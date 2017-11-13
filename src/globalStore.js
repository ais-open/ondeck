let Store = null;

const GlobalStore = {
    setStore: (createdStore) => {
        Store = createdStore;
    },
    getStore: () => {
        return Store;
    }
};

export default GlobalStore;
