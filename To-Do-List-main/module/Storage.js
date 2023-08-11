    /**
     * 데이터를 로컬 스토리지에 관리하는 클래스
     */
class Storage {
    constructor(storageKey) {
        this.Data = [];
        this.storageKey = storageKey;
    }
        /**
         * 로컬 스토리지의 데이터 배열을 리턴합니다.
         * @returns {Array} - 데이터 배열
         */
    getData() {
        this.Data = this.getStorage();
        return this.Data;
    }
        /**
         * 데이터를 추가합니다.
         * @param {Object} itemData - 추가할 데이터 객체
         */
    addItem(itemData) {
        this.Data = this.getStorage();
        this.Data.push(itemData);
        return this
    }
        /**
         * 데이터를 삭제합니다.
         * @param {number} id - 삭제할 데이터의 ID
         */
    deleteItem(id) {
        this.Data = this.getStorage();
        this.Data = this.Data.filter((item) => {
            return Number(item.id) !== Number(id)
        });
        return this
    }
    searchValue(property, value) {
        this.Data = this.getStorage();
        const index = this.Data.findIndex( item => item[property] === value);
        return this.Data[index];
    }
    duplicateValue(property, value) {
        this.data = this.getStorage();
        return this.data.findIndex( item => item[property] === value);
    }
    createId() {
        const data = this.getStorage();
        const lastIndex = data.length - 1;
        const id = data.length > 0 ? data[lastIndex].id + 1 : 1;
        return id
    }
    getStorage(key = this.storageKey) {
        return JSON.parse(window.localStorage.getItem(key)) || [];
    }
    updateStorage(key = this.storageKey, value = this.Data) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
    updateData(id, updateProp ,updateValue) {
        const targetIndex = this.Data.findIndex(item => item.id === id);

        if(targetIndex !== -1) {
            this.Data[targetIndex][updateProp] = updateValue;
        }
        return this;
    }
}
export default Storage
