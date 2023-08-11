    /**
     * 리스트 아이템들을 관리하는 클래스
     */
class ListManager {
        /**
         * 새로운 ListManager 인스턴스를 생성합니다.
         * @param {HTMLElement} container - 리스트 아이템을 표시할 컨테이너 엘리먼트
         * @param {Function} parseTemplate - 아이템 템플릿을 생성하는 함수
         */
    constructor(container, parseTemplate) {
        this.listInfoData = [];
        this.template = parseTemplate;
        this.container = container;
    }
        /**
         * 초기 데이터로 리스트 아이템을 초기화합니다.
         * @param {Array} data - 초기 데이터 배열
         * @returns {ListManager} - 인스턴스 자체를 반환하여 메서드 체이닝 가능
         */
    init(data) {
        this.listInfoData = [];
        data.forEach(item => {
            this.listInfoData.push(this.template(item));
        });

        return this
    } 
        /**
         * 리스트 아이템을 모두 삭제합니다.
         * @returns {ListManager} - 인스턴스 자체를 반환하여 메서드 체이닝 가능
         */
    clearList() {
        while(this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        };
        
        return this
    }
        /**
         * 리스트 아이템을 렌더링합니다.
         * @returns {ListManager} - 인스턴스 자체를 반환하여 메서드 체이닝 가능
         */
    render() {
        this.listInfoData.forEach(item => {
            this.container.appendChild(item.template);            
        });

        return this
    }
        /**
         * 리스트 컨테이너에 이벤트 핸들러를 추가합니다.
         * @param {string} eventType - 이벤트 타입 (예: 'click', 'change' 등)
         * @param {Function} EventFn - 이벤트 핸들러 함수
         * @returns {ListManager} - 인스턴스 자체를 반환하여 메서드 체이닝 가능
         */
    addEvent(eventType, EventFn) {
        this.container.addEventListener(eventType, (e) => EventFn(e));

        return this
    }
}

export default ListManager
