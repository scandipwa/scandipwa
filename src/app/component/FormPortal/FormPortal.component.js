import Form from 'Component/Form/Form.component';

class FormPortal extends Form {
    componentDidUpdate(prevProps) {
        const { id: prevId } = prevProps;
        const { id } = this.props;

        if (id !== prevId && window.formPortalCollector) {
            window.formPortalCollector.unsubscribe(prevId, this.collectFieldsInformation);
            this.subscribeToFormPortalCollector(id);
        }
    }

    subscribeToFormPortalCollector(id) {
        if (window.formPortalCollector) {
            window.formPortalCollector.subscribe(id, this.collectFieldsInformation);
        }
    }

    componentDidMount() {
        const { id } = this.props;
        if (!id) throw new Error('Can not create a FormPortal without assignment to the Form ID!');
        this.subscribeToFormPortalCollector(id);
    }

    render() {
        const { children } = this.state;
        return children;
    }
}

export default FormPortal;
